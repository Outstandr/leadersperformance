

## Updated Plan: Availability System with iCloud Calendar Sync

### The Gap You Identified

The original plan only tracks bookings made through the website. But Lionel has existing appointments on his iCloud calendar (personal meetings, other commitments) that should also block time slots. Without syncing those, the website could still offer times when Lionel is busy.

### Updated Architecture

```text
┌──────────────────────────────────────┐
│  iCloud Calendar (source of truth)   │
│  - Website bookings (already synced) │
│  - Manual appointments               │
│  - External meetings                 │
└──────────────┬───────────────────────┘
               │ CalDAV REPORT query
               │ (fetches events for date range)
               ▼
┌──────────────────────────────────────┐
│  Edge Function: check-availability   │
│  1. Query iCloud via CalDAV REPORT   │
│     for all events on requested date │
│  2. Parse VEVENT start/end times     │
│  3. Return blocked time ranges       │
└──────────────┬───────────────────────┘
               │
               ▼
┌──────────────────────────────────────┐
│  Frontend: useBookedSlots hook       │
│  - Calls check-availability on       │
│    date selection                    │
│  - Disables occupied time slots      │
│  - Works in all 3 booking dialogs   │
└──────────────────────────────────────┘
```

### Why iCloud-First Instead of a Database Table

Since we already have CalDAV credentials and the `create-calendar-event` function already discovers Lionel's calendar, we can **query the same calendar directly** for existing events. This means:

- No need for a `booked_slots` database table
- No need to keep two systems in sync
- Manually added appointments on iCloud automatically block slots
- Appointments from any source (phone, other apps) are respected
- Single source of truth: Lionel's iCloud calendar

### Implementation Steps

#### 1. Create Edge Function: `check-availability`

A new backend function that:
- Accepts a `date` parameter (YYYY-MM-DD)
- Reuses the CalDAV discovery logic from `create-calendar-event` (steps 1-3) to find the target calendar
- Sends a CalDAV `REPORT` request with a `calendar-query` filter for the given date range
- Parses returned VEVENT blocks to extract DTSTART/DTEND times
- Converts those into blocked time slot strings (e.g., "09:00 AM", "10:00 AM")
- Returns the list of unavailable slots
- Caches nothing — always queries live calendar data

#### 2. Create Shared React Hook: `useBookedSlots`

- Takes a `Date | null` as input
- When the date changes, calls `check-availability` with that date
- Returns `{ bookedSlots: Set<string>, isLoading: boolean }`
- Debounces to avoid excessive calls on rapid date changes

#### 3. Update All 3 Booking Dialogs

**UnmaskedBookingDialog** — uses slots like `"10:00"`, `"15:00"` (24h values):
- Import `useBookedSlots`, pass selected date
- Disable time slot buttons where the value appears in the booked set
- Show "Unavailable" label on disabled slots

**BusinessConsultationDialog** — uses slots like `"09:00 AM"`, `"03:30 PM"`:
- Same integration pattern
- The edge function will return slots in both 12h and 24h format for compatibility

**MentorshipApplicationDialog** — same slot format as Business:
- Same integration pattern

### Technical Details

**CalDAV REPORT Query** (the core of `check-availability`):
```xml
<c:calendar-query xmlns:d="DAV:" xmlns:c="urn:ietf:params:xml:ns:caldav">
  <d:prop>
    <d:getetag/>
    <c:calendar-data/>
  </d:prop>
  <c:filter>
    <c:comp-filter name="VCALENDAR">
      <c:comp-filter name="VEVENT">
        <c:time-range start="20260225T000000Z" end="20260226T000000Z"/>
      </c:comp-filter>
    </c:comp-filter>
  </c:filter>
</c:calendar-query>
```

This returns all events on the requested date. The function then parses each VEVENT's DTSTART/DTEND to determine which 30-min slots are blocked.

**Slot Blocking Logic**: If an event runs from 10:00-11:30, the function marks "10:00 AM", "10:30 AM", and "11:00 AM" as unavailable — any slot whose start time falls within the event's duration is blocked.

**Time Zone Handling**: All times are in Asia/Dubai (GST, UTC+4), matching the existing calendar event creation. The CalDAV query uses UTC boundaries for the date filter, then parses returned times in Dubai timezone.

### Files to Create
- `supabase/functions/check-availability/index.ts` — CalDAV query + slot parsing
- `src/hooks/useBookedSlots.ts` — shared React hook

### Files to Modify
- `src/components/home/BusinessConsultationDialog.tsx` — integrate hook, disable taken slots
- `src/components/home/MentorshipApplicationDialog.tsx` — integrate hook, disable taken slots
- `src/components/home/UnmaskedBookingDialog.tsx` — integrate hook, disable taken slots
- `supabase/config.toml` — register new function with `verify_jwt = false`

### No Database Changes Needed

This approach eliminates the need for the `booked_slots` table entirely. The iCloud calendar is the single source of truth — every booking the website creates is already written there, and any appointment Lionel adds manually is automatically respected.

