import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version',
};

const GHL_BASE = 'https://services.leadconnectorhq.com';
const PIPELINE_ID = 'qFBbAlnrhlBtkM5r9VEZ';
const STAGE_NEW_LEAD = 'acb058c4-2c8d-4c63-b9ba-b7019fb83b24';
const STAGE_CALL_BOOKED = 'a062e213-fbef-4a54-a11a-18751f0b3db3';

const CALENDAR_MAP: Record<string, string> = {
  founder_pressure_scan: 'uebxQpVIy9vX7tR5rL9E',
  founder_pressure_diagnostic: 'uebxQpVIy9vX7tR5rL9E',
  profit_leak_scan: 'tmX5oPSkDICqFhIxPIo9',
  capital_protection: 'dxDvJ7TY6uSjcl1loyov',
  corporate: '4NM4rNbMCZ024q4rlSTP',
};

const SESSION_NAMES: Record<string, string> = {
  founder_pressure_scan: 'Founder Intervention Session',
  founder_pressure_diagnostic: 'Founder Intervention Session',
  profit_leak_scan: 'Revenue Architecture Session',
  capital_protection: 'Capital Protection Session',
  corporate: 'Discipline Architecture Session',
};

const SCORE_FIELD_MAP: Record<string, string> = {
  founder_pressure_scan: 'fps_score',
  founder_pressure_diagnostic: 'fps_score',
  profit_leak_scan: 'overall_score',
  capital_protection: 'overall_score',
  corporate: 'discipline_score',
};

function ghlHeaders() {
  const apiKey = Deno.env.get('GHL_API_KEY');
  if (!apiKey) throw new Error('GHL_API_KEY not configured');
  return {
    Authorization: `Bearer ${apiKey}`,
    'Content-Type': 'application/json',
    Version: '2021-07-28',
  };
}

// ──── GHL API helpers ────

async function upsertContact(payload: Record<string, unknown>) {
  const locationId = Deno.env.get('GHL_LOCATION_ID');
  if (!locationId) throw new Error('GHL_LOCATION_ID not configured');

  const auditType = String(payload.audit_type || '');
  const tags = [auditType, 'Scan Lead'];
  if (payload.booked === true) tags.push(`booked-${auditType}`);

  const customFields: Record<string, unknown>[] = [];
  const fieldKeys = [
    'fps_score', 'discipline_score', 'overall_score', 'tier',
    'primary_bottleneck', 'growth_phase', 'revenue_tier',
    'decision_pressure_score', 'founder_dependency_score',
    'leadership_alignment_score', 'execution_momentum_score',
    'overall_color', 'recovery_potential', 'risk_level',
    'evidence_strength_score', 'timeline_advantage_score',
    'jurisdictional_simplicity_score', 'legal_positioning_score',
    'capital_exposure_score',
  ];
  for (const key of fieldKeys) {
    if (payload[key] !== undefined) {
      customFields.push({ key, field_value: String(payload[key]) });
    }
  }

  const body: Record<string, unknown> = {
    locationId,
    firstName: payload.first_name,
    lastName: payload.last_name,
    email: payload.email,
    phone: payload.phone,
    source: 'Leaders Performance Website',
    tags,
  };
  if (customFields.length > 0) body.customFields = customFields;

  console.log('Upserting contact:', String(payload.email));

  const res = await fetch(`${GHL_BASE}/contacts/upsert`, {
    method: 'POST',
    headers: ghlHeaders(),
    body: JSON.stringify(body),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(`Contact upsert failed: ${JSON.stringify(data).slice(0, 300)}`);

  const contactId = data.contact?.id;
  if (!contactId) throw new Error('No contact ID returned');
  console.log('Contact upserted:', contactId);
  return contactId;
}

async function createOpportunity(contactId: string, payload: Record<string, unknown>) {
  const locationId = Deno.env.get('GHL_LOCATION_ID');
  const booked = payload.booked === true;
  const stageId = booked ? STAGE_CALL_BOOKED : STAGE_NEW_LEAD;
  const auditType = String(payload.audit_type || 'scan');
  const name = `${auditType.toUpperCase()} - ${payload.first_name} ${payload.last_name}`;

  const body = {
    pipelineId: PIPELINE_ID,
    locationId,
    pipelineStageId: stageId,
    contactId,
    name,
    status: 'open',
  };

  console.log('Creating opportunity:', JSON.stringify(body).slice(0, 300));

  const res = await fetch(`${GHL_BASE}/opportunities/`, {
    method: 'POST',
    headers: ghlHeaders(),
    body: JSON.stringify(body),
  });
  const data = await res.json();
  console.log('Opportunity response:', res.status, JSON.stringify(data).slice(0, 200));
  return data;
}

async function sendEmail(contactId: string, subject: string, html: string) {
  const body = {
    type: 'Email',
    contactId,
    subject,
    html,
    emailFrom: 'Lionel Eersteling <info@leadersperformance.ae>',
  };

  console.log('Sending email:', subject);
  try {
    const res = await fetch(`${GHL_BASE}/conversations/messages`, {
      method: 'POST',
      headers: ghlHeaders(),
      body: JSON.stringify(body),
    });
    const data = await res.json();
    console.log('Email response:', res.status, JSON.stringify(data).slice(0, 200));
    if (!res.ok) {
      console.error(`Email send failed (non-fatal): ${JSON.stringify(data).slice(0, 300)}`);
    }
    return data;
  } catch (err) {
    console.error('Email send error (non-fatal):', err);
    return null;
  }
}

// ──── Email HTML builders ────

function buildResultsEmailHTML(payload: Record<string, unknown>): string {
  const auditType = String(payload.audit_type || '');
  const scoreField = SCORE_FIELD_MAP[auditType] || 'overall_score';
  const score = payload[scoreField] ?? payload.fps_score ?? payload.overall_score ?? payload.discipline_score ?? 0;
  const sessionName = SESSION_NAMES[auditType] || 'Strategy Session';
  const calendarId = CALENDAR_MAP[auditType] || 'uebxQpVIy9vX7tR5rL9E';
  const bookingLink = `https://api.leadconnectorhq.com/widget/booking/${calendarId}`;
  const firstName = payload.first_name || 'there';

  // Build scan-specific dimensions and bottleneck
  const dimensions: { label: string; score: unknown }[] = [];
  let bottleneck = 'Not identified';
  let scanTitle = 'Your Results Are Ready';
  let introText = 'Your diagnostic scan has been completed. Below is your score and structural analysis.';
  let bottleneckLabel = 'Primary Bottleneck';

  if (auditType === 'capital_protection') {
    scanTitle = 'Your Capital Protection Analysis';
    introText = 'Your capital protection assessment has been completed. Below is your risk analysis and recovery potential.';
    bottleneckLabel = 'Risk Level';
    bottleneck = String(payload.risk_level || payload.recovery_potential || 'Under Review');
    if (payload.evidence_strength_score !== undefined) {
      dimensions.push({ label: 'Evidence Strength', score: payload.evidence_strength_score });
      dimensions.push({ label: 'Timeline Advantage', score: payload.timeline_advantage_score });
      dimensions.push({ label: 'Jurisdictional Simplicity', score: payload.jurisdictional_simplicity_score });
      dimensions.push({ label: 'Legal Positioning', score: payload.legal_positioning_score });
      dimensions.push({ label: 'Capital Exposure', score: payload.capital_exposure_score });
    }
  } else if (auditType.includes('profit_leak')) {
    scanTitle = 'Your Revenue Architecture Analysis';
    introText = 'Your revenue architecture scan has been completed. Below is your score and structural analysis.';
    bottleneck = String(payload.primary_bottleneck || payload.growth_phase || 'Not identified');
    if (payload.founder_dependency_score !== undefined) {
      dimensions.push({ label: 'Founder Dependency', score: payload.founder_dependency_score });
      dimensions.push({ label: 'Structure & Leadership', score: payload.structure_leadership_score });
      dimensions.push({ label: 'Decision Speed', score: payload.decision_speed_score });
      dimensions.push({ label: 'Scalability', score: payload.scalability_score });
      dimensions.push({ label: 'Profitability', score: payload.profitability_score });
    }
  } else if (auditType === 'corporate') {
    scanTitle = 'Your Team Discipline Analysis';
    introText = 'Your corporate discipline audit has been completed. Below is your score and structural analysis.';
    bottleneck = String(payload.tier || 'Not identified');
    bottleneckLabel = 'Discipline Tier';
  } else {
    // Founder pressure (default)
    bottleneck = String(payload.primary_bottleneck || payload.tier || 'Not identified');
    if (payload.decision_pressure_score !== undefined) {
      dimensions.push({ label: 'Decision Pressure', score: payload.decision_pressure_score });
      dimensions.push({ label: 'Founder Dependency', score: payload.founder_dependency_score });
      dimensions.push({ label: 'Leadership Alignment', score: payload.leadership_alignment_score });
      dimensions.push({ label: 'Execution Momentum', score: payload.execution_momentum_score });
    }
  }

  const dimensionBarsHTML = dimensions.map(d => `
    <tr><td style="padding:6px 0;">
      <table width="100%" cellpadding="0" cellspacing="0"><tbody>
        <tr>
          <td style="font-size:13px;color:#1a1a1a;font-family:Georgia,serif;">${d.label}</td>
          <td style="font-size:13px;color:#8B7355;font-family:Georgia,serif;text-align:right;font-weight:bold;">${d.score}%</td>
        </tr>
        <tr><td colspan="2" style="padding-top:4px;">
          <div style="background:#E8E0D5;height:8px;width:100%;">
            <div style="background:${Number(d.score) > 75 ? '#DC2626' : Number(d.score) > 55 ? '#D97706' : '#059669'};height:8px;width:${d.score}%;"></div>
          </div>
        </td></tr>
      </tbody></table>
    </td></tr>
  `).join('');

  // For capital protection, invert color logic (higher = better recovery)
  const bottleneckBg = auditType === 'capital_protection' ? '#FFF7ED' : '#FEF2F2';
  const bottleneckBorder = auditType === 'capital_protection' ? '#D97706' : '#DC2626';
  const bottleneckColor = auditType === 'capital_protection' ? '#92400E' : '#DC2626';

  return `<table style="background-color:#F5F0EB;" width="100%" cellpadding="0" cellspacing="0"><tbody><tr><td style="padding:40px 20px;" align="center">
<table style="background-color:#ffffff;max-width:600px;width:100%;" cellpadding="0" cellspacing="0"><tbody>
<tr><td style="background-color:#1a1a1a;padding:30px 40px;text-align:center;">
  <img src="https://sfzdecpsvgcqmlwkjibd.supabase.co/storage/v1/object/public/websiteimages/logo-white.png" alt="Leaders Performance" width="160" style="display:block;margin:0 auto 16px;width:160px;height:auto;" />
  <p style="margin:8px 0 0;font-size:22px;color:#ffffff;font-family:Georgia,serif;font-weight:bold;">${scanTitle}</p>
</td></tr>
<tr><td style="padding:40px;">
  <p style="font-family:Georgia,serif;font-size:16px;color:#1a1a1a;margin:0 0 20px;">${firstName},</p>
  <p style="font-family:Georgia,serif;font-size:15px;color:#1a1a1a;line-height:1.7;margin:0 0 30px;">${introText}</p>
  <table width="100%" cellpadding="0" cellspacing="0"><tbody><tr><td align="center" style="padding:20px 0;">
    <div style="display:inline-block;background:#1a1a1a;padding:30px 50px;text-align:center;">
      <p style="margin:0;font-size:11px;letter-spacing:3px;color:#8B7355;text-transform:uppercase;">${auditType === 'capital_protection' ? 'Recovery Potential' : 'Your Score'}</p>
      <p style="margin:8px 0 0;font-size:56px;color:#ffffff;font-family:Georgia,serif;font-weight:900;">${score}</p>
    </div>
  </td></tr></tbody></table>
  <table width="100%" style="margin:20px 0;background:${bottleneckBg};border-left:4px solid ${bottleneckBorder};" cellpadding="0" cellspacing="0"><tbody><tr><td style="padding:16px 20px;">
    <p style="margin:0;font-size:10px;letter-spacing:2px;color:${bottleneckColor};text-transform:uppercase;font-weight:bold;">${bottleneckLabel}</p>
    <p style="margin:6px 0 0;font-size:18px;color:#1a1a1a;font-family:Georgia,serif;font-weight:bold;">${bottleneck}</p>
  </td></tr></tbody></table>
  ${dimensionBarsHTML ? `<table width="100%" style="margin:20px 0;" cellpadding="0" cellspacing="0"><tbody>${dimensionBarsHTML}</tbody></table>` : ''}
  <table width="100%" cellpadding="0" cellspacing="0"><tbody><tr><td align="center" style="padding:30px 0 10px;">
    <a href="${bookingLink}" style="display:inline-block;background:#1a1a1a;color:#ffffff;font-family:Georgia,serif;font-size:14px;font-weight:bold;text-decoration:none;padding:16px 40px;letter-spacing:2px;text-transform:uppercase;">Book Your ${sessionName}</a>
  </td></tr></tbody></table>
  <p style="text-align:center;font-size:12px;color:#999;font-family:Georgia,serif;margin-top:8px;">30-minute confidential session with Lionel Eersteling</p>
  <p style="margin:30px 0 0;font-size:14px;color:#1a1a1a;font-family:Georgia,serif;">mr. Lionel Eersteling</p>
  <p style="margin:2px 0 0;font-size:12px;color:#8B7355;letter-spacing:1px;">___</p>
</td></tr>
<tr><td style="background-color:#1a1a1a;padding:20px 40px;text-align:center;">
  <p style="margin:0;font-size:11px;letter-spacing:3px;color:#8B7355;text-transform:uppercase;">Leaders Performance</p>
  <p style="margin:6px 0 0;font-size:11px;color:#666;">${auditType === 'capital_protection' ? 'This is not a crisis tool. This is a structural diagnostic.' : 'This is a structural diagnostic, not crisis advice.'}</p>
</td></tr>
</tbody></table></td></tr></tbody></table>`;
}

function buildBookingConfirmationHTML(payload: Record<string, unknown>): string {
  const firstName = payload.first_name || 'there';
  const sessionName = SESSION_NAMES[String(payload.audit_type)] || 'Strategy Session';
  const bookingDate = payload.booking_date || 'TBD';
  const bookingTime = payload.booking_time || 'TBD';

  return `<table style="background-color:#F5F0EB;" width="100%" cellpadding="0" cellspacing="0"><tbody><tr><td style="padding:40px 20px;" align="center">
<table style="background-color:#ffffff;max-width:600px;width:100%;" cellpadding="0" cellspacing="0"><tbody>
<tr><td style="background-color:#1a1a1a;padding:30px 40px;text-align:center;">
  <img src="https://sfzdecpsvgcqmlwkjibd.supabase.co/storage/v1/object/public/websiteimages/logo-white.png" alt="Leaders Performance" width="160" style="display:block;margin:0 auto 16px;width:160px;height:auto;" />
  <p style="margin:8px 0 0;font-size:22px;color:#ffffff;font-family:Georgia,serif;font-weight:bold;">Your ${sessionName} Is Confirmed</p>
</td></tr>
<tr><td style="padding:40px;">
  <p style="font-family:Georgia,serif;font-size:16px;color:#1a1a1a;margin:0 0 20px;">${firstName},</p>
  <p style="font-family:Georgia,serif;font-size:15px;color:#1a1a1a;line-height:1.7;margin:0 0 30px;">Your session has been confirmed. Here are the details:</p>
  <table width="100%" style="background:#F9F6F2;border:1px solid #E8E0D5;" cellpadding="0" cellspacing="0"><tbody>
    <tr><td style="padding:20px;">
      <p style="margin:0 0 12px;font-size:11px;letter-spacing:2px;color:#8B7355;text-transform:uppercase;">Session Details</p>
      <table width="100%" cellpadding="0" cellspacing="0">
        <tr><td style="padding:6px 0;border-bottom:1px solid #eee;font-family:Georgia,serif;font-size:14px;color:#8B7355;width:100px;">Date</td><td style="padding:6px 0;border-bottom:1px solid #eee;font-family:Georgia,serif;font-size:14px;color:#1a1a1a;font-weight:bold;">${bookingDate}</td></tr>
        <tr><td style="padding:6px 0;border-bottom:1px solid #eee;font-family:Georgia,serif;font-size:14px;color:#8B7355;">Time</td><td style="padding:6px 0;border-bottom:1px solid #eee;font-family:Georgia,serif;font-size:14px;color:#1a1a1a;font-weight:bold;">${bookingTime} (Dubai Time)</td></tr>
        <tr><td style="padding:6px 0;font-family:Georgia,serif;font-size:14px;color:#8B7355;">With</td><td style="padding:6px 0;font-family:Georgia,serif;font-size:14px;color:#1a1a1a;">Lionel Eersteling</td></tr>
      </table>
    </td></tr>
  </tbody></table>
  <p style="font-family:Georgia,serif;font-size:13px;letter-spacing:2px;color:#8B7355;text-transform:uppercase;margin:28px 0 12px;">How to Prepare</p>
  <p style="font-family:Georgia,serif;font-size:15px;color:#1a1a1a;line-height:1.7;margin:0 0 6px;">1. Review your scan results before the call</p>
  <p style="font-family:Georgia,serif;font-size:15px;color:#1a1a1a;line-height:1.7;margin:0 0 6px;">2. Have your calendar available for follow-up scheduling</p>
  <p style="font-family:Georgia,serif;font-size:15px;color:#1a1a1a;line-height:1.7;margin:0 0 6px;">3. Be in a quiet, private environment</p>
  <p style="font-family:Georgia,serif;font-size:15px;color:#1a1a1a;line-height:1.7;margin:0 0 20px;">4. Come with one specific challenge you want to address</p>
  <p style="margin:30px 0 0;font-size:14px;color:#1a1a1a;font-family:Georgia,serif;">mr. Lionel Eersteling</p>
  <p style="margin:2px 0 0;font-size:12px;color:#8B7355;letter-spacing:1px;">___</p>
</td></tr>
<tr><td style="background-color:#1a1a1a;padding:20px 40px;text-align:center;">
  <p style="margin:0;font-size:11px;letter-spacing:3px;color:#8B7355;text-transform:uppercase;">Leaders Performance</p>
  <p style="margin:8px 0 0;font-size:11px;color:#666;">Confidential. 30-minute session with Lionel Eersteling.</p>
</td></tr>
</tbody></table></td></tr></tbody></table>`;
}

function buildReminderHTML(payload: Record<string, unknown>, timeframe: string): string {
  const firstName = payload.first_name || 'there';
  const sessionName = SESSION_NAMES[String(payload.audit_type)] || 'Strategy Session';
  const bookingDate = payload.booking_date || '';
  const bookingTime = payload.booking_time || '';

  return `<table style="background-color:#F5F0EB;" width="100%" cellpadding="0" cellspacing="0"><tbody><tr><td style="padding:40px 20px;" align="center">
<table style="background-color:#ffffff;max-width:600px;width:100%;" cellpadding="0" cellspacing="0"><tbody>
<tr><td style="background-color:#1a1a1a;padding:30px 40px;text-align:center;">
  <img src="https://sfzdecpsvgcqmlwkjibd.supabase.co/storage/v1/object/public/websiteimages/logo-white.png" alt="Leaders Performance" width="160" style="display:block;margin:0 auto 16px;width:160px;height:auto;" />
  <p style="margin:8px 0 0;font-size:22px;color:#ffffff;font-family:Georgia,serif;font-weight:bold;">${timeframe === '24h' ? 'Tomorrow' : 'Starting in 60 Minutes'}: Your Session</p>
</td></tr>
<tr><td style="padding:40px;">
  <p style="font-family:Georgia,serif;font-size:16px;color:#1a1a1a;margin:0 0 20px;">${firstName},</p>
  <p style="font-family:Georgia,serif;font-size:15px;color:#1a1a1a;line-height:1.7;margin:0 0 20px;">${timeframe === '24h'
    ? `This is a reminder that your ${sessionName} with Lionel Eersteling is scheduled for tomorrow.`
    : `Your ${sessionName} with Lionel Eersteling starts in 60 minutes.`}</p>
  <table width="100%" style="background:#F9F6F2;border:1px solid #E8E0D5;" cellpadding="0" cellspacing="0"><tbody>
    <tr><td style="padding:20px;">
      <table width="100%" cellpadding="0" cellspacing="0">
        <tr><td style="padding:6px 0;border-bottom:1px solid #eee;font-family:Georgia,serif;font-size:14px;color:#8B7355;width:100px;">Date</td><td style="padding:6px 0;border-bottom:1px solid #eee;font-family:Georgia,serif;font-size:14px;color:#1a1a1a;font-weight:bold;">${bookingDate}</td></tr>
        <tr><td style="padding:6px 0;font-family:Georgia,serif;font-size:14px;color:#8B7355;">Time</td><td style="padding:6px 0;font-family:Georgia,serif;font-size:14px;color:#1a1a1a;font-weight:bold;">${bookingTime} (Dubai Time)</td></tr>
      </table>
    </td></tr>
  </tbody></table>
  ${timeframe === '1h' ? '<p style="font-family:Georgia,serif;font-size:15px;color:#1a1a1a;line-height:1.7;margin:20px 0 0;">Be in a quiet, private environment. Come with one specific challenge you want addressed.</p>' : ''}
  <p style="margin:30px 0 0;font-size:14px;color:#1a1a1a;font-family:Georgia,serif;">mr. Lionel Eersteling</p>
  <p style="margin:2px 0 0;font-size:12px;color:#8B7355;letter-spacing:1px;">___</p>
</td></tr>
<tr><td style="background-color:#1a1a1a;padding:20px 40px;text-align:center;">
  <p style="margin:0;font-size:11px;letter-spacing:3px;color:#8B7355;text-transform:uppercase;">Leaders Performance</p>
</td></tr>
</tbody></table></td></tr></tbody></table>`;
}

function buildNurtureDay2HTML(payload: Record<string, unknown>): string {
  const firstName = payload.first_name || 'there';
  const auditType = String(payload.audit_type || '');
  const sessionName = SESSION_NAMES[auditType] || 'Strategy Session';
  const calendarId = CALENDAR_MAP[auditType] || 'uebxQpVIy9vX7tR5rL9E';
  const bookingLink = `https://api.leadconnectorhq.com/widget/booking/${calendarId}`;

  let headline = 'The Pattern Behind Your Score';
  let bodyParagraphs = '';

  if (auditType === 'capital_protection') {
    headline = 'The Window Is Narrowing';
    bodyParagraphs = `
      <p style="font-family:Georgia,serif;font-size:15px;color:#1a1a1a;line-height:1.7;margin:0 0 16px;">Two days ago, your Capital Protection Assessment revealed structural exposure that most founders don't address until it's too late — not because they don't see it, but because they assume they have more time.</p>
      <p style="font-family:Georgia,serif;font-size:15px;color:#1a1a1a;line-height:1.7;margin:0 0 16px;">The reality is this: <strong>every day that passes without a protection strategy in place is a day your capital remains exposed.</strong> Evidence deteriorates. Jurisdictional advantages shift. Counterparties move first.</p>
      <p style="font-family:Georgia,serif;font-size:15px;color:#1a1a1a;line-height:1.7;margin:0 0 16px;">This isn't a legal problem you solve reactively. It's a strategic architecture you build proactively.</p>
      <p style="font-family:Georgia,serif;font-size:15px;color:#1a1a1a;line-height:1.7;margin:0 0 24px;">In your Capital Protection Session, we map the exact structural interventions needed to secure your position — based on your specific risk profile, jurisdictional exposure, and evidence landscape.</p>`;
  } else if (auditType.includes('profit_leak')) {
    headline = 'The Revenue You\'re Leaving Behind';
    bodyParagraphs = `
      <p style="font-family:Georgia,serif;font-size:15px;color:#1a1a1a;line-height:1.7;margin:0 0 16px;">Two days ago, your Revenue Architecture Scan revealed structural leaks that are silently draining your growth capacity — not because your team isn't working hard, but because the architecture wasn't built to scale.</p>
      <p style="font-family:Georgia,serif;font-size:15px;color:#1a1a1a;line-height:1.7;margin:0 0 16px;">The pattern is this: <strong>revenue plateaus not because of market conditions, but because your business structure can't convert effort into proportional growth.</strong></p>
      <p style="font-family:Georgia,serif;font-size:15px;color:#1a1a1a;line-height:1.7;margin:0 0 16px;">This isn't a sales problem. It's an architecture problem.</p>
      <p style="font-family:Georgia,serif;font-size:15px;color:#1a1a1a;line-height:1.7;margin:0 0 24px;">In your Revenue Architecture Session, we identify the exact structural changes needed to plug the leaks and unlock the next phase of sustainable growth.</p>`;
  } else if (auditType === 'corporate') {
    headline = 'The Discipline Gap in Your Team';
    bodyParagraphs = `
      <p style="font-family:Georgia,serif;font-size:15px;color:#1a1a1a;line-height:1.7;margin:0 0 16px;">Two days ago, your Team Discipline Audit revealed structural gaps that most leaders normalize — not because they don't notice them, but because they've accepted them as "how it is."</p>
      <p style="font-family:Georgia,serif;font-size:15px;color:#1a1a1a;line-height:1.7;margin:0 0 16px;">The pattern is this: <strong>standards erode gradually until mediocre execution becomes the baseline.</strong> Meetings lack accountability. Deadlines become suggestions. And the leader compensates by doing more themselves.</p>
      <p style="font-family:Georgia,serif;font-size:15px;color:#1a1a1a;line-height:1.7;margin:0 0 16px;">This isn't a motivation problem. It's a discipline architecture problem.</p>
      <p style="font-family:Georgia,serif;font-size:15px;color:#1a1a1a;line-height:1.7;margin:0 0 24px;">In your Discipline Architecture Session, we install the structural standards that make elite execution the default — not the exception.</p>`;
  } else {
    bodyParagraphs = `
      <p style="font-family:Georgia,serif;font-size:15px;color:#1a1a1a;line-height:1.7;margin:0 0 16px;">Two days ago, your diagnostic revealed a structural pattern that most founders never address — not because they don't see it, but because they've normalized it.</p>
      <p style="font-family:Georgia,serif;font-size:15px;color:#1a1a1a;line-height:1.7;margin:0 0 16px;">The pattern is this: <strong>every decision, every escalation, every critical conversation runs through you.</strong> Your business hasn't built the structural capacity to operate without your constant presence.</p>
      <p style="font-family:Georgia,serif;font-size:15px;color:#1a1a1a;line-height:1.7;margin:0 0 16px;">This isn't a time-management problem. It's an architecture problem.</p>
      <p style="font-family:Georgia,serif;font-size:15px;color:#1a1a1a;line-height:1.7;margin:0 0 24px;">The intervention we deploy addresses this in 4 days. Not with theory — with structural changes to how decisions flow, how accountability is distributed, and how your leadership team operates without you as the bottleneck.</p>`;
  }

  return `<table style="background-color:#F5F0EB;" width="100%" cellpadding="0" cellspacing="0"><tbody><tr><td style="padding:40px 20px;" align="center">
<table style="background-color:#ffffff;max-width:600px;width:100%;" cellpadding="0" cellspacing="0"><tbody>
<tr><td style="background-color:#1a1a1a;padding:30px 40px;text-align:center;">
  <img src="https://sfzdecpsvgcqmlwkjibd.supabase.co/storage/v1/object/public/websiteimages/logo-white.png" alt="Leaders Performance" width="160" style="display:block;margin:0 auto 16px;width:160px;height:auto;" />
  <p style="margin:8px 0 0;font-size:22px;color:#ffffff;font-family:Georgia,serif;font-weight:bold;">${headline}</p>
</td></tr>
<tr><td style="padding:40px;">
  <p style="font-family:Georgia,serif;font-size:16px;color:#1a1a1a;margin:0 0 20px;">${firstName},</p>
  ${bodyParagraphs}
  <table width="100%" cellpadding="0" cellspacing="0"><tbody><tr><td align="center" style="padding:10px 0;">
    <a href="${bookingLink}" style="display:inline-block;background:#1a1a1a;color:#ffffff;font-family:Georgia,serif;font-size:14px;font-weight:bold;text-decoration:none;padding:16px 40px;letter-spacing:2px;text-transform:uppercase;">Book Your ${sessionName}</a>
  </td></tr></tbody></table>
  <p style="text-align:center;font-size:12px;color:#999;font-family:Georgia,serif;margin-top:8px;">30-minute confidential session with Lionel Eersteling</p>
  <p style="margin:30px 0 0;font-size:14px;color:#1a1a1a;font-family:Georgia,serif;">mr. Lionel Eersteling</p>
  <p style="margin:2px 0 0;font-size:12px;color:#8B7355;letter-spacing:1px;">___</p>
</td></tr>
<tr><td style="background-color:#1a1a1a;padding:20px 40px;text-align:center;">
  <p style="margin:0;font-size:11px;letter-spacing:3px;color:#8B7355;text-transform:uppercase;">Leaders Performance</p>
</td></tr>
</tbody></table></td></tr></tbody></table>`;
}

function buildNurtureDay5HTML(payload: Record<string, unknown>): string {
  const firstName = payload.first_name || 'there';
  const auditType = String(payload.audit_type || '');
  const sessionName = SESSION_NAMES[auditType] || 'Strategy Session';
  const calendarId = CALENDAR_MAP[auditType] || 'uebxQpVIy9vX7tR5rL9E';
  const bookingLink = `https://api.leadconnectorhq.com/widget/booking/${calendarId}`;

  let headline = 'What This Is Actually Costing You';
  let bodyContent = '';

  if (auditType === 'capital_protection') {
    headline = 'The Cost of Waiting';
    bodyContent = `
      <p style="font-family:Georgia,serif;font-size:15px;color:#1a1a1a;line-height:1.7;margin:0 0 16px;">Five days ago, your Capital Protection Assessment identified structural exposure in your position. Since then, nothing has changed in how your capital is protected.</p>
      <p style="font-family:Georgia,serif;font-size:15px;color:#1a1a1a;line-height:1.7;margin:0 0 16px;">The cost of inaction in capital protection is not theoretical. It shows up in:</p>
      <ul style="font-family:Georgia,serif;font-size:15px;color:#1a1a1a;line-height:2;padding-left:20px;">
        <li>Evidence that becomes harder to access or verify over time</li>
        <li>Jurisdictional windows that close as counterparties restructure</li>
        <li>Legal positions that weaken as precedents shift</li>
        <li>Capital that remains exposed to risks you've already identified</li>
      </ul>
      <p style="font-family:Georgia,serif;font-size:15px;color:#1a1a1a;line-height:1.7;margin:16px 0 24px;">This is the last email in this sequence. Your assessment data is clear. The question is whether you secure your position now or wait until the window narrows further.</p>`;
  } else if (auditType.includes('profit_leak')) {
    bodyContent = `
      <p style="font-family:Georgia,serif;font-size:15px;color:#1a1a1a;line-height:1.7;margin:0 0 16px;">Five days ago, your Revenue Architecture Scan exposed structural revenue leaks. Since then, nothing has changed in how your business captures value.</p>
      <p style="font-family:Georgia,serif;font-size:15px;color:#1a1a1a;line-height:1.7;margin:0 0 16px;">The cost of maintaining the current structure isn't always visible on a P&L. It shows up in:</p>
      <ul style="font-family:Georgia,serif;font-size:15px;color:#1a1a1a;line-height:2;padding-left:20px;">
        <li>Revenue that plateaus despite increased effort and spend</li>
        <li>Margins that compress because growth isn't structurally efficient</li>
        <li>Opportunities that pass because your team can't execute without you</li>
        <li>Competitors who scale while you optimize incrementally</li>
      </ul>
      <p style="font-family:Georgia,serif;font-size:15px;color:#1a1a1a;line-height:1.7;margin:16px 0 24px;">This is the last email in this sequence. The diagnostic data is clear. The question is whether you act on it or absorb it.</p>`;
  } else if (auditType === 'corporate') {
    headline = 'What Weak Discipline Is Costing Your Team';
    bodyContent = `
      <p style="font-family:Georgia,serif;font-size:15px;color:#1a1a1a;line-height:1.7;margin:0 0 16px;">Five days ago, your Team Discipline Audit exposed gaps in operational standards. Since then, nothing has changed in how your team executes.</p>
      <p style="font-family:Georgia,serif;font-size:15px;color:#1a1a1a;line-height:1.7;margin:0 0 16px;">The cost of weak discipline isn't dramatic. It's incremental. It shows up in:</p>
      <ul style="font-family:Georgia,serif;font-size:15px;color:#1a1a1a;line-height:2;padding-left:20px;">
        <li>Meetings that end without clear ownership or deadlines</li>
        <li>Standards that exist on paper but not in execution</li>
        <li>Your best people who lower their standards to match the team</li>
        <li>Your own energy spent compensating for structural weakness</li>
      </ul>
      <p style="font-family:Georgia,serif;font-size:15px;color:#1a1a1a;line-height:1.7;margin:16px 0 24px;">This is the last email in this sequence. The audit data is clear. The question is whether you install the architecture or continue managing around the gaps.</p>`;
  } else {
    bodyContent = `
      <p style="font-family:Georgia,serif;font-size:15px;color:#1a1a1a;line-height:1.7;margin:0 0 16px;">Five days ago, your diagnostic scan exposed a structural vulnerability. Since then, nothing has changed in how your business operates.</p>
      <p style="font-family:Georgia,serif;font-size:15px;color:#1a1a1a;line-height:1.7;margin:0 0 16px;">The cost of maintaining the current structure isn't always visible on a P&L. It shows up in:</p>
      <ul style="font-family:Georgia,serif;font-size:15px;color:#1a1a1a;line-height:2;padding-left:20px;">
        <li>Decisions that wait for you instead of being executed autonomously</li>
        <li>Revenue that plateaus because growth requires your personal bandwidth</li>
        <li>Key people who leave because they can't lead without your approval</li>
        <li>Opportunities that expire while you're managing operations</li>
      </ul>
      <p style="font-family:Georgia,serif;font-size:15px;color:#1a1a1a;line-height:1.7;margin:16px 0 24px;">This is the last email in this sequence. The diagnostic data is clear. The question is whether you act on it or absorb it.</p>`;
  }

  return `<table style="background-color:#F5F0EB;" width="100%" cellpadding="0" cellspacing="0"><tbody><tr><td style="padding:40px 20px;" align="center">
<table style="background-color:#ffffff;max-width:600px;width:100%;" cellpadding="0" cellspacing="0"><tbody>
<tr><td style="background-color:#1a1a1a;padding:30px 40px;text-align:center;">
  <img src="https://sfzdecpsvgcqmlwkjibd.supabase.co/storage/v1/object/public/websiteimages/logo-white.png" alt="Leaders Performance" width="160" style="display:block;margin:0 auto 16px;width:160px;height:auto;" />
  <p style="margin:8px 0 0;font-size:22px;color:#ffffff;font-family:Georgia,serif;font-weight:bold;">${headline}</p>
</td></tr>
<tr><td style="padding:40px;">
  <p style="font-family:Georgia,serif;font-size:16px;color:#1a1a1a;margin:0 0 20px;">${firstName},</p>
  ${bodyContent}
  <table width="100%" cellpadding="0" cellspacing="0"><tbody><tr><td align="center" style="padding:10px 0;">
    <a href="${bookingLink}" style="display:inline-block;background:#1a1a1a;color:#ffffff;font-family:Georgia,serif;font-size:14px;font-weight:bold;text-decoration:none;padding:16px 40px;letter-spacing:2px;text-transform:uppercase;">Book Your ${sessionName}</a>
  </td></tr></tbody></table>
  <p style="text-align:center;font-size:12px;color:#999;font-family:Georgia,serif;margin-top:8px;">30-minute confidential session with Lionel Eersteling</p>
  <p style="margin:30px 0 0;font-size:14px;color:#1a1a1a;font-family:Georgia,serif;">mr. Lionel Eersteling</p>
  <p style="margin:2px 0 0;font-size:12px;color:#8B7355;letter-spacing:1px;">___</p>
</td></tr>
<tr><td style="background-color:#1a1a1a;padding:20px 40px;text-align:center;">
  <p style="margin:0;font-size:11px;letter-spacing:3px;color:#8B7355;text-transform:uppercase;">Leaders Performance</p>
</td></tr>
</tbody></table></td></tr></tbody></table>`;
}

// ──── Subject lines ────

function getResultsSubject(payload: Record<string, unknown>): string {
  const auditType = String(payload.audit_type || '');
  const scoreField = SCORE_FIELD_MAP[auditType] || 'overall_score';
  const score = payload[scoreField] ?? payload.fps_score ?? payload.overall_score ?? payload.discipline_score ?? '';
  if (auditType.includes('founder_pressure')) return `Your Founder Pressure Score: ${score}`;
  if (auditType.includes('profit_leak')) return `Your Revenue Architecture Score: ${score}`;
  if (auditType.includes('capital_protection')) return `Your Capital Protection Score: ${score}`;
  if (auditType === 'corporate') return `Your Team Discipline Score: ${score}`;
  return `Your Diagnostic Score: ${score}`;
}

function getBookingSubject(payload: Record<string, unknown>): string {
  const sessionName = SESSION_NAMES[String(payload.audit_type)] || 'Strategy Session';
  return `Your ${sessionName} Is Confirmed`;
}

function getDay2Subject(payload: Record<string, unknown>): string {
  const auditType = String(payload.audit_type || '');
  if (auditType === 'capital_protection') return `The Window Is Narrowing, ${payload.first_name}`;
  if (auditType.includes('profit_leak')) return `The Revenue You're Leaving Behind, ${payload.first_name}`;
  if (auditType === 'corporate') return `The Discipline Gap in Your Team, ${payload.first_name}`;
  return `The Pattern Behind Your Score, ${payload.first_name}`;
}

function getDay5Subject(payload?: Record<string, unknown>): string {
  const auditType = String(payload?.audit_type || '');
  if (auditType === 'capital_protection') return 'The Cost of Waiting';
  if (auditType.includes('profit_leak')) return 'What This Is Actually Costing You';
  if (auditType === 'corporate') return 'What Weak Discipline Is Costing Your Team';
  return 'What This Is Actually Costing You';
}

function get24hSubject(payload: Record<string, unknown>): string {
  return `Tomorrow: Your Session with Lionel Eersteling`;
}

function get1hSubject(): string {
  return 'Starting in 60 Minutes — Your Session with Lionel';
}

// ──── Main handler ────

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const payload = await req.json();
    console.log('ghl-scan-followup received:', JSON.stringify({ audit_type: payload.audit_type, booked: payload.booked, booking_update: payload.booking_update, email: payload.email }).slice(0, 400));

    // 1. Upsert contact
    const contactId = await upsertContact(payload);

    // 2. Create opportunity
    await createOpportunity(contactId, payload);

    // 3. Send immediate email + schedule follow-ups
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    const booked = payload.booked === true;
    const isBookingUpdate = payload.booking_update === true;
    const auditType = String(payload.audit_type || '');

    if (isBookingUpdate && booked) {
      // BOOKING UPDATE: User booked via Daisy after initial results email was already sent
      // 1. Send booking confirmation email
      const confirmSubject = getBookingSubject(payload);
      const confirmHTML = buildBookingConfirmationHTML(payload);
      await sendEmail(contactId, confirmSubject, confirmHTML);

      // 2. Cancel pending nurture emails for this contact
      await supabase
        .from('scheduled_emails')
        .update({ status: 'cancelled' } as any)
        .eq('contact_email', String(payload.email))
        .in('email_type', ['nurture_day2', 'nurture_day5'])
        .eq('status', 'pending');

      console.log('Cancelled nurture emails for booked contact:', payload.email);

      // 3. Schedule booking reminders
      const bookingDateStr = String(payload.booking_date || '');
      const bookingTimeStr = String(payload.booking_time || '');
      
      if (bookingDateStr && bookingTimeStr) {
        const bookingDateTime = new Date(`${bookingDateStr}T${bookingTimeStr}:00+04:00`);
        const reminder24h = new Date(bookingDateTime.getTime() - 24 * 60 * 60 * 1000);
        const reminder1h = new Date(bookingDateTime.getTime() - 60 * 60 * 1000);
        const now = new Date();

        if (reminder24h > now) {
          await supabase.from('scheduled_emails').insert({
            contact_id: contactId,
            contact_email: String(payload.email),
            email_type: 'reminder_24h',
            subject: get24hSubject(payload),
            html_body: buildReminderHTML(payload, '24h'),
            send_at: reminder24h.toISOString(),
            scan_type: auditType,
          });
        }

        if (reminder1h > now) {
          await supabase.from('scheduled_emails').insert({
            contact_id: contactId,
            contact_email: String(payload.email),
            email_type: 'reminder_1h',
            subject: get1hSubject(),
            html_body: buildReminderHTML(payload, '1h'),
            send_at: reminder1h.toISOString(),
            scan_type: auditType,
          });
        }
      }
    } else if (booked) {
      // INITIAL SUBMISSION WITH BOOKING (rare: user booked before initial call)
      const confirmSubject = getBookingSubject(payload);
      const confirmHTML = buildBookingConfirmationHTML(payload);
      await sendEmail(contactId, confirmSubject, confirmHTML);

      const bookingDateStr = String(payload.booking_date || '');
      const bookingTimeStr = String(payload.booking_time || '');
      
      if (bookingDateStr && bookingTimeStr) {
        const bookingDateTime = new Date(`${bookingDateStr}T${bookingTimeStr}:00+04:00`);
        const reminder24h = new Date(bookingDateTime.getTime() - 24 * 60 * 60 * 1000);
        const reminder1h = new Date(bookingDateTime.getTime() - 60 * 60 * 1000);
        const now = new Date();

        if (reminder24h > now) {
          await supabase.from('scheduled_emails').insert({
            contact_id: contactId,
            contact_email: String(payload.email),
            email_type: 'reminder_24h',
            subject: get24hSubject(payload),
            html_body: buildReminderHTML(payload, '24h'),
            send_at: reminder24h.toISOString(),
            scan_type: auditType,
          });
        }

        if (reminder1h > now) {
          await supabase.from('scheduled_emails').insert({
            contact_id: contactId,
            contact_email: String(payload.email),
            email_type: 'reminder_1h',
            subject: get1hSubject(),
            html_body: buildReminderHTML(payload, '1h'),
            send_at: reminder1h.toISOString(),
            scan_type: auditType,
          });
        }
      }
    } else {
      // PATH A: Results email + nurture sequence (no booking)
      const resultsSubject = getResultsSubject(payload);
      const resultsHTML = buildResultsEmailHTML(payload);
      await sendEmail(contactId, resultsSubject, resultsHTML);

      // Day 2 nurture
      const day2SendAt = new Date(Date.now() + 2 * 24 * 60 * 60 * 1000);
      await supabase.from('scheduled_emails').insert({
        contact_id: contactId,
        contact_email: String(payload.email),
        email_type: 'nurture_day2',
        subject: getDay2Subject(payload),
        html_body: buildNurtureDay2HTML(payload),
        send_at: day2SendAt.toISOString(),
        scan_type: auditType,
      });

      // Day 5 nurture
      const day5SendAt = new Date(Date.now() + 5 * 24 * 60 * 60 * 1000);
      await supabase.from('scheduled_emails').insert({
        contact_id: contactId,
        contact_email: String(payload.email),
        email_type: 'nurture_day5',
        subject: getDay5Subject(payload),
        html_body: buildNurtureDay5HTML(payload),
        send_at: day5SendAt.toISOString(),
        scan_type: auditType,
      });
    }

    return new Response(JSON.stringify({ success: true, contactId, booked }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('ghl-scan-followup error:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
