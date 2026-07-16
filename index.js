#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const args = process.argv.slice(2);
const command = args[0];

const WORKFLOWS = [
  '01-lead-search-scoring.json',
  '02-email-automation.json',
  '03-reply-tracker.json'
];

const CHECKLIST = `
==============================================
  outreach-os Setup Checklist
==============================================

Workflow files copied to: ./outreach-os-workflows/

Before importing into N8N, you need:

[ ] 1. Google Places API key
       https://console.cloud.google.com/
       Enable: Places API
       Replace: YOUR_GOOGLE_PLACES_API_KEY in 01-lead-search-scoring.json

[ ] 2. Google Sheets OAuth2 credential
       In N8N: Credentials > New > Google Sheets OAuth2
       Replace: YOUR_GOOGLE_SHEET_ID in all 3 workflows
       Sheet columns: Name, Email, Company, Notes, Status, EmailedAt, MessageId, RowNumber

[ ] 3. Gmail OAuth2 credential
       In N8N: Credentials > New > Gmail OAuth2

[ ] 4. Z.ai account (free)
       https://z.ai - Get API key
       In N8N: Credentials > New > Z.ai API

[ ] 5. OpenAI API key (optional, for image generation)
       https://platform.openai.com

Import order in N8N:
  1. Workflows > Import from file
  2. Import 01-lead-search-scoring.json
  3. Import 02-email-automation.json
  4. Import 03-reply-tracker.json
  5. Set credentials on each workflow
  6. Activate all 3

Full docs: https://github.com/hitb1099/outreach-os
==============================================
`;

function install() {
  const srcDir = path.join(__dirname, 'workflows');
  const destDir = path.join(process.cwd(), 'outreach-os-workflows');

  if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, { recursive: true });
  }

  let copied = 0;
  for (const file of WORKFLOWS) {
    const src = path.join(srcDir, file);
    const dest = path.join(destDir, file);
    if (fs.existsSync(src)) {
      fs.copyFileSync(src, dest);
      console.log(`  Copied: ${file}`);
      copied++;
    } else {
      console.log(`  Warning: ${file} not found (run from repo root or reinstall)`);
    }
  }

  console.log(CHECKLIST);
  console.log(`Done! ${copied}/${WORKFLOWS.length} workflow files copied.`);
  console.log('Import them into your N8N instance and follow the checklist above.\n');
}

function help() {
  console.log(`
outreach-os CLI

Usage:
  outreach-os install   Copy workflow JSON files to current directory + show setup checklist
  outreach-os help      Show this help message
  outreach-os version   Show version

Docs: https://github.com/hitb1099/outreach-os
`);
}

switch (command) {
  case 'install':
    install();
    break;
  case 'version':
  case '-v':
  case '--version':
    const pkg = require('./package.json');
    console.log(`outreach-os v${pkg.version}`);
    break;
  case 'help':
  case '--help':
  case '-h':
  default:
    help();
}
