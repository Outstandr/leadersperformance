const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version',
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const REQUIRED_FIELDS = [
  'firstName', 'lastName', 'company', 'position', 'country', 'email',
  'professionalArena', 'incomeLevel', 'impossibleTarget',
  'lackOfDiscipline', 'pastAttempts', 'costOfInaction',
  'whyMentor', 'investmentReady', 'willingToBeWrong', 'commitmentLevel',
  'bookingDateTime',
];

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const body = await req.json();

    // Validate required fields
    for (const field of REQUIRED_FIELDS) {
      if (!body[field] || typeof body[field] !== 'string' || body[field].trim() === '') {
        return new Response(JSON.stringify({ error: `Missing required field: ${field}` }), {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }
    }

    // Validate email
    if (!EMAIL_RE.test(body.email)) {
      return new Response(JSON.stringify({ error: 'Invalid email format' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Insert into database
    const { createClient } = await import('https://esm.sh/@supabase/supabase-js@2');
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
    );

    const { data: application, error: dbError } = await supabase
      .from('applications')
      .insert({
        first_name: body.firstName.trim(),
        last_name: body.lastName.trim(),
        company: body.company.trim(),
        position: body.position.trim(),
        country: body.country.trim(),
        email: body.email.trim(),
        professional_arena: body.professionalArena.trim(),
        income_level: body.incomeLevel.trim(),
        impossible_target: body.impossibleTarget.trim(),
        lack_of_discipline: body.lackOfDiscipline.trim(),
        past_attempts: body.pastAttempts.trim(),
        cost_of_inaction: body.costOfInaction.trim(),
        why_mentor: body.whyMentor.trim(),
        investment_ready: body.investmentReady.trim(),
        willing_to_be_wrong: body.willingToBeWrong.trim(),
        commitment_level: body.commitmentLevel.trim(),
        booking_date: body.bookingDateTime,
        booking_time: null,
        status: 'pending',
      })
      .select('id')
      .single();

    if (dbError) {
      console.error('DB insert error:', dbError);
      return new Response(JSON.stringify({ error: 'Failed to save application' }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Build webhook payload
    const webhookPayload = {
      id: application.id,
      first_name: body.firstName.trim(),
      last_name: body.lastName.trim(),
      company: body.company.trim(),
      position: body.position.trim(),
      country: body.country.trim(),
      email: body.email.trim(),
      professional_arena: body.professionalArena.trim(),
      income_level: body.incomeLevel.trim(),
      impossible_target: body.impossibleTarget.trim(),
      lack_of_discipline: body.lackOfDiscipline.trim(),
      past_attempts: body.pastAttempts.trim(),
      cost_of_inaction: body.costOfInaction.trim(),
      why_mentor: body.whyMentor.trim(),
      investment_ready: body.investmentReady.trim(),
      willing_to_be_wrong: body.willingToBeWrong.trim(),
      commitment_level: body.commitmentLevel.trim(),
      booking_date_time: body.bookingDateTime,
      calendar_tag: 'high ticket consultation',
      submitted_at: new Date().toISOString(),
    };

    // Fire GHL webhook + HQ webhook + iCloud calendar in parallel
    const ghlUrl = Deno.env.get('GHL_WEBHOOK_URL');
    const hqUrl = Deno.env.get('HQ_WEBHOOK_URL');
    const webhookPromises: Promise<any>[] = [];

    if (ghlUrl) {
      webhookPromises.push(
        fetch(ghlUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(webhookPayload),
        }).then(r => console.log('GHL response:', r.status))
          .catch(e => console.error('GHL error:', e))
      );
    }

    if (hqUrl) {
      webhookPromises.push(
        fetch(hqUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(webhookPayload),
        }).then(r => console.log('HQ webhook response:', r.status))
          .catch(e => console.error('HQ webhook error:', e))
      );
    }

    // Create iCloud calendar event
    const supabaseUrl = Deno.env.get('SUPABASE_URL');
    const supabaseAnonKey = Deno.env.get('SUPABASE_ANON_KEY');
    if (supabaseUrl && supabaseAnonKey && body.bookingDateTime) {
      webhookPromises.push(
        fetch(`${supabaseUrl}/functions/v1/create-calendar-event`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'apikey': supabaseAnonKey,
            'Authorization': `Bearer ${supabaseAnonKey}`,
          },
          body: JSON.stringify({
            firstName: body.firstName.trim(),
            lastName: body.lastName.trim(),
            email: body.email.trim(),
            phone: 'Not provided',
            dateTime: body.bookingDateTime,
            summary: `HIGH PERFORMANCE COACHING - ${body.firstName.trim()} ${body.lastName.trim()}`,
          }),
        })
          .then(async r => {
            const d = await r.json();
            console.log('iCloud calendar result:', d);
          })
          .catch(e => console.error('iCloud calendar error:', e))
      );
    }

    await Promise.allSettled(webhookPromises);

    return new Response(JSON.stringify({ success: true, applicationId: application.id }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
