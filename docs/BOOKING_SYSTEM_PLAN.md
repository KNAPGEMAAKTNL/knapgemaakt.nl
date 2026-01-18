# In-House Calendar Booking System Plan

## Overview
Replace Cal.com with a custom, on-brand booking system that maintains fast performance on Cloudflare Pages and provides complete design/email customization.

## Architecture

### Frontend
- **Component:** New React calendar component (`src/components/BookingCalendar.tsx`)
- **Integration:** Replace Cal.com embed in `/aanvragen` page
- **Features:**
  - Month view with available time slots
  - 15-minute booking slots (configurable)
  - Pre-fill user data from form (name, email, phone)
  - Dark theme + acid yellow brand color matching
  - Responsive design (mobile-first)

### Backend
- **API Routes:** Cloudflare Workers (Astro `/api` routes)
- **Database:** Cloudflare D1 (SQLite)
- **Response Time:** <50ms (edge network)

**Endpoints:**
- `GET /api/availability?date=YYYY-MM-DD` - Return available slots
- `POST /api/bookings` - Create new booking
- `GET /api/bookings/:id` - Check booking status
- `POST /api/sync-blocked-times` - Sync blocked times from Google Calendar (called by n8n)

### Database Schema
```sql
-- Availability rules (edited via JSON config or admin)
availability_rules (
  day_of_week INT,      -- 0-6 (Monday-Sunday)
  start_time TEXT,      -- "09:00"
  end_time TEXT,        -- "17:00"
  slot_duration INT     -- 15 (minutes)
)

-- Bookings
bookings (
  id TEXT PRIMARY KEY,
  user_name TEXT,
  user_email TEXT,
  user_phone TEXT,
  start_time DATETIME,
  end_time DATETIME,
  status TEXT,          -- "confirmed" | "cancelled"
  created_at DATETIME
)

-- Blocked times (synced from Google Calendar)
blocked_times (
  id TEXT PRIMARY KEY,
  start_time DATETIME,
  end_time DATETIME,
  source TEXT,          -- "google_calendar" | "manual"
  calendar_event_id TEXT,
  synced_at DATETIME
)
```

### Calendar Sync Strategy
**Two-way sync with Google Calendar:**

**Your Calendar → Booking System (n8n polling):**
- n8n workflow runs every 5 minutes
- Fetches Google Calendar events for next 60 days
- Updates `blocked_times` table in D1
- 5-minute sync delay is acceptable for manual calendar blocks

**Booking System → Your Calendar (instant):**
- When user books, API creates booking in D1
- Immediately triggers n8n webhook (fire-and-forget)
- n8n adds event to Google Calendar
- No delay for user bookings

**Conflict prevention:**
- API checks both `availability_rules` AND `blocked_times` when serving slots
- Final validation against Google Calendar API before confirming booking
- If slot was just blocked, user gets "just taken" message with retry option

### Async Workflows (n8n)
Triggered **after** booking is confirmed (fire-and-forget, no user wait time):
- Send custom branded confirmation email
- Send reminder emails (24h, 1h before)
- Sync to Google Calendar / Outlook
- Optional: SMS notifications, Slack alerts, CRM sync
- Optional: Cancellation/reschedule emails

## Configuration
- **Availability:** JSON config file (easy to edit + redeploy in 30sec)
- **Emails:** n8n templates (full design control, no code changes needed)
- **Business Logic:** TypeScript (slot duration, buffer times, validation)

## User Flow
1. User fills out form (name, email, phone, industry, website)
2. Calendar component loads and fetches available slots
3. User selects time slot
4. API validates slot is available and creates booking
5. Success message shown immediately
6. n8n triggers async tasks (emails, calendar sync, etc.)

## Performance Impact
- ✅ **Faster:** Removes Cal.com iframe loading (~2-3s delay)
- ✅ **SEO:** No external embed delays, improves Lighthouse scores
- ✅ **No Cold Starts:** Cloudflare Workers always warm

## Implementation Phases
1. **D1 Schema & Migrations** - Database setup (availability_rules, bookings, blocked_times)
2. **Config System** - JSON availability rules (business hours, slot duration)
3. **API Routes** - Availability, booking, and sync endpoints
4. **Calendar Component** - React UI with slot selection
5. **n8n Workflows** - Google Calendar sync (5-min polling), booking confirmations, email workflows
6. **Integration & Testing** - Connect all pieces, test booking flow end-to-end
7. **Production Deployment** - Deploy to Cloudflare Pages with D1 bindings

## Benefits Over Cal.com
- 100% on-brand design and emails
- Complete data ownership
- No monthly fees
- Full control over user experience
- Fast performance maintained
- Customizable via n8n UI (no code deploys)
