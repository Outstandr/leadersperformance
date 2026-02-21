import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

interface AssessmentData {
  firstName: string;
  lastName: string;
  responses: Record<string, number>;
  scores: {
    selfDiscipline: number;
    impulseControl: number;
    consistency: number;
    overall: number;
  };
  disciplineType: string;
  language: string;
}

function sanitizeString(input: unknown, maxLength = 100): string {
  if (typeof input !== "string") return "";
  return input.trim().slice(0, maxLength).replace(/[\n\r]/g, " ").replace(/[<>"']/g, "").replace(/\s+/g, " ");
}

function validateScore(score: unknown): number {
  const num = Number(score);
  if (!Number.isFinite(num) || num < 1 || num > 5) throw new Error("Invalid score value");
  return num;
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { assessmentData } = await req.json() as { assessmentData: AssessmentData };
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    // Sanitize and validate all user inputs
    const safeName = sanitizeString(assessmentData.firstName, 50);
    const safeLastName = sanitizeString(assessmentData.lastName, 50);
    const safeLanguage = assessmentData.language === 'nl' ? 'nl' : 'en';
    const safeDisciplineType = sanitizeString(assessmentData.disciplineType, 50);

    // Validate all numeric scores
    const validatedResponses: Record<string, number> = {};
    for (const key of ['q1', 'q2', 'q3', 'q4', 'q8', 'q9', 'q10', 'q15', 'q16', 'q17']) {
      validatedResponses[key] = validateScore(assessmentData.responses[key]);
    }

    const validatedScores = {
      selfDiscipline: Math.max(0, Math.min(100, Number(assessmentData.scores.selfDiscipline) || 0)),
      impulseControl: Math.max(0, Math.min(100, Number(assessmentData.scores.impulseControl) || 0)),
      consistency: Math.max(0, Math.min(100, Number(assessmentData.scores.consistency) || 0)),
      overall: Math.max(0, Math.min(100, Number(assessmentData.scores.overall) || 0)),
    };

    const languageInstructions = safeLanguage === 'nl' 
      ? 'Respond entirely in Dutch (Nederlands).' 
      : 'Respond in English.';

    const systemPrompt = `You are an expert leadership coach and behavioral psychologist specializing in discipline assessment. ${languageInstructions}

Based on the user's discipline assessment results, generate personalized insights that are specific, actionable, and encouraging.

IMPORTANT: Do NOT include question references like (Q1), (Q17), (Q16) etc. in your output. Write natural sentences without referencing question numbers.

The assessment measures three domains:
- Self-Discipline (0-100): Ability to follow through on commitments and maintain focus
- Impulse Control (0-100): Ability to resist immediate gratification and manage reactions
- Consistency (0-100): Ability to maintain routines and bounce back from setbacks

Discipline Types:
- The Starter: Great at beginning projects but struggles with long-term consistency
- The Sprinter: Intense bursts of effort but prone to burnout
- The Natural: Strong discipline across all areas
- The Perfectionist: Extremely disciplined but sometimes too rigid
- The Steady Climber: Consistent across areas but could optimize efficiency`;

    const userPrompt = `Generate personalized insights for ${safeName} based on their assessment:

Scores:
- Self-Discipline: ${validatedScores.selfDiscipline.toFixed(1)}/100
- Impulse Control: ${validatedScores.impulseControl.toFixed(1)}/100
- Consistency: ${validatedScores.consistency.toFixed(1)}/100
- Overall Score: ${validatedScores.overall.toFixed(1)}/100
- Discipline Type: ${safeDisciplineType}

Individual Responses (1-5 scale):
- Q1 (Follow through on commitments): ${validatedResponses.q1}
- Q2 (Maintain focus on long-term goals): ${validatedResponses.q2}
- Q3 (Give up on sustained effort tasks - reverse): ${validatedResponses.q3}
- Q4 (Resist immediate pleasures): ${validatedResponses.q4}
- Q8 (Act on impulse - reverse): ${validatedResponses.q8}
- Q9 (Control reactions under stress): ${validatedResponses.q9}
- Q10 (Regret purchases - reverse): ${validatedResponses.q10}
- Q15 (Maintain daily routines): ${validatedResponses.q15}
- Q16 (Productivity varies dramatically - reverse): ${validatedResponses.q16}
- Q17 (Bounce back from setbacks): ${validatedResponses.q17}`;

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
          { role: "user", content: userPrompt }
        ],
        tools: [
          {
            type: "function",
            function: {
              name: "generate_insights",
              description: "Generate personalized discipline assessment insights",
              parameters: {
                type: "object",
                properties: {
                  strengths: {
                    type: "array",
                    items: { type: "string" },
                    description: "3 specific strengths based on high-scoring behaviors"
                  },
                  improvements: {
                    type: "array",
                    items: { type: "string" },
                    description: "3 areas for improvement based on low-scoring behaviors"
                  },
                  recommendations: {
                    type: "array",
                    items: { type: "string" },
                    description: "5 actionable steps for weak areas"
                  },
                  insights: {
                    type: "array",
                    items: { type: "string" },
                    description: "3 deep psychological patterns observed"
                  },
                  personalizedMessage: {
                    type: "string",
                    description: "2-sentence compelling personalized message for the user"
                  }
                },
                required: ["strengths", "improvements", "recommendations", "insights", "personalizedMessage"],
                additionalProperties: false
              }
            }
          }
        ],
        tool_choice: { type: "function", function: { name: "generate_insights" } }
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
        return new Response(JSON.stringify({ error: "Payment required, please add funds to your AI workspace." }), {
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

    const insights = JSON.parse(toolCall.function.arguments);

    return new Response(JSON.stringify({ insights }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("Assessment insights error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
