const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version',
};

const GHL_BASE = 'https://services.leadconnectorhq.com';

function ghlHeaders() {
  const apiKey = Deno.env.get('GHL_API_KEY');
  if (!apiKey) throw new Error('GHL_API_KEY not configured');
  return {
    Authorization: `Bearer ${apiKey}`,
    'Content-Type': 'application/json',
    Version: '2021-07-28',
  };
}

// GET /ghl-booking?date=2026-02-26 → returns free slots
async function getFreeSlots(date: string) {
  const calendarId = Deno.env.get('GHL_CALENDAR_ID');
  if (!calendarId) throw new Error('GHL_CALENDAR_ID not configured');

  // GHL free-slots API expects epoch ms
  const startMs = new Date(`${date}T00:00:00+04:00`).getTime();
  const endMs = new Date(`${date}T23:59:59+04:00`).getTime();

  const url = `${GHL_BASE}/calendars/${calendarId}/free-slots?startDate=${startMs}&endDate=${endMs}&timezone=Asia/Dubai`;
  
  console.log('Fetching free slots:', url);

  const res = await fetch(url, { headers: ghlHeaders() });
  const data = await res.json();

  console.log('GHL free slots response:', res.status, JSON.stringify(data).slice(0, 1000));

  if (!res.ok) {
    throw new Error(`GHL API error ${res.status}: ${JSON.stringify(data)}`);
  }

  // GHL returns { <date>: { slots: ["2026-02-26T10:00:00+04:00", ...] } }
  // Parse into simple time slot arrays
  const allSlots = [
    { label: "10:00 AM", value: "10:00" },
    { label: "11:00 AM", value: "11:00" },
    { label: "12:00 PM", value: "12:00" },
    { label: "3:00 PM", value: "15:00" },
    { label: "4:00 PM", value: "16:00" },
    { label: "5:00 PM", value: "17:00" },
  ];

  // Extract free slot times from GHL response
  const freeSlotTimes = new Set<string>();
  
  // GHL response format: { "<date_key>": { "slots": [...] } } or { "slots": { "<date_key>": [...] } }
  if (data) {
    // Try different response formats
    let slots: string[] = [];
    
    // Format 1: { "2026-02-26": { slots: [...] } }
    const dateKey = Object.keys(data).find(k => k.includes(date));
    if (dateKey && data[dateKey]?.slots) {
      slots = data[dateKey].slots;
    }
    // Format 2: { slots: { "2026-02-26": [...] } }
    else if (data.slots) {
      if (Array.isArray(data.slots)) {
        slots = data.slots;
      } else {
        const slotDateKey = Object.keys(data.slots).find(k => k.includes(date));
        if (slotDateKey) {
          slots = data.slots[slotDateKey];
        }
      }
    }

    console.log('Parsed free slots:', slots.length);

    for (const slot of slots) {
      // slot is like "2026-02-26T10:00:00+04:00" or just a time
      try {
        let timeStr: string;
        if (slot.includes('T')) {
          // Extract HH:MM from ISO datetime
          const timePart = slot.split('T')[1];
          timeStr = timePart.substring(0, 5); // "10:00"
        } else {
          timeStr = slot.substring(0, 5);
        }
        freeSlotTimes.add(timeStr);
      } catch {
        console.warn('Could not parse slot:', slot);
      }
    }
  }

  // Build blocked list — any of our defined slots NOT in freeSlotTimes
  const blocked24h: string[] = [];
  const blocked12h: string[] = [];

  for (const slot of allSlots) {
    if (!freeSlotTimes.has(slot.value)) {
      blocked24h.push(slot.value);
      blocked12h.push(slot.label);
    }
  }

  return { blocked24h, blocked12h, freeSlotTimes: Array.from(freeSlotTimes) };
}

// POST /ghl-booking → book appointment
async function bookAppointment(body: {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateTime: string;
  timeSlot: string;
}) {
  const calendarId = Deno.env.get('GHL_CALENDAR_ID');
  const locationId = Deno.env.get('GHL_LOCATION_ID');
  if (!calendarId || !locationId) throw new Error('GHL_CALENDAR_ID or GHL_LOCATION_ID not configured');

  const { firstName, lastName, email, phone, dateTime, bookingType } = body;

  // Validate
  if (!firstName || !lastName || !email || !phone || !dateTime) {
    throw new Error('Missing required fields');
  }

  // 1. Upsert contact in GHL
  console.log('Upserting contact in GHL...');
  const contactRes = await fetch(`${GHL_BASE}/contacts/upsert`, {
    method: 'POST',
    headers: ghlHeaders(),
    body: JSON.stringify({
      locationId,
      firstName,
      lastName,
      email,
      phone,
      source: 'Leaders Performance Website',
      tags: [bookingType || 'UNMASKED', 'Booking'],
    }),
  });

  const contactData = await contactRes.json();
  console.log('Contact upsert response:', contactRes.status, JSON.stringify(contactData).slice(0, 300));

  if (!contactRes.ok) {
    throw new Error(`Contact upsert failed: ${JSON.stringify(contactData)}`);
  }

  const contactId = contactData.contact?.id;
  if (!contactId) {
    throw new Error('Could not get contact ID from GHL');
  }

  // 2. Create appointment
  // dateTime format: "2026-02-26T10:00:00"
  // GHL expects ISO with timezone
  const startTime = `${dateTime}+04:00`;
  // Assume 1 hour duration
  const startDate = new Date(startTime);
  const endDate = new Date(startDate.getTime() + 60 * 60 * 1000);
  const endTime = endDate.toISOString();

  console.log('Creating appointment:', { calendarId, contactId, startTime, endTime });

  const apptRes = await fetch(`${GHL_BASE}/calendars/events/appointments`, {
    method: 'POST',
    headers: ghlHeaders(),
    body: JSON.stringify({
      calendarId,
      locationId,
      contactId,
      startTime,
      endTime,
      title: `${bookingType || 'UNMASKED'} - ${firstName} ${lastName}`,
      appointmentStatus: 'confirmed',
      assignedUserId: '', // will use calendar's default
    }),
  });

  const apptData = await apptRes.json();
  console.log('Appointment response:', apptRes.status, JSON.stringify(apptData).slice(0, 300));

  if (!apptRes.ok) {
    throw new Error(`Appointment creation failed: ${JSON.stringify(apptData)}`);
  }

  return { success: true, appointmentId: apptData.id || apptData.event?.id };
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    if (req.method === 'GET') {
      // Check availability
      const url = new URL(req.url);
      const date = url.searchParams.get('date');
      if (!date) {
        return new Response(JSON.stringify({ error: 'date parameter required' }), {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }
      const result = await getFreeSlots(date);
      return new Response(JSON.stringify(result), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    if (req.method === 'POST') {
      // Book appointment
      const body = await req.json();
      const result = await bookAppointment(body);
      return new Response(JSON.stringify(result), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    return new Response('Method not allowed', { status: 405, headers: corsHeaders });
  } catch (error) {
    console.error('GHL booking error:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
