const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version',
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function sanitize(val: unknown, maxLen = 500): string {
  if (typeof val !== 'string') return '';
  return val.trim().slice(0, maxLen).replace(/<[^>]*>/g, '');
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const payload = await req.json();

    // Validate required email field
    const email = sanitize(payload.email, 254);
    if (!email || !EMAIL_RE.test(email)) {
      return new Response(JSON.stringify({ error: 'Valid email is required' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Sanitize all string fields in the payload
    const sanitizedPayload: Record<string, unknown> = {};
    for (const [key, value] of Object.entries(payload)) {
      if (typeof value === 'string') {
        sanitizedPayload[key] = sanitize(value, 2000);
      } else if (typeof value === 'number' || typeof value === 'boolean') {
        sanitizedPayload[key] = value;
      }
    }

    // Route to dedicated webhooks based on payload type
    let webhookUrl: string;
    if (sanitizedPayload.audit_type === 'founder_pressure_scan') {
      webhookUrl = 'https://services.leadconnectorhq.com/hooks/pP8zZxtNvTuN3UqadKCp/webhook-trigger/c696e7af-8922-49a0-b00a-0fec42edf9b8';
    } else if (sanitizedPayload.audit_type === 'founder_burnout_scan' || sanitizedPayload.audit_type === 'founder_burnout_full') {
      webhookUrl = 'https://services.leadconnectorhq.com/hooks/pP8zZxtNvTuN3UqadKCp/webhook-trigger/c696e7af-8922-49a0-b00a-0fec42edf9b8';
    } else if (sanitizedPayload.audit_type === 'capital_protection_voice' || sanitizedPayload.audit_type === 'capital_protection') {
      webhookUrl = 'https://services.leadconnectorhq.com/hooks/pP8zZxtNvTuN3UqadKCp/webhook-trigger/b8563060-6153-489a-8b2a-4eeef35e81c4';
    } else if (sanitizedPayload.audit_type === 'corporate') {
      webhookUrl = 'https://services.leadconnectorhq.com/hooks/pP8zZxtNvTuN3UqadKCp/webhook-trigger/cae4e9db-73c9-4e86-b8d0-381606a3579e';
    } else if (sanitizedPayload.source === 'elite') {
      webhookUrl = 'https://services.leadconnectorhq.com/hooks/pP8zZxtNvTuN3UqadKCp/webhook-trigger/ecab520f-e10b-4cca-8d20-d7ba2cb5c727';
    } else {
      const envUrl = Deno.env.get('GHL_WEBHOOK_URL');
      if (!envUrl) {
        console.error('GHL_WEBHOOK_URL not configured');
        return new Response(JSON.stringify({ error: 'Service temporarily unavailable' }), {
          status: 503,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }
      webhookUrl = envUrl;
    }

    console.log('Sending to GHL');

    const ghlResponse = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(sanitizedPayload),
    });

    console.log('GHL response status:', ghlResponse.status);

    return new Response(JSON.stringify({ success: true }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error sending to GHL:', error);
    return new Response(JSON.stringify({ error: 'An error occurred' }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
