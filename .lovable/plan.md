

## Delayed Webhook Logic for All Scans

Currently only the **Founder Pressure Scan** delays its GHL webhook until Daisy disconnects or a 10-minute timeout. The other three scans fire webhooks immediately on submission. This plan applies the same pattern to all scans.

### Logic
- User completes scan and sees results with Daisy widget
- If user does NOT interact with Daisy: webhook fires after 10 minutes
- If user clicks away / closes dialog: webhook fires immediately
- If user talks to Daisy: webhook fires when call ends (with booking data if applicable)

---

### Changes by Scan

**1. Corporate Discipline Audit** (`CorporateAuditDialog.tsx` + `AuditResultsStep.tsx`)
- Remove the `send-to-ghl` call from `CorporateAuditDialog.tsx` (handleGateSubmit)
- Pass `webhookPayload` prop from `AuditResultsStep` to `ScanVoiceWidget` (same pattern as Founder Pressure Scan)
- Build the payload in `AuditResultsStep` with all audit fields (discipline_score, tier, audit_q1-q7, language)

**2. Profit Leak Scan** (`ProfitLeakScan.tsx` + `ProfitLeakResultsStep.tsx`)
- Remove the `send-to-ghl` call from `ProfitLeakScan.tsx` (handleGateSubmit)
- Pass `webhookPayload` prop from `ProfitLeakResultsStep` to `ScanVoiceWidget`
- Build payload with all profit leak fields (overall_score, growth_phase, primary_bottleneck, revenue_tier, section scores)

**3. Capital Protection** (`CapitalProtectionDialog.tsx` + `ProtectionResultsStep.tsx`)
- Remove the `send-to-ghl` call from `CapitalProtectionDialog.tsx`
- Replace the current CTA (which opens VoiceAgentDialog via context) with an inline `ScanVoiceWidget` in `ProtectionResultsStep`
- Pass `webhookPayload` with all capital protection fields (recovery_potential, risk_level, section scores, situation data)
- Use the capital protection calendar ID (`yEeXc4wSr5EOgBt4UEBP`) — update `ScanVoiceWidget` to accept a custom `calendarId` prop

**4. ScanVoiceWidget update** (`ScanVoiceWidget.tsx`)
- Add optional `calendarId` prop (defaults to current `Se3SwkYLXfuW52O0F4GX`)
- Add `onDialogClose` callback — fires webhook immediately when parent dialog closes without Daisy interaction
- Expose this via a `useEffect` cleanup or an imperative ref

**5. Dialog close = webhook fire**
- For all scan dialogs: when the user closes the dialog (clicks X or outside), if the webhook hasn't fired yet, fire it immediately
- Implement by adding a cleanup effect in `ScanVoiceWidget` that fires the webhook on unmount if not already fired

---

### Technical Detail

The `ScanVoiceWidget` unmount cleanup already has a `clearTimeout` but does NOT fire the webhook. Adding `fireWebhook()` to the cleanup ensures the webhook always fires — either on Daisy disconnect, on timeout, or on dialog close:

```typescript
useEffect(() => {
  return () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    // Fire webhook on unmount if not already fired (user closed dialog)
    if (!webhookFired.current && webhookPayload) {
      fireWebhook();
    }
  };
}, []);
```

### Files Modified
- `src/components/shared/ScanVoiceWidget.tsx` — add calendarId prop, fire on unmount
- `src/components/corporate-audit/CorporateAuditDialog.tsx` — remove send-to-ghl call
- `src/components/corporate-audit/AuditResultsStep.tsx` — add webhookPayload to ScanVoiceWidget
- `src/pages/ProfitLeakScan.tsx` — remove send-to-ghl call
- `src/components/profit-leak/ProfitLeakResultsStep.tsx` — add webhookPayload to ScanVoiceWidget
- `src/components/capital-protection/CapitalProtectionDialog.tsx` — remove send-to-ghl call
- `src/components/capital-protection/ProtectionResultsStep.tsx` — replace voice agent context CTA with inline ScanVoiceWidget + webhookPayload

