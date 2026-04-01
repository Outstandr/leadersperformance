

## Remove "Burnout" / "FBR" Terminology — Implementation Plan

Replace all user-facing and internal references to "burnout" and "FBR" with "Founder Pressure" and "FPS" (Founder Pressure Score) across 8 files.

---

### Files & Changes

**1. `src/lib/burnoutScoring.ts`** — Core scoring logic
- Rename types: `BurnoutFreeResult` → `PressureFreeResult`, `BurnoutFullResult` → `PressureFullResult`, `BurnoutPhase` → `PressurePhase`
- Rename variables: `fbrScore` → `fpsScore`, `fbrColor` → `fpsColor`, `fbrLabel` → `fpsLabel`
- Rename constants: `FBR_LABELS` → `FPS_LABELS`, `getFBRCategory` → `getFPSCategory`
- Rename functions: `calculateFreeBurnoutScore` → `calculateFreePressureScore`, `calculateFullBurnoutScore` → `calculateFullPressureScore`
- Replace text: "High Burnout Risk" → "High Pressure Risk", "Hoog Burnout Risico" → "Hoog Drukrisico", "burnout risk" → "pressure risk" in all diagnosis/recommendation strings, "Functional Burnout" → "Functional Overload", "burnout-risico" → "drukrisico"

**2. `src/components/burnout-scan/BurnoutIntroStep.tsx`**
- "Instant FBR Score" → "Instant Founder Pressure Score" (EN)
- "Directe FBR Score" → "Directe Founder Pressure Score" (NL)

**3. `src/components/burnout-scan/BurnoutFreeResultsStep.tsx`**
- Update import to `PressureFreeResult`
- All `fbrScore` → `fpsScore`, `fbrColor` → `fpsColor`, `fbrLabel` → `fpsLabel`
- "significant burnout risk" → "significant pressure risk" (EN + NL)
- `mode="burnout_scan"` stays (internal key, matches edge function routing)
- `bookingType="Founder Burnout Intervention"` → `"Founder Pressure Intervention"`

**4. `src/components/burnout-scan/BurnoutFullResultsStep.tsx`**
- Update import to `PressureFullResult`
- All `fbrScore` → `fpsScore`, `fbrColor` → `fpsColor`, `fbrLabel` → `fpsLabel`
- "burnout risk level" → "pressure risk level", "burnout-risiconiveau" → "drukniveau"
- "Burnout Phase" → "Pressure Phase", "Burnout Fase" → "Drukfase"
- `bookingType="Founder Burnout Intervention"` → `"Founder Pressure Intervention"`
- `mode="burnout_scan"` stays unchanged

**5. `src/pages/BurnoutScan.tsx`**
- Update imports to new function/type names
- GHL payload (free): `audit_type: "founder_pressure_diagnostic"`, `fps_score`, `fps_color` (replacing `free_fbr_score`, `free_fbr_color`)
- GHL payload (full): `audit_type: "founder_pressure_full"`, `fps_score`, `fps_color`, `pressure_phase` (replacing `fbr_score`, `fbr_color`, `burnout_phase`)
- DB column names stay as-is (`free_fbr_score`, `full_fbr_color`, etc.) — internal, auto-generated types

**6. `supabase/functions/send-to-ghl/index.ts`**
- Add routing for `founder_pressure_diagnostic` and `founder_pressure_full` → same webhook as existing burnout routes
- Keep old `founder_burnout_scan` / `founder_burnout_full` as backward-compatible fallbacks

**7. `supabase/functions/elevenlabs-voice-token/index.ts`**
- Rename type `BurnoutScanContext` → `PressureDiagnosticContext`
- Update `fbrScore` → `fpsScore`, `fbrColor` → `fpsColor` in the type
- `formatBurnoutScanSnapshot` → `formatPressureDiagnosticSnapshot`: replace "FOUNDER BURNOUT DIAGNOSTIC" → "FOUNDER PRESSURE DIAGNOSTIC", "Founder Burnout Risk Score" → "Founder Pressure Score", "FBR Color" → "FPS Color", "Burnout Phase" → "Pressure Phase"
- Navigation mode text: "Founder Burnout Scan" → "Founder Pressure Scan"
- Update `determineEscalation` call to use `fpsScore`
- LEVEL 3 description: "burnout signals" → "pressure overload signals"

**8. `supabase/functions/generate-burnout-report/index.ts`**
- Replace all prompt text: "burnout diagnostician" → "pressure diagnostician", "Burnout Risk Score" → "Founder Pressure Score", "Burnout Phase" → "Pressure Phase", "Founder Burnout Diagnostic Report" → "Founder Pressure Diagnostic Report"
- Variable names in destructuring: `fbrScore` → `fpsScore`, `fbrColor` → `fpsColor`

---

### What Does NOT Change
- File names (cosmetic, no functional impact)
- Database column names (auto-generated types)
- Internal mode key `burnout_scan` (routing identifier)
- Webhook URLs

### GHL Action Required After Deploy
Update custom fields in GHL: `fbr_score` → `fps_score`, `fbr_color` → `fps_color`, `free_fbr_score` → `fps_score`, `burnout_phase` → `pressure_phase`, and workflow triggers for new `audit_type` values.

