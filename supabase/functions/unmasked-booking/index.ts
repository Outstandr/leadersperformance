const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version',
};

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const ghlWebhookUrl = 'https://services.leadconnectorhq.com/hooks/pP8zZxtNvTuN3UqadKCp/webhook-trigger/gxP5ZQ0OvedG47O9s5Rl';
    const supabaseUrl = Deno.env.get('SUPABASE_URL');
    const supabaseAnonKey = Deno.env.get('SUPABASE_ANON_KEY');

    const body = await req.json();
    const { firstName, lastName, email, phone, dateTime, timeSlot } = body;

    // Validate required fields
    if (!firstName || !lastName || !email || !phone || !dateTime) {
      return new Response(JSON.stringify({ error: 'Missing required fields' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const results = { ghl: false, calendar: false };
    const errors: string[] = [];

    // 1. Send to GHL
    try {
      const ghlPayload = {
        firstName,
        lastName,
        email,
        phone,
        dateTime,
        timeSlot,
        tags: ['UNMASKED', 'Booking', 'lead-unmasked'],
        source: 'Leaders Performance Website',
        form: 'UNMASKED Booking',
      };

      const ghlRes = await fetch(ghlWebhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(ghlPayload),
      });
      await ghlRes.text();
      results.ghl = ghlRes.ok;
      console.log('GHL response:', ghlRes.status);
    } catch (e) {
      console.error('GHL error:', e);
      errors.push('GHL webhook failed');
    }

    // 2. Create iCloud calendar event
    try {
      if (supabaseUrl && supabaseAnonKey) {
        const calRes = await fetch(`${supabaseUrl}/functions/v1/create-calendar-event`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'apikey': supabaseAnonKey,
            'Authorization': `Bearer ${supabaseAnonKey}`,
          },
          body: JSON.stringify({ firstName, lastName, email, phone, dateTime, summary: `UNMASKED - ${firstName} ${lastName}` }),
        });
        const calData = await calRes.json();
        results.calendar = calData.success === true;
        console.log('Calendar result:', calData);
        if (!calData.success) {
          errors.push(`Calendar: ${calData.error || 'Unknown error'}`);
        }
      }
    } catch (e) {
      console.error('Calendar error:', e);
      errors.push('Calendar event creation failed');
    }

    return new Response(JSON.stringify({ 
      success: results.ghl || results.calendar,
      results,
      errors: errors.length > 0 ? errors : undefined,
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Unmasked booking error:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
