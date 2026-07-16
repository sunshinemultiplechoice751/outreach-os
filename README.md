<div align="center">

# outreach-os

**Open-source AI-powered B2B outreach system**

Find leads → Score them → Send AI-personalized cold emails → Track replies → Auto follow-up

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![npm version](https://img.shields.io/npm/v/outreach-os.svg)](https://www.npmjs.com/package/outreach-os)
[![npm downloads](https://img.shields.io/npm/dm/outreach-os.svg)](https://www.npmjs.com/package/outreach-os)
[![GitHub stars](https://img.shields.io/github/stars/hitb1099/outreach-os?style=social)](https://github.com/hitb1099/outreach-os)

</div>

---

## What is outreach-os?

outreach-os is a collection of production-ready N8N workflows that automate your entire B2B outreach pipeline from scratch — without writing a single line of backend code.

It replaces expensive tools like Apollo.io, Instantly, and Lemlist with a free, self-hosted, AI-powered system that you fully own.

### The full pipeline

```
Google Places API
      |
      v
 [Lead Scoring Engine]  <-- 100-point scoring algorithm (rating, reviews, website, open status)
      |
      v
 HOT leads / NURTURE leads  --> Google Sheets
      |
      v
 [AI Email Generator]  <-- GLM-4 + context detection per industry
      |                    Pollinations.ai banner image generated per company
      |                    Zomato tool for restaurant leads
      v
 [Gmail Send]  --> Mark as Emailed in Sheets
      |
      v
 [Reply Tracker]  <-- Checks Gmail daily at 9AM
      |
      +---> Reply found? --> Mark as Replied
      |
      +---> No reply after 3 days? --> AI follow-up email --> Mark as FollowedUp
```

---

## Included Workflows

| # | Workflow | Description |
|---|----------|-------------|
| 1 | **Lead Search & Scoring Engine** | Searches Google Places, scores leads 0-100 across 6 dimensions, outputs HOT vs NURTURE to separate Sheets tabs |
| 2 | **AI Email Automation** | Detects industry, generates brand personality context, creates a Pollinations banner, writes a personalized cold email via GLM-4, sends via Gmail |
| 3 | **Email Reply Tracker & Auto Follow-Up** | Runs daily, checks Gmail for replies, auto-sends AI follow-up after 3 days of silence, keeps Sheets status in sync |

---

## Key Features

- **100-point lead scoring** across Google Rating, review volume, website presence, open status, price tier, and improvement opportunity
- **Industry-aware AI emails** — detects food & beverage, retail, tech, hospitality automatically
- **Dynamic banner images** — generates a unique Pollinations.ai marketing banner per company
- **Zomato integration** — AI agent can search Zomato for restaurant context before writing
- **Multi-LLM support** — OpenAI GPT-4o-mini + Z.ai GLM-4.7-flash (free tier)
- **Full status tracking** — Pending → Emailed → Replied / FollowedUp, all in Google Sheets
- **Zero backend required** — runs entirely in N8N, self-hosted or cloud

---

## Credentials Required

| Credential | Used For | Free Tier? |
|------------|----------|------------|
| Google Places API | Lead search | Yes (limited) |
| Google Sheets OAuth2 | Lead storage | Yes |
| Gmail OAuth2 | Sending & tracking emails | Yes |
| OpenAI API | Caption/image generation | Pay-as-you-go |
| Z.ai (GLM-4) | Email writing, lead context | Yes (free) |
| Pollinations.ai | Banner images | Yes (free) |

---

## Quick Start

### Option 1 — Install via npm CLI (recommended)

```bash
npm install -g outreach-os
outreach-os install
```

This copies all workflow JSON files to your current directory with a setup checklist.

### Option 2 — Manual import

1. Clone or download this repo
2. Open your N8N instance
3. Go to **Workflows → Import from file**
4. Import each JSON from the `workflows/` folder in order:
   - `01-lead-search-scoring.json` first
   - `02-email-automation.json` second
   - `03-reply-tracker.json` third
5. Set up credentials (see [Setup Guide](docs/setup-guide.md))
6. Configure your Google Sheet ID in each workflow
7. Activate all three workflows

---

## Google Sheets Schema

Your spreadsheet needs one sheet named **Sheet1** with these columns:

| Name | Email | Company | Notes | Status | EmailedAt | MessageId | RowNumber |
|------|-------|---------|-------|--------|-----------|-----------|----------|

Status values: `Pending` → `Emailed` → `Replied` or `FollowedUp`

---

## Docs

- [Full Setup Guide](docs/setup-guide.md)
- [Google Places API Setup](docs/google-places-setup.md)
- [Contributing](CONTRIBUTING.md)

---

## Tech Stack

- [N8N](https://n8n.io) — workflow automation
- [Z.ai GLM-4](https://z.ai) — LLM (free)
- [Pollinations.ai](https://pollinations.ai) — image generation (free)
- [Google Places API](https://developers.google.com/maps/documentation/places/web-service) — lead discovery
- [Gmail API](https://developers.google.com/gmail/api) — email sending & tracking
- [Zomato](https://www.zomato.com) — restaurant data enrichment

## Roadmap

> Track active development. PRs welcome!

### v1.x — Current
- [x] Lead search via Google Places API
- [x] 100-point lead scoring algorithm
- [x] HOT vs NURTURE auto-categorization in Google Sheets
- [x] AI personalized cold email generation (GLM-4 / GPT-4o-mini)
- [x] AI banner image creation via Pollinations.ai
- [x] Gmail sending integration
- [x] Daily reply tracking (9AM schedule)
- [x] Auto follow-up after 3 days of silence
- [x] Full status tracking: Pending → Emailed → Replied / FollowedUp
- [x] Published on npm as `outreach-os`

### v2.0 — Coming Soon
- [ ] LinkedIn outreach integration
- [ ] WhatsApp follow-ups via Twilio
- [ ] Webhook triggers (real-time instead of scheduled)
- [ ] More industry-specific email templates (SaaS, e-commerce, agencies)
- [ ] Open rate & click tracking dashboard
- [ ] GitHub Actions CI for automated testing
- [ ] One-click deploy to Railway / Render

### v3.0 — Future Vision
- [ ] Web dashboard UI for managing leads
- [ ] Multi-channel outreach (email + LinkedIn + WhatsApp)
- [ ] CRM integrations (HubSpot, Airtable, Notion)
- [ ] Analytics: reply rate, open rate, conversion tracking
- [ ] Community template library

---

## Contributing

PRs welcome! See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

Ideas for contributions:
- Add more industry-specific email templates
- LinkedIn outreach integration
- WhatsApp follow-up via Twilio
- Webhook trigger instead of schedule
- Dashboard for tracking open rates

---

## License

MIT © [hitb1099](https://github.com/hitb1099)

---

<div align="center">

**If this saved you hours of setup, please ⭐ star the repo — it helps others find it!**

</div>
