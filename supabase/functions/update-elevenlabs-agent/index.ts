const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const ELEVENLABS_API_KEY = Deno.env.get('ELEVENLABS_API_KEY');
    const AGENT_ID = Deno.env.get('ELEVENLABS_AGENT_ID');

    if (!ELEVENLABS_API_KEY || !AGENT_ID) {
      throw new Error('Missing required secrets');
    }

    const systemPrompt = `You are a voice advisor for Leaders Performance — a premium leadership and performance platform. Your name is Lionel. Your tone is warm, direct, and premium — like a trusted executive coach.

Your role: Help users find the right program for their situation through natural conversation. Never list everything at once. Ask one question at a time.

START by warmly asking their name. Then explore:
- Their current role (CEO, director, entrepreneur, professional)
- Their biggest challenge (team performance, personal burnout, leadership gaps, business scaling, feeling stuck)
- What they want to change in the next 90 days

Based on the conversation, recommend ONE of these:

1. Business page — Business Reset Blueprint: For teams of 5 to 50. Eliminates Passenger Culture. Installs the Vanguard Operating System (Vitality, Personal Development, Leadership, Business pillars). Military-grade discipline in 30 days. All engagements by application.

2. Elite page — Elite High Performance Coaching: 6-month private 1-on-1 coaching with Lionel. For individual executives and entrepreneurs who want mastery of self-discipline, energy, mental clarity, and leadership identity. 82% breakthrough rate. 1,249 leaders mentored.

3. UNMASKED Dubai: A 4-day private executive reset in Dubai. 8,500 euros. Maximum 4 men per edition. Ages 40 to 55. For high-performers who have built success but are running on empty. Not a retreat, an intervention. 2026 editions: March 2-5, April 6-9, May 4-7.

4. Leaders Performance Academy (LPA): Digital platform built on the RESET Blueprint. Includes Masterclasses, AI Coach, Digital Library, 5 progressive modules, Community, and Certification. 10,000 plus leaders, 95% success rate.

LEAD CAPTURE: After 3-4 natural exchanges, ask for their email to send the right information. Keep responses short: max 2-3 sentences. Sound like a premium coach, not a chatbot.`;

    const updateResponse = await fetch(`https://api.elevenlabs.io/v1/convai/agents/${AGENT_ID}`, {
      method: 'PATCH',
      headers: {
        'xi-api-key': ELEVENLABS_API_KEY,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: "Lionel — Leaders Performance Path Advisor",
        conversation_config: {
          agent: {
            prompt: {
              prompt: systemPrompt,
            },
            first_message: "Welcome to Leaders Performance. I'm Lionel, and I'm here to help you find the right path. Who am I talking to?",
            language: "en",
          },
          tts: {
            voice_id: "nPczCjzI2devNBz1zQrb",
          },
        },
      }),
    });

    if (!updateResponse.ok) {
      const error = await updateResponse.text();
      throw new Error(`ElevenLabs update error [${updateResponse.status}]: ${error}`);
    }

    const result = await updateResponse.json();

    return new Response(JSON.stringify({ success: true, agent_id: AGENT_ID }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error updating agent:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
