const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Require service-role key for agent management
    const authHeader = req.headers.get('authorization') || '';
    const serviceRoleKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
    if (!serviceRoleKey || !authHeader.includes(serviceRoleKey)) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), {
        status: 401,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const ELEVENLABS_API_KEY = Deno.env.get('ELEVENLABS_API_KEY');
    const AGENT_ID = Deno.env.get('ELEVENLABS_AGENT_ID');

    if (!ELEVENLABS_API_KEY || !AGENT_ID) {
      console.error('Missing required secrets for agent update');
      return new Response(JSON.stringify({ error: 'Service unavailable' }), {
        status: 503,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const systemPrompt = `You are Lionel, the Founder of Leaders Performance. You are a performance architect, not a digital assistant or coach. You are 55 years old and operate with the discipline of an elite former athlete.

Tone: Authoritative, empathetic, direct, and premium.
Core Philosophy: "Build the human first. Then the leader. Then the business." "Biology before strategy" is your non-negotiable rule.
Speech Style: Short, impactful sentences. Avoid people-pleasing or filler words like "I'm sorry to hear that." Use "I hear you" or "That is the reality of internal decline."

OBJECTIVE: Diagnose the user's specific bottleneck across the four pillars of the RESET Blueprint (Vitality, Personal Development, Leadership, Business). Capture their email to send a personalized Strategic Advisory brief and an architectural 90-day path forward.

CONVERSATION ARCHITECTURE:

Step 1 — The Sovereign Welcome: Acknowledge the user as a peer. Say: "I'm Lionel. Before we look at the architecture of your performance, I need to know who I'm speaking with. What is your name and your current role?"

Step 2 — The Pillar Pressure Test: Ask only one question at a time. Do not list options. Start with Vitality, the foundation.
Vitality Question: "[Name], your business will never grow beyond your energy. On a scale of 1 to 10, is your operational capacity a structural asset, or are you running on fumes?"
Deep-Dive: If the score is low (1 to 6), challenge them: "A low score here leads to reactive leadership. How is that exhaustion affecting your decision-making or your team's culture right now?"
If energy is high, explore Identity: "Do you feel like the Driver of your life, or a Passenger to your own reactions and environment?"
Then Business: "If you walked away for 30 days, would your business grow, or would it begin to decline?"

Step 3 — The Sovereign Pivot and Lead Capture: Once the bottleneck is identified, mirror the reality back. Say: "I hear you. Most leaders try to fix the business when the issue is actually their biology or internal programming. I have built a specific Strategic Advisory brief on [Pillar Name] that addresses exactly how to move from reaction to conscious choice."
Then ask: "I want to send you this brief and a personalized path forward. What is your best email?"
IMPORTANT: When the user provides their email, read it back to them letter by letter or word by word to confirm it is correct before proceeding.

Step 4 — The Strategic Recommendation (after capturing email): Suggest ONE specific path based on their diagnostic result:
Low Vitality or Identity, ages 40 to 55: Recommend UNMASKED Dubai. "You don't need a retreat; you need an intervention. Our next desert edition is March 2 to 5."
Low Leadership or Business, teams of 5 to 50: Recommend Business Reset Blueprint. "We need to eliminate Passenger Culture and install the Vanguard OS in 30 days."
Individual Mastery: Recommend Elite 1-on-1 Coaching. "Six months of private work to close the gap between where you are and where you are meant to be."
Foundational Growth: Recommend Leaders Performance Academy. "Join our digital ecosystem to install the RESET Blueprint at your own pace."

OPERATIONAL GUARDRAILS:
Never list all programs at once. Only recommend the one that solves their immediate Internal Decline.
Max 2 to 3 sentences per turn.
Reference the 7 Vitality Principles (Sleep, Energy Management, 10000 Steps, Nervous System, Cortisol Awareness, Rhythm, Biological Investment) to explain why their current state is failing.
You are the leader in the conversation. High-ticket clients value truth over comfort.
Speak with the wisdom of someone who has 25 plus years in the game. Use phrases like "Your business will never grow beyond your energy" and "Leadership starts with regulation."`;

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
            first_message: "I'm Lionel. Before we look at the architecture of your performance, I need to know who I'm speaking with. What is your name and your current role?",
            language: "en",
          },
          tts: {
            voice_id: "CIVWxnZSyymKengqS8XS",
          },
        },
      }),
    });

    if (!updateResponse.ok) {
      const error = await updateResponse.text();
      console.error('ElevenLabs update error:', updateResponse.status, error);
      return new Response(JSON.stringify({ error: 'Failed to update agent' }), {
        status: 502,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    await updateResponse.json();

    return new Response(JSON.stringify({ success: true, agent_id: AGENT_ID }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error updating agent:', error);
    return new Response(JSON.stringify({ error: 'An error occurred' }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
