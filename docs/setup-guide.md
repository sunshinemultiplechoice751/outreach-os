# Full Setup Guide

This guide walks you through setting up the complete outreach-os pipeline in N8N.

## Prerequisites

- N8N instance (cloud or self-hosted)
- Google account (for Sheets + Gmail)
- Google Cloud account (for Places API)
- Z.ai account (free) for GLM-4 LLM
- Optional: OpenAI account for image generation

---

## Step 1: Set Up Google Sheets

1. Create a new Google Spreadsheet
2. Name the first sheet: **Sheet1**
3. Add these column headers in Row 1:

| A | B | C | D | E | F | G | H |
|---|---|---|---|---|---|---|---|
| Name | Email | Company | Notes | Status | EmailedAt | MessageId | RowNumber |

4. Add your leads starting from Row 2
5. Set **Status** = `Pending` for all new leads
6. Copy the spreadsheet ID from the URL:
   `https://docs.google.com/spreadsheets/d/**YOUR_SHEET_ID**/edit`

---

## Step 2: Set Up N8N Credentials

### Google Sheets OAuth2
1. In N8N: Settings > Credentials > New
2. Search: Google Sheets OAuth2
3. Follow the OAuth flow with your Google account
4. Name it: `Google Sheets OAuth2 API`

### Gmail OAuth2
1. In N8N: Settings > Credentials > New
2. Search: Gmail OAuth2
3. Follow the OAuth flow
4. Name it: `Gmail OAuth2 API`

### Z.ai API (GLM-4 - Free)
1. Sign up at https://z.ai
2. Get your API key from the dashboard
3. In N8N: Settings > Credentials > New > Z.ai API
4. Name it: `Zai account`

### Google Places API
See [Google Places Setup Guide](google-places-setup.md) for detailed steps.

---

## Step 3: Import Workflows

Import in this exact order:

1. Go to **Workflows** in N8N
2. Click **Import from file** (or paste JSON)
3. Import `workflows/01-lead-search-scoring.json`
4. Import `workflows/02-email-automation.json`
5. Import `workflows/03-reply-tracker.json`

---

## Step 4: Configure Each Workflow

### Workflow 1: Lead Search & Scoring
- Open the **HTTP Request** node
- Replace `YOUR_GOOGLE_PLACES_API_KEY` with your actual key
- Configure the **Append row in sheet** nodes with your Sheet ID

### Workflow 2: Email Automation
- Open each Google Sheets node
- Replace `YOUR_GOOGLE_SHEET_ID` with your actual sheet ID
- Verify the Gmail credential is set on the **Send Email via Gmail** node
- Verify the Z.ai credential is set on the **Z.ai Chat** nodes

### Workflow 3: Reply Tracker
- Open each Google Sheets node
- Replace `YOUR_GOOGLE_SHEET_ID` with your actual sheet ID
- Verify the Gmail credential is set on both Gmail nodes

---

## Step 5: Activate Workflows

1. Open each workflow
2. Toggle **Active** in the top right
3. Workflow 1 runs on-demand (use manual trigger or form trigger)
4. Workflow 2 runs on-demand
5. Workflow 3 runs automatically every day at 9AM

---

## Usage Flow

1. **Find leads**: Run Workflow 1 with a business type (e.g., "Restaurant") and city (e.g., "Bangalore")
2. **HOT leads** go to one Sheet tab, **NURTURE** leads to another
3. Add your HOT leads to Sheet1 with Status = `Pending`
4. **Send emails**: Run Workflow 2 manually
5. **Track replies**: Workflow 3 runs daily automatically

---

## Troubleshooting

**Emails not sending?**
- Check Gmail OAuth2 credential is still valid (re-authorize if expired)
- Check the `sendTo` field has a valid email address

**Google Sheets not updating?**
- Verify the Sheet ID is correct
- Check column names match exactly (case-sensitive)

**AI not generating emails?**
- Check Z.ai API key is valid
- Check Z.ai account has credits (free tier should be sufficient)

**Reply tracker not finding replies?**
- Ensure `EmailedAt` column has a valid ISO timestamp
- Gmail OAuth2 must have `gmail.readonly` scope
