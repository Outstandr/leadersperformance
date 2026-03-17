import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

function sanitize(val: unknown, maxLen = 500): string {
  if (typeof val !== "string") return "";
  return val.trim().slice(0, maxLen).replace(/[<>"]/g, "");
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { assessmentData, userInfo, language } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");

    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    const safeName = sanitize(userInfo?.fullName, 100);
    const safeLang = language === "nl" ? "nl" : "en";
    const langInstruction = safeLang === "nl" ? "Respond entirely in Dutch (Nederlands)." : "Respond in English.";

    const situationTypes = Array.isArray(assessmentData.situation_types)
      ? assessmentData.situation_types.map((s: unknown) => sanitize(s, 100)).join(", ")
      : "";
    const capitalExposure = sanitize(assessmentData.capital_exposure, 50);
    const timeline = sanitize(assessmentData.timeline, 50);
    const evidenceTypes = Array.isArray(assessmentData.evidence_types)
      ? assessmentData.evidence_types.map((s: unknown) => sanitize(s, 100)).join(", ")
      : "";
    const jurisdictions = Array.isArray(assessmentData.jurisdictions)
      ? assessmentData.jurisdictions.map((s: unknown) => sanitize(s, 100)).join(", ")
      : "";
    const legalStatus = sanitize(assessmentData.legal_status, 50);
    const objective = sanitize(assessmentData.objective, 100);
    const situationSummary = sanitize(assessmentData.situation_summary, 2000);

    const systemPrompt = `You are a senior strategic advisor specializing in capital protection, founder disputes, fraud investigation, and cross-border financial recovery. ${langInstruction}

Based on a founder's Capital Protection Assessment submission, generate a professional strategic report. Be specific, data-driven, and actionable. Write for a sophisticated founder audience.

Do NOT use generic language. Reference the specific situation types, exposure amounts, and jurisdictions provided.`;

    const userPrompt = `Generate a Capital Protection Assessment Report for ${safeName}:

Assessment Data:
- Situation Types: ${situationTypes}
- Capital Exposure: ${capitalExposure}
- Timeline: ${timeline}
- Evidence Available: ${evidenceTypes}
- Jurisdictions Involved: ${jurisdictions}
- Legal Status: ${legalStatus}
- Primary Objective: ${objective}
- Situation Summary: ${situationSummary}`;

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
          { role: "user", content: userPrompt },
        ],
        tools: [
          {
            type: "function",
            function: {
              name: "generate_report",
              description: "Generate a structured capital protection assessment report",
              parameters: {
                type: "object",
                properties: {
                  situation_summary: {
                    type: "string",
                    description: "2-3 paragraph narrative summarizing the situation based on the assessment data",
                  },
                  risk_level: {
                    type: "string",
                    enum: ["High Recovery Potential", "Moderate Strategic Complexity", "Limited Recovery Potential"],
                    description: "The overall risk/recovery assessment level",
                  },
                  risk_indicators: {
                    type: "array",
                    items: { type: "string" },
                    description: "4-6 specific risk indicators identified from the assessment",
                  },
                  strategic_paths: {
                    type: "array",
                    items: { type: "string" },
                    description: "3-5 possible strategic paths forward",
                  },
                  recommended_next_step: {
                    type: "string",
                    description: "Clear recommended next step, mentioning Lionel Eersteling as the specialist",
                  },
                  recovery_potential: {
                    type: "string",
                    enum: ["high", "moderate", "limited"],
                    description: "Recovery potential classification",
                  },
                },
                required: ["situation_summary", "risk_level", "risk_indicators", "strategic_paths", "recommended_next_step", "recovery_potential"],
                additionalProperties: false,
              },
            },
          },
        ],
        tool_choice: { type: "function", function: { name: "generate_report" } },
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limits exceeded, please try again later." }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "Payment required." }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      return new Response(JSON.stringify({ error: "AI gateway error" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
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
    console.error("Capital protection report error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
