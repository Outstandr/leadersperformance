

# Plan: Auto-Connect Daisy with Inline Booking for Founder Pressure Scan & Corporate Audit

## Summary

Replicate the Capital Protection flow (embedded voice widget with auto-connect + inline booking calendar) for both the Founder Pressure Scan and Corporate Discipline Audit. Uses a **new GHL Calendar ID** (`Se3SwkYLXfuW52O0F4GX`) for these two flows.

## Architecture

The Capital Protection page (`/capital-protection`) already does this:
1. Dialog collects answers → computes results → calls `onResultsReady` → closes dialog
2. Parent page renders results + sticky `CPVoiceWidget` at bottom
3. Widget has "Tap to speak" → connects Daisy → `show_calendar` tool → inline `CPBookingCalendar`

For the Founder Scan and Corporate Audit, the flow is different: they're triggered from **multiple parent components** (hero sections, booking sections, CTAs) via dialogs — not standalone pages. So instead of extracting results to a parent page, the voice widget will be **embedded directly inside the results step of the dialog**.

## Changes

### 1. Create `src/components/shared/ScanBookingCalendar.tsx`
- Reusable booking calendar (adapted from `CPBookingCalendar`)
- Accepts generic `userInfo: { fullName: string; email: string; phone: string }` and `bookingType: string`
- Uses the **new calendar ID** by calling a new variant of `ghl-booking` that accepts a `calendarId` parameter, OR we store the new calendar ID as a new secret
- Actually: simplest approach is to pass `calendarId` as a query param to `ghl-booking` edge function, with the new ID hardcoded in the widget

### 2. Create `src/components/shared/ScanVoiceWidget.tsx`
- Generic embedded voice widget (modeled on `CPVoiceWidget`)
- Props: `mode: 'pressure_scan' | 'corporate_audit'`, `userInfo`, `scores`, `calendarId`
- Has `show_calendar` client tool → toggles `ScanBookingCalendar`
- "Tap to speak" button → connects to Daisy via POST to `elevenlabs-voice-token`
- Sends full context (scores, dimensions, bottleneck, diagnosis) as `scanContext` or `auditContext`
- On booking complete → notifies Daisy → ends session

### 3. Modify `src/components/founder-scan/ScanResultsStep.tsx`
- Remove the "Discuss your report" button that opens VoiceAgentDialog
- Add `<ScanVoiceWidget>` at the bottom of results, passing scan scores and user info
- Remove `useVoiceAgent` import

### 4. Modify `src/components/corporate-audit/AuditResultsStep.tsx`
- Same pattern: remove "Discuss your report" button
- Add `<ScanVoiceWidget mode="corporate_audit">` at the bottom
- Remove `useVoiceAgent` import

### 5. Modify `supabase/functions/ghl-booking/index.ts`
- Accept optional `calendarId` in both GET (query param) and POST (body field)
- If provided, use it instead of `GHL_CALENDAR_ID` env var
- This lets the scan/audit booking use calendar `Se3SwkYLXfuW52O0F4GX` while Capital Protection keeps using the existing one

### 6. Update `supabase/functions/elevenlabs-voice-token/index.ts`
- Add `show_calendar` instruction to the pressure scan and corporate audit snapshots
- Update the prompts to tell Daisy: "You can call show_calendar when they want to book. The recommendation is a Founder Strategy Intervention with Lionel / Business Reset Intervention with Lionel."

### 7. No changes needed to the edge function types/modes
- `pressure_scan` and `corporate_audit` modes already exist in the edge function
- Context types and snapshot formatters already exist

## Files

| File | Action |
|------|--------|
| `src/components/shared/ScanBookingCalendar.tsx` | Create |
| `src/components/shared/ScanVoiceWidget.tsx` | Create |
| `src/components/founder-scan/ScanResultsStep.tsx` | Edit — replace voice button with embedded widget |
| `src/components/corporate-audit/AuditResultsStep.tsx` | Edit — replace voice button with embedded widget |
| `supabase/functions/ghl-booking/index.ts` | Edit — accept optional `calendarId` param |
| `supabase/functions/elevenlabs-voice-token/index.ts` | Edit — add `show_calendar` instructions to scan/audit prompts |

## Booking Calendar ID

- **Capital Protection**: keeps existing `GHL_CALENDAR_ID` secret (`yEeXc4wSr5EOgBt4UEBP`)
- **Founder Pressure Scan & Corporate Audit**: `Se3SwkYLXfuW52O0F4GX` (hardcoded in widget, passed to `ghl-booking`)

