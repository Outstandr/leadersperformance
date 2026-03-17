

# Capital Protection Assessment — UX Improvements Plan

## Changes Required

### 1. Back Button on Questions (`CPQuestionStep.tsx`)
- Add `onBack` callback prop to `CPQuestionStep` and all sub-components (SingleSelect, MultiSelect, TextInput, MultiTextInput, BooleanSelect)
- Show a "Back" button on every question (hidden on first question)
- Wire `onBack` in `CapitalProtectionDialog.tsx` to decrement `currentQ` (and go back to `userInfo` step if on question 0)

### 2. Professional Results with Traffic-Light Scoring (`CPResultsStep.tsx`)
Major redesign of the results page:
- Add per-section scoring with traffic-light colors (green/orange/red) using progress bars, similar to the Founder Pressure Scan's `SectionBar` pattern
- Score sections: Evidence Strength, Timeline Advantage, Jurisdictional Complexity, Legal Positioning, Capital Exposure — each as 0-100% with a colored bar
- Add an overall "Recovery Potential" gauge (SVG circle like `OverallGauge` in ScanResultsStep)
- Update `capitalProtectionScoring.ts` to return per-section scores (0-100) with colors, not just a single tier

### 3. Auto-Connect Daisy on Results (No Click Required)
- In `CPResultsStep`, instead of waiting 2s then opening the voice agent dialog (which still requires clicking "Start Conversation"), change the flow:
  - Keep the results report visible on the page (don't close the dialog)
  - Open the voice agent as an overlay that auto-connects immediately
- In `VoiceAgentDialog.tsx`, add an `autoConnect` prop. When `true`, skip the idle state and call `startConversation()` automatically on mount
- In `VoiceAgentContext.tsx`, add `autoConnect?: boolean` to the context data

### 4. Report Border Pulsation When Daisy Speaks
- Pass Daisy's `isSpeaking` state back to the results view
- Add a `isSpeaking` boolean to `VoiceAgentContext` that the dialog updates in real-time
- In `CPResultsStep`, read `isSpeaking` from context and apply a pulsating gold border animation when active
- Add a `@keyframes border-pulse` animation in tailwind config

### 5. Direct Link to Capital Protection Scan (`/capital-protection`)
- Add a new route in `App.tsx`: `/capital-protection`
- Create a simple page component that auto-opens the `CapitalProtectionDialog` on mount (or renders it inline)

---

## File Summary

| Action | File |
|--------|------|
| Edit | `src/lib/capitalProtectionScoring.ts` — add per-section scores (0-100) with traffic-light colors |
| Edit | `src/components/capital-protection/CPQuestionStep.tsx` — add back button |
| Edit | `src/components/capital-protection/CapitalProtectionDialog.tsx` — wire back navigation, pass speaking state |
| Edit | `src/components/capital-protection/CPResultsStep.tsx` — full redesign with gauges, bars, pulsating border |
| Edit | `src/components/voice/VoiceAgentContext.tsx` — add `autoConnect` and `isSpeaking` to context |
| Edit | `src/components/voice/VoiceAgentDialog.tsx` — auto-connect logic, expose `isSpeaking` |
| Edit | `tailwind.config.ts` — add border-pulse keyframe |
| Create | `src/pages/CapitalProtection.tsx` — standalone page with auto-open dialog |
| Edit | `src/App.tsx` — add `/capital-protection` route |

