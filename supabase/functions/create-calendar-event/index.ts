const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version',
};

function generateUID(): string {
  return `${Date.now()}-${Math.random().toString(36).substring(2, 11)}@leadersperformance`;
}

function formatICSDate(dateStr: string): string {
  // Convert "2025-03-10T10:00:00" to "20250310T100000"
  return dateStr.replace(/[-:]/g, '').replace('T', 'T').split('.')[0];
}

function buildICSEvent(data: {
  uid: string;
  summary: string;
  description: string;
  dtstart: string;
  dtend: string;
  organizer: string;
  attendeeEmail: string;
  attendeeName: string;
}): string {
  const now = formatICSDate(new Date().toISOString());
  return [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Leaders Performance//UNMASKED Booking//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:REQUEST',
    'BEGIN:VEVENT',
    `UID:${data.uid}`,
    `DTSTAMP:${now}Z`,
    `DTSTART;TZID=Asia/Dubai:${data.dtstart}`,
    `DTEND;TZID=Asia/Dubai:${data.dtend}`,
    `SUMMARY:${data.summary}`,
    `DESCRIPTION:${data.description}`,
    `ORGANIZER;CN=Leaders Performance:mailto:${data.organizer}`,
    `ATTENDEE;CN=${data.attendeeName};RSVP=TRUE:mailto:${data.attendeeEmail}`,
    'STATUS:CONFIRMED',
    'BEGIN:VALARM',
    'TRIGGER:-PT60M',
    'ACTION:DISPLAY',
    'DESCRIPTION:UNMASKED Booking Reminder',
    'END:VALARM',
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n');
}

async function discoverCalendarUrl(email: string, password: string): Promise<string | null> {
  // iCloud CalDAV principal URL
  const principalUrl = `https://caldav.icloud.com/`;

  const auth = btoa(`${email}:${password}`);
  const propfindBody = `<?xml version="1.0" encoding="utf-8"?>
<d:propfind xmlns:d="DAV:" xmlns:c="urn:ietf:params:xml:ns:caldav">
  <d:prop>
    <c:calendar-home-set/>
  </d:prop>
</d:propfind>`;

  try {
    // First discover the user principal
    const wellKnownRes = await fetch('https://caldav.icloud.com/.well-known/caldav', {
      method: 'PROPFIND',
      headers: {
        'Authorization': `Basic ${auth}`,
        'Content-Type': 'application/xml; charset=utf-8',
        'Depth': '0',
      },
      body: propfindBody,
      redirect: 'follow',
    });

    console.log('Well-known response status:', wellKnownRes.status);
    const text = await wellKnownRes.text();
    console.log('Well-known response body:', text.substring(0, 500));

    // Extract calendar-home-set href from response
    const homeSetMatch = text.match(/<[^>]*calendar-home-set[^>]*>.*?<d:href>([^<]+)<\/d:href>/s) ||
                         text.match(/calendar-home-set[\s\S]*?<[^>]*href[^>]*>([^<]+)<\//);
    
    if (homeSetMatch) {
      const calHome = homeSetMatch[1].trim();
      // Build full URL if relative
      const calHomeUrl = calHome.startsWith('http') ? calHome : `https://caldav.icloud.com${calHome}`;
      console.log('Calendar home set:', calHomeUrl);
      return calHomeUrl;
    }

    // Fallback: try to extract from href patterns
    const hrefMatch = text.match(/<d:href>([^<]*calendar[^<]*)<\/d:href>/i) ||
                      text.match(/<href>([^<]*calendar[^<]*)<\/href>/i);
    if (hrefMatch) {
      const href = hrefMatch[1].trim();
      return href.startsWith('http') ? href : `https://caldav.icloud.com${href}`;
    }

    // Fallback URL pattern for iCloud
    console.log('Falling back to default iCloud calendar URL pattern');
    // Extract account ID from PROPFIND response
    const accountMatch = text.match(/\/(\d+)\//);
    if (accountMatch) {
      return `https://caldav.icloud.com/${accountMatch[1]}/calendars/`;
    }

    return null;
  } catch (err) {
    console.error('Error discovering calendar:', err);
    return null;
  }
}

async function findDefaultCalendar(calHomeUrl: string, auth: string): Promise<string | null> {
  const propfindBody = `<?xml version="1.0" encoding="utf-8"?>
<d:propfind xmlns:d="DAV:" xmlns:c="urn:ietf:params:xml:ns:caldav" xmlns:a="http://apple.com/ns/ical/">
  <d:prop>
    <d:resourcetype/>
    <d:displayname/>
    <a:calendar-color/>
    <c:supported-calendar-component-set/>
  </d:prop>
</d:propfind>`;

  try {
    const res = await fetch(calHomeUrl, {
      method: 'PROPFIND',
      headers: {
        'Authorization': `Basic ${auth}`,
        'Content-Type': 'application/xml; charset=utf-8',
        'Depth': '1',
      },
      body: propfindBody,
    });

    const text = await res.text();
    console.log('Calendar list response:', text.substring(0, 1000));

    // Find first calendar href that supports VEVENT
    const hrefMatches = text.matchAll(/<d:href>([^<]+)<\/d:href>/g);
    for (const match of hrefMatches) {
      const href = match[1].trim();
      if (href !== calHomeUrl.replace('https://caldav.icloud.com', '') && href.includes('calendar')) {
        const fullUrl = href.startsWith('http') ? href : `https://caldav.icloud.com${href}`;
        return fullUrl;
      }
    }

    return calHomeUrl;
  } catch (err) {
    console.error('Error finding calendar:', err);
    return calHomeUrl;
  }
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const icloudEmail = Deno.env.get('ICLOUD_EMAIL');
    const icloudPassword = Deno.env.get('ICLOUD_APP_PASSWORD');

    if (!icloudEmail) {
      return new Response(JSON.stringify({ error: 'ICLOUD_EMAIL not configured' }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }
    if (!icloudPassword) {
      return new Response(JSON.stringify({ error: 'ICLOUD_APP_PASSWORD not configured' }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const body = await req.json();
    const { firstName, lastName, email, phone, dateTime } = body;

    if (!firstName || !lastName || !email || !dateTime) {
      return new Response(JSON.stringify({ error: 'Missing required fields: firstName, lastName, email, dateTime' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Parse dateTime and create end time (2 hours later)
    const startDate = new Date(dateTime);
    const endDate = new Date(startDate.getTime() + 2 * 60 * 60 * 1000);

    const dtstart = formatICSDate(startDate.toISOString().replace('Z', ''));
    const dtend = formatICSDate(endDate.toISOString().replace('Z', ''));

    const uid = generateUID();
    const attendeeName = `${firstName} ${lastName}`;
    const description = `UNMASKED Booking\\nName: ${attendeeName}\\nEmail: ${email}\\nPhone: ${phone || 'Not provided'}`;

    const icsContent = buildICSEvent({
      uid,
      summary: `UNMASKED - ${attendeeName}`,
      description,
      dtstart,
      dtend,
      organizer: icloudEmail,
      attendeeEmail: email,
      attendeeName,
    });

    const auth = btoa(`${icloudEmail}:${icloudPassword}`);

    // Discover calendar home
    let calendarUrl = await discoverCalendarUrl(icloudEmail, icloudPassword);

    if (!calendarUrl) {
      console.error('Failed to discover calendar URL');
      return new Response(JSON.stringify({ 
        success: false, 
        error: 'Could not discover iCloud calendar. Check credentials.' 
      }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Find default calendar
    const defaultCalendar = await findDefaultCalendar(calendarUrl, auth);
    if (defaultCalendar) calendarUrl = defaultCalendar;

    // Ensure trailing slash and create event URL
    const baseUrl = calendarUrl.endsWith('/') ? calendarUrl : `${calendarUrl}/`;
    const eventUrl = `${baseUrl}${uid}.ics`;

    console.log('Creating event at:', eventUrl);

    // Create the event via CalDAV PUT
    const putRes = await fetch(eventUrl, {
      method: 'PUT',
      headers: {
        'Authorization': `Basic ${auth}`,
        'Content-Type': 'text/calendar; charset=utf-8',
        'If-None-Match': '*',
      },
      body: icsContent,
    });

    const putText = await putRes.text();
    console.log('CalDAV PUT response:', putRes.status, putText);

    if (putRes.status >= 200 && putRes.status < 300) {
      return new Response(JSON.stringify({ success: true, uid, eventUrl }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    } else {
      return new Response(JSON.stringify({ 
        success: false, 
        error: `CalDAV returned ${putRes.status}`, 
        details: putText 
      }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }
  } catch (error) {
    console.error('Error creating calendar event:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
