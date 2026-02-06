const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version',
};

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const webhookUrl = Deno.env.get('GHL_WEBHOOK_URL');
    if (!webhookUrl) {
      console.error('GHL_WEBHOOK_URL not configured');
      return new Response(JSON.stringify({ error: 'Webhook URL not configured' }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const payload = await req.json();

    const ghlPayload = {
      first_name: payload.first_name,
      last_name: payload.last_name,
      email: payload.email,
      country: payload.country,
      language: payload.language,
      self_discipline_score: payload.self_discipline_score,
      impulse_control_score: payload.impulse_control_score,
      consistency_score: payload.consistency_score,
      overall_score: payload.overall_score,
      discipline_type: payload.discipline_type,
      q1_follow_through: payload.q1_follow_through,
      q2_maintain_focus: payload.q2_maintain_focus,
      q3_give_up: payload.q3_give_up,
      q4_resist_pleasure: payload.q4_resist_pleasure,
      q8_act_impulse: payload.q8_act_impulse,
      q9_control_stress: payload.q9_control_stress,
      q10_regret_purchases: payload.q10_regret_purchases,
      q15_daily_routines: payload.q15_daily_routines,
      q16_productivity_varies: payload.q16_productivity_varies,
      q17_bounce_back: payload.q17_bounce_back,
    };

    console.log('Sending to GHL:', JSON.stringify(ghlPayload));

    const ghlResponse = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(ghlPayload),
    });

    const responseText = await ghlResponse.text();
    console.log('GHL response:', ghlResponse.status, responseText);

    return new Response(JSON.stringify({ success: true }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error sending to GHL:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
