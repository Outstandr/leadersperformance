const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version',
};

/**
 * Reuses CalDAV discovery from create-calendar-event to find Lionel's calendar,
 * then queries it for all events on a given date and returns blocked time slots.
 */

async function discoverCalendarUrl(
  email: string,
  password: string,
): Promise<string> {
  const auth = btoa(`${email}:${password}`);
  const headers = (extra: Record<string, string> = {}) => ({
    Authorization: `Basic ${auth}`,
    'Content-Type': 'application/xml; charset=utf-8',
    ...extra,
  });

  // Step 1: discover principal URL
  const wellKnownRes = await fetch('https://caldav.icloud.com/.well-known/caldav', {
    method: 'PROPFIND',
    headers: headers({ Depth: '0' }),
    body: `<?xml version="1.0" encoding="utf-8"?><d:propfind xmlns:d="DAV:"><d:prop><d:current-user-principal/></d:prop></d:propfind>`,
    redirect: 'follow',
  });
  const wellKnownText = await wellKnownRes.text();

  const principalMatch =
    wellKnownText.match(/<current-user-principal[\s\S]*?<[^>]*href[^>]*>([^<]+)<\//i) ||
    wellKnownText.match(/<d:href>([^<]+\/principal[^<]*)<\/d:href>/i) ||
    wellKnownText.match(/<[^>]*href[^>]*>(\/[^<]+)<\//);

  let principalUrl: string;
  if (principalMatch) {
    const raw = principalMatch[1].trim();
    principalUrl = raw.startsWith('http') ? raw : `https://caldav.icloud.com${raw}`;
  } else {
    const accountMatch = wellKnownText.match(/\/(\d{9,})\//);
    if (accountMatch) {
      principalUrl = `https://caldav.icloud.com/${accountMatch[1]}/principal/`;
    } else {
      throw new Error('Could not determine iCloud principal URL.');
    }
  }

  // Step 2: get calendar-home-set
  const homeSetRes = await fetch(principalUrl, {
    method: 'PROPFIND',
    headers: headers({ Depth: '0' }),
    body: `<?xml version="1.0" encoding="utf-8"?><d:propfind xmlns:d="DAV:" xmlns:c="urn:ietf:params:xml:ns:caldav"><d:prop><c:calendar-home-set/></d:prop></d:propfind>`,
  });
  const homeSetText = await homeSetRes.text();

  const homeSetMatch =
    homeSetText.match(/<calendar-home-set[\s\S]*?<[^>]*href[^>]*>([^<]+)<\//i) ||
    homeSetText.match(/<[^>]*href[^>]*>([^<]*calendars[^<]*)<\//i);

  let calHome: string;
  if (homeSetMatch) {
    const raw = homeSetMatch[1].trim();
    calHome = raw.startsWith('http') ? raw : `https://caldav.icloud.com${raw}`;
  } else {
    calHome = principalUrl.replace(/principal\/?$/, 'calendars/');
  }

  // Step 3: find a VEVENT-capable calendar
  const calListRes = await fetch(calHome, {
    method: 'PROPFIND',
    headers: headers({ Depth: '1' }),
    body: `<?xml version="1.0" encoding="utf-8"?><d:propfind xmlns:d="DAV:" xmlns:c="urn:ietf:params:xml:ns:caldav"><d:prop><d:resourcetype/><d:displayname/></d:prop></d:propfind>`,
  });
  const calListText = await calListRes.text();

  let targetCalendar = '';
  const responseBlocks = calListText.split(/<[^>]*response[^>]*>/i).slice(1);
  for (const block of responseBlocks) {
    if (!/<calendar[\s/>]/i.test(block)) continue;
    if (/subscribed/i.test(block)) continue;
    if (/herinneringen|reminders/i.test(block)) continue;

    const hrefMatch = block.match(/<href[^>]*>([^<]+)<\/href>/i);
    if (hrefMatch) {
      const href = hrefMatch[1].trim();
      const fullHref = href.startsWith('http') ? href : `https://p47-caldav.icloud.com${href}`;
      targetCalendar = fullHref.endsWith('/') ? fullHref : `${fullHref}/`;
      break;
    }
  }

  if (!targetCalendar) {
    throw new Error('No writable calendar found on iCloud account.');
  }

  return targetCalendar;
}

/**
 * Query all events on a given date via CalDAV REPORT.
 * Returns raw VCALENDAR text blocks.
 */
async function queryEventsForDate(
  calendarUrl: string,
  email: string,
  password: string,
  dateStr: string, // YYYY-MM-DD
): Promise<string> {
  const auth = btoa(`${email}:${password}`);

  // Convert date to UTC range (Dubai is UTC+4, so start of day in Dubai = previous day 20:00 UTC)
  const dubaiStartUTC = new Date(`${dateStr}T00:00:00+04:00`);
  const dubaiEndUTC = new Date(`${dateStr}T23:59:59+04:00`);

  const pad = (n: number) => String(n).padStart(2, '0');
  const formatUTC = (d: Date) =>
    `${d.getUTCFullYear()}${pad(d.getUTCMonth() + 1)}${pad(d.getUTCDate())}T${pad(d.getUTCHours())}${pad(d.getUTCMinutes())}${pad(d.getUTCSeconds())}Z`;

  const start = formatUTC(dubaiStartUTC);
  const end = formatUTC(dubaiEndUTC);

  const reportBody = `<?xml version="1.0" encoding="utf-8"?>
<c:calendar-query xmlns:d="DAV:" xmlns:c="urn:ietf:params:xml:ns:caldav">
  <d:prop>
    <d:getetag/>
    <c:calendar-data/>
  </d:prop>
  <c:filter>
    <c:comp-filter name="VCALENDAR">
      <c:comp-filter name="VEVENT">
        <c:time-range start="${start}" end="${end}"/>
      </c:comp-filter>
    </c:comp-filter>
  </c:filter>
</c:calendar-query>`;

  const res = await fetch(calendarUrl, {
    method: 'REPORT',
    headers: {
      Authorization: `Basic ${auth}`,
      'Content-Type': 'application/xml; charset=utf-8',
      Depth: '1',
    },
    body: reportBody,
  });

  return await res.text();
}

/**
 * Parse VEVENT blocks from CalDAV response and extract time ranges in Dubai time.
 * Returns an array of { startHour, startMin, endHour, endMin }.
 */
function parseEvents(caldavResponse: string): Array<{ startHour: number; startMin: number; endHour: number; endMin: number }> {
  const events: Array<{ startHour: number; startMin: number; endHour: number; endMin: number }> = [];

  // Extract all calendar-data content
  const calDataBlocks = caldavResponse.match(/<[^>]*calendar-data[^>]*>([\s\S]*?)<\//gi) || [];

  for (const block of calDataBlocks) {
    // Get inner text content
    const inner = block.replace(/<[^>]+>/g, '').trim();
    if (!inner.includes('BEGIN:VEVENT')) continue;

    // Extract DTSTART
    const dtstartMatch = inner.match(/DTSTART[^:]*:(\d{8}T\d{6})(Z?)/);
    const dtendMatch = inner.match(/DTEND[^:]*:(\d{8}T\d{6})(Z?)/);

    if (!dtstartMatch) continue;

    const hasTZID = inner.match(/DTSTART;TZID=([^:]+):/);
    const isUTC = dtstartMatch[2] === 'Z';

    let startHour: number, startMin: number, endHour: number, endMin: number;

    const rawStart = dtstartMatch[1]; // 20260225T100000
    const sH = parseInt(rawStart.substring(9, 11));
    const sM = parseInt(rawStart.substring(11, 13));

    if (isUTC) {
      // Convert UTC to Dubai (UTC+4)
      startHour = (sH + 4) % 24;
      startMin = sM;
    } else if (hasTZID && hasTZID[1].includes('Dubai')) {
      startHour = sH;
      startMin = sM;
    } else {
      // Assume Dubai time for events without timezone
      startHour = sH;
      startMin = sM;
    }

    if (dtendMatch) {
      const rawEnd = dtendMatch[1];
      const eH = parseInt(rawEnd.substring(9, 11));
      const eM = parseInt(rawEnd.substring(11, 13));
      const endIsUTC = dtendMatch[2] === 'Z';

      if (endIsUTC) {
        endHour = (eH + 4) % 24;
        endMin = eM;
      } else {
        endHour = eH;
        endMin = eM;
      }
    } else {
      // Default: 1 hour duration
      endHour = (startHour + 1) % 24;
      endMin = startMin;
    }

    events.push({ startHour, startMin, endHour, endMin });
  }

  return events;
}

/**
 * Given event time ranges, generate the set of blocked 30-min slot strings.
 * Returns slots in both 12h format ("09:00 AM") and 24h format ("09:00").
 */
function getBlockedSlots(
  events: Array<{ startHour: number; startMin: number; endHour: number; endMin: number }>
): { blocked12h: string[]; blocked24h: string[] } {
  const blocked12h = new Set<string>();
  const blocked24h = new Set<string>();

  // Generate all possible 30-min slots from 00:00 to 23:30
  for (const event of events) {
    const startTotal = event.startHour * 60 + event.startMin;
    const endTotal = event.endHour * 60 + event.endMin;

    // Iterate through 30-min slots
    for (let mins = 0; mins < 24 * 60; mins += 30) {
      // A slot is blocked if its start time falls within the event
      if (mins >= startTotal && mins < endTotal) {
        const h = Math.floor(mins / 60);
        const m = mins % 60;

        // 24h format
        const h24 = `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
        blocked24h.add(h24);

        // 12h format
        const period = h >= 12 ? 'PM' : 'AM';
        const h12 = h === 0 ? 12 : h > 12 ? h - 12 : h;
        const h12Str = `${String(h12).padStart(2, '0')}:${String(m).padStart(2, '0')} ${period}`;
        blocked12h.add(h12Str);
      }
    }
  }

  return { blocked12h: Array.from(blocked12h), blocked24h: Array.from(blocked24h) };
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

    const url = new URL(req.url);
    const dateStr = url.searchParams.get('date');

    if (!dateStr || !/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) {
      return new Response(
        JSON.stringify({ error: 'Missing or invalid date parameter (YYYY-MM-DD)' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
      );
    }

    console.log('Checking availability for date:', dateStr);

    const calendarUrl = await discoverCalendarUrl(icloudEmail, icloudPassword);
    console.log('Discovered calendar:', calendarUrl);

    const caldavResponse = await queryEventsForDate(calendarUrl, icloudEmail, icloudPassword, dateStr);
    console.log('CalDAV response length:', caldavResponse.length);

    const events = parseEvents(caldavResponse);
    console.log('Found events:', events.length);

    const { blocked12h, blocked24h } = getBlockedSlots(events);
    console.log('Blocked 12h slots:', blocked12h);
    console.log('Blocked 24h slots:', blocked24h);

    return new Response(
      JSON.stringify({ date: dateStr, blocked12h, blocked24h, eventCount: events.length }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
    );
  } catch (error) {
    console.error('Error checking availability:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
    );
  }
});
