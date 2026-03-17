

# Capital Protection Assessment — Implementation Plan

## Overview

Build the full Capital Protection Assessment funnel: **Intro → User Info → 8 multi-step question sections → AI-generated report → Voice Agent (Daisy) auto-popup**. Follows existing Founder Pressure Scan patterns closely.

---

## 1. Database Migration

Create `capital_protection_assessments` table:
- `id` (uuid, PK), `created_at` (timestamptz)
- `full_name`, `company`, `role`, `country`, `email`, `phone` (text fields)
- `situation_types` (text[]), `capital_exposure` (text), `timeline` (text)
- `evidence_types` (text[]), `jurisdictions` (text[]), `legal_status` (text)
- `objective` (text), `situation_summary` (text), `consent_review` (boolean)
- `recovery_potential` (text), `risk_level` (text), `ai_report` (jsonb)
- RLS: INSERT-only for public (same as other assessment tables)

---

## 2. Assessment Data Layer

### `src/lib/capitalProtectionQuestions.ts`
Define all sections (2–10) from the document as structured data (EN + NL):
- Section 2: Situation Type (multi-select: Fraud, Crypto fraud, Misappropriation, Partner dispute, etc.)
- Section 3: Capital Exposure (single-select: €100K–€500K through €20M+)
- Section 4: Timeline (single-select)
- Section 5: Evidence (multi-select)
- Section 6: Jurisdictions (3 text inputs)
- Section 7: Legal Status (single-select)
- Section 8: Objective (single-select)
- Section 9: Situation Summary (open text)
- Section 10: Strategic Review Consent (Yes/No)

### `src/lib/capitalProtectionScoring.ts`
Calculate "Founder Protection Score" based on weighted factors (exposure amount, evidence count, timeline recency, jurisdiction count, legal status). Produce 3 tiers: **High Recovery Potential**, **Moderate Strategic Complexity**, **Limited Recovery Potential** with corresponding headline/body text from the document.

---

## 3. Frontend Components

All follow existing Founder Scan component patterns:

### `src/components/capital-protection/CapitalProtectionDialog.tsx`
Main dialog orchestrating steps: `intro → userInfo → questions → results`. Handles DB save, GHL webhook, and AI report generation.

### `src/components/capital-protection/CPIntroStep.tsx`
Introduction screen (mirrors `ScanIntroStep`): eyebrow, heading, description bullets, "Start Assessment" CTA.

### `src/components/capital-protection/CPUserInfoStep.tsx`
Section 1: Name, Company, Role (dropdown), Country (dropdown), Email, Phone. Validated with zod (mirrors `ScanGateStep`).

### `src/components/capital-protection/CPQuestionStep.tsx`
Renders sections 2–10 progressively. Handles single-select, multi-select, text inputs, and open text. Progress bar across all steps.

### `src/components/capital-protection/CPResultsStep.tsx`
Displays AI-generated report with: Situation Summary, Strategic Risk Level, Key Risk Indicators, Possible Strategic Paths, Recommended Next Step, Confidentiality Notice, and CTA buttons (Discuss with Daisy + Schedule Case Review). Auto-opens voice agent after 2-second delay.

---

## 4. AI Report Generation — Edge Function

### `supabase/functions/generate-capital-protection-report/index.ts`
Uses Lovable AI (`google/gemini-3-flash-preview`) with tool calling to return structured report:
- `situation_summary`, `risk_level` (High/Moderate/Limited), `risk_indicators[]`, `strategic_paths[]`, `recommended_next_step`, `recovery_potential`

Follows exact same pattern as `generate-assessment-insights`. Add to `config.toml` with `verify_jwt = false`.

---

## 5. Voice Agent Updates

### `src/components/voice/VoiceAgentContext.tsx`
- Add `"capital_protection"` to `VoiceAgentMode` type
- Add optional `cpReport` and `cpUserInfo` fields to `VoiceAgentContextData`

### `src/components/voice/VoiceAgentDialog.tsx`
- Handle `capital_protection` mode: custom title/subtitle, header "Daisy — Capital Protection Advisor"
- On connect, send contextual update with recovery potential, risk level, situation types, exposure amount
- Same conversation flow as daisy_unmasked.txt: acknowledge results → ask if happy → deep discussion → transition to booking with Lionel using `show_calendar` tool → acknowledge booking

---

## 6. GHL Integration

### `supabase/functions/send-to-ghl/index.ts`
Add routing: `audit_type === 'capital_protection'` sends to a dedicated CP webhook URL (or falls through to default GHL_WEBHOOK_URL).

---

## 7. Wire Up in HomeFeaturesGrid

### `src/components/home/HomeFeaturesGrid.tsx`
- Import `CapitalProtectionDialog`
- Add `capitalProtectionOpen` state
- Change Capital Protection CTA (index 2) from opening `BusinessConsultationDialog` to opening the new `CapitalProtectionDialog`
- Render `<CapitalProtectionDialog>` in the dialog section

---

## File Summary

| Action | File |
|--------|------|
| Migration | `capital_protection_assessments` table |
| Create | `src/lib/capitalProtectionQuestions.ts` |
| Create | `src/lib/capitalProtectionScoring.ts` |
| Create | `src/components/capital-protection/CapitalProtectionDialog.tsx` |
| Create | `src/components/capital-protection/CPIntroStep.tsx` |
| Create | `src/components/capital-protection/CPUserInfoStep.tsx` |
| Create | `src/components/capital-protection/CPQuestionStep.tsx` |
| Create | `src/components/capital-protection/CPResultsStep.tsx` |
| Create | `supabase/functions/generate-capital-protection-report/index.ts` |
| Edit | `supabase/config.toml` — add function config |
| Edit | `src/components/voice/VoiceAgentContext.tsx` — add CP mode |
| Edit | `src/components/voice/VoiceAgentDialog.tsx` — handle CP context |
| Edit | `supabase/functions/send-to-ghl/index.ts` — add CP routing |
| Edit | `src/components/home/HomeFeaturesGrid.tsx` — wire up dialog |

