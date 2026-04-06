

## Plan: Capital Protection Scan Results Redesign + Revenue Architecture Email Sequence

### Overview
Three parallel workstreams:
1. Redesign the Capital Protection results page to match the premium diagnostic style (like the Founder Pressure Scan)
2. Expand the Profit Leak email nurture sequence from 3 emails (Day 0, Day 2, Day 5) to 5 emails (Day 0, Day 2, Day 4, Day 6, Day 8) with the provided copy
3. Update the Day 0 (Results) email copy for profit_leak_scan

---

### 1. Capital Protection Results Page Redesign

**File: `src/components/capital-protection/CPResultsStep.tsx`**

Complete rewrite to match the Founder Pressure Scan design system:
- Background: `#F6F5F2` (off-white)
- Typography: deep navy `#1C2430`
- Risk colors: Amber `#D97706`, Red `#B91C1C`, Green `#059669`

**Top section:**
- Headline: "Your capital is currently exposed"
- Subtext: "Recovery is possible, but not guaranteed without intervention"

**Score display:**
- "Recovery Probability: X%" with gradient bar (Green → Amber → Red)
- Labels: Strong / Moderate / Limited
- Subtext: "Based on your current legal and structural position"

**Exposure Overview block** (new):
- Capital at risk tier (from assessment data)
- Recovery probability %
- Recovery difficulty (derived from score tiers)

**Primary Diagnosis block** (dark navy):
- "Capital exposure identified — recovery possible"
- 3 reinforcing statements based on the weakest dimension

**Dimension bars** (5 dimensions):
- Evidence Strength, Timeline Advantage, Jurisdictional Simplicity, Legal Positioning, Capital Exposure
- Each with percentage, label (Weak/Moderate/Strong), color-coded bar
- Primary risk dimension highlighted, others dimmed

**AI Report sections** (kept but restyled to match new palette)

**CTA:**
- "Secure your position before exposure increases"
- Subtext: "Private capital protection intervention"

**Return to Homepage button** (matching FPS style)

**File: `src/pages/CapitalProtection.tsx`**
- Update wrapper background to `#F6F5F2` to match results page

---

### 2. Revenue Architecture (Profit Leak) Email Sequence Expansion

**File: `supabase/functions/ghl-scan-followup/index.ts`**

**a) Update Day 0 results email** (profit_leak section in `buildResultsEmailHTML`):
- New intro text matching the provided copy about structural constraints capping revenue
- More confrontational, structural language

**b) Update Day 2 nurture** (`buildNurtureDay2HTML`, profit_leak section):
- New subject: "Why more effort is not fixing your revenue"
- New body copy about conversion capacity vs. effort

**c) Expand to 5-email sequence** — Add 3 new email builder functions:
- `buildNurtureDay4HTML` — "What this is costing you every month" (Exposure)
- `buildNurtureDay6HTML` — "I see this pattern more often than you think" (Authority)  
- `buildNurtureDay8HTML` — "You can keep pushing — or fix what's underneath" (Decision)

**d) Update subject line functions** to handle new email types for profit_leak

**e) Update the main handler** scheduling logic:
- For profit_leak_scan: schedule Day 2, Day 4, Day 6, Day 8 nurture emails
- Other scan types keep the existing Day 2 + Day 5 schedule
- Update cancellation logic to include new email types

**f) Redeploy** the edge function after changes

---

### Technical Details

- The Capital Protection results page currently uses a generic white card design. The redesign follows the exact same component structure as `ScanResultsStep.tsx` but adapted for capital protection context (recovery probability instead of pressure score, exposure framing instead of pressure framing).
- The email sequence expansion requires new `email_type` values (`nurture_day4`, `nurture_day6`, `nurture_day8`) which need to be added to the cancellation query in the booking update handler.
- All emails maintain the existing LP design system (cream background, Georgia serif, charcoal headers with white logo only, no emoji).
- The `process-scheduled-emails` function does not need changes as it processes any pending scheduled email regardless of type.

