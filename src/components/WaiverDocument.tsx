'use client';

import { forwardRef, useMemo } from 'react';
import { Language, waiverContent } from '@/lib/waiver-content';

interface WaiverDocumentProps {
  participantName: string;
  language: Language;
  signatureDataUrl: string;
  timestamp: string;
  agreed: boolean;
  documentId?: string; // Optional pre-generated document ID
}

const languageLabels: Record<Language, { 
  documentTitle: string;
  agreementConfirmation: string;
  signedOn: string;
  generatedOn: string;
  page: string;
  legalNotice: string;
  witnessStatement: string;
}> = {
  en: {
    documentTitle: 'WAIVER AND RELEASE FROM LIABILITY',
    agreementConfirmation: 'AGREEMENT CONFIRMATION',
    signedOn: 'Signed on',
    generatedOn: 'Document generated on',
    page: 'Page',
    legalNotice: 'This document constitutes a legally binding agreement. The signatory acknowledges having read, understood, and agreed to all terms and conditions stated herein.',
    witnessStatement: 'Electronic Signature Certification: This signature was electronically captured and verified at the time of submission.',
  },
  es: {
    documentTitle: 'ACUERDO DE RENUNCIA Y EXENCIÓN DE RESPONSABILIDAD',
    agreementConfirmation: 'CONFIRMACIÓN DEL ACUERDO',
    signedOn: 'Firmado el',
    generatedOn: 'Documento generado el',
    page: 'Página',
    legalNotice: 'Este documento constituye un acuerdo legalmente vinculante. El firmante reconoce haber leído, comprendido y aceptado todos los términos y condiciones aquí establecidos.',
    witnessStatement: 'Certificación de Firma Electrónica: Esta firma fue capturada y verificada electrónicamente en el momento de la presentación.',
  },
  zh: {
    documentTitle: '弃权和免责书',
    agreementConfirmation: '协议确认',
    signedOn: '签署日期',
    generatedOn: '文件生成日期',
    page: '页',
    legalNotice: '本文件构成具有法律约束力的协议。签署人确认已阅读、理解并同意本文所述的所有条款和条件。',
    witnessStatement: '电子签名认证：此签名在提交时已通过电子方式捕获和验证。',
  },
};

const WaiverDocument = forwardRef<HTMLDivElement, WaiverDocumentProps>(
  ({ participantName, language, signatureDataUrl, timestamp, documentId: providedDocId }, ref) => {
    const content = waiverContent[language];
    const labels = languageLabels[language];
    
    const formattedDate = new Date(timestamp).toLocaleDateString(
      language === 'en' ? 'en-US' : language === 'es' ? 'es-ES' : 'zh-CN',
      { year: 'numeric', month: 'long', day: 'numeric' }
    );
    
    // Format timestamp in Pacific timezone
    const date = new Date(timestamp);
    const formattedTimestamp = date.toLocaleString(
      language === 'en' ? 'en-US' : language === 'es' ? 'es-ES' : 'zh-CN',
      { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        timeZone: 'America/Los_Angeles',
        timeZoneName: 'short'
      }
    );

    // Use provided documentId or a placeholder (actual ID should be generated before render)
    const documentId = useMemo(() => providedDocId || 'WVR-PENDING', [providedDocId]);

    return (
      <div 
        ref={ref}
        className="bg-white text-black"
        style={{
          width: '850px',
          fontFamily: '"Times New Roman", Times, serif',
          fontSize: '11px',
          lineHeight: '1.4',
          padding: '40px',
          position: 'absolute',
          left: '-9999px',
          top: '0',
        }}
      >
        <div style={{ border: '2px solid #2d3748', padding: '30px', position: 'relative' }}>
          {/* Watermark */}
          <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%) rotate(-45deg)',
            fontSize: '80px',
            color: 'rgba(34, 197, 94, 0.08)',
            fontWeight: 'bold',
            letterSpacing: '10px',
            pointerEvents: 'none',
            whiteSpace: 'nowrap',
          }}>
            SIGNED
          </div>

          {/* Header */}
          <div style={{ textAlign: 'center', borderBottom: '3px double #2d3748', paddingBottom: '20px', marginBottom: '20px' }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img 
              src="https://images.squarespace-cdn.com/content/v1/5622cd82e4b0501d40689558/cdab4aef-0027-40b7-9737-e2f893586a6a/Hopes_Corner_Logo_Green.png?format=300w"
              alt="Hope's Corner Logo"
              style={{ maxHeight: '60px', marginBottom: '10px' }}
              crossOrigin="anonymous"
            />
            <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#2d5016', letterSpacing: '2px', marginBottom: '3px' }}>
              {content.logoText1}
            </div>
            <div style={{ fontSize: '10px', color: '#4a5568', letterSpacing: '1px', textTransform: 'uppercase' }}>
              {content.logoSubtext}
            </div>
          </div>

          {/* Document Title */}
          <div style={{
            fontSize: '16px',
            fontWeight: 'bold',
            textAlign: 'center',
            margin: '20px 0',
            padding: '10px',
            background: '#f7fafc',
            border: '1px solid #e2e8f0',
            letterSpacing: '1px',
          }}>
            {labels.documentTitle}
          </div>

          {/* Document Info */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            fontSize: '9px',
            color: '#4a5568',
            marginBottom: '15px',
            padding: '8px',
            background: '#f7fafc',
            border: '1px solid #e2e8f0',
          }}>
            <div>
              <strong>Document ID:</strong>{' '}
              <span style={{ fontFamily: '"Courier New", monospace', fontWeight: 'bold' }}>{documentId}</span>
            </div>
            <div>
              <strong>{labels.generatedOn}:</strong> {formattedTimestamp}
            </div>
          </div>

          {/* Main Content */}
          <div style={{ marginBottom: '15px' }}>
            <div style={{
              fontSize: '11px',
              fontWeight: 'bold',
              marginBottom: '8px',
              color: '#2d3748',
              textTransform: 'uppercase',
              borderBottom: '1px solid #e2e8f0',
              paddingBottom: '3px',
            }}>
              {content.title}
            </div>
            <p style={{ textAlign: 'justify', marginBottom: '12px' }}>{content.intro}</p>
          </div>

          {/* Numbered Points */}
          <ol style={{ marginLeft: '20px', marginBottom: '12px', paddingLeft: '0' }}>
            <li style={{ marginBottom: '6px', textAlign: 'justify' }}>{content.points[0]}</li>
            <li style={{ marginBottom: '6px', textAlign: 'justify' }}>{content.points[1]}</li>
            <li style={{ marginBottom: '6px', textAlign: 'justify' }}>
              {content.points[2]}
              <ol style={{ marginLeft: '20px', marginTop: '6px', listStyleType: 'lower-alpha' }}>
                {content.subPoints.map((point, index) => (
                  <li key={index} style={{ marginBottom: '4px' }}>{point}</li>
                ))}
              </ol>
            </li>
          </ol>

          {/* Clauses */}
          <div style={{ textAlign: 'justify', marginBottom: '10px', paddingLeft: '10px', borderLeft: '2px solid #e2e8f0' }}>
            {content.volunteerClause}
          </div>
          <div style={{ textAlign: 'justify', marginBottom: '10px', paddingLeft: '10px', borderLeft: '2px solid #e2e8f0' }}>
            {content.indemnifyClause}
          </div>
          <div style={{ textAlign: 'justify', marginBottom: '10px', paddingLeft: '10px', borderLeft: '2px solid #e2e8f0' }}>
            {content.releaseClause}
          </div>

          {/* Final Agreement Warning */}
          <div style={{
            background: '#fffbeb',
            border: '1px solid #f59e0b',
            padding: '12px',
            margin: '15px 0',
            fontWeight: 'bold',
            textAlign: 'justify',
            fontSize: '10px',
          }}>
            ⚠️ {content.finalAgreement}
          </div>

          {/* Agreement Confirmation */}
          <div style={{
            background: '#f0fdf4',
            border: '2px solid #22c55e',
            padding: '15px',
            margin: '20px 0',
          }}>
            <div style={{
              fontSize: '12px',
              fontWeight: 'bold',
              color: '#166534',
              marginBottom: '10px',
              textAlign: 'center',
            }}>
              ✓ {labels.agreementConfirmation}
            </div>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
              <div style={{
                width: '24px',
                height: '24px',
                border: '2px solid #22c55e',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                background: '#22c55e',
                color: 'white',
                fontSize: '18px',
                fontWeight: 'bold',
                lineHeight: '1',
                borderRadius: '2px',
              }}>
                ✓
              </div>
              <div>{content.agreementCheck}</div>
            </div>
          </div>

          {/* Signature Section */}
          <div style={{ marginTop: '25px', paddingTop: '20px', borderTop: '2px solid #2d3748' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px', marginBottom: '20px' }}>
              {/* Name Field */}
              <div>
                <div style={{
                  fontSize: '9px',
                  color: '#4a5568',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                  marginBottom: '5px',
                }}>
                  {content.printNameLabel}
                </div>
                <div style={{
                  fontSize: '14px',
                  fontWeight: 'bold',
                  padding: '8px 0',
                  borderBottom: '1px solid #2d3748',
                  minHeight: '30px',
                }}>
                  {participantName}
                </div>
              </div>

              {/* Date Field */}
              <div>
                <div style={{
                  fontSize: '9px',
                  color: '#4a5568',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                  marginBottom: '5px',
                }}>
                  {content.dateLabel}
                </div>
                <div style={{
                  fontSize: '14px',
                  fontWeight: 'bold',
                  padding: '8px 0',
                  borderBottom: '1px solid #2d3748',
                  minHeight: '30px',
                }}>
                  {formattedDate}
                </div>
              </div>
            </div>

            {/* Signature Image */}
            <div>
              <div style={{
                fontSize: '9px',
                color: '#4a5568',
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
                marginBottom: '5px',
              }}>
                {content.signatureLabel}
              </div>
              <div style={{
                border: '1px solid #e2e8f0',
                padding: '10px',
                background: '#fafafa',
                textAlign: 'center',
                minHeight: '80px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>n                {signatureDataUrl && (
                  /* eslint-disable-next-line @next/next/no-img-element */
                  <img 
                    src={signatureDataUrl}
                    alt="Participant Signature"
                    style={{ maxWidth: '100%', maxHeight: '70px', objectFit: 'contain' }}
                  />
                )}
              </div>
            </div>
          </div>

          {/* Legal Notice */}
          <div style={{
            marginTop: '20px',
            padding: '12px',
            background: '#f1f5f9',
            border: '1px solid #cbd5e1',
            fontSize: '9px',
            color: '#475569',
            textAlign: 'center',
          }}>
            {labels.legalNotice}
          </div>

          {/* Witness Statement */}
          <div style={{
            marginTop: '10px',
            padding: '10px',
            background: '#eff6ff',
            border: '1px solid #93c5fd',
            fontSize: '9px',
            color: '#1e40af',
            textAlign: 'center',
            fontStyle: 'italic',
          }}>
            {labels.witnessStatement}
          </div>

          {/* Footer */}
          <div style={{
            marginTop: '25px',
            paddingTop: '15px',
            borderTop: '1px solid #e2e8f0',
            display: 'flex',
            justifyContent: 'space-between',
            fontSize: '8px',
            color: '#64748b',
          }}>
            <div>
              Hope&apos;s Corner, Inc. Bicycle Program<br/>
              Document ID: {documentId}
            </div>
            <div style={{ textAlign: 'right' }}>
              {labels.signedOn}: {formattedDate}<br/>
              {labels.page} 1/1
            </div>
          </div>
        </div>
      </div>
    );
  }
);

WaiverDocument.displayName = 'WaiverDocument';

export default WaiverDocument;
