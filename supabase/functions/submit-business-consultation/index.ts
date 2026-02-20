const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version',
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const REQUIRED_FIELDS = [
  'firstName', 'lastName', 'company', 'position', 'country', 'email', 'phone',
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

    // Calculate scores
    const responses = body.auditResponses || {};
    const rawScore = Object.values(responses).reduce((sum: number, v: any) => sum + (Number(v) || 0), 0);
    const maxScore = 70;
    const disciplineScore = Math.round((rawScore / maxScore) * 100);
    let tier = 'THE NURSERY';
    if (disciplineScore >= 71) tier = 'THE VANGUARD';
    else if (disciplineScore >= 30) tier = 'THE DRIFT';

    // Insert into database
    const { createClient } = await import('https://esm.sh/@supabase/supabase-js@2');
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
    );

    const { data: consultation, error: dbError } = await supabase
      .from('business_consultations')
      .insert({
        first_name: body.firstName.trim(),
        last_name: body.lastName.trim(),
        company: body.company.trim(),
        position: body.position.trim(),
        country: body.country.trim(),
        email: body.email.trim(),
        phone: body.phone.trim(),
        q1_morning_standard: responses.q1 ?? 0,
        q2_silence_test: responses.q2 ?? 0,
        q3_deadline_protocol: responses.q3 ?? 0,
        q4_confrontation: responses.q4 ?? 0,
        q5_meeting_tax: responses.q5 ?? 0,
        q6_problem_solver: responses.q6 ?? 0,
        q7_mirror: responses.q7 ?? 0,
        raw_score: rawScore,
        discipline_score: disciplineScore,
        tier,
        booking_date: body.bookingDateTime,
        status: 'pending',
      })
      .select('id')
      .single();

    if (dbError) {
      console.error('DB insert error:', dbError);
      return new Response(JSON.stringify({ error: 'Failed to save consultation' }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Build webhook payload
    const webhookPayload = {
      id: consultation.id,
      first_name: body.firstName.trim(),
      last_name: body.lastName.trim(),
      company: body.company.trim(),
      position: body.position.trim(),
      country: body.country.trim(),
      email: body.email.trim(),
      phone: body.phone.trim(),
      q1_morning_standard: responses.q1 ?? 0,
      q2_silence_test: responses.q2 ?? 0,
      q3_deadline_protocol: responses.q3 ?? 0,
      q4_confrontation: responses.q4 ?? 0,
      q5_meeting_tax: responses.q5 ?? 0,
      q6_problem_solver: responses.q6 ?? 0,
      q7_mirror: responses.q7 ?? 0,
      raw_score: rawScore,
      discipline_score: disciplineScore,
      tier,
      booking_date_time: body.bookingDateTime,
      calendar_tag: 'business consultation',
      submitted_at: new Date().toISOString(),
    };

    // Fire GHL webhook (mid-ticket endpoint)
    const ghlUrl = 'https://services.leadconnectorhq.com/hooks/pP8zZxtNvTuN3UqadKCp/webhook-trigger/RkysrTHNhiqHMSQoOXpB';

    fetch(ghlUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(webhookPayload),
    }).then(r => console.log('GHL business response:', r.status))
      .catch(e => console.error('GHL business error:', e));

    return new Response(JSON.stringify({ success: true, consultationId: consultation.id }), {
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
