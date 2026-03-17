

## Plan: Embedded Daisy Voice Widget + Calendar Booking via Voice Command

### Problem
1. Daisy opens as a fullscreen overlay dialog, blocking the report view
2. User must click "Start Conversation" manually — no seamless experience
3. No way for Daisy to trigger a booking calendar during conversation
4. "Open Daisy" button adds friction

### Architecture

```text
┌─────────────────────────────────────────────┐
│  Capital Protection Results Page            │
│                                             │
│  ┌────────────────────────────────────────┐  │
│  │  Report Content (scrollable)          │  │
│  │  - Gauge, scores, AI report, etc.     │  │
│  └────────────────────────────────────────┘  │
│                                             │
│  ┌────────────────────────────────────────┐  │
│  │  Embedded Daisy Widget (fixed bottom)  │  │
│  │  ┌─────────┐ ┌──────────────────────┐ │  │
│  │  │ Mic Btn │ │ Status + Transcript  │ │  │
│  │  └─────────┘ └──────────────────────┘ │  │
│  │                                        │  │
│  │  ┌──────────────────────────────────┐  │  │
│  │  │ Inline Calendar (when triggered) │  │  │
│  │  │ Date picker + Time slots + Book  │  │  │
│  │  └──────────────────────────────────┘  │  │
│  └────────────────────────────────────────┘  │
└─────────────────────────────────────────────┘
```

### Implementation Steps

#### 1. Create Embedded Voice Widget: `src/components/capital-protection/CPVoiceWidget.tsx`

A compact, inline voice widget (not an overlay) that:
- Uses `useConversation` from `@elevenlabs/react` directly (not through VoiceAgentDialog)
- On mount, shows a single prominent "Tap to speak with Daisy" button (required for browser mic permission)
- Once tapped: requests mic, fetches signed URL, starts session — all in one action
- Displays speaking/listening state with audio visualizer bars
- Shows scrollable transcript inline
- Registers a `show_calendar` **client tool** on the ElevenLabs conversation so Daisy can trigger the booking calendar
- Syncs `isSpeaking` to the VoiceAgentContext for the gold border pulse effect
- No close button that hides Daisy — she stays visible throughout

#### 2. Create Inline Booking Calendar: `src/components/capital-protection/CPBookingCalendar.tsx`

An inline calendar component that appears within the voice widget when Daisy calls `show_calendar`:
- Uses the existing `Calendar` UI component for date picking
- Uses `useBookedSlots` hook to fetch GHL availability
- Displays available time slots (10:00-17:00, same as other booking flows)
- Blocks weekends (Saturday/Sunday)
- Pre-fills user info from assessment (name, email, phone) — no form needed
- On slot selection, books via `ghl-booking` edge function POST with `bookingType: "Capital Protection"`
- Shows confirmation state after successful booking
- Daisy receives a callback via the client tool return value confirming the booking

#### 3. Update ElevenLabs Agent Config

In `supabase/functions/elevenlabs-voice-token/index.ts`, update the system prompt to include:
- Instruction that Daisy can call `show_calendar` when the user expresses interest in booking
- Context that the calendar will appear inline on their screen
- No need to collect user details for booking (already captured in assessment)

#### 4. Update Results Page: `src/pages/CapitalProtection.tsx`

- Remove the `openVoiceAgent` call and all references to the global VoiceAgentDialog
- Instead, render `CPVoiceWidget` directly below the report content
- Pass assessment data (userInfo, result, aiReport) to the widget for Daisy's context
- Add bottom padding to account for the fixed widget

#### 5. Update Results Component: `src/components/capital-protection/CPResultsStep.tsx`

- Remove the "Daisy AI Advisor Banner" section entirely
- Remove the "Open Daisy" button
- Remove the "Schedule Case Review" external link button (replaced by Daisy-triggered calendar)
- Keep only the report content and close button
- Add bottom margin/padding for the embedded widget

#### 6. Skip Global VoiceAgentDialog for Capital Protection Route

In `src/App.tsx`, the global `VoiceAgentDialog` will still render but won't be triggered for capital protection mode since we no longer call `openVoiceAgent`. No changes needed to App.tsx.

### Technical Details

**Client Tool Registration** (ElevenLabs `useConversation`):
```tsx
const conversation = useConversation({
  clientTools: {
    show_calendar: async (params) => {
      setShowCalendar(true);
      return "Calendar is now visible on the user's screen. Ask them to pick a date and time.";
    },
  },
  // ... other handlers
});
```

Note: The `show_calendar` tool must also be configured in the ElevenLabs dashboard for the agent. The system prompt update will instruct Daisy when to use it.

**Mic Permission Flow**: Browser security requires a user gesture. The widget shows one clear "Tap to speak with Daisy about your results" button. One tap = mic request + connect. No multi-step process.

**Calendar Booking Flow**: Uses the existing `ghl-booking` edge function (POST) with the user's pre-filled info. The `GHL_CALENDAR_ID` secret is used for the Special Situations calendar.

### Files to Create
- `src/components/capital-protection/CPVoiceWidget.tsx` — embedded voice widget with client tools
- `src/components/capital-protection/CPBookingCalendar.tsx` — inline GHL-connected calendar

### Files to Modify
- `src/pages/CapitalProtection.tsx` — render embedded widget, remove global voice agent usage
- `src/components/capital-protection/CPResultsStep.tsx` — strip Daisy banner/buttons, simplify to report only
- `supabase/functions/elevenlabs-voice-token/index.ts` — update Daisy's system prompt with `show_calendar` tool instruction and capital protection booking guidance

