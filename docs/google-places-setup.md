# Google Places API Setup

This guide explains how to get a free Google Places API key for the Lead Search & Scoring workflow.

## Step 1: Create a Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Click **Select a project** > **New Project**
3. Name it: `outreach-os` (or any name)
4. Click **Create**

## Step 2: Enable the Places API

1. In the left menu: **APIs & Services** > **Library**
2. Search for: **Places API**
3. Click on **Places API** > **Enable**

## Step 3: Create an API Key

1. In the left menu: **APIs & Services** > **Credentials**
2. Click **+ Create Credentials** > **API Key**
3. Copy the API key
4. (Optional but recommended) Click **Restrict Key**:
   - Application restrictions: **IP addresses**
   - API restrictions: **Restrict key** > Select **Places API**

## Step 4: Add to Workflow

1. Open `workflows/01-lead-search-scoring.json` in a text editor
2. Find: `YOUR_GOOGLE_PLACES_API_KEY`
3. Replace with your actual key
4. OR after importing into N8N, open the HTTP Request node and update the `key` parameter

## Free Tier Limits

Google Places API gives you **$200 of free credit per month**.
- Text Search: $32 per 1000 requests
- At $200 free: ~6,250 searches/month for free
- More than enough for most outreach campaigns

## Billing

You need to enable billing on your Google Cloud account to use the API, but you won't be charged until you exceed the $200 monthly credit.

1. Go to **Billing** in Google Cloud Console
2. Link a billing account (credit card required but won't be charged)
3. Google gives $200 free credit monthly

## Testing Your Key

Test in your browser:
```
https://maps.googleapis.com/maps/api/place/textsearch/json?query=Restaurant+in+Bangalore&key=YOUR_KEY_HERE
```

You should see a JSON response with restaurant listings.
