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

function getPathInfo(recommended_path: string) {
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

interface DiagnosticData {
  pillar_focus: string;
  capacity_score: string;
  primary_bottleneck: string;
  current_role: string;
}

interface PersonalizedContent {
  email_subject: string;
  email_intro: string;
  email_highlights: string;
  email_path_pitch: string;
  email_closing: string;
}

async function extractDiagnosticsAndContent(
  firstName: string,
  conversationSummary: string,
  pathName: string,
): Promise<{ diagnostics: DiagnosticData; content: PersonalizedContent }> {
  const lovableApiKey = Deno.env.get('LOVABLE_API_KEY');

  const fallbackDiagnostics: DiagnosticData = {
    pillar_focus: pathName || 'General',
    capacity_score: 'Not assessed',
    primary_bottleneck: 'Not identified',
    current_role: 'Not specified',
  };

  const fallbackContent: PersonalizedContent = {
    email_subject: 'Your Leadership Path — Next Steps from Lionel',
    email_intro: 'Thank you for speaking with our Path Advisor. It was a valuable conversation.',
    email_highlights: conversationSummary || 'We discussed your leadership goals and performance aspirations.',
    email_path_pitch: `Based on our conversation, I believe ${pathName} is the right fit for where you are right now.`,
    email_closing: 'If you\'re ready to take the next step, I invite you to book a personal strategy session where we can map out your path in detail.',
  };

  if (!lovableApiKey || !conversationSummary) {
    return { diagnostics: fallbackDiagnostics, content: fallbackContent };
  }

  const prompt = `You are Lionel, a leadership performance coach. You just had a voice conversation with ${firstName || 'a potential client'}. 

Here is a summary of the conversation:
"${conversationSummary}"

The recommended path for them is: ${pathName}

I need TWO things from you:

**1. DIAGNOSTIC EXTRACTION** — Analyze the conversation and extract:
- "pillar_focus": Which of these 4 pillars best fits their needs: "Energy & Identity", "Execution & Systems", "Rhythm & Consistency", or "Tracking & Reflection". Pick the single best match based on what they discussed.
- "capacity_score": Rate their current operational capacity from 1-10 based on the conversation (1=overwhelmed/stuck, 10=high-performing). Give a number as string like "6/10".
- "primary_bottleneck": In 2-5 words, what is their #1 challenge or bottleneck discussed? E.g. "Lack of team alignment", "No morning routine", "Decision fatigue".
- "current_role": Their job title or role if mentioned, otherwise "Not specified".

**2. PERSONALIZED EMAIL** — Write a follow-up email:
- "email_subject": A personalized subject line (max 60 chars)
- "email_intro": 2-3 sentences referencing something specific from the conversation. Don't start with "Thank you for..."
- "email_highlights": 2-4 sentences summarizing key insights or challenges discussed, written as reflection. Use "you" language.
- "email_path_pitch": 2-3 sentences explaining why ${pathName} is specifically right for them based on what was discussed.
- "email_closing": 1-2 sentences with a confident but warm invitation to book a session.

Tone: direct, confident, warm — like a mentor who genuinely wants to see them win. No fluff. No corporate speak.

Return a JSON object with all keys above (pillar_focus, capacity_score, primary_bottleneck, current_role, email_subject, email_intro, email_highlights, email_path_pitch, email_closing).

IMPORTANT: Return ONLY valid JSON, no markdown, no code fences.`;

  try {
    const response = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${lovableApiKey}`,
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      console.error('AI API error:', response.status);
      return { diagnostics: fallbackDiagnostics, content: fallbackContent };
    }

    const data = await response.json();
    const raw = data.choices?.[0]?.message?.content || '';
    const cleaned = raw.replace(/```json\s*/g, '').replace(/```\s*/g, '').trim();
    const parsed = JSON.parse(cleaned);

    return {
      diagnostics: {
        pillar_focus: parsed.pillar_focus || fallbackDiagnostics.pillar_focus,
        capacity_score: parsed.capacity_score || fallbackDiagnostics.capacity_score,
        primary_bottleneck: parsed.primary_bottleneck || fallbackDiagnostics.primary_bottleneck,
        current_role: parsed.current_role || fallbackDiagnostics.current_role,
      },
      content: {
        email_subject: parsed.email_subject || fallbackContent.email_subject,
        email_intro: parsed.email_intro || fallbackContent.email_intro,
        email_highlights: parsed.email_highlights || fallbackContent.email_highlights,
        email_path_pitch: parsed.email_path_pitch || fallbackContent.email_path_pitch,
        email_closing: parsed.email_closing || fallbackContent.email_closing,
      },
    };
  } catch (err) {
    console.error('AI extraction failed:', err);
    return { diagnostics: fallbackDiagnostics, content: fallbackContent };
  }
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
      const webhookUrl = 'https://services.leadconnectorhq.com/hooks/pP8zZxtNvTuN3UqadKCp/webhook-trigger/9dbd02ad-5a75-409a-ba92-38b7feb9eca7';
      const pathInfo = getPathInfo(recommended_path);

      // Extract diagnostics AND generate personalized email content in one AI call
      const { diagnostics, content } = await extractDiagnosticsAndContent(
        first_name,
        conversation_summary,
        pathInfo.name,
      );

      const ghlPayload = {
        // Contact info
        first_name,
        email,
        phone: phone || '',
        source: 'voice_agent',
        tag: 'voice-lead',
        
        // Path recommendation
        recommended_path,
        recommended_path_name: pathInfo.name,
        recommended_path_url: pathInfo.url,
        recommended_path_cta: pathInfo.cta,
        
        // Diagnostic data for GHL custom fields & branching
        pillar_focus: diagnostics.pillar_focus,
        capacity_score: diagnostics.capacity_score,
        primary_bottleneck: diagnostics.primary_bottleneck,
        current_role: diagnostics.current_role,
        
        // Full conversation for reference
        conversation_summary,
        
        // AI-personalized email content for GHL to use
        ...content,
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
