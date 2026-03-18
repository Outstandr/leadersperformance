import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

function sanitizeString(input: unknown, maxLength = 200): string {
  if (typeof input !== "string") return "";
  return input.trim().slice(0, maxLength).replace(/[\n\r]/g, " ").replace(/[<>"']/g, "").replace(/\s+/g, " ");
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { firstName, language, score, tier, tierLabel, responses, role, country } = await req.json();

    const safeName = sanitizeString(firstName, 50);
    const isNL = language === "nl";
    const safeScore = Math.max(0, Math.min(100, Math.round(Number(score) || 0)));
    const safeTier = sanitizeString(tierLabel, 50);
    const safeRole = sanitizeString(role, 30);
    const safeCountry = sanitizeString(country, 50);

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    // Build response summary
    const questionLabels: Record<string, string> = {
      ca1: "Situation Type",
      ca2: "Capital Exposure",
      ca3: "Timeline",
      ca4: "Evidence Available",
      ca5: "Jurisdictions Involved",
      ca6: "Legal Status",
      ca7: "Objective",
      ca8: "Situation Summary",
      ca9: "Consent for Review",
    };

    const responseSummary = Object.entries(responses || {})
      .map(([key, val]) => {
        const label = questionLabels[key] || key;
        const displayVal = Array.isArray(val) ? val.join(", ") : String(val);
        return `${label}: ${displayVal}`;
      })
      .join("\n");

    const languageInstruction = isNL
      ? "\n\nCRITICAL LANGUAGE REQUIREMENT: You MUST write ALL output ENTIRELY in Dutch (Nederlands). Do NOT use any English words or phrases."
      : "";

    const systemPrompt = `You are Lionel Eersteling. You are a strategic advisor specialized in founder protection, capital recovery, fraud investigation, and cross-jurisdictional disputes. You are professional, strategic, and thorough. You provide honest assessments.${isNL ? " You MUST respond ENTIRELY in Dutch (Nederlands)." : ""}

TASK: Generate a Founder Protection Report based on the Capital Protection Assessment results.

FOUNDER INFO:
- Name: ${safeName}
- Role: ${safeRole}
- Country: ${safeCountry}
- Assessment Score: ${safeScore}/100 (Tier: ${safeTier})

ASSESSMENT RESPONSES:
${responseSummary}

CONTEXT: This assessment is designed for founders dealing with serious financial exposure including fraud, partner disputes, misappropriation of funds, or lost capital. The report should evaluate whether strategic recovery or intervention may be possible.

OUTPUT: Generate a comprehensive strategic assessment report with situation analysis, risk level, key indicators, possible strategic paths, and recommended next steps. Be specific to the responses provided.

TONE RULES:
- Professional and confidential
- Strategic and analytical
- Honest about recovery potential based on the information provided
- Focus on actionable paths forward
- Do not make promises about outcomes${languageInstruction}`;

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
            content: `Generate the Founder Protection Report for ${safeName}. Score: ${safeScore}/100, Tier: ${safeTier}.`,
          },
        ],
        tools: [
          {
            type: "function",
            function: {
              name: "generate_capital_assessment_report",
              description: isNL
                ? "Genereer een Founder Beschermingsrapport. ALLES MOET IN HET NEDERLANDS."
                : "Generate a Founder Protection Report based on the assessment",
              parameters: {
                type: "object",
                properties: {
                  situationSummary: {
                    type: "string",
                    description: isNL
                      ? "Samenvatting van 3-4 zinnen IN HET NEDERLANDS die het type situatie, de blootstelling en de complexiteit beschrijft"
                      : "3-4 sentence summary describing the situation type, exposure level, and complexity",
                  },
                  strategicRiskLevel: {
                    type: "string",
                    description: isNL
                      ? "Beschrijving van 2-3 zinnen IN HET NEDERLANDS over het strategisch risiconiveau en de beïnvloedende factoren"
                      : "2-3 sentence description of the strategic risk level and influencing factors",
                  },
                  keyRiskIndicators: {
                    type: "array",
                    items: { type: "string" },
                    description: isNL
                      ? "3-5 specifieke risico-indicatoren IN HET NEDERLANDS geïdentificeerd uit de beoordeling"
                      : "3-5 specific risk indicators identified from the assessment responses",
                  },
                  possibleStrategicPaths: {
                    type: "array",
                    items: { type: "string" },
                    description: isNL
                      ? "3-5 mogelijke strategische paden IN HET NEDERLANDS op basis van documentatie en jurisdictie"
                      : "3-5 possible strategic paths depending on documentation and jurisdiction",
                  },
                  recommendedNextStep: {
                    type: "string",
                    description: isNL
                      ? "Concrete aanbevolen volgende stap IN HET NEDERLANDS op basis van de beoordeling"
                      : "Concrete recommended next step based on the assessment results",
                  },
                },
                required: ["situationSummary", "strategicRiskLevel", "keyRiskIndicators", "possibleStrategicPaths", "recommendedNextStep"],
                additionalProperties: false,
              },
            },
          },
        ],
        tool_choice: { type: "function", function: { name: "generate_capital_assessment_report" } },
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

    const report = JSON.parse(toolCall.function.arguments);

    return new Response(JSON.stringify({ report }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("Capital assessment insights error:", e);
    return new Response(
      JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
