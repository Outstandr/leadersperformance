import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

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
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    );

    const payload = await req.json();

    const first_name = sanitize(payload.first_name, 100);
    const email = sanitize(payload.email, 254);
    const phone = sanitize(payload.phone, 30);
    const recommended_path = sanitize(payload.recommended_path, 200);
    const conversation_summary = sanitize(payload.conversation_summary, 2000);

    if (email && !EMAIL_RE.test(email)) {
      return new Response(JSON.stringify({ error: 'Invalid email format' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Save to database
    const { error: dbError } = await supabase
      .from('voice_leads')
      .insert({
        first_name: first_name || null,
        email: email || null,
        phone: phone || null,
        recommended_path: recommended_path || null,
        conversation_summary: conversation_summary || null,
      });

    if (dbError) {
      console.error('DB error:', dbError);
    }

    // Send to GHL if email is provided
    if (email) {
      const webhookUrl = 'https://services.leadconnectorhq.com/hooks/Yo1FDBIRLuWeMDpP2I4R/webhook-trigger/718fb129-0f5b-4c2e-a428-dfdc530b0999';

      const ghlPayload = {
        first_name,
        email,
        phone: phone || '',
        source: 'voice_agent',
        recommended_path,
        conversation_summary,
        tag: 'voice-lead',
      };

      await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(ghlPayload),
      });
    }

    return new Response(JSON.stringify({ success: true }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error capturing voice lead:', error);
    return new Response(JSON.stringify({ error: 'An error occurred' }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
