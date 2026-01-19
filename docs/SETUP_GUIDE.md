# Setup Guide - What You Need to Configure

This guide covers everything you need to set up on your side (Cloudflare, n8n, Google Calendar) before we can integrate the booking system.

---

## 1. Cloudflare D1 Database Setup

### Create the D1 Database
```bash
# In your project directory
npx wrangler d1 create knapgemaakt-bookings
```

This will output something like:
```
✅ Successfully created DB 'knapgemaakt-bookings'
database_id = "abc123-def456-ghi789"
```

### Add to wrangler.toml
Create or update `wrangler.toml` in your project root:
```toml
name = "knapgemaakt-nl"
compatibility_date = "2024-01-01"

[[d1_databases]]
binding = "DB"
database_name = "knapgemaakt-bookings"
database_id = "abc123-def456-ghi789"  # Use the ID from the create command
```

### Run Database Migrations
Once I create the schema files, you'll run:
```bash
# Apply migrations locally (for development)
npx wrangler d1 execute knapgemaakt-bookings --local --file=./migrations/0001_initial_schema.sql

# Apply migrations to production
npx wrangler d1 execute knapgemaakt-bookings --remote --file=./migrations/0001_initial_schema.sql
```

**What this gives you:**
- SQLite database at the edge (fast, global)
- Tables: `availability_rules`, `bookings`, `blocked_times`
- Direct binding in your API routes via `context.env.DB`

---

## 2. Google Calendar API Setup

### Enable Google Calendar API
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project (or use existing): "knapgemaakt-booking-system"
3. Enable the **Google Calendar API**:
   - APIs & Services → Library
   - Search "Google Calendar API"
   - Click Enable

### Create Service Account (for n8n to access your calendar)
1. APIs & Services → Credentials → Create Credentials → Service Account
2. Name: "n8n-calendar-sync"
3. Grant role: None needed (we'll give specific calendar access)
4. Click Done

### Generate Service Account Key
1. Click on the service account you just created
2. Keys tab → Add Key → Create New Key → JSON
3. Download the JSON file (keep this safe!)

**This JSON contains:**
```json
{
  "type": "service_account",
  "project_id": "your-project",
  "private_key_id": "...",
  "private_key": "-----BEGIN PRIVATE KEY-----\n...",
  "client_email": "n8n-calendar-sync@your-project.iam.gserviceaccount.com",
  "client_id": "...",
  ...
}
```

### Share Your Calendar with Service Account
1. Open Google Calendar (calendar.google.com)
2. Click on your calendar settings (3 dots → Settings and sharing)
3. Scroll to "Share with specific people"
4. Add the `client_email` from the JSON file
5. Give "Make changes to events" permission

**What this gives you:**
- n8n can read/write to your calendar without OAuth prompts
- Secure server-to-server authentication

---

## 3. n8n Workflow Setup

You'll need to create 3 workflows in your n8n instance at `n8n.summitlab.dev`:

### Workflow 1: Google Calendar → D1 Sync (Every 5 minutes)

**Trigger:** Schedule (Cron: `*/5 * * * *`)

**Nodes:**
1. **Schedule Trigger** (every 5 minutes)
2. **Google Calendar Node**
   - Credential: Use the service account JSON
   - Operation: Get Many
   - Calendar: Your calendar ID (usually your email)
   - Time Range: Start = Now, End = Now + 60 days
3. **Function Node** - Transform events to blocked_times format:
   ```javascript
   return $input.all().map(event => ({
     json: {
       id: event.json.id,
       start_time: event.json.start.dateTime,
       end_time: event.json.end.dateTime,
       source: 'google_calendar',
       calendar_event_id: event.json.id,
       synced_at: new Date().toISOString()
     }
   }));
   ```
4. **HTTP Request Node**
   - Method: POST
   - URL: `https://knapgemaakt.nl/api/sync-blocked-times`
   - Body: `{{ $json }}`
   - Authentication: Bearer token (we'll create this)

**What you need to provide me:**
- The webhook URL for testing (we can use a test endpoint first)

---

### Workflow 2: New Booking → Google Calendar + Email

**Trigger:** Webhook (POST)

**Webhook URL will be:** `https://n8n.summitlab.dev/webhook/booking-confirmed`

**Nodes:**
1. **Webhook Trigger**
   - Method: POST
   - Path: `booking-confirmed`
2. **Google Calendar Node**
   - Operation: Create
   - Calendar: Your calendar
   - Event Title: `Intro Call - {{ $json.user_name }}`
   - Start: `{{ $json.start_time }}`
   - End: `{{ $json.end_time }}`
   - Description: Template with user details
3. **HTML Email Node** (your custom branded email)
   - To: `{{ $json.user_email }}`
   - From: your@knapgemaakt.nl
   - Subject: "Jouw afspraak is bevestigd! 🎉"
   - HTML Body: Your custom branded email template
4. **HTML Email Node** (copy to you)
   - To: your@knapgemaakt.nl
   - Subject: "Nieuwe afspraak: {{ $json.user_name }}"

**What you need to provide me:**
- Final webhook URL
- Your branded email template (HTML)

---

### Workflow 3: Send Reminders (24h & 1h before)

**Trigger:** Schedule (Cron: `0 * * * *` - every hour)

**Nodes:**
1. **Schedule Trigger** (every hour)
2. **HTTP Request** - Fetch upcoming bookings
   - GET `https://knapgemaakt.nl/api/bookings/upcoming`
3. **Split In Batches** - Process each booking
4. **IF Node** - Check if 24h or 1h before
5. **Send Email** - Send reminder based on timing

**This can wait** - We'll set this up after the core booking flow works.

---

## 4. Environment Variables / Secrets

You'll need to configure these in Cloudflare Pages:

### In Cloudflare Pages Settings → Environment Variables:

```bash
# n8n webhook URLs
N8N_BOOKING_WEBHOOK=https://n8n.summitlab.dev/webhook/booking-confirmed

# API authentication (for n8n to call your API)
API_SECRET_TOKEN=<generate-a-random-token>

# Optional: Google Calendar API (for final conflict check)
GOOGLE_CALENDAR_ID=your-email@gmail.com
GOOGLE_SERVICE_ACCOUNT_KEY=<paste-the-json-as-string>
```

**To generate the API_SECRET_TOKEN:**
```bash
# In terminal
openssl rand -hex 32
```

This token will be used:
- By n8n to authenticate when syncing blocked times
- By your API to verify n8n webhook calls are legitimate

---

## 5. Astro Configuration

### Update astro.config.mjs
Add Cloudflare adapter (if not already there):
```javascript
import { defineConfig } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';

export default defineConfig({
  output: 'hybrid', // Enables API routes
  adapter: cloudflare(),
});
```

Install the adapter:
```bash
npm install @astrojs/cloudflare
```

---

## Summary Checklist

Before we integrate, you need to complete:

- [ ] **Cloudflare D1**
  - [ ] Create database with `wrangler d1 create`
  - [ ] Add database binding to `wrangler.toml`
  - [ ] Ready to run migrations (I'll provide SQL files)

- [ ] **Google Calendar API**
  - [ ] Create Google Cloud project
  - [ ] Enable Calendar API
  - [ ] Create service account + download JSON key
  - [ ] Share your calendar with service account email

- [ ] **n8n Workflows**
  - [ ] Workflow 1: Calendar sync (every 5 min) - ready to configure
  - [ ] Workflow 2: Booking confirmation - give me webhook URL
  - [ ] Optional Workflow 3: Reminders (can wait)

- [ ] **Environment Variables**
  - [ ] Generate `API_SECRET_TOKEN`
  - [ ] Set `N8N_BOOKING_WEBHOOK` in Cloudflare Pages
  - [ ] Set `API_SECRET_TOKEN` in Cloudflare Pages
  - [ ] Set `GOOGLE_SERVICE_ACCOUNT_KEY` (optional, for conflict check)

- [ ] **Astro Config**
  - [ ] Install `@astrojs/cloudflare` adapter
  - [ ] Update `astro.config.mjs` with cloudflare adapter

---

## What I'll Build

While you set up the above, I'll build:
- Database migration SQL files
- API routes (`/api/availability`, `/api/bookings`, `/api/sync-blocked-times`)
- Availability config JSON
- React BookingCalendar component
- Integration into aanvragen.astro
- Authentication helpers for API routes

Once you have everything set up, we'll connect the pieces and test the full flow.

---

## Questions?

Let me know if you have questions about any of these steps, and I can provide more detailed guidance.
