
# Email Follow-Up After Voice Agent Conversation

## What This Does
After a user finishes speaking with the Lionel Path Advisor voice agent, and their information (email, conversation summary, recommended path) is captured, an email will automatically be sent to them with:
- A personalized greeting
- A summary of what was discussed
- Their recommended path with a direct link
- A call-to-action to book a session

## How It Works

The existing `voice-lead-capture` backend function already receives the lead data (email, recommended path, conversation summary) when a conversation ends. We will extend this function to also send a branded HTML email to the lead using the already-configured iCloud email credentials (`ICLOUD_EMAIL` and `ICLOUD_APP_PASSWORD`).

## Implementation Steps

### 1. Create a new backend function: `send-voice-followup-email`
A dedicated function that sends a branded HTML email containing:
- Personalized greeting (using first name if captured, otherwise generic)
- Summary of the conversation topics discussed
- The recommended path (Business, Elite, UNMASKED Dubai, or Leaders Performance Academy) with a direct link to the relevant page
- A CTA button to book a call or explore the recommended service
- Professional footer with Leaders Performance branding

The email will be sent via SMTP using the existing `ICLOUD_EMAIL` and `ICLOUD_APP_PASSWORD` secrets (iCloud SMTP: `smtp.mail.me.com`, port 587).

### 2. Update `voice-lead-capture` function
After saving the lead to the database and sending to GHL, add a call to the new email function — but only when an email address was captured. This keeps the logic clean and modular.

---

## Technical Details

### New file: `supabase/functions/send-voice-followup-email/index.ts`
- Accepts: `{ email, first_name, recommended_path, conversation_summary }`
- Uses Deno's SMTP library (`denomailer`) to send via iCloud SMTP
- Constructs a branded HTML email with gold/dark theme matching the site
- Maps `recommended_path` to a friendly name and URL:
  - `/business` -> "Business Performance" -> `https://leadersperformance.lovable.app/business`
  - `/elite` -> "Elite Coaching" -> `https://leadersperformance.lovable.app/elite`
  - `UNMASKED Dubai` -> stays as-is with homepage link
  - `Leaders Performance Academy` -> stays as-is with homepage link
- Input validation and sanitization (same pattern as existing functions)
- Generic error responses to avoid leaking internals

### Modified file: `supabase/functions/voice-lead-capture/index.ts`
- After the GHL webhook call, invoke the email function internally using `fetch` to the `send-voice-followup-email` endpoint
- Pass email, first_name, recommended_path, and a cleaned-up conversation summary
- Fire-and-forget (don't block the response to the client if the email fails)

### Email Template Structure
```
Subject: "Your Leadership Path — Next Steps from Lionel"

Body:
- Logo / Header with gold accent
- Greeting: "Hi [Name / there],"
- Intro paragraph thanking them for the conversation
- Conversation highlights (cleaned summary)
- Recommended path card with link
- CTA button: "Explore Your Path" or "Book a Session"
- Footer with Leaders Performance branding
```
