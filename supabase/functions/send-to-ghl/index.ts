const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version',
};

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const payload = await req.json();

    // Route corporate audit to its dedicated webhook, everything else uses GHL_WEBHOOK_URL
    let webhookUrl: string;
    if (payload.audit_type === 'corporate') {
      webhookUrl = 'https://services.leadconnectorhq.com/hooks/pP8zZxtNvTuN3UqadKCp/webhook-trigger/cae4e9db-73c9-4e86-b8d0-381606a3579e';
    } else {
      const envUrl = Deno.env.get('GHL_WEBHOOK_URL');
      if (!envUrl) {
        console.error('GHL_WEBHOOK_URL not configured');
        return new Response(JSON.stringify({ error: 'Webhook URL not configured' }), {
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }
      webhookUrl = envUrl;
    }

    // Pass through all payload fields to GHL
    const ghlPayload = { ...payload };

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
