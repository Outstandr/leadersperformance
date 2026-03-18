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

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { score, tier, answers, firstName, language, sections } = await req.json();

    const safeName = sanitizeString(firstName, 50);
    const isNL = language === "nl";
    const safeScore = Math.max(0, Math.min(100, Math.round(Number(score) || 0)));
    const validTiers = ["Low Risk", "Moderate Risk", "High Risk", "Critical Risk", "Laag Risico", "Matig Risico", "Hoog Risico", "Kritiek Risico"];
    const safeTier = validTiers.includes(tier) ? tier : "unknown";

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    const sectionLabels: Record<string, string> = {
      company_structure: "Company Structure",
      investor_agreements: "Investor Agreements",
      capital_control: "Capital Control",
      crypto_exposure: "Crypto Exposure",
      financial_transparency: "Financial Transparency",
      risk_indicators: "Risk Indicators",
    };

    const sectionSummary = (sections || [])
      .map((s: { section: string; score: number; color: string }) =>
        `${sectionLabels[s.section] || s.section}: ${s.score}% (${s.color})`
      )
      .join("\n");

    const languageInstruction = isNL
      ? "\n\nCRITICAL LANGUAGE REQUIREMENT: You MUST write ALL output ENTIRELY in Dutch (Nederlands). Every single word MUST be written in Dutch. Do NOT use any English words or phrases."
      : "";

    const systemPrompt = `You are Lionel Eersteling. You are a strategic advisor specialized in founder capital protection, financial governance, and fraud prevention. You are direct, professional, and strategic. You do not use fluff.${isNL ? " You MUST respond ENTIRELY in Dutch (Nederlands)." : ""}

TASK: Analyze the founder's Capital Protection Scan results and provide strategic insights.
USER SCORE: ${safeScore}/100 (Tier: ${safeTier})

SECTION SCORES:
${sectionSummary}

CONTEXT: This scan assesses whether a founder's company structure protects against financial disputes, fraud, or capital loss. Sections cover: company structure (holding, shareholder agreements), investor agreements, capital control (bank account access), crypto exposure (wallet security), financial transparency (reporting, audits), and risk indicators (partner conflicts, informal deals).

OUTPUT: Provide a strategic analysis tailored to the specific weaknesses identified. Focus on actionable protective measures and structural improvements.

TONE RULES:
- Professional and strategic
- Direct without being alarmist
- Focus on protective measures, not blame
- Emphasize urgency proportional to risk level${languageInstruction}`;

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
            content: `Generate the capital protection analysis for ${safeName}. Score: ${safeScore}/100, Tier: ${safeTier}.`,
          },
        ],
        tools: [
          {
            type: "function",
            function: {
              name: "generate_capital_protection_insights",
              description: isNL
                ? "Genereer strategische kapitaalbescherming inzichten. ALLES MOET IN HET NEDERLANDS."
                : "Generate strategic capital protection insights",
              parameters: {
                type: "object",
                properties: {
                  headline: {
                    type: "string",
                    description: isNL
                      ? "Krachtige kop in het NEDERLANDS die het risiconiveau samenvat"
                      : "Bold headline summarizing the risk level and key finding",
                  },
                  situationAnalysis: {
                    type: "string",
                    description: isNL
                      ? "Analyse van 3-4 zinnen IN HET NEDERLANDS over de structurele kwetsbaarheden op basis van de scores"
                      : "3-4 sentence analysis of the structural vulnerabilities based on the section scores",
                  },
                  riskFactors: {
                    type: "array",
                    items: { type: "string" },
                    description: isNL
                      ? "3-5 specifieke risicofactoren IN HET NEDERLANDS geïdentificeerd uit de scan"
                      : "3-5 specific risk factors identified from the scan results",
                  },
                  strategicRecommendations: {
                    type: "array",
                    items: { type: "string" },
                    description: isNL
                      ? "3-5 strategische aanbevelingen IN HET NEDERLANDS voor bescherming"
                      : "3-5 strategic recommendations for capital protection improvement",
                  },
                  closing: {
                    type: "string",
                    description: isNL
                      ? "Krachtige afsluiting IN HET NEDERLANDS die aanzet tot actie"
                      : "Powerful closing statement that drives action",
                  },
                },
                required: ["headline", "situationAnalysis", "riskFactors", "strategicRecommendations", "closing"],
                additionalProperties: false,
              },
            },
          },
        ],
        tool_choice: { type: "function", function: { name: "generate_capital_protection_insights" } },
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
    console.error("Capital protection insights error:", e);
    return new Response(
      JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
