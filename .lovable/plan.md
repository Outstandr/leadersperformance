

## Implementation Instructions for Unmasked Website — Scan Email & GHL Workflow

Copy-paste these instructions into your Unmasked project to replicate the exact scan email flow from Leaders Performance.

---

### Architecture Overview

```text
User completes scan → Results shown + Daisy widget
  ├─ Instant: GHL contact upsert + opportunity created + Results Email sent
  ├─ If NO booking: Day 2 nurture + Day 5 nurture scheduled
  └─ If BOOKING (via Daisy/Calendar):
       ├─ Booking confirmation email sent
       ├─ Nurture emails cancelled
       └─ 24h + 1h reminders scheduled
```

---

### Step 1: Database Table — `scheduled_emails`

Create this table in your backend:

```sql
CREATE TABLE public.scheduled_emails (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  contact_id TEXT NOT NULL,
  contact_email TEXT NOT NULL,
  email_type TEXT NOT NULL,
  subject TEXT NOT NULL,
  html_body TEXT NOT NULL,
  send_at TIMESTAMPTZ NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending',
  sent_at TIMESTAMPTZ,
  scan_type TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE public.scheduled_emails ENABLE ROW LEVEL SECURITY;
```

Enable `pg_cron` and `pg_net` extensions.

---

### Step 2: Edge Function — `ghl-scan-followup`

This is the core function. It handles:
- Contact upsert in GHL
- Opportunity creation in pipeline
- Sending results email (immediate)
- Scheduling nurture Day 2 + Day 5 emails
- On booking update: sending booking confirmation, cancelling nurture, scheduling 24h/1h reminders

**Configuration to update for Unmasked:**

```typescript
// Update these constants for your GHL location
const PIPELINE_ID = 'YOUR_PIPELINE_ID';
const STAGE_NEW_LEAD = 'YOUR_NEW_LEAD_STAGE_ID';
const STAGE_CALL_BOOKED = 'YOUR_CALL_BOOKED_STAGE_ID';

const CALENDAR_MAP: Record<string, string> = {
  founder_pressure_scan: 'YOUR_FOUNDER_CALENDAR_ID',
  profit_leak_scan: 'YOUR_PROFIT_LEAK_CALENDAR_ID',
};

const SESSION_NAMES: Record<string, string> = {
  founder_pressure_scan: 'Founder Intervention Session',
  profit_leak_scan: 'Revenue Architecture Session',
};
```

**Key functions inside the edge function:**

1. `upsertContact(payload)` — Creates/updates contact in GHL with custom fields (scores, bottleneck, etc.) and tags
2. `createOpportunity(contactId, payload)` — Creates pipeline opportunity in correct stage
3. `sendEmail(contactId, subject, html)` — Sends via GHL Conversations API from `Lionel Eersteling <info@leadersperformance.ae>`
4. `buildResultsEmailHTML(payload)` — Scan-specific results email with score block, dimension bars, bottleneck callout, booking CTA
5. `buildBookingConfirmationHTML(payload)` — Session confirmed email with date/time details
6. `buildReminderHTML(payload, timeframe)` — 24h and 1h reminder emails
7. `buildNurtureDay2HTML(payload)` — "The Pattern Behind Your Score" (founder) / "The Revenue You're Leaving Behind" (profit leak)
8. `buildNurtureDay5HTML(payload)` — "What This Is Actually Costing You" with bullet list of costs

**Main handler logic (3 paths):**

```
if (booking_update && booked):
  → Send booking confirmation
  → Cancel pending nurture emails
  → Schedule 24h + 1h reminders

else if (booked — initial submission with booking):
  → Send booking confirmation
  → Schedule 24h + 1h reminders

else (no booking — Path A):
  → Send results email
  → Schedule Day 2 nurture (2 days later)
  → Schedule Day 5 nurture (5 days later)
```

---

### Step 3: Edge Function — `process-scheduled-emails`

Cron job that runs every 5 minutes. Fetches pending emails where `send_at <= now()`, sends each via GHL Conversations API. Before sending nurture emails, checks if contact has since booked (has reminder entries) — if so, marks nurture as `skipped`.

**Cron setup (run via SQL, not migration):**

```sql
SELECT cron.schedule(
  'process-scheduled-emails',
  '*/5 * * * *',
  $$
  SELECT net.http_post(
    url:='https://YOUR-PROJECT-REF.supabase.co/functions/v1/process-scheduled-emails',
    headers:='{"Content-Type": "application/json", "Authorization": "Bearer YOUR_ANON_KEY"}'::jsonb,
    body:='{"time": "now"}'::jsonb
  ) as request_id;
  $$
);
```

---

### Step 4: Edge Function — `ghl-booking`

Handles calendar availability checks (GET) and appointment booking (POST). On booking:
1. Upserts contact in GHL
2. Re-checks slot availability (race condition prevention)
3. Creates appointment via GHL Calendar API
4. Creates pipeline opportunity in "Strategy Call Booked" stage

---

### Step 5: Frontend — Scan Completion Flow

When the user completes a scan and submits their info:

```typescript
// 1. Calculate scores
const result = calculatePressureScores(responses, language);

// 2. Build webhook payload
const webhookPayload = {
  first_name: firstName,
  last_name: lastName,
  email: info.email,
  phone: info.phone,
  company: info.company,
  fps_score: result.overall,
  tier: result.title,
  audit_type: "founder_pressure_scan",
  language,
  decision_pressure_score: result.sections[0]?.score,
  founder_dependency_score: result.sections[1]?.score,
  leadership_alignment_score: result.sections[2]?.score,
  execution_momentum_score: result.sections[3]?.score,
  primary_bottleneck: result.sections.reduce((a, b) => a.score > b.score ? a : b).sectionLabel,
  booked: false,
};

// 3. Fire immediately (sends results email + schedules nurture)
supabase.functions.invoke("ghl-scan-followup", { body: webhookPayload });

// 4. Show results + Daisy widget
setStep("results");
```

---

### Step 6: Frontend — ScanVoiceWidget (Daisy + Booking)

The results page includes a Daisy voice widget with an embedded booking calendar. Key behavior:

- Daisy auto-connects on results page load
- Calendar opens via tool call from Daisy
- When user books via calendar, a **booking update** webhook fires:

```typescript
const bookingUpdatePayload = {
  ...webhookPayload,
  booked: true,
  booking_update: true,
  booking_date: bookingDetails.date,
  booking_time: bookingDetails.time,
};

supabase.functions.invoke("ghl-scan-followup", { body: bookingUpdatePayload });
```

- If Daisy disconnects without booking, **no additional webhook fires** (results email was already sent on scan completion)
- 10-minute timeout as safety net

---

### Step 7: Secrets Required

Add these secrets to your edge function environment:
- `GHL_API_KEY` — Your GHL API key (pit-...)
- `GHL_LOCATION_ID` — Your GHL location ID (pP8zZxtNvTuN3UqadKCp or your Unmasked location)
- `GHL_CALENDAR_ID` — Default calendar ID (fallback)

---

### Step 8: Email Design System

All emails use:
- **Outer background**: `#F5F0EB` (cream)
- **Header/Footer**: `#1a1a1a` (dark) with `#8B7355` (gold) accent text
- **Typography**: Georgia serif
- **Brand header**: "LEADERS PERFORMANCE" (or "UNMASKED" for your site)
- **Sender**: `Lionel Eersteling <info@leadersperformance.ae>`
- **No emojis in email copy** (clean, professional)

---

### Step 9: Subject Lines

**Founder Pressure Scan:**
- Results: `Your Founder Pressure Score: {score}`
- Day 2: `The Pattern Behind Your Score, {firstName}`
- Day 5: `What This Is Actually Costing You`
- Booking: `Your Founder Intervention Session Is Confirmed`
- 24h: `Tomorrow: Your Session with Lionel Eersteling`
- 1h: `Starting in 60 Minutes — Your Session with Lionel`

**Profit Leak Scan:**
- Results: `Your Revenue Architecture Score: {score}`
- Day 2: `The Revenue You're Leaving Behind, {firstName}`
- Day 5: `What This Is Actually Costing You`
- Booking: `Your Revenue Architecture Session Is Confirmed`
- 24h/1h: Same as above

---

### Step 10: Config

In `supabase/config.toml`, add:

```toml
[functions.ghl-scan-followup]
verify_jwt = false

[functions.ghl-booking]
verify_jwt = false

[functions.process-scheduled-emails]
verify_jwt = false
```

---

### Files to Create/Copy

| File | Purpose |
|------|---------|
| `supabase/functions/ghl-scan-followup/index.ts` | Core email + GHL integration (664 lines) |
| `supabase/functions/ghl-booking/index.ts` | Calendar availability + booking (266 lines) |
| `supabase/functions/process-scheduled-emails/index.ts` | Cron email processor (119 lines) |
| `src/components/shared/ScanVoiceWidget.tsx` | Daisy widget with booking calendar |
| `src/components/shared/ScanBookingCalendar.tsx` | Booking calendar component |

