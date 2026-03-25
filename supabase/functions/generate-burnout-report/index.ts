import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const { fbrScore, fbrColor, phase, phaseNumber, phaseLabel, domainScores, primaryRiskDomain, recoveryWith, recoveryWithout, diagnosis, recommendation, fullResponses, language } = await req.json();

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY not configured");

    // Build detailed answer context
    const answerDetails = Object.entries(fullResponses || {})
      .map(([qId, val]) => `${qId}: ${val}/4`)
      .join(", ");

    const domainBreakdown = (domainScores || [])
      .map((d: any) => `${d.label}: ${d.score}% (${d.color})`)
      .join("\n");

    const prompt = `You are an elite executive burnout diagnostician. Generate a deeply personal, clinical-grade Founder Burnout Diagnostic Report based on the following scan data.

SCAN DATA:
- Overall Burnout Risk Score: ${fbrScore}/100 (${fbrColor})
- Burnout Phase: ${phaseLabel} (Phase ${phaseNumber}/5)
- Recovery Without Intervention: ${recoveryWithout}
- Recovery With Intervention: ${recoveryWith}
- Primary Risk Domain: ${primaryRiskDomain?.label}

DOMAIN SCORES:
${domainBreakdown}

RAW QUESTION RESPONSES (1=strongly disagree, 4=strongly agree):
${answerDetails}

QUESTION CONTEXT:
- dq1-dq8: Founder Pressure Load (decision burden, workload, delegation, weight of success, calendar, financial pressure, conflict management, people dependency)
- dq9-dq16: Nervous System Depletion (sleep, physical symptoms, energy fluctuation, substance reliance, chronic anxiety, memory decline, emotional numbness, physical exhaustion)
- dq17-dq24: Business Dependency (revenue impact of absence, client relationships, team crisis handling, no second-in-command, undocumented processes, sales dependency, decision escalation, operational fragility)
- dq25-dq32: Recovery Capacity (exercise routine, outside relationships, vacation quality, hobbies, diet, trusted advisor, weekend recovery, health optimism) — REVERSE SCORED

GENERATE THE FOLLOWING SECTIONS IN ${language === "nl" ? "Dutch" : "English"}:

1. **Executive Summary** (3-4 sentences): A direct, unflinching assessment of the founder's current state. No corporate fluff.

2. **Pressure Architecture Analysis** (4-5 sentences): Analyze HOW the founder's pressure is structured based on their specific answers. Identify the compounding patterns between domains.

3. **Nervous System Status** (3-4 sentences): Clinical-style assessment of their physiological state based on dq9-dq16 answers. Reference specific indicators.

4. **Structural Vulnerability Map** (3-4 sentences): How their business dependency creates a trap that prevents recovery. Reference their specific organizational gaps.

5. **Recovery Infrastructure Assessment** (3-4 sentences): Evaluate their current recovery systems and what's missing based on dq25-dq32.

6. **Cross-Domain Risk Interactions** (3-4 sentences): Identify how their weakest domains compound each other. Explain the specific cascade effect.

7. **90-Day Trajectory Without Intervention** (3-4 sentences): Project what happens if nothing changes based on their current scores and phase.

8. **Strategic Intervention Protocol** (4-5 bullet points): Specific, actionable steps ranked by urgency. Not generic advice — tailored to their pattern.

9. **Critical Warning** (2-3 sentences): The single most important thing this founder needs to hear right now.

FORMAT: Return valid JSON with this structure:
{
  "executive_summary": "...",
  "pressure_architecture": "...",
  "nervous_system_status": "...",
  "structural_vulnerability": "...",
  "recovery_infrastructure": "...",
  "cross_domain_risks": "...",
  "trajectory_90_day": "...",
  "intervention_protocol": ["step1", "step2", "step3", "step4", "step5"],
  "critical_warning": "..."
}

Be brutally honest. This is a $195 diagnostic — deliver accordingly.`;

    const response = await fetch("https://api.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: "You are a clinical executive performance diagnostician. Return ONLY valid JSON. No markdown wrapping." },
          { role: "user", content: prompt },
        ],
        response_format: { type: "json_object" },
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error("AI API error:", errText);
      throw new Error(`AI API error: ${response.status}`);
    }

    const aiData = await response.json();
    const content = aiData.choices?.[0]?.message?.content;
    
    let report;
    try {
      report = JSON.parse(content);
    } catch {
      console.error("Failed to parse AI response:", content);
      throw new Error("Failed to parse AI report");
    }

    return new Response(JSON.stringify({ report }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error: any) {
    console.error("Error generating burnout report:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
