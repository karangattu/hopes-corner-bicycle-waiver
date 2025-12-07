# Hope's Corner Bicycle Program Waiver

A modern, multilingual waiver form application for Hope's Corner, Inc. Bicycle Program.

## Getting Started

### Prerequisites

- Node.js 18.17 or later
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
```

1. Install dependencies:

```bash
npm install
```

1. Run the development server:

```bash
npm run dev
```

1. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm run test` | Run tests |
| `npm run test:watch` | Run tests in watch mode |
| `npm run test:coverage` | Run tests with coverage |

## SharePoint Integration

This app integrates with Microsoft SharePoint to store waiver submissions:

- **Excel logging**: Each submission is recorded in an Excel table with name, date, language, and timestamp
- **Screenshot storage**: Signature screenshots are uploaded to a `screenshots` folder in SharePoint

### Setting Up SharePoint Integration

#### 1. Create an Azure AD App Registration

1. Go to [Azure Portal](https://portal.azure.com) > Azure Active Directory > App registrations
2. Click "New registration"
3. Name: `Waiver App` (or your preferred name)
4. Supported account types: "Accounts in this organizational directory only"
5. Click "Register"

#### 2. Configure API Permissions

1. In your app registration, go to "API permissions"
2. Click "Add a permission" > "Microsoft Graph" > "Application permissions"
3. Add these permissions:
   - `Sites.ReadWrite.All` (to access SharePoint)
   - `Files.ReadWrite.All` (to upload files)
4. Click "Grant admin consent"

#### 3. Create a Client Secret

1. Go to "Certificates & secrets"
2. Click "New client secret"
3. Add a description and choose expiry
4. **Copy the secret value immediately** (you won't see it again)

#### 4. Prepare SharePoint

1. Create an Excel file in your SharePoint site (e.g., `Shared Documents/Waivers/waiver_data.xlsx`)
2. Create a table named `WaiverData` with columns:
   - Name
   - Date
   - Language
   - Timestamp
   - Screenshot_File

#### 5. Get Your SharePoint Site URL

Your site URL should look like: `https://yourorg.sharepoint.com/sites/YourSiteName`

## Deployment to Vercel

This project is optimized for deployment on Vercel.

### Deploy with Vercel CLI

1. Install Vercel CLI:

```bash
npm i -g vercel
```

2. Deploy:

```bash
vercel --prod
```

#### Local Development

Copy `.env.example` to `.env.local` and fill in your values:

```bash
cp .env.example .env.local
```

## Customization

### Modifying Waiver Content

Edit `src/lib/waiver-content.ts` to modify the waiver text in any language.

### Adding a New Language

1. Add new language type in `src/lib/waiver-content.ts`:
```typescript
export type Language = 'en' | 'es' | 'zh' | 'fr'; // Add your language code
```

2. Add content object for the new language in `waiverContent`

3. Update `getNextLanguage` function
