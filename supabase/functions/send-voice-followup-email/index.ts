import { SMTPClient } from 'https://deno.land/x/denomailer@1.6.0/mod.ts';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version',
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function sanitize(val: unknown, maxLen = 500): string {
  if (typeof val !== 'string') return '';
  return val.trim().slice(0, maxLen).replace(/<[^>]*>/g, '');
}

interface PathInfo {
  name: string;
  url: string;
  cta: string;
}

function getPathInfo(recommended_path: string): PathInfo {
  const p = recommended_path.toLowerCase();
  if (p.includes('business')) {
    return { name: 'Business Performance', url: 'https://leadersperformance.lovable.app/business', cta: 'Explore Business Performance' };
  }
  if (p.includes('elite')) {
    return { name: 'Elite Coaching', url: 'https://leadersperformance.lovable.app/elite', cta: 'Explore Elite Coaching' };
  }
  if (p.includes('unmasked')) {
    return { name: 'UNMASKED Dubai', url: 'https://leadersperformance.lovable.app/', cta: 'Explore UNMASKED Dubai' };
  }
  if (p.includes('academy')) {
    return { name: 'Leaders Performance Academy', url: 'https://leadersperformance.lovable.app/', cta: 'Explore The Academy' };
  }
  return { name: 'Leaders Performance', url: 'https://leadersperformance.lovable.app/', cta: 'Explore Your Path' };
}

function buildEmailHtml(firstName: string, conversationSummary: string, pathInfo: PathInfo): string {
  const greeting = firstName ? `Hi ${firstName},` : 'Hi there,';

  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"></head>
<body style="margin:0;padding:0;background-color:#0a0a0a;font-family:Georgia,'Times New Roman',serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#0a0a0a;padding:40px 20px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="background-color:#111111;border:1px solid #2a2a2a;border-radius:4px;">
        
        <!-- Header -->
        <tr><td style="padding:40px 40px 20px;border-bottom:2px solid #c9a84c;">
          <h1 style="margin:0;font-size:22px;font-weight:400;color:#c9a84c;letter-spacing:3px;text-transform:uppercase;">
            LEADERS PERFORMANCE
          </h1>
        </td></tr>
        
        <!-- Body -->
        <tr><td style="padding:40px;">
          <p style="color:#e8e8e8;font-size:17px;line-height:1.7;margin:0 0 24px;">
            ${greeting}
          </p>
          <p style="color:#b8b8b8;font-size:15px;line-height:1.7;margin:0 0 24px;">
            Thank you for speaking with our Path Advisor. It was a valuable conversation, and I want to make sure you have everything we discussed readily available.
          </p>
          
          <!-- Conversation Summary -->
          <div style="background-color:#1a1a1a;border-left:3px solid #c9a84c;padding:20px 24px;margin:0 0 32px;border-radius:0 4px 4px 0;">
            <p style="color:#c9a84c;font-size:12px;letter-spacing:2px;text-transform:uppercase;margin:0 0 12px;font-family:Arial,sans-serif;">
              CONVERSATION HIGHLIGHTS
            </p>
            <p style="color:#d0d0d0;font-size:14px;line-height:1.7;margin:0;">
              ${conversationSummary}
            </p>
          </div>
          
          <!-- Recommended Path -->
          <div style="background:linear-gradient(135deg,#1a1508,#111111);border:1px solid #c9a84c33;padding:28px;margin:0 0 32px;border-radius:4px;text-align:center;">
            <p style="color:#c9a84c;font-size:11px;letter-spacing:3px;text-transform:uppercase;margin:0 0 8px;font-family:Arial,sans-serif;">
              YOUR RECOMMENDED PATH
            </p>
            <h2 style="color:#e8e8e8;font-size:24px;font-weight:400;margin:0 0 20px;">
              ${pathInfo.name}
            </h2>
            <a href="${pathInfo.url}" style="display:inline-block;background-color:#c9a84c;color:#0a0a0a;text-decoration:none;padding:14px 36px;font-size:13px;letter-spacing:2px;text-transform:uppercase;font-weight:600;font-family:Arial,sans-serif;border-radius:2px;">
              ${pathInfo.cta}
            </a>
          </div>
          
          <p style="color:#b8b8b8;font-size:15px;line-height:1.7;margin:0 0 24px;">
            If you're ready to take the next step, I invite you to book a personal strategy session where we can map out your path in detail.
          </p>
          
          <!-- Book CTA -->
          <table width="100%" cellpadding="0" cellspacing="0">
            <tr><td align="center" style="padding:8px 0 0;">
              <a href="https://leadersperformance.lovable.app/" style="display:inline-block;border:1px solid #c9a84c;color:#c9a84c;text-decoration:none;padding:12px 32px;font-size:12px;letter-spacing:2px;text-transform:uppercase;font-family:Arial,sans-serif;border-radius:2px;">
                Book a Session
              </a>
            </td></tr>
          </table>
        </td></tr>
        
        <!-- Footer -->
        <tr><td style="padding:24px 40px;border-top:1px solid #2a2a2a;">
          <p style="color:#666;font-size:12px;line-height:1.6;margin:0;text-align:center;font-family:Arial,sans-serif;">
            Leaders Performance — Discipline. Execution. Sovereignty.<br>
            © ${new Date().getFullYear()} Leaders Performance. All rights reserved.
          </p>
        </td></tr>
        
      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Auth check — only callable internally
    const serviceRoleKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
    const authHeader = req.headers.get('authorization') || '';
    if (!serviceRoleKey || !authHeader.includes(serviceRoleKey)) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), {
        status: 401,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const payload = await req.json();

    const email = sanitize(payload.email, 254);
    const first_name = sanitize(payload.first_name, 100);
    const recommended_path = sanitize(payload.recommended_path, 200);
    const conversation_summary = sanitize(payload.conversation_summary, 2000);

    if (!email || !EMAIL_RE.test(email)) {
      return new Response(JSON.stringify({ error: 'Valid email is required' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const icloudEmail = Deno.env.get('ICLOUD_EMAIL');
    const icloudPassword = Deno.env.get('ICLOUD_APP_PASSWORD');

    if (!icloudEmail || !icloudPassword) {
      console.error('SMTP credentials not configured');
      return new Response(JSON.stringify({ error: 'Service temporarily unavailable' }), {
        status: 503,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const pathInfo = getPathInfo(recommended_path);
    const summaryText = conversation_summary || 'We discussed your leadership goals and performance aspirations.';
    const htmlBody = buildEmailHtml(first_name, summaryText, pathInfo);

    const client = new SMTPClient({
      connection: {
        hostname: 'smtp.mail.me.com',
        port: 587,
        tls: true,
        auth: {
          username: icloudEmail,
          password: icloudPassword,
        },
      },
    });

    await client.send({
      from: icloudEmail,
      to: email,
      subject: 'Your Leadership Path — Next Steps from Lionel',
      content: 'auto',
      html: htmlBody,
    });

    await client.close();

    console.log('Follow-up email sent to:', email);

    return new Response(JSON.stringify({ success: true }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error sending follow-up email:', error);
    return new Response(JSON.stringify({ error: 'An error occurred' }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
