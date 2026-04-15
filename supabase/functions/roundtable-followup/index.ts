const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// ── Scoring ────────────────────────────────────────────────────────────

function scoreApplication(data: Record<string, string>): { total: number; breakdown: Record<string, number> } {
  const breakdown: Record<string, number> = {};

  // Q1: Strategic responsibility
  const stratMap: Record<string, number> = { 'Yes': 4, 'Partially': 2, 'No': 1 };
  breakdown.strategic_responsibility = stratMap[data.strategicResponsibility] || 1;

  // Q2: Biggest pressure (scaling-related = higher)
  const pressureMap: Record<string, number> = {
    'Growth vs structure': 4,
    'Team / leadership': 4,
    'Focus / direction': 3,
    'Cashflow / financial pressure': 3,
    'Personal (energy / mental load)': 2,
  };
  breakdown.biggest_pressure = pressureMap[data.biggestPressure] || 2;

  // Q3: Decision delay (less delay = higher score)
  const delayMap: Record<string, number> = { 'Never': 2, 'Sometimes': 3, 'Regularly': 4, 'Often': 4 };
  breakdown.decision_delay = delayMap[data.decisionDelay] || 2;

  // Q4: Absence impact (more dependency = more relevant)
  const absenceMap: Record<string, number> = {
    'It runs as usual': 1,
    'Minor slowdown': 2,
    'Major slowdown': 3,
    'It stops functioning': 4,
  };
  breakdown.absence_impact = absenceMap[data.absenceImpact] || 1;

  // Q5: Problem response (decisiveness)
  const problemMap: Record<string, number> = {
    'I decide quickly and adjust': 4,
    'I analyze thoroughly before acting': 3,
    'I involve others first': 2,
    'I delay until clarity improves': 1,
  };
  breakdown.problem_response = problemMap[data.problemResponse] || 1;

  // Q6: Resistance response
  const resistanceMap: Record<string, number> = {
    'Direct confrontation': 4,
    'Dialogue and investigation': 3,
    'I delegate it': 2,
    'Temporary avoidance': 1,
  };
  breakdown.resistance_response = resistanceMap[data.resistanceResponse] || 1;

  // Q7: Energy level
  const energyMap: Record<string, number> = {
    'High and stable': 4,
    'Fluctuating': 3,
    'Low but functional': 2,
    'Structurally depleted': 1,
  };
  breakdown.energy_level = energyMap[data.energyLevel] || 1;

  // Q8: Role & company (text depth)
  breakdown.role_depth = scoreTextDepth(data.roleAndCompany);

  // Q9: Blind spot (text depth)
  breakdown.blind_spot = scoreTextDepth(data.blindSpot);

  // Q10: Why fit (text depth)
  breakdown.why_fit = scoreTextDepth(data.whyFit);

  // Q11: Unacted truth (text depth)
  breakdown.unacted_truth = scoreTextDepth(data.unactedTruth);

  // Q12: Overall completeness bonus
  const allFilled = Object.values(data).every(v => v && v.trim().length > 0);
  breakdown.completeness = allFilled ? 4 : 2;

  const total = Object.values(breakdown).reduce((a, b) => a + b, 0);
  return { total, breakdown };
}

function scoreTextDepth(text: string): number {
  if (!text) return 1;
  const len = text.trim().length;
  if (len > 200) return 4;
  if (len > 100) return 3;
  if (len > 30) return 2;
  return 1;
}

function getRoute(score: number): 'reject' | 'hold' | 'candidate' {
  if (score <= 20) return 'reject';
  if (score <= 30) return 'hold';
  return 'candidate';
}

// ── GHL API Helpers ────────────────────────────────────────────────────

const GHL_BASE = 'https://services.leadconnectorhq.com';

async function ghlRequest(path: string, method: string, body?: any) {
  const apiKey = Deno.env.get('GHL_API_KEY')!;
  const locationId = Deno.env.get('GHL_LOCATION_ID')!;

  const url = `${GHL_BASE}${path}`;
  const headers: Record<string, string> = {
    'Authorization': `Bearer ${apiKey}`,
    'Version': '2021-07-28',
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  };

  console.log(`GHL ${method} ${path}`);
  const res = await fetch(url, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });

  const text = await res.text();
  console.log(`GHL response ${res.status}: ${text.substring(0, 500)}`);

  if (!res.ok) throw new Error(`GHL ${res.status}: ${text}`);
  return JSON.parse(text);
}

async function upsertContact(data: any) {
  const locationId = Deno.env.get('GHL_LOCATION_ID')!;
  return ghlRequest('/contacts/upsert', 'POST', {
    locationId,
    firstName: data.firstName,
    lastName: data.lastName,
    email: data.email,
    phone: data.phone || '',
    source: 'Round Table Application',
    tags: ['round-table-application', 'lead-roundtable'],
    customFields: [
      { key: 'roundtable_score', field_value: String(data.score) },
      { key: 'roundtable_route', field_value: data.route },
      { key: 'role_and_company', field_value: data.roleAndCompany },
      { key: 'strategic_responsibility', field_value: data.strategicResponsibility },
      { key: 'biggest_pressure', field_value: data.biggestPressure },
      { key: 'decision_delay', field_value: data.decisionDelay },
      { key: 'absence_impact', field_value: data.absenceImpact },
      { key: 'problem_response', field_value: data.problemResponse },
      { key: 'resistance_response', field_value: data.resistanceResponse },
      { key: 'energy_level', field_value: data.energyLevel },
      { key: 'blind_spot', field_value: data.blindSpot },
      { key: 'why_fit', field_value: data.whyFit },
      { key: 'unacted_truth', field_value: data.unactedTruth },
    ],
  });
}

async function createOpportunity(contactId: string, name: string, stageId: string) {
  const pipelineId = 'qFBbAlnrhlBtkM5r9VEZ';
  return ghlRequest('/opportunities/', 'POST', {
    pipelineId,
    stageId,
    contactId,
    name: `RT - ${name}`,
    status: 'open',
  });
}

async function sendEmail(contactId: string, subject: string, html: string) {
  return ghlRequest('/conversations/messages', 'POST', {
    type: 'Email',
    contactId,
    subject,
    html,
    emailFrom: 'Lionel Eersteling <info@leadersperformance.ae>',
  });
}

// ── Email Templates ────────────────────────────────────────────────────

function wrapEmail(content: string): string {
  return `<table style="background-color:#F5F0EB;" width="100%" cellpadding="0" cellspacing="0"><tbody><tr><td style="padding:40px 20px;" align="center">
<table style="background-color:#ffffff;max-width:600px;width:100%;" cellpadding="0" cellspacing="0"><tbody>
<tr><td style="background-color:#1a1a1a;padding:30px 40px;text-align:center;">
<img src="https://sfzdecpsvgcqmlwkjibd.supabase.co/storage/v1/object/public/websiteimages/logo-white.png" alt="Leaders Performance" width="160" style="display:block;margin:0 auto 16px;width:160px;height:auto;" />
<p style="margin:8px 0 0;font-size:20px;color:#ffffff;font-family:Georgia,serif;">The Round Table</p>
</td></tr>
<tr><td style="padding:40px;">
${content}
</td></tr>
<tr><td style="background-color:#1a1a1a;padding:20px 40px;text-align:center;">
<img src="https://sfzdecpsvgcqmlwkjibd.supabase.co/storage/v1/object/public/websiteimages/logo-white.png" alt="Leaders Performance" width="120" style="display:block;margin:0 auto;width:120px;height:auto;" />
<p style="margin:8px 0 0;font-size:11px;color:#666;">Confidential. By invitation only.</p>
</td></tr>
</tbody></table></td></tr></tbody></table>`;
}

function signoff(): string {
  return `<p style="margin:30px 0 0;font-size:14px;color:#1a1a1a;font-family:Georgia,serif;">mr. Lionel Eersteling</p>
<p style="margin:2px 0 0;font-size:12px;color:#8B7355;letter-spacing:1px;">___</p>`;
}

function emailAutoResponse(firstName: string): string {
  return wrapEmail(`
<p style="margin:0 0 20px;font-size:15px;color:#1a1a1a;font-family:Georgia,serif;line-height:1.7;">Hi ${firstName},</p>
<p style="margin:0 0 16px;font-size:15px;color:#1a1a1a;font-family:Georgia,serif;line-height:1.7;">We've received your submission for the Round Table.</p>
<p style="margin:0 0 16px;font-size:15px;color:#1a1a1a;font-family:Georgia,serif;line-height:1.7;">Each submission is reviewed carefully to determine if there is a fit for a closed session.</p>
<p style="margin:0 0 16px;font-size:15px;color:#1a1a1a;font-family:Georgia,serif;line-height:1.7;">You'll hear from us shortly.</p>
${signoff()}`);
}

function emailRejection(firstName: string): string {
  return wrapEmail(`
<p style="margin:0 0 20px;font-size:15px;color:#1a1a1a;font-family:Georgia,serif;line-height:1.7;">Hi ${firstName},</p>
<p style="margin:0 0 16px;font-size:15px;color:#1a1a1a;font-family:Georgia,serif;line-height:1.7;">Thank you for completing your submission for the Round Table.</p>
<p style="margin:0 0 16px;font-size:15px;color:#1a1a1a;font-family:Georgia,serif;line-height:1.7;">At this stage, the sessions are limited to founders and decision-makers actively dealing with scaling pressure and structural challenges.</p>
<p style="margin:0 0 16px;font-size:15px;color:#1a1a1a;font-family:Georgia,serif;line-height:1.7;">Based on your current position, I don't see a direct fit right now.</p>
<p style="margin:0 0 16px;font-size:15px;color:#1a1a1a;font-family:Georgia,serif;line-height:1.7;">Wishing you all the best.</p>
${signoff()}`);
}

function emailHoldNurture(firstName: string): string {
  return wrapEmail(`
<p style="margin:0 0 20px;font-size:15px;color:#1a1a1a;font-family:Georgia,serif;line-height:1.7;">Hi ${firstName},</p>
<p style="margin:0 0 16px;font-size:15px;color:#1a1a1a;font-family:Georgia,serif;line-height:1.7;">Thank you for your submission.</p>
<p style="margin:0 0 16px;font-size:15px;color:#1a1a1a;font-family:Georgia,serif;line-height:1.7;">I'm currently reviewing a select number of profiles for upcoming sessions.</p>
<p style="margin:0 0 16px;font-size:15px;color:#1a1a1a;font-family:Georgia,serif;line-height:1.7;">I'll come back to you once I have a clearer view of the group composition.</p>
${signoff()}`);
}

function emailInvitation(firstName: string): string {
  return wrapEmail(`
<p style="margin:0 0 20px;font-size:15px;color:#1a1a1a;font-family:Georgia,serif;line-height:1.7;">Hi ${firstName},</p>
<p style="margin:0 0 16px;font-size:15px;color:#1a1a1a;font-family:Georgia,serif;line-height:1.7;">Based on your submission for the Round Table, I'd like to invite you to a closed founder session at The Rufescent.</p>
<p style="margin:0 0 16px;font-size:15px;color:#1a1a1a;font-family:Georgia,serif;line-height:1.7;">This is a private table with a small group of founders (max 6-8), focused on real conversations around scaling, decision pressure, and leadership challenges.</p>
<p style="margin:0 0 16px;font-size:15px;color:#1a1a1a;font-family:Georgia,serif;line-height:1.7;">No presentations. No networking. No spectators.</p>
<p style="margin:0 0 16px;font-size:15px;color:#1a1a1a;font-family:Georgia,serif;line-height:1.7;">Just a direct and honest conversation.</p>
<p style="margin:0 0 16px;font-size:15px;color:#1a1a1a;font-family:Georgia,serif;line-height:1.7;">I believe you are at a stage where this environment will be valuable.</p>
<p style="margin:0 0 16px;font-size:15px;color:#1a1a1a;font-family:Georgia,serif;line-height:1.7;">Let me know if you're open to joining and I'll share the details.</p>
${signoff()}`);
}

function emailConfirmation(firstName: string): string {
  return wrapEmail(`
<p style="margin:0 0 20px;font-size:15px;color:#1a1a1a;font-family:Georgia,serif;line-height:1.7;">Hi ${firstName},</p>
<p style="margin:0 0 16px;font-size:15px;color:#1a1a1a;font-family:Georgia,serif;line-height:1.7;">Good to have you join.</p>
<p style="margin:0 0 16px;font-size:15px;color:#1a1a1a;font-family:Georgia,serif;line-height:1.7;">Here are the details:</p>
<table style="width:100%;margin:20px 0;border-collapse:collapse;">
<tr><td style="padding:10px 0;border-bottom:1px solid #eee;font-family:Georgia,serif;font-size:14px;color:#8B7355;width:140px;">Location</td><td style="padding:10px 0;border-bottom:1px solid #eee;font-family:Georgia,serif;font-size:14px;color:#1a1a1a;">The Rufescent</td></tr>
<tr><td style="padding:10px 0;border-bottom:1px solid #eee;font-family:Georgia,serif;font-size:14px;color:#8B7355;">Format</td><td style="padding:10px 0;border-bottom:1px solid #eee;font-family:Georgia,serif;font-size:14px;color:#1a1a1a;">Private roundtable</td></tr>
<tr><td style="padding:10px 0;border-bottom:1px solid #eee;font-family:Georgia,serif;font-size:14px;color:#8B7355;">Duration</td><td style="padding:10px 0;border-bottom:1px solid #eee;font-family:Georgia,serif;font-size:14px;color:#1a1a1a;">90 minutes</td></tr>
<tr><td style="padding:10px 0;border-bottom:1px solid #eee;font-family:Georgia,serif;font-size:14px;color:#8B7355;">Group size</td><td style="padding:10px 0;border-bottom:1px solid #eee;font-family:Georgia,serif;font-size:14px;color:#1a1a1a;">6-8 founders</td></tr>
</table>
<p style="margin:16px 0;font-size:15px;color:#1a1a1a;font-family:Georgia,serif;line-height:1.7;">Each session is centered around one specific theme related to leadership and scaling.</p>
<p style="margin:0 0 16px;font-size:15px;color:#1a1a1a;font-family:Georgia,serif;line-height:1.7;">A meal will be part of the setting (breakfast, lunch, or dinner depending on the session).</p>
<p style="margin:0 0 16px;font-size:15px;color:#1a1a1a;font-family:Georgia,serif;line-height:1.7;">Please confirm your attendance.</p>
${signoff()}`);
}

function emailPreparation(firstName: string): string {
  return wrapEmail(`
<p style="margin:0 0 20px;font-size:15px;color:#1a1a1a;font-family:Georgia,serif;line-height:1.7;">Hi ${firstName},</p>
<p style="margin:0 0 16px;font-size:15px;color:#1a1a1a;font-family:Georgia,serif;line-height:1.7;">Before joining the session, read this carefully.</p>
<p style="margin:0 0 16px;font-size:15px;color:#1a1a1a;font-family:Georgia,serif;line-height:1.7;font-weight:bold;">This is not an event. This is a closed working session.</p>

<p style="margin:24px 0 8px;font-size:13px;letter-spacing:2px;color:#8B7355;text-transform:uppercase;font-family:Georgia,serif;">Format</p>
<ul style="margin:0 0 20px;padding-left:20px;font-size:14px;color:#1a1a1a;font-family:Georgia,serif;line-height:2;">
<li>Duration: 90 minutes</li>
<li>Group: max 6-8 founders</li>
<li>One central theme per session</li>
</ul>

<p style="margin:24px 0 8px;font-size:13px;letter-spacing:2px;color:#8B7355;text-transform:uppercase;font-family:Georgia,serif;">What to Expect</p>
<ul style="margin:0 0 20px;padding-left:20px;font-size:14px;color:#1a1a1a;font-family:Georgia,serif;line-height:2;">
<li>Direct, honest conversations</li>
<li>Real situations, not theory</li>
<li>No presentations or pitches</li>
</ul>

<p style="margin:24px 0 8px;font-size:13px;letter-spacing:2px;color:#8B7355;text-transform:uppercase;font-family:Georgia,serif;">Rules of the Table</p>
<ul style="margin:0 0 20px;padding-left:20px;font-size:14px;color:#1a1a1a;font-family:Georgia,serif;line-height:2;">
<li>No selling, no promoting</li>
<li>No interruptions or dominance</li>
<li>Full confidentiality -- what is shared at the table stays at the table</li>
<li>Respect for each participant</li>
</ul>
<p style="margin:0 0 16px;font-size:15px;color:#1a1a1a;font-family:Georgia,serif;line-height:1.7;">This is a safe environment. Everyone is expected to speak openly.</p>

<p style="margin:24px 0 8px;font-size:13px;letter-spacing:2px;color:#8B7355;text-transform:uppercase;font-family:Georgia,serif;">Dress Code</p>
<p style="margin:0 0 20px;font-size:14px;color:#1a1a1a;font-family:Georgia,serif;line-height:1.7;">Business attire is required. No casual wear such as t-shirts, shorts, or slippers.</p>

<p style="margin:24px 0 8px;font-size:13px;letter-spacing:2px;color:#8B7355;text-transform:uppercase;font-family:Georgia,serif;">Preparation</p>
<p style="margin:0 0 16px;font-size:15px;color:#1a1a1a;font-family:Georgia,serif;line-height:1.7;">Come prepared with one clear answer:</p>
<p style="margin:0 0 16px;font-size:15px;color:#1a1a1a;font-family:Georgia,serif;line-height:1.7;font-style:italic;">Where is your business currently under the most pressure?</p>
<p style="margin:0 0 16px;font-size:15px;color:#1a1a1a;font-family:Georgia,serif;line-height:1.7;">Be specific.</p>
${signoff()}`);
}

function emailConfidentiality(firstName: string): string {
  return wrapEmail(`
<p style="margin:0 0 20px;font-size:15px;color:#1a1a1a;font-family:Georgia,serif;line-height:1.7;">Hi ${firstName},</p>
<p style="margin:0 0 16px;font-size:15px;color:#1a1a1a;font-family:Georgia,serif;line-height:1.7;">To maintain a high-trust environment, all participants are expected to respect full confidentiality.</p>
<p style="margin:0 0 16px;font-size:15px;color:#1a1a1a;font-family:Georgia,serif;line-height:1.7;">What is shared at the table stays at the table.</p>
<p style="margin:0 0 16px;font-size:15px;color:#1a1a1a;font-family:Georgia,serif;line-height:1.7;">If required, we may ask participants to formally confirm this prior to the session.</p>
${signoff()}`);
}

function emailReminder(firstName: string): string {
  return wrapEmail(`
<p style="margin:0 0 20px;font-size:15px;color:#1a1a1a;font-family:Georgia,serif;line-height:1.7;">Hi ${firstName},</p>
<p style="margin:0 0 16px;font-size:15px;color:#1a1a1a;font-family:Georgia,serif;line-height:1.7;">Looking forward to seeing you.</p>
<p style="margin:0 0 16px;font-size:15px;color:#1a1a1a;font-family:Georgia,serif;line-height:1.7;">Small group. Closed setting. Direct conversation.</p>
<p style="margin:0 0 16px;font-size:15px;color:#1a1a1a;font-family:Georgia,serif;line-height:1.7;">Come prepared.</p>
${signoff()}`);
}

function emailPostSession(firstName: string): string {
  return wrapEmail(`
<p style="margin:0 0 20px;font-size:15px;color:#1a1a1a;font-family:Georgia,serif;line-height:1.7;">Hi ${firstName},</p>
<p style="margin:0 0 16px;font-size:15px;color:#1a1a1a;font-family:Georgia,serif;line-height:1.7;">Good to meet you at the table.</p>
<p style="margin:0 0 16px;font-size:15px;color:#1a1a1a;font-family:Georgia,serif;line-height:1.7;">If you'd like to continue the conversation one-on-one, let me know.</p>
${signoff()}`);
}

function emailHighLevelFollowup(firstName: string): string {
  return wrapEmail(`
<p style="margin:0 0 20px;font-size:15px;color:#1a1a1a;font-family:Georgia,serif;line-height:1.7;">Hi ${firstName},</p>
<p style="margin:0 0 16px;font-size:15px;color:#1a1a1a;font-family:Georgia,serif;line-height:1.7;">Based on our conversation, there may be value in going deeper.</p>
<p style="margin:0 0 16px;font-size:15px;color:#1a1a1a;font-family:Georgia,serif;line-height:1.7;">If you're open to it, we can schedule a focused session to look at your situation more directly.</p>
<p style="margin:0 0 16px;font-size:15px;color:#1a1a1a;font-family:Georgia,serif;line-height:1.7;">Let me know.</p>
${signoff()}`);
}

function emailPostSessionRejection(firstName: string): string {
  return wrapEmail(`
<p style="margin:0 0 20px;font-size:15px;color:#1a1a1a;font-family:Georgia,serif;line-height:1.7;">Hi ${firstName},</p>
<p style="margin:0 0 16px;font-size:15px;color:#1a1a1a;font-family:Georgia,serif;line-height:1.7;">Thank you for joining the session.</p>
<p style="margin:0 0 16px;font-size:15px;color:#1a1a1a;font-family:Georgia,serif;line-height:1.7;">At this stage, I don't see a direct next step, but I appreciate the conversation.</p>
<p style="margin:0 0 16px;font-size:15px;color:#1a1a1a;font-family:Georgia,serif;line-height:1.7;">Wishing you continued progress.</p>
${signoff()}`);
}

function emailQualification(firstName: string): string {
  return wrapEmail(`
<p style="margin:0 0 20px;font-size:15px;color:#1a1a1a;font-family:Georgia,serif;line-height:1.7;">Hi ${firstName},</p>
<p style="margin:0 0 16px;font-size:15px;color:#1a1a1a;font-family:Georgia,serif;line-height:1.7;">I reviewed your submission.</p>
<p style="margin:0 0 16px;font-size:15px;color:#1a1a1a;font-family:Georgia,serif;line-height:1.7;">Before moving forward, I want to better understand your current situation.</p>
<p style="margin:0 0 16px;font-size:15px;color:#1a1a1a;font-family:Georgia,serif;line-height:1.7;">Please answer briefly:</p>
<ul style="margin:0 0 20px;padding-left:20px;font-size:14px;color:#1a1a1a;font-family:Georgia,serif;line-height:2;">
<li>What is currently putting the most pressure on your business?</li>
<li>Where is growth not translating into control or structure?</li>
<li>What have you already tried that didn't work?</li>
</ul>
<p style="margin:0 0 16px;font-size:15px;color:#1a1a1a;font-family:Georgia,serif;line-height:1.7;">Keep it direct.</p>
${signoff()}`);
}

// ── Email template map (for manual triggers) ───────────────────────────

const EMAIL_TEMPLATES: Record<string, { subject: string; builder: (name: string) => string }> = {
  'auto_response':        { subject: 'Your Round Table Submission',                    builder: emailAutoResponse },
  'qualification':        { subject: 'Your Round Table Submission — Follow-Up',        builder: emailQualification },
  'rejection':            { subject: 'Your Round Table Submission',                    builder: emailRejection },
  'hold_nurture':         { subject: 'Your Round Table Submission — Under Review',     builder: emailHoldNurture },
  'invitation':           { subject: 'The Round Table — Invitation',                   builder: emailInvitation },
  'confirmation':         { subject: 'The Round Table — Session Details',              builder: emailConfirmation },
  'preparation':          { subject: 'The Round Table — Preparation and Rules',        builder: emailPreparation },
  'confidentiality':      { subject: 'The Round Table — Confidentiality',              builder: emailConfidentiality },
  'reminder':             { subject: 'Tomorrow — The Round Table',                     builder: emailReminder },
  'post_session':         { subject: 'Following Up — The Round Table',                 builder: emailPostSession },
  'high_level_followup':  { subject: 'Next Step — Private Session',                    builder: emailHighLevelFollowup },
  'post_session_reject':  { subject: 'Following Up — The Round Table',                 builder: emailPostSessionRejection },
};

// ── Main Handler ───────────────────────────────────────────────────────

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const body = await req.json();
    const { action } = body;

    // ── ACTION: submit (automatic on form submission) ──────────────
    if (action === 'submit') {
      const { formData } = body;
      const nameParts = (formData.fullName || '').trim().split(/\s+/);
      const firstName = nameParts[0] || '';
      const lastName = nameParts.slice(1).join(' ') || '';

      // Score the application
      const { total: score, breakdown } = scoreApplication(formData);
      const route = getRoute(score);
      console.log(`Round Table score: ${score}, route: ${route}`, breakdown);

      const { createClient } = await import('https://esm.sh/@supabase/supabase-js@2');
      const supabase = createClient(
        Deno.env.get('SUPABASE_URL')!,
        Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
      );

      const { data: submission, error: submissionError } = await supabase
        .from('round_table_submissions')
        .insert({
          full_name: (formData.fullName || '').trim(),
          email: (formData.email || '').trim(),
          phone: (formData.phone || '').trim(),
          role_and_company: (formData.roleAndCompany || '').trim(),
          strategic_responsibility: (formData.strategicResponsibility || '').trim(),
          biggest_pressure: (formData.biggestPressure || '').trim(),
          decision_delay: (formData.decisionDelay || '').trim(),
          absence_impact: (formData.absenceImpact || '').trim(),
          problem_response: (formData.problemResponse || '').trim(),
          resistance_response: (formData.resistanceResponse || '').trim(),
          energy_level: (formData.energyLevel || '').trim(),
          blind_spot: (formData.blindSpot || '').trim(),
          why_fit: (formData.whyFit || '').trim(),
          unacted_truth: (formData.unactedTruth || '').trim(),
          score,
          route,
        })
        .select('id')
        .single();

      if (submissionError) {
        console.error('Round Table DB insert error:', submissionError);
        throw new Error('Failed to save Round Table submission');
      }

      // Upsert contact in GHL
      const contactResult = await upsertContact({
        firstName,
        lastName,
        email: formData.email,
        phone: formData.phone,
        score,
        route,
        roleAndCompany: formData.roleAndCompany,
        strategicResponsibility: formData.strategicResponsibility,
        biggestPressure: formData.biggestPressure,
        decisionDelay: formData.decisionDelay,
        absenceImpact: formData.absenceImpact,
        problemResponse: formData.problemResponse,
        resistanceResponse: formData.resistanceResponse,
        energyLevel: formData.energyLevel,
        blindSpot: formData.blindSpot,
        whyFit: formData.whyFit,
        unactedTruth: formData.unactedTruth,
      });

      const contactId = contactResult?.contact?.id;
      if (!contactId) throw new Error('Failed to get GHL contact ID');

      const { error: submissionUpdateError } = await supabase
        .from('round_table_submissions')
        .update({ ghl_contact_id: contactId })
        .eq('id', submission.id);

      if (submissionUpdateError) {
        console.error('Round Table DB update error:', submissionUpdateError);
      }

      // Create opportunity in pipeline
      const stageId = route === 'candidate'
        ? 'acb058c4-2c8d-4c63-b9ba-b7019fb83b24'  // New Lead
        : 'acb058c4-2c8d-4c63-b9ba-b7019fb83b24';  // New Lead (all start here)

      try {
        await createOpportunity(contactId, `${firstName} ${lastName}`, stageId);
      } catch (e) {
        console.error('Opportunity creation error (non-fatal):', e);
      }

      // Send auto-response email immediately
      try {
        await sendEmail(contactId, 'Your Round Table Submission', emailAutoResponse(firstName));
        console.log('Auto-response email sent');
      } catch (e) {
        console.error('Auto-response email error:', e);
      }

      // Schedule route-based email (delay by 2 hours for reject/hold to feel "reviewed")
      if (route === 'reject') {
        const sendAt = new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString(); // 2h delay
        await supabase.from('scheduled_emails').insert({
          contact_id: contactId,
          contact_email: formData.email,
          email_type: 'rt_rejection',
          subject: 'Your Round Table Submission',
          html_body: emailRejection(firstName),
          send_at: sendAt,
          status: 'pending',
          scan_type: 'round_table',
        });
        console.log('Rejection email scheduled for 2h later');
      } else if (route === 'hold') {
        const sendAt = new Date(Date.now() + 4 * 60 * 60 * 1000).toISOString(); // 4h delay
        await supabase.from('scheduled_emails').insert({
          contact_id: contactId,
          contact_email: formData.email,
          email_type: 'rt_hold_nurture',
          subject: 'Your Round Table Submission — Under Review',
          html_body: emailHoldNurture(firstName),
          send_at: sendAt,
          status: 'pending',
          scan_type: 'round_table',
        });
        console.log('Hold/nurture email scheduled for 4h later');
      }
      // Candidates (31-48): no auto email beyond acknowledgement — manual invitation

      return new Response(JSON.stringify({
        success: true,
        score,
        route,
        contactId,
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // ── ACTION: send_email (manual trigger from dashboard) ─────────
    if (action === 'send_email') {
      const { contactId, emailType, firstName } = body;
      const template = EMAIL_TEMPLATES[emailType];
      if (!template) {
        return new Response(JSON.stringify({ error: `Unknown email type: ${emailType}` }), {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }

      await sendEmail(contactId, template.subject, template.builder(firstName));

      return new Response(JSON.stringify({ success: true, emailType }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    return new Response(JSON.stringify({ error: 'Unknown action' }), {
      status: 400,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
