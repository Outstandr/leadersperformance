import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { result, responses, userInfo, language } = await req.json();
    const lang = language === "nl" ? "nl" : "en";
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");

    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY not configured");
    }

    const sectionSummary = result.sectionScores
      .map((s: any) => `${s.label}: ${s.score}% (${s.color})`)
      .join("\n");

    const prompt = `You are an expert business consultant specializing in scaling companies and structural diagnostics. Analyze the following Profit Leak Scan results and generate a detailed Growth Barrier Report.

COMPANY: ${userInfo.company}
FOUNDER: ${userInfo.fullName}
REVENUE TIER: ${result.revenue}
GROWTH PHASE: ${result.growthPhase[lang]}
OVERALL SCORE: ${result.overallScore}/100 (${result.overallColor})
PRIMARY BOTTLENECK: ${result.primaryBottleneck[lang]}

SECTION SCORES:
${sectionSummary}

ESTIMATED LEAKAGE: ${result.leakageEstimate.low}% - ${result.leakageEstimate.high}% of potential profit

Generate a JSON response with these fields (all in ${lang === "nl" ? "Dutch" : "English"}):
{
  "structural_diagnosis": "2-3 paragraphs analyzing the company's structural health based on scores",
  "financial_leakage_analysis": "1-2 paragraphs on the hidden financial costs of their structural issues", 
  "core_bottleneck": "The single biggest issue (short phrase)",
  "bottleneck_explanation": "1-2 paragraphs explaining why this bottleneck exists and its impact",
  "priority_fixes": ["3-4 specific actions they should take first"],
  "growth_phase_insight": "1 paragraph about what companies at this stage typically experience",
  "intervention_recommendation": "1-2 paragraphs on whether they should seek external intervention and why"
}

Be direct, strategic, and specific. No generic advice. Reference their actual scores. Write as a seasoned strategist, not a coach.`;

    const aiResponse = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "openai/gpt-5-mini",
        messages: [{ role: "user", content: prompt }],
        response_format: { type: "json_object" },
        temperature: 0.7,
      }),
    });

    if (!aiResponse.ok) {
      const errText = await aiResponse.text();
      console.error("AI API error:", errText);
      throw new Error(`AI API error: ${aiResponse.status}`);
    }

    const aiData = await aiResponse.json();
    const report = JSON.parse(aiData.choices[0].message.content);

    return new Response(JSON.stringify({ report }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
