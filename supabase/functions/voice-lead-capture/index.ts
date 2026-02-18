import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version',
};

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
    const { first_name, email, phone, recommended_path, conversation_summary } = payload;

    // Save to database
    const { error: dbError } = await supabase
      .from('voice_leads')
      .insert({
        first_name,
        email,
        phone,
        recommended_path,
        conversation_summary,
      });

    if (dbError) {
      console.error('DB error:', dbError);
    }

    // Send to GHL if email is provided
    if (email) {
      const webhookUrl = Deno.env.get('GHL_WEBHOOK_URL');
      if (webhookUrl) {
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
    }

    return new Response(JSON.stringify({ success: true }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error capturing voice lead:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
