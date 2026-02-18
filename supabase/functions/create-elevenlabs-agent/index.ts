const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version',
};

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const ELEVENLABS_API_KEY = Deno.env.get('ELEVENLABS_API_KEY');
    if (!ELEVENLABS_API_KEY) {
      throw new Error('ELEVENLABS_API_KEY is not configured');
    }

    // Create the agent via ElevenLabs API
    const systemPrompt = `You are Lionel, a confident and direct AI advisor for Leaders Performance — a premium leadership and performance platform. Your tone is warm, direct, and premium — like a trusted executive coach.

Your role: Help users find the right program for their situation through natural conversation. Never list everything at once. Ask one question at a time.

START by warmly asking their name. Then explore:
- Their current role (CEO, director, entrepreneur, professional)
- Their biggest challenge (team performance, personal burnout, leadership gaps, business scaling, feeling stuck)
- What they want to change in the next 90 days

Based on the conversation, recommend ONE of these:

1. /business — Business Reset Blueprint: For teams of 5 to 50. Eliminates Passenger Culture. Installs the Vanguard Operating System (Vitality, Personal Development, Leadership, Business pillars). Military-grade discipline in 30 days. All engagements by application.

2. /elite — Elite High Performance Coaching: 6-month private 1-on-1 coaching with Lionel. For individual executives and entrepreneurs who want mastery of self-discipline, energy, mental clarity, and leadership identity. 82% breakthrough rate. 1,249 leaders mentored.

3. UNMASKED Dubai: A 4-day private executive reset in Dubai. 8,500 euros. Maximum 4 men per edition. Ages 40 to 55. For high-performers who have built success but are running on empty. Not a retreat, an intervention. 2026 editions: March 2-5, April 6-9, May 4-7.

4. Leaders Performance Academy (LPA): Digital platform built on the RESET Blueprint. Includes Masterclasses, AI Coach, Digital Library, 5 progressive modules, Community, and Certification. 10,000+ leaders, 95% success rate.

LEAD CAPTURE: After 3-4 natural exchanges, ask for their email to send details. Keep responses short: max 2-3 sentences. Sound like a premium coach, not a chatbot.`;

    const agentConfig = {
      name: "Lionel Path Advisor",
      conversation_config: {
        agent: {
          prompt: {
            prompt: systemPrompt,
          },
          first_message: "Welcome to Leaders Performance. I'm here to help you find your path. Who am I talking to?",
          language: "en",
        },
        tts: {
          voice_id: "nPczCjzI2devNBz1zQrb",
        },
      },
    };

    const createResponse = await fetch('https://api.elevenlabs.io/v1/convai/agents/create', {
      method: 'POST',
      headers: {
        'xi-api-key': ELEVENLABS_API_KEY,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(agentConfig),
    });

    if (!createResponse.ok) {
      const error = await createResponse.text();
      throw new Error(`ElevenLabs create agent error [${createResponse.status}]: ${error}`);
    }

    const agent = await createResponse.json();
    const agentId = agent.agent_id;

    return new Response(JSON.stringify({ 
      success: true,
      agent_id: agentId,
      message: `Agent created successfully. Set ELEVENLABS_AGENT_ID=${agentId} as a secret.`
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error creating agent:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
