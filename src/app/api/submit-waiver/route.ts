import { NextRequest, NextResponse } from 'next/server';
import { Language } from '@/lib/waiver-content';

// Environment variables for SharePoint integration
const AZURE_TENANT_ID = process.env.AZURE_TENANT_ID;
const AZURE_CLIENT_ID = process.env.AZURE_CLIENT_ID;
const AZURE_CLIENT_SECRET = process.env.AZURE_CLIENT_SECRET;
const SHAREPOINT_SITE_URL = process.env.SHAREPOINT_SITE_URL;
const SHAREPOINT_EXCEL_FILE_PATH = process.env.SHAREPOINT_EXCEL_FILE_PATH;
const SHAREPOINT_TABLE_NAME = process.env.SHAREPOINT_TABLE_NAME;

interface WaiverSubmission {
  participantName: string;
  language: Language;
  signatureData: string;
  timestamp: string;
  date: string;
  waiverDocumentData?: string; // Full waiver document as data URL
}

function formatTimestampPacific(isoTimestamp: string): string {
  try {
    const date = new Date(isoTimestamp);
    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      timeZone: 'America/Los_Angeles',
    });
  } catch {
    return isoTimestamp;
  }
}

function hasGraphConfig(): boolean {
  return !!(
    AZURE_TENANT_ID &&
    AZURE_CLIENT_ID &&
    AZURE_CLIENT_SECRET &&
    SHAREPOINT_SITE_URL &&
    SHAREPOINT_EXCEL_FILE_PATH &&
    SHAREPOINT_TABLE_NAME
  );
}

async function getGraphToken(): Promise<string | null> {
  if (!hasGraphConfig()) {
    console.log('[graph] Missing configuration');
    return null;
  }

  try {
    const url = `https://login.microsoftonline.com/${AZURE_TENANT_ID}/oauth2/v2.0/token`;
    const params = new URLSearchParams({
      client_id: AZURE_CLIENT_ID!,
      client_secret: AZURE_CLIENT_SECRET!,
      scope: 'https://graph.microsoft.com/.default',
      grant_type: 'client_credentials',
    });

    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: params.toString(),
    });

    if (!response.ok) {
      console.error('[graph] Token error:', response.status);
      return null;
    }

    const data = await response.json();
    return data.access_token;
  } catch (error) {
    console.error('[graph] Token error:', error);
    return null;
  }
}

async function getSiteId(token: string): Promise<string | null> {
  try {
    const url = new URL(SHAREPOINT_SITE_URL!);
    const hostname = url.hostname;
    const sitePath = url.pathname.replace(/^\//, '');

    const apiUrl = `https://graph.microsoft.com/v1.0/sites/${hostname}:/${sitePath}?$select=id`;
    const response = await fetch(apiUrl, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!response.ok) {
      console.error('[graph] Site ID error:', response.status);
      return null;
    }

    const data = await response.json();
    return data.id;
  } catch (error) {
    console.error('[graph] Site ID error:', error);
    return null;
  }
}

async function appendExcelRow(
  token: string,
  siteId: string,
  waiverData: {
    name: string;
    date: string;
    language: string;
    timestamp: string;
    screenshotFilename: string;
  }
): Promise<boolean> {
  try {
    const filePathEnc = SHAREPOINT_EXCEL_FILE_PATH!.replace(/ /g, '%20');
    const url = `https://graph.microsoft.com/v1.0/sites/${siteId}/drive/root:/${filePathEnc}:/workbook/tables/${SHAREPOINT_TABLE_NAME}/rows/add`;

    const rowValues = [
      waiverData.name,
      waiverData.date,
      waiverData.language,
      waiverData.timestamp,
      waiverData.screenshotFilename,
    ];

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ values: [rowValues] }),
    });

    if (response.ok) {
      console.log('[graph] Excel row appended successfully');
      return true;
    }

    // Try with workbook session if direct append fails
    const sessionUrl = `https://graph.microsoft.com/v1.0/sites/${siteId}/drive/root:/${filePathEnc}:/workbook/createSession`;
    const sessionResponse = await fetch(sessionUrl, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ persistChanges: true }),
    });

    if (sessionResponse.ok) {
      const sessionData = await sessionResponse.json();
      const sessionId = sessionData.id;

      const tableResponse = await fetch(url, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
          'workbook-session-id': sessionId,
        },
        body: JSON.stringify({ values: [rowValues] }),
      });

      if (tableResponse.ok) {
        console.log('[graph] Excel row appended successfully using session');
        return true;
      }
    }

    console.error('[graph] Failed to append Excel row');
    return false;
  } catch (error) {
    console.error('[graph] Excel append error:', error);
    return false;
  }
}

async function uploadScreenshot(
  token: string,
  siteId: string,
  base64Data: string,
  participantName: string
): Promise<string | false> {
  if (!base64Data || !base64Data.startsWith('data:image')) {
    console.error('[graph] Invalid waiver document data');
    return false;
  }

  try {
    // Clean the participant name for filename
    const cleanName = participantName
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/[-\s]+/g, '_');

    // Get folder path from Excel file path
    const pathParts = SHAREPOINT_EXCEL_FILE_PATH!.split('/');
    pathParts.pop(); // Remove filename
    const folderPath = pathParts.join('/') || 'Shared Documents';
    const screenshotsFolder = `${folderPath}/screenshots`;

    // Create screenshots folder if it doesn't exist
    const createFolderUrl = `https://graph.microsoft.com/v1.0/sites/${siteId}/drive/root:/${folderPath.replace(/ /g, '%20')}:/children`;
    await fetch(createFolderUrl, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: 'screenshots',
        folder: {},
        '@microsoft.graph.conflictBehavior': 'replace',
      }),
    });

    // Generate filename with date and unique ID
    const dateStr = new Date().toISOString().slice(0, 10).replace(/-/g, '');
    const uniqueId = Math.random().toString(36).substring(2, 8).toUpperCase();
    const filename = `${cleanName}_${dateStr}_${uniqueId}_waiver.png`;

    // Decode base64 to binary
    const base64Content = base64Data.split(',')[1];
    const binaryData = Buffer.from(base64Content, 'base64');

    // Upload file
    const uploadUrl = `https://graph.microsoft.com/v1.0/sites/${siteId}/drive/root:/${screenshotsFolder.replace(/ /g, '%20')}/${filename}:/content`;
    const uploadResponse = await fetch(uploadUrl, {
      method: 'PUT',
      headers: { Authorization: `Bearer ${token}` },
      body: binaryData,
    });

    if (uploadResponse.ok) {
      console.log(`[graph] Waiver document uploaded: ${filename}`);
      return `${screenshotsFolder}/${filename}`;
    }

    console.error('[graph] Screenshot upload failed:', uploadResponse.status);
    return false;
  } catch (error) {
    console.error('[graph] Screenshot upload error:', error);
    return false;
  }
}

export async function POST(request: NextRequest) {
  try {
    const body: WaiverSubmission = await request.json();
    const { participantName, language, signatureData, timestamp, date, waiverDocumentData } = body;

    // Validate required fields
    if (!participantName || !signatureData) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Check if SharePoint integration is configured
    if (!hasGraphConfig()) {
      console.log('[api] SharePoint not configured, skipping storage');
      return NextResponse.json({
        success: true,
        message: 'Waiver submitted (SharePoint not configured)',
        stored: false,
      });
    }

    // Get Microsoft Graph token
    const token = await getGraphToken();
    if (!token) {
      console.error('[api] Failed to get Graph token');
      return NextResponse.json({
        success: true,
        message: 'Waiver submitted (Graph auth failed)',
        stored: false,
      });
    }

    // Get SharePoint site ID
    const siteId = await getSiteId(token);
    if (!siteId) {
      console.error('[api] Failed to get site ID');
      return NextResponse.json({
        success: true,
        message: 'Waiver submitted (Site ID failed)',
        stored: false,
      });
    }

    // Upload the full waiver document (with all form data and signature)
    const screenshotPath = waiverDocumentData 
      ? await uploadScreenshot(token, siteId, waiverDocumentData, participantName)
      : false;

    // Format timestamp to Pacific time for Excel storage
    const pacificTimestamp = formatTimestampPacific(timestamp);

    // Append row to Excel
    const excelSuccess = await appendExcelRow(token, siteId, {
      name: participantName,
      date: date,
      language: language,
      timestamp: pacificTimestamp,
      screenshotFilename: screenshotPath || 'Upload failed',
    });

    return NextResponse.json({
      success: true,
      message: 'Waiver submitted successfully',
      stored: true,
      excelUpdated: excelSuccess,
      screenshotUploaded: !!screenshotPath,
    });
  } catch (error) {
    console.error('[api] Submit error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
