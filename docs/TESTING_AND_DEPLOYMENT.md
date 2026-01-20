# Testing and Deployment Guide

## What's Been Built

✅ **Database Schema** - `migrations/0001_initial_schema.sql`
✅ **Availability Config** - `src/config/availability.json`
✅ **API Routes:**
   - `/api/availability` - Returns available time slots
   - `/api/bookings` - Creates bookings
   - `/api/sync-blocked-times` - Syncs Google Calendar blocks
✅ **React Calendar Component** - `src/components/BookingCalendar.tsx`
✅ **Integration** - Replaced Cal.com in `/aanvragen` page

---

## Step 1: Run Database Migrations

```bash
# Apply migrations locally (for local testing)
npx wrangler d1 execute knapgemaakt-bookings --local --file=./migrations/0001_initial_schema.sql

# Apply migrations to production
npx wrangler d1 execute knapgemaakt-bookings --remote --file=./migrations/0001_initial_schema.sql
```

**What this creates:**
- `availability_rules` table with Mon-Fri 9-17 default hours
- `bookings` table for user bookings
- `blocked_times` table for Google Calendar sync

---

## Step 2: Test Locally

```bash
# Start development server
npm run dev
```

### Test the Flow:
1. Navigate to `http://localhost:4321/aanvragen`
2. Fill out the form (naam, bedrijfsnaam, telefoon, email, branche, has_website)
3. Calendar should appear when form is complete
4. Click a date in the calendar
5. Available time slots should load
6. Select a time slot (should highlight in acid yellow)
7. Submit the form
8. Should see success message

### Expected Behavior:
- ✅ Calendar shows current month
- ✅ Past dates are disabled (grayed out)
- ✅ Clicking a date fetches slots from `/api/availability`
- ✅ Selecting a slot highlights it
- ✅ Form submission creates booking via `/api/bookings`
- ✅ Success message appears

### Debug if Issues:
```bash
# Check browser console for errors
# Check network tab for API calls

# Test API directly:
curl "http://localhost:4321/api/availability?date=2026-01-20"
```

---

## Step 3: Set Up n8n Workflows

### Workflow 1: Google Calendar → D1 Sync (Every 5 minutes)

**Create new workflow in n8n:**

1. **Schedule Trigger Node**
   - Trigger: Cron
   - Expression: `*/5 * * * *` (every 5 minutes)

2. **Google Calendar Node**
   - Credential: Your service account JSON
   - Operation: Get Many
   - Calendar: Your calendar ID
   - Start Date: `{{ $now.toISO() }}`
   - End Date: `{{ $now.plus({ days: 60 }).toISO() }}`

3. **Code Node** - Transform events:
   ```javascript
   const events = $input.all();

   return events.map(event => {
     const item = event.json;
     return {
       json: {
         id: item.id,
         start_time: item.start.dateTime || item.start.date,
         end_time: item.end.dateTime || item.end.date,
         source: 'google_calendar',
         calendar_event_id: item.id
       }
     };
   });
   ```

4. **HTTP Request Node**
   - Method: POST
   - URL: `https://knapgemaakt.nl/api/sync-blocked-times`
   - Authentication: None
   - Headers: `Authorization: Bearer fc38c4bc174b6bf80b6f1ad63fe601c9f43686e97b51627672e4c971653acce3`
   - Body:
     ```json
     {
       "blocked_times": {{ $json }}
     }
     ```

**Activate this workflow** - It will run every 5 minutes

---

### Workflow 2: Booking → Google Calendar + Email

**Create new webhook workflow:**

1. **Webhook Trigger Node**
   - Method: POST
   - Path: `9adef783-f324-498e-b880-a4aeccff1dd0` (your existing path)
   - Respond: Immediately

2. **Google Calendar Node**
   - Operation: Create
   - Calendar: Your calendar
   - Start: `{{ $json.start_time }}`
   - End: `{{ $json.end_time }}`
   - Summary: `Intro Call - {{ $json.user_name }}`
   - Description:
     ```
     Name: {{ $json.user_name }}
     Company: {{ $json.user_company }}
     Email: {{ $json.user_email }}
     Phone: {{ $json.user_phone }}
     Industry: {{ $json.user_industry }}
     ```

3. **Gmail/Email Node** - Send to user
   - To: `{{ $json.user_email }}`
   - Subject: `Jouw afspraak is bevestigd! 🎉`
   - HTML Body: (Your custom branded template)

4. **Gmail/Email Node** - Send to you
   - To: `your@knapgemaakt.nl`
   - Subject: `Nieuwe afspraak: {{ $json.user_name }}`
   - Body: Booking details

**Test this workflow:**
```bash
curl -X POST https://n8n.summitlab.dev/webhook-test/9adef783-f324-498e-b880-a4aeccff1dd0 \
  -H "Content-Type: application/json" \
  -d '{
    "booking_id": "test-123",
    "user_name": "Test User",
    "user_email": "test@example.com",
    "user_phone": "0612345678",
    "user_company": "Test BV",
    "user_industry": "Tech",
    "start_time": "2026-01-20T10:00:00Z",
    "end_time": "2026-01-20T10:15:00Z"
  }'
```

---

## Step 4: Deploy to Production

### Push to GitHub:
```bash
git add .
git commit -m "feat: implement in-house booking system (#24)"
git push origin feat/24-add-in-house-calendar-booking
```

### Cloudflare Pages will automatically:
- Build your site
- Deploy with D1 bindings
- Use environment variables (N8N_BOOKING_WEBHOOK, API_SECRET_TOKEN)

### Verify deployment:
1. Wait for Cloudflare Pages deployment to complete
2. Visit `https://knapgemaakt.nl/aanvragen`
3. Test the full booking flow
4. Check that n8n receives webhooks
5. Verify Google Calendar event is created
6. Confirm emails are sent

---

## Step 5: Monitor and Test

### Things to Check:
- ✅ Bookings appear in D1 database
- ✅ Google Calendar events are created
- ✅ Confirmation emails are sent
- ✅ Calendar sync runs every 5 minutes
- ✅ Blocked times prevent double booking

### Query bookings in D1:
```bash
# List all bookings
npx wrangler d1 execute knapgemaakt-bookings --remote --command "SELECT * FROM bookings ORDER BY created_at DESC LIMIT 10"

# Check blocked times
npx wrangler d1 execute knapgemaakt-bookings --remote --command "SELECT * FROM blocked_times ORDER BY start_time DESC LIMIT 10"
```

---

## Troubleshooting

### Calendar Not Showing
- Check browser console for errors
- Verify form fields are filled correctly
- Check that `calendar-container` has `hidden` class removed

### No Available Slots
- Check `/api/availability` returns slots
- Verify `availability_rules` table has data
- Check `blocked_times` isn't blocking all slots
- Verify `minAdvanceBooking` (2 hours) isn't too restrictive

### Booking Fails
- Check `/api/bookings` endpoint
- Verify slot isn't already booked
- Check n8n webhook URL is correct in environment variables
- Look at browser network tab for error response

### n8n Not Receiving Webhooks
- Verify `N8N_BOOKING_WEBHOOK` environment variable in Cloudflare Pages
- Check n8n workflow is activated
- Test webhook URL directly with curl
- Check Cloudflare Pages logs for errors

### Google Calendar Sync Not Working
- Verify service account has calendar access
- Check n8n workflow 1 is activated
- Test `/api/sync-blocked-times` endpoint with Bearer token
- Check D1 `blocked_times` table for synced events

---

## Next Steps (Optional Enhancements)

- [ ] Add booking cancellation/rescheduling
- [ ] Add email reminder workflow (24h, 1h before)
- [ ] Create admin dashboard to view bookings
- [ ] Add SMS notifications via Twilio
- [ ] Implement buffer times between bookings
- [ ] Add multiple meeting duration options (15min, 30min, 60min)
- [ ] Track booking analytics

---

## Success!

Your booking system is now live and fully on-brand. No more Cal.com limitations! 🎉
