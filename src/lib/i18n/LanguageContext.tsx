import { createContext, useContext, useState, ReactNode } from "react";

export type Language = "en" | "nl";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

export const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
};

// ─── Dictionaries defined first so LanguageProvider can reference them safely ──


// ─── English ──────────────────────────────────────────────────────────────────
const en: Record<string, string> = {
  // Navigation – Home
  "nav.about": "About",
  "nav.blog": "Blog",
  "nav.startHere": "Start Here",
  "nav.faq": "Q&A",
  "nav.bookSession": "Book a Session",

  // Navigation – Business
  "nav.services": "Services",
  "nav.whyUs": "Why Us",
  "nav.results": "Results",
  "nav.process": "Process",
  "nav.takeTeamAudit": "Take Team Audit",
  "nav.bookConsultation": "Book A Consultation",

  // Navigation – Elite
  "nav.program": "Program",
  "nav.transformation": "Transformation",
  "nav.takeLeaderAssessment": "Take Discipline Assessment",
  "nav.applyNow": "Apply Now",

  // Hero – Home
  "home.hero.headline1": "Strategic Sparring",
  "home.hero.headline2": "for",
  "home.hero.headline3": "Founders.",
  "home.hero.description": "Leaders Performance is a boutique advisory where founders sharpen strategy, leadership and execution.",
  "home.hero.cta": "Find Your Next Move",
  "home.hero.buttonIntro": "Not every founder needs the same next step. Start a short conversation to determine the most relevant move inside Leaders Performance.",

  // Intro
  "home.intro.philosophy": "Serious Companies Require Serious Leadership",
  "home.intro.text": "Leaders Performance exists to strengthen the founder behind the company. We provide strategic sparring, structured interventions and leadership infrastructure that help founders sharpen decisions, strengthen execution and build companies with durable foundations.",
  "home.intro.cta": "About Leaders Performance",
  "home.intro.quote": "Leaders Performance is where founders sharpen strategy, strengthen leadership and protect what they have built.",

  // Offerings
  "home.offerings.eyebrow1": "Private Reset",
  "home.offerings.title1": "UNMASKED",
  "home.offerings.body1": "I lead UNMASKED personally.\n\nThis is not a seminar. It's a controlled reset.\n\nWe strip away what no longer serves you and rebuild from structure.\n\nBody. Clarity. Command. Execution.\n\nVitality — Recalibrate your biological baseline so your energy matches your ambition.\nMindset — Expose the patterns driving your decisions under pressure.\nLeadership — Reset your command presence from the inside out.\nBusiness — Build a precise 90-day execution map grounded in reality.\n\nMy name is Lionel Eersteling.\nFormer professional athlete.\nMulti-entrepreneur.\nInvestor.\nFounder of the Leaders Performance Group.\n\nI don't sell motivation.\nI build operating systems for leaders who refuse to drift.",
  "home.offerings.specs1": "Limited to 2–4 participants per edition.",
  "home.offerings.link1": "View Experience details",
  "home.offerings.eyebrow2": "Ongoing Strategy",
  "home.offerings.title2": "Boardroom Advisory",
  "home.offerings.body2": "Strategic performance audits, execution discipline, and accountability for business owners navigating critical inflection points.",
  "home.offerings.link2": "Explore Advisory",
  "home.offerings.eyebrow3": "Foundation",
  "home.offerings.title3": "The RESET Method",
  "home.offerings.body3": "Begin by mapping your current baseline. Use our foundational scorecard to identify where performance is drifting.",
  "home.offerings.link3": "Take the Assessment",

  // Mission
  "home.mission.eyebrow": "Our Purpose",
  "home.mission.read": "Read",
  "home.mission.pause": "Pause",
  "home.mission.restart": "Restart",
  "home.mission.heading": "About Lionel",
  "home.about.p1": "Lionel Eersteling is the founder of Leaders Performance, a boutique advisory platform built for founders who take their companies seriously.",
  "home.about.p2": "A former professional athlete with more than 25 years of experience in human performance, leadership and entrepreneurship, Lionel combines performance discipline with strategic business thinking.",
  "home.about.p3": "Over the past decades he has built and scaled companies across multiple industries and worked alongside founders navigating growth, leadership challenges and complex business environments.",
  "home.about.p4": "Today he works with a limited number of founders each year as a strategic sparring partner.",
  "home.about.p5": "His role is not to coach from the sidelines, but to work alongside founders to:",
  "home.about.b1": "sharpen strategic thinking",
  "home.about.b2": "challenge blind spots",
  "home.about.b3": "strengthen leadership discipline",
  "home.about.b4": "improve execution inside the company",
  "home.about.b5": "protect the capital they have built",
  "home.about.closing": "Leaders Performance operates as a boutique leadership infrastructure, supported by an international network of specialists when situations require legal, investigative or strategic expertise.",
  "home.missionNew.heading": "Our Mission",
  "home.missionNew.tagline": "To strengthen the founder behind the company.",
  "home.missionNew.p1": "At Leaders Performance we believe that companies rarely fail because of ideas.",
  "home.missionNew.p2": "They fail because leadership becomes unclear, decisions lose sharpness, and execution drifts.",
  "home.missionNew.p3": "Our mission is to help founders build companies with stronger foundations through disciplined thinking, clear leadership and structured execution.",
  "home.missionNew.p4": "We do this through strategic sparring, focused intervention environments and leadership infrastructure designed for founders who are serious about building enduring companies.",
  "home.visionNew.heading": "Our Vision",
  "home.visionNew.tagline": "To build an environment where founders develop the clarity, discipline and leadership required to build resilient companies.",
  "home.visionNew.p1": "As technology accelerates and markets move faster than ever, the real competitive advantage will not be tools or tactics.",
  "home.visionNew.p2": "It will be leadership.",
  "home.visionNew.p3": "The future belongs to founders who combine:",
  "home.visionNew.b1": "strategic clarity",
  "home.visionNew.b2": "disciplined execution",
  "home.visionNew.b3": "strong leadership",
  "home.visionNew.b4": "technological awareness",
  "home.visionNew.b5": "personal resilience",
  "home.visionNew.closing": "Leaders Performance exists to support those founders.",

  // Intervention Process
  "home.pillars.eyebrow": "The Process",
  "home.pillars.heading": "How an Intervention Typically Unfolds",
  "home.pillars.intro": "Every situation is different, but most founder engagements follow a similar strategic process.",
  "home.pillars.cta": "Find Your Next Move",
  "home.pillars.title1": "Situation Assessment",
  "home.pillars.desc1": "A private conversation to understand the real pressure points inside the business and leadership structure.\n\nWe assess:\n• leadership dynamics\n• operational clarity\n• decision pressure\n• structural risks",
  "home.pillars.title2": "Strategic Diagnosis",
  "home.pillars.desc2": "We identify the underlying problem behind the visible symptoms.\n\nIn many cases the issue is not growth, revenue or market, but structure, leadership alignment or decision quality.",
  "home.pillars.title3": "Intervention Environment",
  "home.pillars.desc3": "Depending on the situation, the next step may include:\n• UNMASKED intervention\n• Founder Strategic Advisory\n• Leadership alignment sessions\n• Special situations coordination\n\nThe goal is to create a controlled environment where real decisions can be made.",
  "home.pillars.title4": "Structural Reset",
  "home.pillars.desc4": "Once clarity is established, we implement structural changes such as:\n• leadership alignment\n• decision frameworks\n• operational structure\n• strategic direction\n\nThis stage focuses on restoring control and execution discipline.",
  "home.pillars.title5": "Strategic Continuation",
  "home.pillars.desc5": "Some founders continue through Founder Strategic Advisory to maintain clarity, discipline and performance as the business grows.",

  // Testimonials
  "home.testimonials.heading": "Client",
  "home.testimonials.headingGold": "Success",
  "home.testimonials.headingSuffix": "Stories",
  "home.testimonials.subheading": "Hear directly from founders and executives who have experienced clarity through our programs.",
  "home.testimonials.q1": "The UNMASKED experience forced me to confront decisions I'd been avoiding for months. Within two weeks of returning, I restructured my entire leadership team.",
  "home.testimonials.q2": "Lionel's advisory gave me the accountability framework I was missing. My execution discipline has completely transformed since we started working together.",
  "home.testimonials.q3": "I went in skeptical and came out with absolute clarity. The desert environment strips everything away — you're left with only what matters.",
  "home.testimonials.q4": "The structured approach to decision-making has been invaluable. I no longer feel paralyzed by the complexity of scaling my business.",

  // Showcase
  "home.showcase.title1": "UNMASKED Intervention",
  "home.showcase.desc1": "A private intervention environment in the Dubai desert for founders who require clarity, structural reset and decisive execution.",
  "home.showcase.cta1": "Apply for UNMASKED",
  "home.showcase.title2": "Founder Strategic Advisory",
  "home.showcase.desc2": "Work directly with Lionel Eersteling as a strategic sparring partner for sharper thinking, stronger leadership and disciplined execution.",
  "home.showcase.cta2": "Request Advisory",
  "home.showcase.title3": "Capital Protection",
  "home.showcase.desc3": "For founders facing situations where capital, partnerships or ownership structures become exposed. Supported by international specialists.",
  "home.showcase.cta3": "Start Assessment",

  // Story
  "home.story.eyebrow": "Real People. Real Change.",
  "home.story.headline1": "Finding balance",
  "home.story.headline2": "after burnout.",
  "home.story.body": "After years of chronic stress and emotional fatigue, Maya reached out during a low point. Through small, consistent steps, she rediscovered stability and reconnected with her creative energy.",
  "home.story.cta": "Read Full Story",

  // FAQ
  "home.faq.heading": "Frequently Asked",
  "home.faq.headingGold": "Questions.",
  "home.faq.subheading": "Everything you need to know about Leaders Performance, our interventions and advisory partnerships.",
  "home.faq.q1": "What is Leaders Performance?",
  "home.faq.a1": "Leaders Performance is a strategic intervention and advisory firm for founders.\n\nWe step in when leadership pressure, strategic complexity or structural challenges start affecting the performance of the company.",
  "home.faq.q2": "What does an intervention partner for founders do?",
  "home.faq.a2": "An intervention partner works directly with founders when critical leadership, strategic or operational decisions need clarity.\n\nThe role is to bring structure, pressure-tested thinking and decisive execution back into the environment.",
  "home.faq.q3": "Who is this built for?",
  "home.faq.a3": "Leaders Performance works with founders, CEOs and leadership teams responsible for serious businesses and teams.\n\nMost clients operate under pressure where leadership decisions directly affect revenue, people and long-term company value.",
  "home.faq.q4": "What kind of situations do you intervene in?",
  "home.faq.a4": "Typical situations include:\n\n• Leadership misalignment\n• Growth without structure\n• Founder pressure or decision fatigue\n• Internal conflicts within leadership\n• Operational chaos during scaling\n• Preparation for strategic growth or exit",
  "home.faq.q5": "What is Founder Strategic Advisory?",
  "home.faq.a5": "Founder Strategic Advisory is an ongoing partnership where founders work directly with Lionel Eersteling as a strategic sparring and intervention partner.\n\nThe focus is disciplined decision-making, structural clarity and strong execution.",
  "home.faq.q6": "What is UNMASKED?",
  "home.faq.a6": "UNMASKED is a private intervention environment designed for founders and leadership teams who need immediate clarity and structural reset away from daily operational pressure.",
  "home.faq.q7": "What is the difference between UNMASKED and Advisory?",
  "home.faq.a7": "UNMASKED is a focused intervention experience designed to create immediate clarity and breakthrough thinking.\n\nFounder Advisory is the longer-term strategic partnership that ensures disciplined execution after clarity has been restored.",
  "home.faq.q8": "Who attends the UNMASKED experience?",
  "home.faq.a8": "UNMASKED is designed strictly for founders, CEOs and high-level decision-makers carrying real operational responsibility.\n\nIt is not designed for lifestyle retreats or personal development groups.",
  "home.faq.q9": "Why are UNMASKED editions limited to 2–4 people?",
  "home.faq.a9": "The small setting ensures privacy, depth and direct intervention.\n\nIt allows serious conversations and structural work without group dynamics or distractions.",
  "home.faq.q10": "What is Capital Protection & Special Situations?",
  "home.faq.a10": "In certain environments founders and investors face financial disputes, ownership conflicts or capital exposure.\n\nIn these situations Leaders Performance coordinates a global network of legal, forensic and investigative specialists to structure and guide the strategic process.\n\nCases typically start from €1M+ exposure.",
  "home.faq.q11": "Is everything confidential?",
  "home.faq.a11": "Yes. Many of the situations we work on involve sensitive leadership, operational or capital matters.\n\nConfidentiality and controlled environments are fundamental to the way we operate.",
  "home.faq.q12": "What is the next step?",
  "home.faq.a12": "Founders can request a private conversation to assess the situation and determine the most relevant path inside Leaders Performance.\n\nPossible routes include:\n\n• UNMASKED intervention\n• Founder Strategic Advisory\n• Special Situations support",

  // Final CTA
  "home.finalCta.heading": "Clarity is a decision.",
  "home.finalCta.subheading": "Applications are currently open for upcoming UNMASKED editions and Advisory partnerships.",
  "home.finalCta.cta": "Begin the Application",

  // Transition section
  "home.transition.eyebrow": "Advisory",
  "home.transition.headline1": "Great companies are built through clarity,",
  "home.transition.headline2": "discipline and decisive leadership.",
  "home.transition.body": "Leaders Performance provides the structure founders need to think sharper, execute stronger and build companies that last.",

  // Articles section
  "home.articles.eyebrow": "Insights",
  "home.articles.heading": "Latest",
  "home.articles.headingGold": "Articles",
  "home.articles.subheading": "Explore our latest thinking on leadership, discipline, and personal mastery.",
  "home.articles.title1": "The Power of Mental Sovereignty",
  "home.articles.desc1": "Discover how reclaiming control over your thoughts and emotions can transform your leadership presence and decision-making under pressure.",
  "home.articles.title2": "Why Discipline Beats Motivation",
  "home.articles.desc2": "Motivation fades. Discipline endures. Learn why the most effective leaders rely on systems and structure — not fleeting inspiration.",
  "home.articles.title3": "Leading Through Uncertainty",
  "home.articles.desc3": "In times of crisis, your team looks to you. Build the resilience and composure needed to lead with clarity when it matters most.",
  "home.articles.title4": "The Reset Method Explained",
  "home.articles.desc4": "A deep dive into our proven framework for breaking old patterns, installing new habits, and achieving lasting personal transformation.",

  // Audit UI strings
  "audit.question": "Question",
  "audit.of": "of",
  "audit.chooseNoBack": "Choose. No going back.",

  // Audit Questions (EN)
  "audit.q1.title": "THE MORNING STANDARD",
  "audit.q1.question": "When does your team start work?",
  "audit.q1.option1": "When they feel like it. No set times.",
  "audit.q1.option2": "Flexible start, but most arrive around the same time.",
  "audit.q1.option3": "Core hours exist but aren't strictly enforced.",
  "audit.q1.option4": "At the agreed time, sharp. Late arrivals are corrected immediately.",
  "audit.q2.title": "THE SILENCE TEST",
  "audit.q2.question": "If you (The CEO) leave the office for 2 weeks with zero contact, what happens?",
  "audit.q2.option1": "Chaos. Performance drops. The phone rings constantly.",
  "audit.q2.option2": "Things slow down noticeably. Key decisions wait.",
  "audit.q2.option3": "Most things continue, but some areas struggle.",
  "audit.q2.option4": "Execution continues. The standard holds.",
  "audit.q3.title": "THE DEADLINE PROTOCOL",
  "audit.q3.question": "How does your team handle missed deadlines?",
  "audit.q3.option1": "They offer excuses. We accept them.",
  "audit.q3.option2": "They acknowledge it but don't prevent recurrence.",
  "audit.q3.option3": "They own it and usually fix it, but it still happens.",
  "audit.q3.option4": "They own it. They fix it. They ensure it doesn't happen twice.",
  "audit.q4.title": "THE CONFRONTATION",
  "audit.q4.question": "When a team member is underperforming, what does the rest of the team do?",
  "audit.q4.option1": "They cover for them or complain behind their back.",
  "audit.q4.option2": "They ignore it and let management deal with it.",
  "audit.q4.option3": "Some team members speak up, but it's inconsistent.",
  "audit.q4.option4": "They regulate them. The team demands the standard before I do.",
  "audit.q5.title": "THE MEETING TAX",
  "audit.q5.question": "Do your meetings have a clear agenda and a hard stop time?",
  "audit.q5.option1": "No. We talk until we feel 'done.' It often drags on.",
  "audit.q5.option2": "Sometimes there's an agenda, rarely enforced.",
  "audit.q5.option3": "Usually structured, but we often run over.",
  "audit.q5.option4": "Yes. Clear objective. Hard stop. If you are late, the door is locked.",
  "audit.q6.title": "THE PROBLEM SOLVER",
  "audit.q6.question": "When a problem arises, what comes to your desk?",
  "audit.q6.option1": "The problem. 'Boss, what do we do?'",
  "audit.q6.option2": "The problem with some context, but no proposal.",
  "audit.q6.option3": "The problem with a rough idea of what to do.",
  "audit.q6.option4": "The solution. 'Boss, this broke. Here is how I fixed it.'",
  "audit.q7.title": "THE MIRROR",
  "audit.q7.question": "Be honest. If you had to re-hire your entire current team today, would you?",
  "audit.q7.option1": "No. I would replace at least 50% of them.",
  "audit.q7.option2": "No. I would replace about 30% of them.",
  "audit.q7.option3": "Mostly yes, but a few positions need upgrading.",
  "audit.q7.option4": "Yes. They are killers.",

  // Elite Hero

  "elite.hero.badge": "Founder Strategic Advisory",
  "elite.hero.headline": "I help founders see where their company is leaking money and fix the structure behind it.",
  "elite.hero.description": "Work directly with Lionel Eersteling as a strategic advisor for founders who operate under constant pressure, complex decisions, and high expectations.\n\nThis private advisory engagement helps founders restore clarity, strengthen leadership discipline and execute with precision.",
  "elite.hero.stat1Value": "",
  "elite.hero.stat1Label": "Founder Advisory",
  "elite.hero.stat2Value": "",
  "elite.hero.stat2Label": "Strategic Clarity",
  "elite.hero.stat3Value": "",
  "elite.hero.stat3Label": "Disciplined Execution",
   "elite.hero.ctaPrimary": "Apply for Founder Advisory",
   "elite.hero.ctaSecondary": "Take Discipline Assessment",
   "elite.hero.disclaimer": "Limited spots available • Application required",
   "elite.hero.pressureHeadline": "Founder Pressure builds long before it becomes visible.",
   "elite.hero.pressureCTA": "Take the Founder Pressure Scan",
   "elite.hero.pressureDuration": "Duration: 3 minutes",

  // Elite – Quote
  "elite.quote1": "Most founders are not lacking ambition.\nThey are lacking a structure that challenges their thinking.",
  "elite.quote2": "If you keep starting over, you don't need a new plan — you need a stronger frame.",

  // Elite – Program
  "elite.program.eyebrow": "The Framework",
  "elite.program.heading": "The Four Areas Where Founders Regain Control",
  "elite.program.subheading": "Our advisory framework addresses the core areas where founder pressure builds, creating structural change through a proven, strategic approach.",
  "elite.program.title1": "Leadership Capacity",
  "elite.program.desc1": "Strategic leadership requires physical and mental capacity to operate under pressure.",
  "elite.program.title2": "Founder Clarity",
  "elite.program.desc2": "Clear thinking determines the quality of strategic decisions.",
  "elite.program.title3": "Leadership Discipline",
  "elite.program.desc3": "Organizations reflect the standards their founder enforces.",
  "elite.program.title4": "Strategic Execution",
  "elite.program.desc4": "Translate decisions into disciplined execution across the organization.",

  // Elite – Transformation
  "elite.transformation.eyebrow": "The Transformation",
  "elite.transformation.heading": "From Founder Pressure to Strategic Control",
  "elite.transformation.subheading": "This isn't about small improvements. It's about restoring strategic control over your leadership, decisions, and organization.",
  "elite.transformation.beforeTitle": "Before Strategic Intervention",
  "elite.transformation.afterTitle": "After Strategic Advisory",
  "elite.transformation.before1": "Constant decision pressure",
  "elite.transformation.before2": "Founder dependency inside the organization",
  "elite.transformation.before3": "Unclear leadership standards",
  "elite.transformation.before4": "Execution problems across teams",
  "elite.transformation.before5": "Strategic fatigue",
  "elite.transformation.before6": "Lack of structure at leadership level",
  "elite.transformation.before7": "",
  "elite.transformation.after1": "Clear strategic direction",
  "elite.transformation.after2": "Stronger leadership authority",
  "elite.transformation.after3": "Defined standards across the organization",
  "elite.transformation.after4": "Improved decision making",
  "elite.transformation.after5": "Disciplined execution",
  "elite.transformation.after6": "Restored founder control",
  "elite.transformation.after7": "",

  // Elite – Process
  "elite.process.eyebrow": "The Process",
  "elite.process.heading": "The Advisory Process",
  "elite.process.subheading": "A structured advisory engagement designed to restore strategic control and leadership discipline.",
  "elite.process.step1": "Strategic Diagnostic",
  "elite.process.step1Desc": "We analyze your current leadership structure, strategic challenges and pressure points.",
  "elite.process.step2": "Founder Reality Assessment",
  "elite.process.step2Desc": "Identify where leadership, structure and execution break down inside the organization.",
  "elite.process.step3": "Private Strategic Advisory",
  "elite.process.step3Desc": "Direct strategic conversations focused on leadership decisions, execution discipline and organizational clarity.",
  "elite.process.step4": "Structural Change",
  "elite.process.step4Desc": "Install structures that sustain performance beyond the advisory engagement.",

  // Elite – Results
  "elite.results.eyebrow": "Success Stories",
  "elite.results.heading": "Real Results from Real People",
  "elite.results.subheading": "Join founders who have transformed their leadership through strategic advisory.",

  // Elite – Booking
  "elite.booking.badge": "Limited Availability",
  "elite.booking.heading": "Work Directly With Lionel Eersteling",
  "elite.booking.subheading": "This private advisory engagement is designed for founders and executives who operate under pressure and want sharper thinking, stronger leadership discipline and better execution.",
  "elite.booking.cta": "Apply for Founder Advisory",
  "elite.booking.spotsLeft": "Only 5 spots available per month",
  "elite.booking.includedTitle": "What's Included",
  "elite.booking.include1": "Private strategic advisory sessions",
  "elite.booking.include2": "Direct founder-level sparring",
  "elite.booking.include3": "Leadership structure analysis",
  "elite.booking.include4": "Strategic decision guidance",
  "elite.booking.include5": "Execution discipline frameworks",
  "elite.booking.include6": "",

  // Elite – Video
  "elite.video.cta": "Book a Consultation",

  // Elite – Footer
  "elite.footer.description": "Strategic advisory for founders who operate under pressure.",
  "elite.footer.quickLinks": "Quick Links",
  "elite.footer.apply": "Apply Now",
  "elite.footer.legal": "Legal",
  "elite.footer.copyright": "© {year} Leaders Performance Institute. All rights reserved.",

  // Business Hero
  "business.hero.badge": "For teams of 5-50 persons",
  "business.hero.headline": "Your company doesn't have a people problem.\nIt has a leadership structure problem.",
  "business.hero.description": "Every organization reflects the standards its founder tolerates. If mediocrity persists, that's a choice.\n\nThe Business Reset Blueprint restructures your organisation so that accountability is in the right place and performance is no longer dependent on you alone.",
  "business.hero.belowVideo": "Within 30 days, the structure is installed that restores ownership, accountability and performance.",
  "business.hero.ctaPrimary": "Book a Consult",
  "business.hero.ctaSecondary": "Audit My Team First",

  // Business – Why Us
  "business.whyUs.eyebrow": "The Problem",
  "business.whyUs.heading": "The leadership standard has become unclear.",
  "business.whyUs.body1": "You hire capable people, yet you remain the one correcting, explaining and fixing problems. Every repeated instruction takes time. Every missed deadline without consequence lowers the standard.",
  "business.whyUs.body2": "This is not a capacity issue.\nThis is a leadership structure issue.\n\nIf you catch mistakes, no one takes ownership. If you keep adjusting, dependency becomes the culture.\n\nThe company moves forward, but only through your constant intervention. And that's not a scalable system.",
  "business.whyUs.symptomsHeading": "The Symptoms",
  "business.whyUs.symptom1.title": "Ownership disappears",
  "business.whyUs.symptom1.quote": "\"I thought someone else would take care of it.\"\n\nResponsibility isn't clearly assigned. Tasks are left undone because no one feels ownership.",
  "business.whyUs.symptom2.title": "Founder dependency",
  "business.whyUs.symptom2.quote": "You're the one who always has to fix things.\n\nWhen you make the necessary adjustments, dependency becomes the norm.",
  "business.whyUs.symptom3.title": "Compliance instead of commitment",
  "business.whyUs.symptom3.quote": "Just enough is done to avoid arguments.\n\nNo initiative. No extra responsibility. No involvement beyond the minimum.",

  // Business – Services
  "business.services.eyebrow": "The Protocol",
  "business.services.heading": "We don't motivate teams.\nWe install leadership structure.",
  "business.services.subheading": "Motivation fades.\nStructure determines behaviour.\n\nThe Business Reset Blueprint is not a workshop.\nIt is an organizational intervention.\n\nWe analyze where dependencies have arisen. Where standards have blurred. Where responsibility is unclear.\n\nThen we apply structure:\nClear roles\nClear decision rules\nMeasurable standards\nConsequences that make sense\n\nNo extra pressure. Clear frameworks.\n\nPerformance isn't a coincidence. It becomes the result of the system.",
  "business.services.installHeading": "What We Install",
  "business.services.item1.title": "Leadership Capacity",
  "business.services.item1.desc": "Without mental and physical capacity, strategic leadership collapses.",
  "business.services.item2.title": "Founder Clarity",
  "business.services.item2.desc": "Leadership decisions become sharp when personal clarity returns.",
  "business.services.item3.title": "Leadership Authority",
  "business.services.item3.desc": "The founder sets the standard the organization follows.",
  "business.services.item4.title": "Organizational Structure",
  "business.services.item4.desc": "Systems replace constant founder intervention.",

  // Business – Process
  "business.process.eyebrow": "The Process",
  "business.process.heading": "The Toolkit.",
  "business.process.item1.title": "Leadership Protocol",
  "business.process.item1.desc": "A structured framework that installs clear standards across the organization.",
  "business.process.item2.title": "Operational Discipline",
  "business.process.item2.desc": "Clear meeting structures, reporting lines and execution protocols.",
  "business.process.item3.title": "The Organizational Audit",
  "business.process.item3.desc": "We identify where ownership has disappeared and where dependency has formed.",
  "business.process.item4.title": "The Intervention",
  "business.process.item4.desc": "A focused leadership session where the structure is installed and responsibilities become clear.",

  // Business – Results
  "business.results.eyebrow": "The Evidence",
  "business.results.heading": "When leadership structure changes, results follow.",
  "business.results.quote1": "We stopped babysitting. Revenue went up 40% in Q1 because I finally had time to lead instead of manage.",
  "business.results.quote2": "Lionel didn't motivate my team. He scared them straight. Best investment we made.",

  "business.booking.eyebrow": "The Decision",
  "business.booking.heading": "The founder always sets the standard.\nThe only question is which standard you accept.",
  "business.booking.optionALabel": "Option A",
  "business.booking.optionAText": "Continue correcting problems that should be owned by your team.\nContinue to compensate for lack of ownership.\nContinue to bear the pressure that should be distributed.\nContinue to build an organization that cannot function without your intervention.",
  "business.booking.optionBLabel": "Option B",
  "business.booking.optionBText": "Install the structure.\nRestore ownership.\nLead the company instead of carrying it.",
  "business.booking.quote": "The standard you walk past is the standard you accept.",
  "business.booking.ctaPrimary": "Book A Consult",
  "business.booking.ctaSecondary": "Audit My Team",

  // Business – Quote
  "business.quote.text": "\"You cannot scale chaos. Execute or be replaced.\"",

  // Business – Footer
  "business.footer.description": "Transforming organizations through elite leadership development and high-performance coaching.",
  "business.footer.quickLinks": "Quick Links",
  "business.footer.bookCall": "Book a Call",
  "business.footer.legal": "Legal",
  "business.footer.copyright": "© {year} Leaders Performance Institute. All rights reserved.",

  // Business – Audit CTA
  "business.auditCTA.badge": "Corporate Discipline Audit",
  "business.auditCTA.heading": "Is your team an asset or a risk?",
  "business.auditCTA.body1": "The effectiveness of your organization is determined by the standards you use.\n\nA team isn't a cost center. It's a multiplier or a drag.\n\nGain insight in two minutes.\n\nAnswer seven focused questions.\nReceive a score.\nSee where you stand.",
  "business.auditCTA.body2": "",
  "business.auditCTA.body3": "7 questions. No fluff. Immediate verdict.",
  "business.auditCTA.cta": "Start The Audit",
  "business.auditCTA.disclaimer": "Warning: The truth doesn't care about your feelings.",

  // Footer (EN)
  "footer.home": "Home",
  "footer.blog": "Articles",
  "footer.startHere": "Start Here",
  "footer.faq": "FAQ",
  "footer.copyright": `© ${new Date().getFullYear()} Leaders Performance. All rights reserved.`,
  "footer.privacy": "Privacy Policy",
  "footer.terms": "Terms of Service",

  // Assessment CTA
  "assessmentCTA.badge": "Assess Your Leadership Structure",
  "assessmentCTA.heading": "Assess Your Leadership Structure",
  "assessmentCTA.description": "Complete the assessment to identify where leadership structure and execution need intervention.",
  "assessmentCTA.benefit1": "Identify your leadership strengths & growth areas",
  "assessmentCTA.benefit2": "Get your personalized report",
  "assessmentCTA.benefit3": "Receive elite strategies for your profile",
  "assessmentCTA.cta": "Take The Assessment",
  "assessmentCTA.disclaimer": "Complete in 10 minutes • Free personalized report",

  // Elite Pressure Scan CTA
  "elite.pressureCTA.headline": "Founder Pressure builds long before it becomes visible.",
  "elite.pressureCTA.cta": "Take the Founder Pressure Scan",
  "elite.pressureCTA.duration": "Duration: 3 minutes",
};

// ─── Dutch ────────────────────────────────────────────────────────────────────
const nl: Record<string, string> = {
  // Navigation – Home
  "nav.about": "Over ons",
  "nav.blog": "Blog",
  "nav.startHere": "Begin hier",
  "nav.faq": "V&A",
  "nav.bookSession": "Boek een sessie",

  // Navigation – Business
  "nav.services": "Diensten",
  "nav.whyUs": "Waarom wij",
  "nav.results": "Resultaten",
  "nav.process": "Werkwijze",
  "nav.takeTeamAudit": "Team audit uitvoeren",
  "nav.bookConsultation": "Boek een consult",

  // Navigation – Elite
  "nav.program": "Programma",
  "nav.transformation": "Transformatie",
  "nav.takeLeaderAssessment": "Start de disciplinetest",
  "nav.applyNow": "Aanmelden voor elite coaching",

  // Hero – Home
  "home.hero.headline1": "Strategische Sparring",
  "home.hero.headline2": "voor",
  "home.hero.headline3": "Founders.",
  "home.hero.description": "Leaders Performance is een boutique adviesbureau waar founders strategie, leiderschap en uitvoering aanscherpen.",
  "home.hero.cta": "Vind Je Volgende Stap",
  "home.hero.buttonIntro": "Niet elke founder heeft dezelfde volgende stap nodig. Start een kort gesprek om de meest relevante stap binnen Leaders Performance te bepalen.",

  // Intro
  "home.intro.philosophy": "Serieuze Bedrijven Vereisen Serieus Leiderschap",
  "home.intro.text": "Leaders Performance bestaat om de founder achter het bedrijf te versterken. Wij bieden strategische sparring, gestructureerde interventies en leiderschapsinfrastructuur die founders helpen scherpere beslissingen te nemen, sterker uit te voeren en bedrijven te bouwen met duurzame fundamenten.",
  "home.intro.cta": "Over Leaders Performance",
  "home.intro.quote": "Leaders Performance is waar founders strategie aanscherpen, leiderschap versterken en beschermen wat ze hebben opgebouwd.",

  // Offerings
  "home.offerings.eyebrow1": "Privé reset",
  "home.offerings.title1": "UNMASKED",
  "home.offerings.body1": "Ik leid UNMASKED persoonlijk.\n\nDit is geen seminar.\n\nDit is een gerichte reset.\n\nWe verwijderen wat je niet langer dient\nen bouwen opnieuw op vanuit structuur.\n\nLichaam.\nHelderheid.\nLeiderschap.\nUitvoering.\n\nVitaliteit — Herkalibreer je fysieke basis zodat je energie je ambitie ondersteunt.\nMindset — Maak zichtbaar welke patronen jouw beslissingen onder druk sturen.\nLeiderschap — Versterk je gezag van binnenuit.\nBusiness — Ontwikkel een scherp en realistisch 90-dagen uitvoeringsplan.\n\nMijn naam is Lionel Eersteling.\nVoormalig professioneel topsporter.\nMulti-ondernemer.\nInvesteerder.\nOprichter van de Leaders Performance Group.\n\nIk verkoop geen motivatie.\nIk ontwikkel besturingssystemen voor leiders die weigeren te blijven draaien op wilskracht alleen.",
  "home.offerings.specs1": "Beperkt tot 2–4 deelnemers per editie.",
  "home.offerings.link1": "Bekijk ervaringsdetails",
  "home.offerings.eyebrow2": "Doorlopende strategie",
  "home.offerings.title2": "Boardroom Advies",
  "home.offerings.body2": "Strategische prestatieaudits, uitvoeringsdiscipline en verantwoordelijkheid voor ondernemers die cruciale keerpunten navigeren.",
  "home.offerings.link2": "Verken advies",
  "home.offerings.eyebrow3": "Fundament",
  "home.offerings.title3": "De RESET Methode",
  "home.offerings.body3": "Begin met het in kaart brengen van je huidige uitgangspunt. Gebruik onze scorecard om te identificeren waar prestaties wegglippen.",
  "home.offerings.link3": "Doe de assessment",

  // Mission
  "home.mission.eyebrow": "Ons doel",
  "home.mission.read": "Lees",
  "home.mission.pause": "Pauzeer",
  "home.mission.restart": "Herstart",
  "home.mission.heading": "Over Lionel",
  "home.about.p1": "Lionel Eersteling is de oprichter van Leaders Performance, een boutique adviesplatform gebouwd voor founders die hun bedrijven serieus nemen.",
  "home.about.p2": "Een voormalig professioneel atleet met meer dan 25 jaar ervaring in menselijke prestaties, leiderschap en ondernemerschap. Lionel combineert prestatiediscipline met strategisch zakelijk denken.",
  "home.about.p3": "In de afgelopen decennia heeft hij bedrijven gebouwd en opgeschaald in meerdere sectoren en heeft hij samengewerkt met founders die groei, leiderschapsuitdagingen en complexe zakelijke omgevingen navigeren.",
  "home.about.p4": "Vandaag werkt hij met een beperkt aantal founders per jaar als strategische sparringpartner.",
  "home.about.p5": "Zijn rol is niet om vanaf de zijlijn te coachen, maar om samen met founders te werken aan:",
  "home.about.b1": "strategisch denken aanscherpen",
  "home.about.b2": "blinde vlekken uitdagen",
  "home.about.b3": "leiderschapsdiscipline versterken",
  "home.about.b4": "uitvoering binnen het bedrijf verbeteren",
  "home.about.b5": "het opgebouwde kapitaal beschermen",
  "home.about.closing": "Leaders Performance opereert als een boutique leiderschapsinfrastructuur, ondersteund door een internationaal netwerk van specialisten wanneer situaties juridische, onderzoeks- of strategische expertise vereisen.",
  "home.missionNew.heading": "Onze Missie",
  "home.missionNew.tagline": "De founder achter het bedrijf versterken.",
  "home.missionNew.p1": "Bij Leaders Performance geloven we dat bedrijven zelden falen vanwege ideeën.",
  "home.missionNew.p2": "Ze falen omdat leiderschap onduidelijk wordt, beslissingen hun scherpte verliezen en uitvoering afdrijft.",
  "home.missionNew.p3": "Onze missie is founders te helpen bedrijven te bouwen met sterkere fundamenten door gedisciplineerd denken, helder leiderschap en gestructureerde uitvoering.",
  "home.missionNew.p4": "We doen dit door strategische sparring, gefocuste interventieomgevingen en leiderschapsinfrastructuur ontworpen voor founders die serieus zijn over het bouwen van duurzame bedrijven.",
  "home.visionNew.heading": "Onze Visie",
  "home.visionNew.tagline": "Een omgeving bouwen waar founders de helderheid, discipline en het leiderschap ontwikkelen die nodig zijn om veerkrachtige bedrijven te bouwen.",
  "home.visionNew.p1": "Nu technologie versnelt en markten sneller bewegen dan ooit, zal het echte concurrentievoordeel niet liggen in tools of tactieken.",
  "home.visionNew.p2": "Het zal leiderschap zijn.",
  "home.visionNew.p3": "De toekomst is aan founders die combineren:",
  "home.visionNew.b1": "strategische helderheid",
  "home.visionNew.b2": "gedisciplineerde uitvoering",
  "home.visionNew.b3": "sterk leiderschap",
  "home.visionNew.b4": "technologisch bewustzijn",
  "home.visionNew.b5": "persoonlijke veerkracht",
  "home.visionNew.closing": "Leaders Performance bestaat om die founders te ondersteunen.",
  "home.vision.ecosystem": "Leaders Performance biedt een leiderschapsinfrastructuur waar founders strategie aanscherpen, leiderschap versterken en gedisciplineerd uitvoeren.",
  "home.vision.notFollowers": "We bouwen geen volgers.",
  "home.vision.autonomous": "We bouwen autonome leiders die de bedrijven van de toekomst creëren.",

  // Intervention Process
  "home.pillars.eyebrow": "Het Proces",
  "home.pillars.heading": "Hoe een Interventie Doorgaans Verloopt",
  "home.pillars.intro": "Elke situatie is anders, maar de meeste founder-trajecten volgen een vergelijkbaar strategisch proces.",
  "home.pillars.cta": "Vind Jouw Volgende Stap",
  "home.pillars.title1": "Situatiebeoordeling",
  "home.pillars.desc1": "Een privégesprek om de werkelijke drukpunten binnen de business en leiderschapsstructuur te begrijpen.\n\nWe beoordelen:\n• leiderschapsdynamiek\n• operationele helderheid\n• beslissingsdruk\n• structurele risico's",
  "home.pillars.title2": "Strategische Diagnose",
  "home.pillars.desc2": "We identificeren het onderliggende probleem achter de zichtbare symptomen.\n\nIn veel gevallen is het probleem niet groei, omzet of markt, maar structuur, leiderschapsafstemming of besluitkwaliteit.",
  "home.pillars.title3": "Interventieomgeving",
  "home.pillars.desc3": "Afhankelijk van de situatie kan de volgende stap omvatten:\n• UNMASKED interventie\n• Founder Strategic Advisory\n• Leiderschapsafstemming sessies\n• Special situations coördinatie\n\nHet doel is een gecontroleerde omgeving te creëren waar echte beslissingen genomen kunnen worden.",
  "home.pillars.title4": "Structurele Reset",
  "home.pillars.desc4": "Zodra helderheid is bereikt, implementeren we structurele veranderingen zoals:\n• leiderschapsafstemming\n• besluitvormingskaders\n• operationele structuur\n• strategische richting\n\nDeze fase richt zich op het herstellen van controle en uitvoeringsdiscipline.",
  "home.pillars.title5": "Strategische Continuïteit",
  "home.pillars.desc5": "Sommige founders gaan verder via Founder Strategic Advisory om helderheid, discipline en prestaties te behouden terwijl het bedrijf groeit.",

  // Testimonials
  "home.testimonials.heading": "Klant",
  "home.testimonials.headingGold": "Succes",
  "home.testimonials.headingSuffix": "Verhalen",
  "home.testimonials.subheading": "Hoor direct van ondernemers en leidinggevenden die helderheid hebben ervaren via onze programma's.",
  "home.testimonials.q1": "De UNMASKED-ervaring dwong me beslissingen onder ogen te zien die ik al maanden uitstelde. Binnen twee weken na terugkomst heb ik mijn gehele leiderschapsteam geherstructureerd.",
  "home.testimonials.q2": "Lionel's advies gaf me het verantwoordelijkheidsraamwerk dat ik miste. Mijn uitvoeringsdiscipline is volledig getransformeerd sinds we samenwerken.",
  "home.testimonials.q3": "Ik ging er sceptisch in en kwam eruit met absolute helderheid. De woestijnomgeving stript alles weg — je houdt alleen over wat echt belangrijk is.",
  "home.testimonials.q4": "De gestructureerde aanpak van besluitvorming is van onschatbare waarde geweest. Ik voel me niet langer verlamd door de complexiteit van het opschalen van mijn bedrijf.",

  // Showcase
  "home.showcase.title1": "UNMASKED Interventie",
  "home.showcase.desc1": "Een privé interventieomgeving in de woestijn van Dubai voor founders die helderheid, structurele reset en besluitvaardige uitvoering nodig hebben.",
  "home.showcase.cta1": "Aanmelden voor UNMASKED",
  "home.showcase.title2": "Founder Strategisch Advies",
  "home.showcase.desc2": "Werk direct samen met Lionel Eersteling als strategische sparringpartner voor scherper denken, sterker leiderschap en gedisciplineerde uitvoering.",
  "home.showcase.cta2": "Advies aanvragen",
  "home.showcase.title3": "Kapitaalbescherming",
  "home.showcase.desc3": "Voor founders die geconfronteerd worden met situaties waarbij kapitaal, partnerschappen of eigendomsstructuren worden blootgesteld. Ondersteund door internationale specialisten.",
  "home.showcase.cta3": "Start assessment",

  // Story
  "home.story.eyebrow": "Echte mensen. Echte verandering.",
  "home.story.headline1": "Balans vinden",
  "home.story.headline2": "na een burn-out.",
  "home.story.body": "Na jaren van chronische stress en emotionele vermoeidheid nam Maya contact op in een dieptepunt. Door kleine, consistente stappen herontdekte ze stabiliteit en herverbond ze zich met haar creatieve energie.",
  "home.story.cta": "Lees het volledige verhaal",

  // FAQ
  "home.faq.heading": "Veelgestelde",
  "home.faq.headingGold": "Vragen.",
  "home.faq.subheading": "Alles wat u moet weten over Leaders Performance, onze interventies en adviespartnerschappen.",
  "home.faq.q1": "Wat is Leaders Performance?",
  "home.faq.a1": "Leaders Performance is een strategisch interventie- en adviesbureau voor ondernemers.\n\nWij stappen in wanneer leiderschapsdruk, strategische complexiteit of structurele uitdagingen de prestaties van het bedrijf beginnen te beïnvloeden.",
  "home.faq.q2": "Wat doet een interventiepartner voor ondernemers?",
  "home.faq.a2": "Een interventiepartner werkt rechtstreeks met ondernemers wanneer kritieke leiderschap-, strategische of operationele beslissingen helderheid nodig hebben.\n\nDe rol is om structuur, drukgetest denken en beslissende uitvoering terug te brengen in de omgeving.",
  "home.faq.q3": "Voor wie is dit gebouwd?",
  "home.faq.a3": "Leaders Performance werkt met ondernemers, CEO's en leiderschapsteams die verantwoordelijk zijn voor serieuze bedrijven en teams.\n\nDe meeste klanten opereren onder druk waarbij leiderschapsbeslissingen direct invloed hebben op omzet, mensen en langetermijn bedrijfswaarde.",
  "home.faq.q4": "In wat voor situaties intervenieert u?",
  "home.faq.a4": "Typische situaties zijn:\n\n• Leiderschapsmisalignment\n• Groei zonder structuur\n• Ondernemersdruk of beslissingsmoeheid\n• Interne conflicten binnen leiderschap\n• Operationele chaos tijdens opschaling\n• Voorbereiding op strategische groei of exit",
  "home.faq.q5": "Wat is Founder Strategic Advisory?",
  "home.faq.a5": "Founder Strategic Advisory is een doorlopend partnerschap waarbij ondernemers rechtstreeks samenwerken met Lionel Eersteling als strategische sparringpartner en interventiepartner.\n\nDe focus ligt op gedisciplineerde besluitvorming, structurele helderheid en sterke uitvoering.",
  "home.faq.q6": "Wat is UNMASKED?",
  "home.faq.a6": "UNMASKED is een privé interventieomgeving ontworpen voor ondernemers en leiderschapsteams die onmiddellijke helderheid en structurele reset nodig hebben, weg van de dagelijkse operationele druk.",
  "home.faq.q7": "Wat is het verschil tussen UNMASKED en Advisory?",
  "home.faq.a7": "UNMASKED is een gerichte interventie-ervaring ontworpen om onmiddellijke helderheid en doorbraakdenken te creëren.\n\nFounder Advisory is het langetermijn strategisch partnerschap dat gedisciplineerde uitvoering waarborgt nadat helderheid is hersteld.",
  "home.faq.q8": "Wie neemt deel aan de UNMASKED-ervaring?",
  "home.faq.a8": "UNMASKED is uitsluitend ontworpen voor ondernemers, CEO's en besluitvormers op hoog niveau die echte operationele verantwoordelijkheid dragen.\n\nHet is niet ontworpen voor lifestyle-retraites of persoonlijke ontwikkelingsgroepen.",
  "home.faq.q9": "Waarom zijn UNMASKED-edities beperkt tot 2–4 personen?",
  "home.faq.a9": "De kleine setting waarborgt privacy, diepgang en directe interventie.\n\nHet maakt serieuze gesprekken en structureel werk mogelijk zonder groepsdynamiek of afleidingen.",
  "home.faq.q10": "Wat is Capital Protection & Special Situations?",
  "home.faq.a10": "In bepaalde omgevingen worden ondernemers en investeerders geconfronteerd met financiële geschillen, eigendomsconflicten of kapitaalblootstelling.\n\nIn deze situaties coördineert Leaders Performance een wereldwijd netwerk van juridische, forensische en onderzoeksspecialisten om het strategische proces te structureren en te begeleiden.\n\nZaken beginnen doorgaans vanaf €1M+ blootstelling.",
  "home.faq.q11": "Is alles vertrouwelijk?",
  "home.faq.a11": "Ja. Veel van de situaties waar we aan werken betreffen gevoelige leiderschap-, operationele of kapitaalkwesties.\n\nVertrouwelijkheid en gecontroleerde omgevingen zijn fundamenteel voor de manier waarop wij opereren.",
  "home.faq.q12": "Wat is de volgende stap?",
  "home.faq.a12": "Ondernemers kunnen een privégesprek aanvragen om de situatie te beoordelen en het meest relevante pad binnen Leaders Performance te bepalen.\n\nMogelijke routes zijn:\n\n• UNMASKED-interventie\n• Founder Strategic Advisory\n• Special Situations-ondersteuning",

  // Final CTA
  "home.finalCta.heading": "Helderheid is een beslissing.",
  "home.finalCta.subheading": "Aanmeldingen zijn momenteel open voor aankomende UNMASKED-edities en adviespartnerschappen.",
  "home.finalCta.cta": "Begin de aanmelding",

  // Transition section (NL)
  "home.transition.eyebrow": "Advies",
  "home.transition.headline1": "Grote bedrijven worden gebouwd door helderheid,",
  "home.transition.headline2": "discipline en besluitvaardig leiderschap.",
  "home.transition.body": "Leaders Performance biedt de structuur die founders nodig hebben om scherper te denken, sterker uit te voeren en bedrijven te bouwen die blijven bestaan.",

  // Articles section (NL)
  "home.articles.eyebrow": "Inzichten",
  "home.articles.heading": "Nieuwste",
  "home.articles.headingGold": "Artikelen",
  "home.articles.subheading": "Verken onze nieuwste gedachten over leiderschap, discipline en persoonlijk meesterschap.",
  "home.articles.title1": "De kracht van mentale soevereiniteit",
  "home.articles.desc1": "Ontdek hoe het herwinnen van controle over je gedachten en emoties je leiderschapsaanwezigheid en besluitvorming onder druk kan transformeren.",
  "home.articles.title2": "Waarom discipline motivatie verslaat",
  "home.articles.desc2": "Motivatie vervaagt. Discipline blijft. Leer waarom de meest effectieve leiders vertrouwen op systemen en structuur — niet op vluchtige inspiratie.",
  "home.articles.title3": "Leiden door onzekerheid",
  "home.articles.desc3": "In tijden van crisis kijkt jouw team naar jou. Bouw de veerkracht en kalmte om met helderheid te leiden wanneer het er het meest toe doet.",
  "home.articles.title4": "De Reset Methode uitgelegd",
  "home.articles.desc4": "Een diepgaande analyse van ons bewezen raamwerk voor het doorbreken van oude patronen, het installeren van nieuwe gewoonten en het bereiken van blijvende persoonlijke transformatie.",

  // Audit UI strings (NL)
  "audit.question": "Vraag",
  "audit.of": "van",
  "audit.chooseNoBack": "Kies een antwoord. Er is geen weg terug.",

  // Audit Questions (NL)
  "audit.q1.title": "DE OCHTENDNORM",
  "audit.q1.question": "Wanneer begint jouw team met werken?",
  "audit.q1.option1": "Wanneer ze zin hebben. Geen vaste tijden.",
  "audit.q1.option2": "Flexibele start, maar de meesten komen rond dezelfde tijd.",
  "audit.q1.option3": "Kernuren bestaan maar worden niet strikt gehandhaafd.",
  "audit.q1.option4": "Op de afgesproken tijd, stipt. Te laat komen wordt direct gecorrigeerd.",
  "audit.q2.title": "DE STILTETEST",
  "audit.q2.question": "Als jij (de CEO) 2 weken het kantoor verlaat zonder contact, wat gebeurt er dan?",
  "audit.q2.option1": "Chaos. Prestaties dalen. De telefoon gaat continu over.",
  "audit.q2.option2": "Alles vertraagt merkbaar. Belangrijke beslissingen wachten.",
  "audit.q2.option3": "Het meeste gaat door, maar sommige gebieden worstelen.",
  "audit.q2.option4": "Uitvoering gaat door. De norm blijft.",
  "audit.q3.title": "HET DEADLINEPROTOCOL",
  "audit.q3.question": "Hoe gaat jouw team om met gemiste deadlines?",
  "audit.q3.option1": "Ze komen met excuses. We accepteren ze.",
  "audit.q3.option2": "Ze erkennen het maar voorkomen herhaling niet.",
  "audit.q3.option3": "Ze nemen verantwoordelijkheid en lossen het meestal op, maar het gebeurt nog steeds.",
  "audit.q3.option4": "Ze nemen verantwoordelijkheid. Ze lossen het op. Ze zorgen dat het niet twee keer gebeurt.",
  "audit.q4.title": "DE CONFRONTATIE",
  "audit.q4.question": "Wanneer een teamlid onderpresteert, wat doet de rest van het team?",
  "audit.q4.option1": "Ze dekken hem/haar in of klagen achter zijn/haar rug om.",
  "audit.q4.option2": "Ze negeren het en laten het management het afhandelen.",
  "audit.q4.option3": "Sommige teamleden spreken zich uit, maar het is inconsistent.",
  "audit.q4.option4": "Ze corrigeren hem/haar. Het team eist de norm vóórdat ik dat doe.",
  "audit.q5.title": "HET VERGADERPROTOCOL",
  "audit.q5.question": "Hebben vergaderingen een duidelijke agenda en een vaste eindtijd?",
  "audit.q5.option1": "Nee. We praten tot we klaar denken te zijn. Het loopt vaak uit.",
  "audit.q5.option2": "Soms is er een agenda, zelden gehandhaafd.",
  "audit.q5.option3": "Meestal gestructureerd, maar we lopen vaak uit.",
  "audit.q5.option4": "Ja. Duidelijk doel. Vaste eindtijd. Te laat? De deur is dicht.",
  "audit.q6.title": "DE PROBLEEMOPLOSSER",
  "audit.q6.question": "Wanneer er een probleem ontstaat, wat wordt er dan met jou gecommuniceerd?",
  "audit.q6.option1": "Het probleem. 'Baas, wat moeten we doen?'",
  "audit.q6.option2": "Het probleem met wat context, maar geen voorstel.",
  "audit.q6.option3": "Het probleem met een ruw idee van wat te doen.",
  "audit.q6.option4": "De oplossing. 'Baas, dit ging fout. Zo heb ik het opgelost.'",
  "audit.q7.title": "DE SPIEGEL",
  "audit.q7.question": "Wees eerlijk. Als je vandaag je volledige team opnieuw zou moeten aannemen, doe je dat dan?",
  "audit.q7.option1": "Nee. Ik zou minimaal 50% vervangen.",
  "audit.q7.option2": "Nee. Ik zou ongeveer 30% vervangen.",
  "audit.q7.option3": "Grotendeels wel, maar een paar posities moeten geüpgraded worden.",
  "audit.q7.option4": "Ja. Het zijn toppers.",

  // Footer (NL)
  "footer.home": "Home",
  "footer.blog": "Artikelen",
  "footer.startHere": "Begin hier",
  "footer.faq": "FAQ",
  "footer.copyright": `© ${new Date().getFullYear()} Leaders Performance. Alle rechten voorbehouden.`,
  "footer.privacy": "Privacybeleid",
  "footer.terms": "Algemene voorwaarden",

  // Elite Hero

  "elite.hero.badge": "Founder Strategisch Advies",
  "elite.hero.headline": "Strategisch Advies voor Founders Onder Druk",
  "elite.hero.description": "Werk direct met Lionel Eersteling als strategisch adviseur voor founders die opereren onder constante druk, complexe beslissingen en hoge verwachtingen.\n\nDit privé adviestraject helpt founders helderheid te herstellen, leiderschapsdiscipline te versterken en met precisie uit te voeren.",
  "elite.hero.stat1Value": "",
  "elite.hero.stat1Label": "Founder Advies",
  "elite.hero.stat2Value": "",
  "elite.hero.stat2Label": "Strategische Helderheid",
  "elite.hero.stat3Value": "",
  "elite.hero.stat3Label": "Gedisciplineerde Uitvoering",
   "elite.hero.ctaPrimary": "Aanmelden voor Founder Advies",
   "elite.hero.ctaSecondary": "Start de disciplinetest",
   "elite.hero.disclaimer": "Beperkt aantal plaatsen • Aanmelding vereist",
   "elite.hero.pressureHeadline": "Druk op de founder bouwt zich op lang voordat het zichtbaar wordt.",
   "elite.hero.pressureCTA": "Start de Founder Pressure Scan",
   "elite.hero.pressureDuration": "Duur: 3 minuten",

  // Elite – Quote (NL)
  "elite.quote1": "De meeste founders missen geen ambitie.\nZe missen een structuur die hun denken uitdaagt.",
  "elite.quote2": "Als je steeds opnieuw begint, heb je geen nieuw plan nodig — je hebt een sterker fundament nodig.",

  // Elite – Program (NL)
  "elite.program.eyebrow": "Het raamwerk",
  "elite.program.heading": "De Vier Gebieden Waar Founders Controle Herwinnen",
  "elite.program.subheading": "Ons adviesraamwerk richt zich op de kerngebieden waar founderdruk opbouwt, en creëert structurele verandering via een bewezen, strategische aanpak.",
  "elite.program.title1": "Leiderschapscapaciteit",
  "elite.program.desc1": "Strategisch leiderschap vereist fysieke en mentale capaciteit om onder druk te opereren.",
  "elite.program.title2": "Founderhelderheid",
  "elite.program.desc2": "Helder denken bepaalt de kwaliteit van strategische beslissingen.",
  "elite.program.title3": "Leiderschapsdiscipline",
  "elite.program.desc3": "Organisaties weerspiegelen de standaard die hun founder handhaaft.",
  "elite.program.title4": "Strategische Uitvoering",
  "elite.program.desc4": "Vertaal beslissingen naar gedisciplineerde uitvoering door de hele organisatie.",

  // Elite – Transformation (NL)
  "elite.transformation.eyebrow": "De transformatie",
  "elite.transformation.heading": "Van Founderdruk naar Strategische Controle",
  "elite.transformation.subheading": "Dit gaat niet om kleine verbeteringen. Het gaat om het herstellen van strategische controle over je leiderschap, beslissingen en organisatie.",
  "elite.transformation.beforeTitle": "Voor Strategische Interventie",
  "elite.transformation.afterTitle": "Na Strategisch Advies",
  "elite.transformation.before1": "Constante beslissingsdruk",
  "elite.transformation.before2": "Founderafhankelijkheid binnen de organisatie",
  "elite.transformation.before3": "Onduidelijke leiderschapsstandaarden",
  "elite.transformation.before4": "Uitvoeringsproblemen door teams heen",
  "elite.transformation.before5": "Strategische vermoeidheid",
  "elite.transformation.before6": "Gebrek aan structuur op leiderschapsniveau",
  "elite.transformation.before7": "",
  "elite.transformation.after1": "Heldere strategische richting",
  "elite.transformation.after2": "Sterker leiderschapsgezag",
  "elite.transformation.after3": "Gedefinieerde standaarden door de organisatie",
  "elite.transformation.after4": "Verbeterde besluitvorming",
  "elite.transformation.after5": "Gedisciplineerde uitvoering",
  "elite.transformation.after6": "Herstelde foundercontrole",
  "elite.transformation.after7": "",

  // Elite – Process (NL)
  "elite.process.eyebrow": "Het proces",
  "elite.process.heading": "Het Adviesproces",
  "elite.process.subheading": "Een gestructureerd adviestraject ontworpen om strategische controle en leiderschapsdiscipline te herstellen.",
  "elite.process.step1": "Strategische Diagnose",
  "elite.process.step1Desc": "We analyseren je huidige leiderschapsstructuur, strategische uitdagingen en drukpunten.",
  "elite.process.step2": "Founder Realiteitscheck",
  "elite.process.step2Desc": "Identificeer waar leiderschap, structuur en uitvoering vastlopen binnen de organisatie.",
  "elite.process.step3": "Privé Strategisch Advies",
  "elite.process.step3Desc": "Directe strategische gesprekken gericht op leiderschapsbeslissingen, uitvoeringsdiscipline en organisatorische helderheid.",
  "elite.process.step4": "Structurele Verandering",
  "elite.process.step4Desc": "Installeer structuren die prestaties borgen voorbij het adviestraject.",

  // Elite – Results (NL)
  "elite.results.eyebrow": "Succesverhalen",
  "elite.results.heading": "Echte Resultaten van Echte Mensen",
  "elite.results.subheading": "Sluit je aan bij founders die hun leiderschap hebben getransformeerd via strategisch advies.",

  // Elite – Booking (NL)
  "elite.booking.badge": "Beperkt aantal plaatsen beschikbaar",
  "elite.booking.heading": "Werk Direct Met Lionel Eersteling",
  "elite.booking.subheading": "Dit privé adviestraject is ontworpen voor founders en executives die onder druk opereren en scherper denken, sterkere leiderschapsdiscipline en betere uitvoering willen.",
  "elite.booking.cta": "Aanmelden voor Founder Advies",
  "elite.booking.spotsLeft": "Slechts 5 plekken per maand beschikbaar",
  "elite.booking.includedTitle": "Wat is inbegrepen",
  "elite.booking.include1": "Privé strategische adviessessies",
  "elite.booking.include2": "Directe founder-level sparring",
  "elite.booking.include3": "Leiderschapsstructuur analyse",
  "elite.booking.include4": "Strategische besluitvormingsbegeleiding",
  "elite.booking.include5": "Uitvoeringsdiscipline raamwerken",
  "elite.booking.include6": "",

  // Elite – Video (NL)
  "elite.video.cta": "Boek een consult",

  // Elite – Footer (NL)
  "elite.footer.description": "Strategisch advies voor founders die onder druk opereren.",
  "elite.footer.quickLinks": "Snelle links",
  "elite.footer.apply": "Aanmelden",
  "elite.footer.legal": "Juridisch",
  "elite.footer.copyright": "© {year} Leaders Performance Institute. Alle rechten voorbehouden.",
  "business.hero.badge": "Voor teams van 5-50 personen",
  "business.hero.headline": "Je bedrijf heeft geen mensenprobleem.\nHet heeft een leiderschapsstructuurprobleem.",
  "business.hero.description": "Elke organisatie weerspiegelt de standaard die de oprichter tolereert. Als middelmatigheid blijft bestaan, is dat een keuze.\n\nDe Business Reset Blueprint herstructureert je organisatie zodat verantwoordelijkheid weer op de juiste plek ligt en prestaties niet afhankelijk zijn van jou alleen.",
  "business.hero.belowVideo": "Binnen 30 dagen is de structuur geïnstalleerd die eigenaarschap, verantwoordelijkheid en prestaties herstelt.",
  "business.hero.ctaPrimary": "Boek een consult",
  "business.hero.ctaSecondary": "Team audit uitvoeren",

  // Business – Why Us (NL)
  "business.whyUs.eyebrow": "Het probleem",
  "business.whyUs.heading": "De leiderschapsstandaard is onduidelijk geworden.",
  "business.whyUs.body1": "Je neemt capabele mensen aan, maar jij blijft degene die corrigeert, uitlegt en problemen oplost. Elke herhaalde instructie kost tijd. Elke gemiste deadline zonder consequentie verlaagt de standaard.",
  "business.whyUs.body2": "Dit is geen capaciteitsprobleem.\nDit is een leiderschapsstructuurprobleem.\n\nAls jij fouten opvangt, neemt niemand eigenaarschap. Als jij blijft bijsturen, wordt afhankelijkheid de cultuur.\n\nHet bedrijf gaat vooruit, maar alleen door jouw constante interventie. En dat is geen schaalbaar systeem.",
  "business.whyUs.symptomsHeading": "De symptomen",
  "business.whyUs.symptom1.title": "Eigenaarschap verdwijnt",
  "business.whyUs.symptom1.quote": "\"Ik dacht dat iemand anders het oppakte.\"\n\nVerantwoordelijkheid is niet duidelijk belegd. Taken blijven liggen omdat niemand zich eigenaar voelt.",
  "business.whyUs.symptom2.title": "Founderafhankelijkheid",
  "business.whyUs.symptom2.quote": "Jij bent degene die het steeds moet oplossen.\n\nWanneer jij standaard bijstuurt, wordt afhankelijkheid de norm.",
  "business.whyUs.symptom3.title": "Compliance in plaats van commitment",
  "business.whyUs.symptom3.quote": "Er wordt precies genoeg gedaan om geen discussie te krijgen.\n\nGeen initiatief. Geen extra verantwoordelijkheid. Geen betrokkenheid boven het minimum.",

  // Business – Services (NL)
  "business.services.eyebrow": "Het protocol",
  "business.services.heading": "Wij motiveren geen teams.\nWij installeren leiderschapsstructuur.",
  "business.services.subheading": "Motivatie vervaagt.\nStructuur bepaalt gedrag.\n\nDe Business Reset Blueprint is geen workshop.\nHet is een organisatorische interventie.\n\nWe analyseren waar afhankelijkheid is ontstaan. Waar normen vervaagd zijn. Waar verantwoordelijkheid niet helder is.\n\nVervolgens brengen we structuur aan:\nHeldere rollen\nDuidelijke beslisregels\nMeetbare standaarden\nConsequenties die kloppen\n\nGeen extra druk. Wel duidelijke kaders.\n\nPrestaties worden geen toeval. Ze worden het resultaat van het systeem.",
  "business.services.installHeading": "Wat wij installeren",
  "business.services.item1.title": "Leiderschapscapaciteit",
  "business.services.item1.desc": "Zonder mentale en fysieke capaciteit stort strategisch leiderschap in.",
  "business.services.item2.title": "Founderhelderheid",
  "business.services.item2.desc": "Leiderschapsbeslissingen worden scherp wanneer persoonlijke helderheid terugkeert.",
  "business.services.item3.title": "Leiderschapsautoriteit",
  "business.services.item3.desc": "De founder zet de standaard die de organisatie volgt.",
  "business.services.item4.title": "Organisatiestructuur",
  "business.services.item4.desc": "Systemen vervangen constante founderinterventie.",

  // Business – Process (NL)
  "business.process.eyebrow": "Het proces",
  "business.process.heading": "De toolkit.",
  "business.process.item1.title": "Leiderschapsprotocol",
  "business.process.item1.desc": "Een gestructureerd raamwerk dat duidelijke standaarden door de hele organisatie installeert.",
  "business.process.item2.title": "Operationele discipline",
  "business.process.item2.desc": "Duidelijke vergaderstructuren, rapportagelijnen en uitvoeringsprotocollen.",
  "business.process.item3.title": "De organisatie-audit",
  "business.process.item3.desc": "Wij identificeren waar eigenaarschap is verdwenen en waar afhankelijkheid is ontstaan.",
  "business.process.item4.title": "De interventie",
  "business.process.item4.desc": "Een gerichte leiderschapssessie waarin de structuur wordt geïnstalleerd en verantwoordelijkheden helder worden.",

  // Business – Results (NL)
  "business.results.eyebrow": "Het bewijs",
  "business.results.heading": "Wanneer leiderschapsstructuur verandert, volgen resultaten.",
  "business.results.quote1": "We stopped babysitting. Revenue went up 40% in Q1 because I finally had time to lead instead of manage.",
  "business.results.quote2": "Lionel didn't motivate my team. He scared them straight. Best investment we made.",

  "business.booking.eyebrow": "De beslissing",
  "business.booking.heading": "De founder zet altijd de standaard.\nDe enige vraag is welke standaard je accepteert.",
  "business.booking.optionALabel": "Optie A",
  "business.booking.optionAText": "Blijf problemen corrigeren die eigendom van je team zouden moeten zijn.\nBlijf compenseren voor gebrek aan eigenaarschap.\nBlijf zelf de druk dragen die verdeeld zou moeten zijn.\nBlijf bouwen aan een organisatie die zonder jouw ingrijpen niet functioneert.",
  "business.booking.optionBLabel": "Optie B",
  "business.booking.optionBText": "Installeer de structuur.\nHerstel eigenaarschap.\nLeid het bedrijf in plaats van het te dragen.",
  "business.booking.quote": "De norm die jij accepteert, is de norm die jij instelt.",
  "business.booking.ctaPrimary": "Boek een consult",
  "business.booking.ctaSecondary": "Team audit uitvoeren",

  // Business – Quote (NL)
  "business.quote.text": "\"Chaos schaalt niet. Structuur wel.\"",

  // Business – Footer (NL)
  "business.footer.description": "Organisaties transformeren via elite leiderschapsontwikkeling en high-performance coaching.",
  "business.footer.quickLinks": "Snelle links",
  "business.footer.bookCall": "Boek een gesprek",
  "business.footer.legal": "Juridisch",
  "business.footer.copyright": "© {year} Leaders Performance Institute. Alle rechten voorbehouden.",

  // Business – Audit CTA (NL)
  "business.auditCTA.badge": "Bedrijfsdiscipline audit",
  "business.auditCTA.heading": "Is jouw team een aanwinst of een risico?",
  "business.auditCTA.body1": "De effectiviteit van je organisatie wordt bepaald door de standaard die je hanteert.\n\nEen team is geen kostenpost. Het is een vermenigvuldiger of een vertragende factor.\n\nIn twee minuten krijg je inzicht.\n\nBeantwoord zeven gerichte vragen.\nOntvang een score.\nZie waar je staat.",
  "business.auditCTA.body2": "",
  "business.auditCTA.body3": "7 vragen. Geen opvulling. Onmiddellijk oordeel.",
  "business.auditCTA.cta": "Start de audit",
  "business.auditCTA.disclaimer": "Waarschuwing: De waarheid geeft niet om jouw gevoelens.",

  // Assessment CTA
  "assessmentCTA.badge": "Beoordeel Je Leiderschapsstructuur",
  "assessmentCTA.heading": "Beoordeel Je Leiderschapsstructuur",
  "assessmentCTA.description": "Vul de assessment in om te identificeren waar leiderschapsstructuur en uitvoering interventie nodig hebben.",
  "assessmentCTA.benefit1": "Identificeer je sterke en zwakke leiderschapskwaliteiten.",
  "assessmentCTA.benefit2": "Ontvang direct je resultaten",
  "assessmentCTA.benefit3": "Ontvang strategieën op basis van jouw profiel.",
  "assessmentCTA.cta": "Doe de assessment",
  "assessmentCTA.disclaimer": "De test duurt slechts 10 minuten en je ontvangt je resultaat direct.",

  // Elite Pressure Scan CTA (NL)
  "elite.pressureCTA.headline": "Founderdruk bouwt op lang voordat het zichtbaar wordt.",
  "elite.pressureCTA.cta": "Doe de Founder Pressure Scan",
  "elite.pressureCTA.duration": "Duur: 3 minuten",
};

// ─── Provider (declared after dictionaries to ensure initialization order) ────
export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>("en");

  const t = (key: string): string => {
    const dict = language === "nl" ? nl : en;
    return (dict as Record<string, string>)[key] ?? key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};
