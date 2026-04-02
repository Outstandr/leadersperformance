

## Direct GHL API Email & Pipeline Integration

### Problem
GHL webhook automations are unreliable — booking confirmations, results emails, and nurture sequences are not triggering properly. Instead of depending on GHL's automation engine, we'll use the GHL API directly to send emails and manage pipeline stages from our edge functions.

### Architecture

```text
User completes scan
       │
       ▼
 ScanVoiceWidget fires webhook
       │
       ▼
 ghl-scan-followup Edge Function
       │
       ├── Upsert contact (GHL API)
       ├── Add to pipeline stage (GHL Opportunities API)
       ├── Set custom fields (scores, bottleneck, etc.)
       │
       ├─── IF booked = true:
       │     ├── Send booking confirmation email (GHL Conversations API)
       │     ├── Schedule 24h reminder (stored in DB, triggered by cron)
       │     └── Schedule 1h reminder (stored in DB, triggered by cron)
       │
       └─── IF booked = false:
             ├── Send results email immediately (GHL Conversations API)
             ├── Schedule Day 2 nurture email
             └── Schedule Day 5 nurture email
```

### What Gets Built

**1. New DB table: `scheduled_emails`**
Stores scheduled emails (reminders & nurture) with send_at timestamp, status, and full HTML content.

**2. New Edge Function: `ghl-scan-followup`**
Replaces the `send-to-ghl` webhook. On each scan completion:
- Upserts contact in GHL via API with all custom fields
- Creates/moves opportunity in pipeline `qFBbAlnrhlBtkM5r9VEZ`
- Sends immediate email (results or booking confirmation) via GHL Conversations API
- Inserts scheduled follow-up emails into `scheduled_emails` table

**3. New Edge Function: `process-scheduled-emails`**
Cron job (every 5 min) that:
- Queries `scheduled_emails` where `send_at <= now()` and `status = 'pending'`
- Sends each via GHL Conversations API
- Marks as `sent` or `failed`
- For bookers: checks if `booked` tag exists before sending nurture (skip if they booked after scan)

**4. Update `ScanVoiceWidget.tsx`**
Change from calling `send-to-ghl` to calling `ghl-scan-followup`.

**5. Update calendar IDs across all scan results components:**
- Founder Pressure: `uebxQpVIy9vX7tR5rL9E`
- Profit Leak: `tmX5oPSkDICqFhIxPIo9`
- Capital Protection: `dxDvJ7TY6uSjcl1loyov`
- Corporate Audit: `4NM4rNbMCZ024q4rlSTP`

**6. Update `ghl-booking` Edge Function**
Use new calendar IDs and add pipeline stage update on booking.

### Email Content (all sent from Lionel Eersteling / info@leadersperformance.ae)

**Path A — Non-Bookers (4 emails total):**
1. Immediate: Results email (score, bottleneck, dimension bars, booking CTA)
2. Day 2: "The Pattern" — structural pressure narrative
3. Day 5: "The Cost" — hidden cost of inaction

**Path B — Bookers (3 emails total):**
1. Immediate: Booking confirmation with date/time + prep steps
2. 24h before: Reminder
3. 1h before: Final reminder

All HTML follows the existing cream/gold/Georgia design system already built.

### Pipeline Stages
The edge function will create an opportunity in the "Mid ticket inbound sales funnel" pipeline (`qFBbAlnrhlBtkM5r9VEZ`). We'll need the stage IDs — I'll fetch them via the GHL API during implementation.

### GHL API Key
Store `pit-b8540e7a-ca19-4cb9-bf82-9f6578209bd9` as a secret (replacing existing `GHL_API_KEY`).

### Technical Details

**GHL Conversations API email send:**
```
POST /conversations/messages
{
  "type": "Email",
  "contactId": "<id>",
  "subject": "...",
  "html": "<full HTML>",
  "emailFrom": "Lionel Eersteling <info@leadersperformance.ae>"
}
```

**GHL Opportunities API:**
```
POST /opportunities/
{
  "pipelineId": "qFBbAlnrhlBtkM5r9VEZ",
  "stageId": "<stage_id>",
  "contactId": "<id>",
  "name": "FPS - John Doe",
  "status": "open"
}
```

### Files Changed
- `supabase/functions/ghl-scan-followup/index.ts` — new
- `supabase/functions/process-scheduled-emails/index.ts` — new
- `supabase/functions/ghl-booking/index.ts` — update calendar IDs + pipeline
- `src/components/shared/ScanVoiceWidget.tsx` — call new function
- `src/components/founder-scan/ScanResultsStep.tsx` — update calendar ID
- `src/components/profit-leak/ProfitLeakResultsStep.tsx` — update calendar ID
- `src/components/corporate-audit/AuditResultsStep.tsx` — update calendar ID
- `src/components/capital-protection/ProtectionResultsStep.tsx` — update calendar ID
- New migration: `scheduled_emails` table
- Secret update: `GHL_API_KEY`

