import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { score, tier, answers, firstName } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");

    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    const questionLabels: Record<string, string> = {
      q1: "Morning Standard (punctuality)",
      q2: "Silence Test (autonomy without CEO)",
      q3: "Deadline Protocol (accountability)",
      q4: "Confrontation (peer regulation)",
      q5: "Meeting Tax (meeting discipline)",
      q6: "Problem Solver (solution orientation)",
      q7: "The Mirror (would re-hire team)",
    };

    const answerSummary = Object.entries(answers)
      .map(([key, val]) => `${questionLabels[key] || key}: ${val === 10 ? "STRONG" : "WEAK"}`)
      .join("\n");

    const systemPrompt = `You are Lionel Eersteling. You are a high-ticket corporate strategist. You are direct, confrontational, and professional. You do not use fluff. You do not offer 'hugs.' You offer truth.

TASK: Analyze the user's 'Discipline Score' based on the inputs provided.
USER SCORE: ${score}/100 (Tier: ${tier})
USER ANSWERS:
${answerSummary}

OUTPUT FORMAT (JSON for PDF Generation):
- HEADLINE: Based on the Tier (Nursery / Drift / Vanguard).
- THE REALITY CHECK: A 3-sentence paragraph explaining exactly why they are losing money based on their specific bad answers. Use the phrase 'The cost of this is...'
- THE ACTION PLAN: 3 Bullet points of immediate correction. (e.g., 'Stop accepting excuses', 'Fire the weakest link').
- THE CLOSING: 'You cannot scale chaos. Book the call.' or similar powerful closing.

TONE RULES:
- Never say 'It's okay.'
- Never say 'Don't worry.'
- Say: 'This is a liability.' 'Fix this.' 'Execute.'
- Keep it short.`;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          { role: "system", content: systemPrompt },
          {
            role: "user",
            content: `Generate the audit analysis for ${firstName}. Score: ${score}, Tier: ${tier}.`,
          },
        ],
        tools: [
          {
            type: "function",
            function: {
              name: "generate_audit_insights",
              description: "Generate corporate discipline audit insights",
              parameters: {
                type: "object",
                properties: {
                  headline: {
                    type: "string",
                    description:
                      "Bold headline based on tier, e.g. 'YOUR BUSINESS IS A NURSERY' or 'YOU ARE DRIFTING' or 'VANGUARD STATUS'",
                  },
                  realityCheck: {
                    type: "string",
                    description:
                      "3-sentence paragraph explaining why they are losing money based on their weak answers. Must include 'The cost of this is...'",
                  },
                  actionPlan: {
                    type: "array",
                    items: { type: "string" },
                    description: "Exactly 3 bullet points of immediate correction actions",
                  },
                  closing: {
                    type: "string",
                    description:
                      "Powerful closing statement. e.g. 'You cannot scale chaos. Book the call.'",
                  },
                },
                required: ["headline", "realityCheck", "actionPlan", "closing"],
                additionalProperties: false,
              },
            },
          },
        ],
        tool_choice: { type: "function", function: { name: "generate_audit_insights" } },
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Rate limits exceeded, please try again later." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "Payment required." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      return new Response(
        JSON.stringify({ error: "AI gateway error" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const data = await response.json();
    const toolCall = data.choices?.[0]?.message?.tool_calls?.[0];

    if (!toolCall?.function?.arguments) {
      throw new Error("Invalid AI response format");
    }

    const insights = JSON.parse(toolCall.function.arguments);

    return new Response(JSON.stringify({ insights }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("Corporate audit insights error:", e);
    return new Response(
      JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
