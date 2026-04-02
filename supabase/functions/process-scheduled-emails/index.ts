import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
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

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Fetch pending emails that are due
    const { data: emails, error } = await supabase
      .from('scheduled_emails')
      .select('*')
      .eq('status', 'pending')
      .lte('send_at', new Date().toISOString())
      .order('send_at', { ascending: true })
      .limit(20);

    if (error) throw error;
    if (!emails || emails.length === 0) {
      return new Response(JSON.stringify({ processed: 0 }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    console.log(`Processing ${emails.length} scheduled emails`);

    let sent = 0;
    let failed = 0;

    for (const email of emails) {
      try {
        // For nurture emails, check if contact has since booked (skip nurture if they did)
        if (email.email_type.startsWith('nurture_')) {
          // Check if a booking confirmation was sent for this contact
          const { data: bookingEmails } = await supabase
            .from('scheduled_emails')
            .select('id')
            .eq('contact_id', email.contact_id)
            .in('email_type', ['reminder_24h', 'reminder_1h'])
            .limit(1);

          if (bookingEmails && bookingEmails.length > 0) {
            // Contact booked after scan — skip nurture
            console.log(`Skipping nurture for ${email.contact_email} — they booked`);
            await supabase
              .from('scheduled_emails')
              .update({ status: 'skipped' })
              .eq('id', email.id);
            continue;
          }
        }

        // Send via GHL Conversations API
        const res = await fetch(`${GHL_BASE}/conversations/messages`, {
          method: 'POST',
          headers: ghlHeaders(),
          body: JSON.stringify({
            type: 'Email',
            contactId: email.contact_id,
            subject: email.subject,
            html: email.html_body,
            emailFrom: 'Lionel Eersteling <info@leadersperformance.ae>',
          }),
        });

        const data = await res.json();

        if (res.ok) {
          await supabase
            .from('scheduled_emails')
            .update({ status: 'sent', sent_at: new Date().toISOString() })
            .eq('id', email.id);
          sent++;
          console.log(`Sent: ${email.email_type} to ${email.contact_email}`);
        } else {
          throw new Error(`GHL ${res.status}: ${JSON.stringify(data).slice(0, 200)}`);
        }
      } catch (emailErr) {
        console.error(`Failed to send ${email.id}:`, emailErr);
        await supabase
          .from('scheduled_emails')
          .update({ status: 'failed', error_message: String(emailErr).slice(0, 500) })
          .eq('id', email.id);
        failed++;
      }
    }

    return new Response(JSON.stringify({ processed: emails.length, sent, failed }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('process-scheduled-emails error:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
