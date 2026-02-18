const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version',
};

function generateUID(): string {
  return `${Date.now()}-${Math.random().toString(36).substring(2, 11)}@leadersperformance`;
}

function formatICSDate(isoStr: string): string {
  // "2025-03-10T10:00:00" → "20250310T100000"
  return isoStr.replace(/[-:]/g, '').split('.')[0];
}

function buildICSEvent(data: {
  uid: string;
  summary: string;
  description: string;
  dtstart: string; // "20260310T100000" — local Dubai time, no Z
  dtend: string;
  attendeeName: string;
  attendeeEmail: string;
  phone: string;
}): string {
  // DTSTAMP must be UTC with Z suffix — format: 20260218T140000Z
  const now = new Date();
  const pad = (n: number) => String(n).padStart(2, '0');
  const dtstamp = `${now.getUTCFullYear()}${pad(now.getUTCMonth() + 1)}${pad(now.getUTCDate())}T${pad(now.getUTCHours())}${pad(now.getUTCMinutes())}${pad(now.getUTCSeconds())}Z`;

  // Keep ICS minimal — iCloud rejects ORGANIZER/ATTENDEE on personal calendar PUT
  const lines = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Leaders Performance//UNMASKED//EN',
    'CALSCALE:GREGORIAN',
    'BEGIN:VTIMEZONE',
    'TZID:Asia/Dubai',
    'BEGIN:STANDARD',
    'DTSTART:19700101T040000',
    'TZOFFSETFROM:+0400',
    'TZOFFSETTO:+0400',
    'TZNAME:GST',
    'END:STANDARD',
    'END:VTIMEZONE',
    'BEGIN:VEVENT',
    `UID:${data.uid}`,
    `DTSTAMP:${dtstamp}`,
    `DTSTART;TZID=Asia/Dubai:${data.dtstart}`,
    `DTEND;TZID=Asia/Dubai:${data.dtend}`,
    `SUMMARY:${data.summary}`,
    `DESCRIPTION:Name: ${data.attendeeName}\\nEmail: ${data.attendeeEmail}\\nPhone: ${data.phone}`,
    'STATUS:CONFIRMED',
    'TRANSP:OPAQUE',
    'BEGIN:VALARM',
    'TRIGGER:-PT60M',
    'ACTION:DISPLAY',
    'DESCRIPTION:UNMASKED Booking Reminder',
    'END:VALARM',
    'END:VEVENT',
    'END:VCALENDAR',
  ];
  return lines.join('\r\n');
}

/**
 * Step 1: Hit /.well-known/caldav and follow any redirect to get the principal URL.
 * Step 2: PROPFIND the principal to get calendar-home-set.
 * Step 3: PROPFIND the calendar home to find the first VEVENT-capable calendar.
 * Step 4: PUT the .ics event.
 */
async function discoverAndCreateEvent(
  email: string,
  password: string,
  icsContent: string,
  uid: string,
): Promise<{ status: number; body: string; eventUrl: string }> {
  const auth = btoa(`${email}:${password}`);
  const headers = (extra: Record<string, string> = {}) => ({
    Authorization: `Basic ${auth}`,
    'Content-Type': 'application/xml; charset=utf-8',
    ...extra,
  });

  // ── Step 1: discover principal URL ──────────────────────────────────────
  const wellKnownRes = await fetch('https://caldav.icloud.com/.well-known/caldav', {
    method: 'PROPFIND',
    headers: headers({ Depth: '0' }),
    body: `<?xml version="1.0" encoding="utf-8"?><d:propfind xmlns:d="DAV:"><d:prop><d:current-user-principal/></d:prop></d:propfind>`,
    redirect: 'follow',
  });

  const wellKnownText = await wellKnownRes.text();
  console.log('well-known status:', wellKnownRes.status, 'url:', wellKnownRes.url);
  console.log('well-known body (first 600):', wellKnownText.substring(0, 600));

  // Extract principal href
  const principalMatch =
    wellKnownText.match(/<current-user-principal[\s\S]*?<[^>]*href[^>]*>([^<]+)<\//i) ||
    wellKnownText.match(/<d:href>([^<]+\/principal[^<]*)<\/d:href>/i) ||
    wellKnownText.match(/<[^>]*href[^>]*>(\/[^<]+)<\//);

  let principalUrl: string;
  if (principalMatch) {
    const raw = principalMatch[1].trim();
    principalUrl = raw.startsWith('http') ? raw : `https://caldav.icloud.com${raw}`;
  } else {
    // iCloud uses numeric account IDs — extract from any href in the response
    const accountMatch = wellKnownText.match(/\/(\d{9,})\//);
    if (accountMatch) {
      principalUrl = `https://caldav.icloud.com/${accountMatch[1]}/principal/`;
    } else {
      throw new Error('Could not determine iCloud principal URL. Check credentials.');
    }
  }
  console.log('Principal URL:', principalUrl);

  // ── Step 2: get calendar-home-set ────────────────────────────────────────
  const homeSetRes = await fetch(principalUrl, {
    method: 'PROPFIND',
    headers: headers({ Depth: '0' }),
    body: `<?xml version="1.0" encoding="utf-8"?><d:propfind xmlns:d="DAV:" xmlns:c="urn:ietf:params:xml:ns:caldav"><d:prop><c:calendar-home-set/></d:prop></d:propfind>`,
  });
  const homeSetText = await homeSetRes.text();
  console.log('home-set status:', homeSetRes.status);
  console.log('home-set body (first 600):', homeSetText.substring(0, 600));

  const homeSetMatch =
    homeSetText.match(/<calendar-home-set[\s\S]*?<[^>]*href[^>]*>([^<]+)<\//i) ||
    homeSetText.match(/<[^>]*href[^>]*>([^<]*calendars[^<]*)<\//i);

  let calHome: string;
  if (homeSetMatch) {
    const raw = homeSetMatch[1].trim();
    calHome = raw.startsWith('http') ? raw : `https://caldav.icloud.com${raw}`;
  } else {
    // Fallback: derive from principal URL by replacing "principal" with "calendars"
    calHome = principalUrl.replace(/principal\/?$/, 'calendars/');
  }
  console.log('Calendar home:', calHome);

  // ── Step 3: find or create an actual calendar collection ─────────────────
  // The home collection is just a container; we need a <calendar/> resourcetype sub-collection.
  // Try to find one via Depth:1 first.
  const calListRes = await fetch(calHome, {
    method: 'PROPFIND',
    headers: headers({ Depth: '1' }),
    body: `<?xml version="1.0" encoding="utf-8"?><d:propfind xmlns:d="DAV:" xmlns:c="urn:ietf:params:xml:ns:caldav"><d:prop><d:resourcetype/><d:displayname/></d:prop></d:propfind>`,
  });
  const calListText = await calListRes.text();
  console.log('cal-list status:', calListRes.status);
  console.log('cal-list body:', calListText.substring(0, 2000));

  // Find a response block with <calendar/> in resourcetype — skip Reminders/subscribed
  let targetCalendar = '';
  const responseBlocks = calListText.split(/<[^>]*response[^>]*>/i).slice(1);
  for (const block of responseBlocks) {
    // Must have <calendar/> resourcetype
    if (!/<calendar[\s/>]/i.test(block)) continue;
    // Skip subscribed calendars
    if (/subscribed/i.test(block)) continue;
    // Skip Reminders calendar (VTODO-only, no VEVENT)
    if (/herinneringen|reminders/i.test(block)) continue;

    const hrefMatch = block.match(/<href[^>]*>([^<]+)<\/href>/i);
    if (hrefMatch) {
      const href = hrefMatch[1].trim();
      const fullHref = href.startsWith('http') ? href : `https://p47-caldav.icloud.com${href}`;
      targetCalendar = fullHref.endsWith('/') ? fullHref : `${fullHref}/`;
      console.log('Found writable calendar collection:', targetCalendar);
      break;
    }
  }

  // If no calendar sub-collection found, create one via MKCALENDAR
  if (!targetCalendar) {
    const base = calHome.endsWith('/') ? calHome : `${calHome}/`;
    const newCalUrl = `${base}unmasked-bookings/`;
    console.log('No calendar found, creating one at:', newCalUrl);

    const mkCalRes = await fetch(newCalUrl, {
      method: 'MKCALENDAR',
      headers: {
        Authorization: `Basic ${auth}`,
        'Content-Type': 'application/xml; charset=utf-8',
      },
      body: `<?xml version="1.0" encoding="utf-8"?>
<c:mkcalendar xmlns:d="DAV:" xmlns:c="urn:ietf:params:xml:ns:caldav">
  <d:set>
    <d:prop>
      <d:displayname>UNMASKED Bookings</d:displayname>
    </d:prop>
  </d:set>
</c:mkcalendar>`,
    });
    const mkCalText = await mkCalRes.text();
    console.log('MKCALENDAR status:', mkCalRes.status, 'body:', mkCalText);

    if (mkCalRes.status === 201 || mkCalRes.status === 207) {
      targetCalendar = newCalUrl;
    } else {
      // MKCALENDAR failed — fall back to home, some servers allow direct PUT
      console.log('MKCALENDAR failed, falling back to home collection');
      targetCalendar = base;
    }
  }

  console.log('Target calendar:', targetCalendar);

  // ── Step 4: PUT the event ─────────────────────────────────────────────────
  const eventUrl = `${targetCalendar}${uid}.ics`;
  console.log('Putting event at:', eventUrl);

  const putRes = await fetch(eventUrl, {
    method: 'PUT',
    headers: {
      Authorization: `Basic ${auth}`,
      'Content-Type': 'text/calendar; charset=utf-8',
    },
    body: icsContent,
  });
  const putText = await putRes.text();
  console.log('PUT status:', putRes.status, 'body:', putText);

  return { status: putRes.status, body: putText, eventUrl };
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const icloudEmail = Deno.env.get('ICLOUD_EMAIL');
    const icloudPassword = Deno.env.get('ICLOUD_APP_PASSWORD');

    if (!icloudEmail || !icloudPassword) {
      return new Response(
        JSON.stringify({ error: 'iCloud credentials not configured' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
      );
    }

    const body = await req.json();
    const { firstName, lastName, email, phone, dateTime } = body;

    if (!firstName || !lastName || !email || !dateTime) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields: firstName, lastName, email, dateTime' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
      );
    }

    // Build start/end times (2-hour session)
    const startDate = new Date(dateTime);
    const endDate = new Date(startDate.getTime() + 2 * 60 * 60 * 1000);
    const dtstart = formatICSDate(startDate.toISOString().replace('Z', ''));
    const dtend = formatICSDate(endDate.toISOString().replace('Z', ''));

    const uid = generateUID();
    const attendeeName = `${firstName} ${lastName}`;

    const icsContent = buildICSEvent({
      uid,
      summary: `UNMASKED - ${attendeeName}`,
      description: '',
      dtstart,
      dtend,
      attendeeName,
      attendeeEmail: email,
      phone: phone || 'Not provided',
    });

    const { status, body: putBody, eventUrl } = await discoverAndCreateEvent(
      icloudEmail,
      icloudPassword,
      icsContent,
      uid,
    );

    if (status >= 200 && status < 300) {
      return new Response(
        JSON.stringify({ success: true, uid, eventUrl }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
      );
    } else {
      return new Response(
        JSON.stringify({ success: false, error: `CalDAV returned ${status}`, details: putBody }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
      );
    }
  } catch (error) {
    console.error('Error creating calendar event:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
    );
  }
});
