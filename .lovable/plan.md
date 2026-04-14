

# Plan: Generate System Overview & Development Brief PDF

## What This Delivers
A professional PDF document (~15-20 pages) covering the full technical architecture of the Leaders Performance platform, suitable for handing to a new developer.

## Document Structure

### 1. Executive Summary
- Platform purpose: lead-gen diagnostic scans for founder coaching/consulting
- Live URLs: leadersperformance.ae, leadersperformance.lovable.app
- Tech stack: React 18 + Vite 5 + TypeScript + Tailwind CSS + Supabase (Lovable Cloud)

### 2. Application Architecture
- **Frontend**: Single-page React app with React Router, lazy-loaded routes
- **Backend**: Supabase (Postgres DB, Edge Functions, Storage)
- **CRM Integration**: GoHighLevel (GHL) API for contact management, email sending, pipeline/opportunity management
- **Voice AI**: ElevenLabs integration via Edge Functions
- **Payments**: Stripe (burnout scan paid tier)
- **i18n**: English + Dutch via LanguageContext

### 3. Route Map
All 15+ routes documented: `/`, `/elite`, `/business`, `/pressurescan`, `/profit-leak-scan`, `/capital-protection`, `/round-table`, `/articles/*`, legal pages

### 4. Diagnostic Scans (Core Feature)
Detailed documentation of all 4 scans:
- **Founder Pressure Scan** (12 questions, 4 dimensions, weighted 0-100)
- **Profit Leak Scan** (15 questions, 5 dimensions, revenue tier selection)
- **Capital Protection Assessment** (multi-step, qualitative + AI report)
- **Corporate Discipline Audit** (7 questions, single score)

Each scan documented with: question count, scoring logic, dimension weights, color tiers, DB table, email flow

### 5. Unified Scoring Engine
- `unifiedScoring.ts` architecture: `DimensionScore`, `DiagnosticOutput`, `BottleneckInfo`
- 5-tier color system: green (0-30), yellow (31-55), orange (56-75), red (76-90), darkred (91-100)
- Weighted score calculation, bottleneck detection

### 6. Database Schema
All 10 tables documented:
- `founders_pressure_scans`, `profit_leak_scans`, `capital_protection_assessments`
- `corporate_discipline_audits`, `discipline_assessments`, `founder_burnout_scans`
- `business_consultations`, `applications`, `articles`
- `scheduled_emails`, `voice_leads`

### 7. Edge Functions (26 functions)
Grouped by purpose:
- **Scan Followup**: `ghl-scan-followup` (main orchestrator), `process-scheduled-emails`
- **Booking**: `ghl-booking` (availability + appointment creation)
- **AI Report Generation**: `generate-*-insights`, `generate-*-report`
- **Voice**: `elevenlabs-voice-token`, `create-elevenlabs-agent`, `voice-lead-capture`
- **CRM**: `send-to-ghl`, `roundtable-followup`
- **Other**: `manage-articles`, `dashboard-api`, `create-burnout-payment`

### 8. GHL Integration & Email Nurture Sequence
- Pipeline: `qFBbAlnrhlBtkM5r9VEZ`, stages: New Lead → Call Booked
- Calendar IDs per scan type
- Email sequence: Instant results → Day 2 nurture → Day 4 (profit leak extra) → Day 5 final → Day 6/8 (profit leak extras)
- Booking flow: confirmation email + cancel nurtures + schedule 24h/1h reminders
- Scheduled email processor (cron-triggered)

### 9. Voice Agent (Daisy)
- ElevenLabs conversational AI
- Context-aware: receives scan scores, user info
- Modes: general, pressure_scan, capital_protection, profit_leak, corporate_audit
- Lead capture via `voice-lead-capture` → GHL webhook

### 10. Environment Variables & Secrets Required
- `GHL_API_KEY`, `GHL_LOCATION_ID`, `GHL_CALENDAR_ID`
- `ELEVENLABS_API_KEY`
- `STRIPE_SECRET_KEY`
- Supabase auto-provided: `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`

### 11. Key Component Map
- Scan dialog pattern: Intro → Questions → Gate (user info) → Analyzing → Results
- Shared components: `ScanBookingCalendar`, `ScanVoiceWidget`, `AnalyzingTransition`
- Page layouts: Home, Elite, Business (each with own navigation/footer)

### 12. Known Technical Debt & Notes
- Some `as any` type casts in DB inserts
- Client-side DB inserts (assessments) could be migrated to edge functions
- Burnout scan has free/paid tiers with Stripe checkout
- `verify_jwt = false` on all edge functions (public lead-gen, no auth)

## Technical Implementation
- Generate using Python `reportlab` with professional styling (navy/gold brand colors matching Leaders Performance)
- Output to `/mnt/documents/Leaders-Performance-System-Overview.pdf`
- Approx 15-20 pages, table of contents, clean typography

