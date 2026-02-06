

## Connect Assessment to GHL Webhook

### Overview
After the assessment is submitted and saved to the database, we'll send the contact data and scores to a GHL webhook so contacts are automatically created in GoHighLevel with all custom field data.

### Approach
Create a new backend function that acts as a proxy to send assessment data to the GHL webhook. This avoids CORS issues (GHL webhooks don't support browser-origin requests) and keeps the webhook URL private.

### Steps

1. **Store the GHL Webhook URL as a secret**
   - Add a secret called `GHL_WEBHOOK_URL` containing your GoHighLevel inbound webhook URL
   - This keeps the URL private and out of client-side code

2. **Create a new backend function: `send-to-ghl`**
   - Receives assessment data (user info, scores, discipline type, language, individual question responses)
   - POSTs it to the GHL webhook URL in the format GHL expects
   - Maps fields to GHL custom field keys:
     - `first_name`, `last_name`, `email`, `country`, `language`
     - `self_discipline_score`, `impulse_control_score`, `consistency_score`, `overall_score`
     - `discipline_type`
     - Individual question responses (q1 through q17)

3. **Update the assessment submission flow**
   - After saving to the database, call the `send-to-ghl` function in parallel with the AI insights call
   - Fire-and-forget: if the GHL call fails, log the error but don't block the user experience

### Technical Details

**Backend function (`supabase/functions/send-to-ghl/index.ts`)**:
- Reads `GHL_WEBHOOK_URL` from environment secrets
- Accepts POST with assessment payload
- Forwards data to GHL webhook as JSON
- Returns success/failure status

**Payload sent to GHL**:
```json
{
  "first_name": "John",
  "last_name": "Doe",
  "email": "john@example.com",
  "country": "NL",
  "language": "nl",
  "self_discipline_score": 72,
  "impulse_control_score": 65,
  "consistency_score": 80,
  "overall_score": 72.3,
  "discipline_type": "The Natural",
  "q1_follow_through": 4,
  "q2_maintain_focus": 3,
  "q3_give_up": 2,
  "q4_resist_pleasure": 4,
  "q8_act_impulse": 3,
  "q9_control_stress": 4,
  "q10_regret_purchases": 2,
  "q15_daily_routines": 5,
  "q16_productivity_varies": 3,
  "q17_bounce_back": 4
}
```

**Modified file: `src/components/assessment/AssessmentDialog.tsx`**:
- Add a `supabase.functions.invoke('send-to-ghl', ...)` call inside `submitAssessment()`, running in parallel with the AI insights call

### What You Need
- Your GHL inbound webhook URL (from your GoHighLevel workflow trigger)
- The custom fields created in GHL matching the field names above

