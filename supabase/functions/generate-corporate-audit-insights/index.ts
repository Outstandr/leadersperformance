import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

function sanitizeString(input: unknown, maxLength = 100): string {
  if (typeof input !== "string") return "";
  return input.trim().slice(0, maxLength).replace(/[\n\r]/g, " ").replace(/[<>"']/g, "").replace(/\s+/g, " ");
}

function validateAnswer(val: unknown): number {
  const num = Number(val);
  if (!Number.isInteger(num) || num < 1 || num > 4) throw new Error("Invalid answer value");
  return num;
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { score, tier, answers, firstName, language } = await req.json();
    
    // Sanitize and validate inputs
    const safeName = sanitizeString(firstName, 50);
    const isNL = language === "nl";
    const safeScore = Math.max(0, Math.min(100, Math.round(Number(score) || 0)));
    const validTiers = ["Nursery", "Drift", "Vanguard"];
    const safeTier = validTiers.includes(tier) ? tier : "unknown";
    
    // Validate answers
    const validatedAnswers: Record<string, number> = {};
    for (const key of ['q1', 'q2', 'q3', 'q4', 'q5', 'q6', 'q7']) {
      validatedAnswers[key] = validateBinaryAnswer(answers?.[key]);
    }

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

    const answerSummary = Object.entries(validatedAnswers)
      .map(([key, val]) => `${questionLabels[key] || key}: ${val === 10 ? "STRONG" : "WEAK"}`)
      .join("\n");

    const languageInstruction = isNL
      ? "\n\nCRITICAL LANGUAGE REQUIREMENT: You MUST write ALL output ENTIRELY in Dutch (Nederlands). Every single word of the headline, reality check, action plan items, and closing MUST be written in Dutch. Do NOT use any English words or phrases. This is a strict requirement."
      : "";

    const systemPrompt = `You are Lionel Eersteling. You are a high-ticket corporate strategist. You are direct, confrontational, and professional. You do not use fluff. You do not offer 'hugs.' You offer truth.${isNL ? " You MUST respond ENTIRELY in Dutch (Nederlands). Not a single word in English." : ""}

TASK: Analyze the user's 'Discipline Score' based on the inputs provided.
USER SCORE: ${safeScore}/100 (Tier: ${safeTier})
USER ANSWERS:
${answerSummary}

OUTPUT FORMAT (JSON for PDF Generation):
- HEADLINE: Based on the Tier (Nursery / Drift / Vanguard).
- THE REALITY CHECK: A 3-sentence paragraph explaining exactly why they are losing money based on their specific bad answers. Use the phrase '${isNL ? "De kosten hiervan zijn..." : "The cost of this is..."}'
- THE ACTION PLAN: 3 Bullet points of immediate correction. (e.g., '${isNL ? "Stop met het accepteren van excuses" : "Stop accepting excuses"}', '${isNL ? "Ontsla de zwakste schakel" : "Fire the weakest link"}').
- THE CLOSING: '${isNL ? "Je kunt geen chaos schalen. Boek het gesprek." : "You cannot scale chaos. Book the call."}' or similar powerful closing.

TONE RULES:
- Never say '${isNL ? "Het is oké." : "It's okay."}'
- Never say '${isNL ? "Maak je geen zorgen." : "Don't worry."}'
- Say: '${isNL ? "Dit is een risico." : "This is a liability."}' '${isNL ? "Los dit op." : "Fix this."}' '${isNL ? "Uitvoeren." : "Execute."}'
- Keep it short.${languageInstruction}`;

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
            content: `Generate the audit analysis for ${safeName}. Score: ${safeScore}, Tier: ${safeTier}.`,
          },
        ],
        tools: [
          {
            type: "function",
            function: {
              name: "generate_audit_insights",
              description: isNL
                ? "Genereer bedrijfsdiscipline audit inzichten. ALLES MOET IN HET NEDERLANDS."
                : "Generate corporate discipline audit insights",
              parameters: {
                type: "object",
                properties: {
                  headline: {
                    type: "string",
                    description: isNL
                      ? "Vetgedrukte kop in het NEDERLANDS gebaseerd op tier, bijv. 'JOUW BEDRIJF IS EEN KLEUTERKLAS' of 'JE DRIJFT AF' of 'VOORHOEDE STATUS'"
                      : "Bold headline based on tier, e.g. 'YOUR BUSINESS IS A NURSERY' or 'YOU ARE DRIFTING' or 'VANGUARD STATUS'",
                  },
                  realityCheck: {
                    type: "string",
                    description: isNL
                      ? "Paragraaf van 3 zinnen IN HET NEDERLANDS die uitlegt waarom ze geld verliezen. Moet 'De kosten hiervan zijn...' bevatten."
                      : "3-sentence paragraph explaining why they are losing money based on their weak answers. Must include 'The cost of this is...'",
                  },
                  actionPlan: {
                    type: "array",
                    items: { type: "string" },
                    description: isNL
                      ? "Precies 3 actiepunten IN HET NEDERLANDS voor onmiddellijke correctie"
                      : "Exactly 3 bullet points of immediate correction actions",
                  },
                  closing: {
                    type: "string",
                    description: isNL
                      ? "Krachtige afsluiting IN HET NEDERLANDS, bijv. 'Je kunt geen chaos schalen. Boek het gesprek.'"
                      : "Powerful closing statement. e.g. 'You cannot scale chaos. Book the call.'",
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
