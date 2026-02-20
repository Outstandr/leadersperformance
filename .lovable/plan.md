

## Fix: UNMASKED Booking Sending to Wrong Webhook

### Problem
The `unmasked-booking` edge function reads from the shared `GHL_WEBHOOK_URL` secret, which points to the High Performance Coaching funnel. UNMASKED bookings need to go to their own dedicated webhook.

### Solution
Hardcode the correct UNMASKED webhook URL directly in the edge function (same approach used in `submit-business-consultation` which has its webhook hardcoded).

### Change
**File: `supabase/functions/unmasked-booking/index.ts`**
- Replace `Deno.env.get('GHL_WEBHOOK_URL')` on line 12 with the dedicated UNMASKED webhook URL: `https://services.leadconnectorhq.com/hooks/pP8zZxtNvTuN3UqadKCp/webhook-trigger/gxP5ZQ0OvedG47O9s5Rl`
- Remove the `if (!ghlWebhookUrl)` error check since the URL will be hardcoded
- Also add the `summary` field to the calendar event call so it gets tagged as `UNMASKED - {Name}` (currently missing from the payload on line 74)

### Webhook Summary (for reference)
- **High Performance Coaching**: `GHL_WEBHOOK_URL` secret (used by `submit-application`)
- **Business Consultation**: hardcoded in `submit-business-consultation` (`...RkysrTHNhiqHMSQoOXpB`)
- **UNMASKED**: will be hardcoded in `unmasked-booking` (`...gxP5ZQ0OvedG47O9s5Rl`)

