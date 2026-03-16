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

  // Intro
  "home.intro.philosophy": "Our Philosophy",
  "home.intro.text": "At Leaders Performance, we don't rush change — we help it unfold with intention. Through structured environments, strategic accountability, and a steady pace, we support growth that lasts.",
  "home.intro.cta": "About Leaders Performance",

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
  "home.mission.heading": "Our Mission",
  "home.mission.tagline": "To develop leaders who become the foundation of their own success.",
  "home.mission.p1": "At Leaders Performance, we build the human first.",
  "home.mission.p2": "Then the leader.",
  "home.mission.p3": "Then the business.",
  "home.mission.pillarsIntro": "Through the RESET Blueprint, we integrate four core dimensions:",
  "home.mission.pillar1": "Vitality",
  "home.mission.pillar1desc": " — Physical strength and energy as the base of capacity.",
  "home.mission.pillar2": "Personal Development",
  "home.mission.pillar2desc": " — Self-awareness, responsibility, and autonomy beyond conditioning.",
  "home.mission.pillar3": "Leadership",
  "home.mission.pillar3desc": " — The ability to empower others from stability and integrity.",
  "home.mission.pillar4": "AI Integration",
  "home.mission.pillar4desc": " — Leveraging technology as an amplifier without losing human sovereignty.",
  "home.mission.createLeaders": "Our mission is to create leaders who:",
  "home.mission.bullet1": "• act from conscious choice rather than unconscious programming",
  "home.mission.bullet2": "• use technology without outsourcing your thinking",
  "home.mission.bullet3": "• build from alignment instead of ego or validation",
  "home.mission.bullet4": "• produce measurable business growth as a result of internal congruence",
  "home.mission.notOptimize": "We do not optimize businesses first.",
  "home.mission.strengthen": "We strengthen the individual who leads them.",
  "home.vision.heading": "Our Vision",
  "home.vision.tagline": "To shape a new generation of leaders who master the balance between human consciousness and technological acceleration.",
  "home.vision.p1": "As AI reshapes industries and amplifies speed, human awareness becomes the true competitive advantage.",
  "home.vision.futureLeaders": "The future belongs to leaders who are:",
  "home.vision.b1": "• physically strong",
  "home.vision.b2": "• mentally clear",
  "home.vision.b3": "• emotionally mature",
  "home.vision.b4": "• technologically capable",
  "home.vision.b5": "• strategically disciplined",
  "home.vision.ecosystem": "Leaders Performance builds an ecosystem where:",
  "home.vision.e1": "• high performance becomes a lifestyle",
  "home.vision.e2": "• AI becomes a strategic multiplier",
  "home.vision.e3": "• human depth remains the differentiator",
  "home.vision.e4": "• companies grow from a solid internal foundation",
  "home.vision.notFollowers": "We are not building followers.",
  "home.vision.autonomous": "We are building autonomous leaders who create the companies of the future.",

  // Pillars
  "home.pillars.eyebrow": "The Four Pillars",
  "home.pillars.cta": "Choose Your Path",
  "home.pillars.title1": "Vitality",
  "home.pillars.desc1": "Energy is the foundation of leadership. We optimise your health, sleep, nutrition, and physical performance so you operate at full capacity — not running on fumes.",
  "home.pillars.title2": "Personal Development",
  "home.pillars.desc2": "Growth is non-negotiable. We strip away comfort zones and install a system for continuous evolution — sharpening self-awareness, emotional intelligence, and mindset mastery.",
  "home.pillars.title3": "Personal Leadership",
  "home.pillars.desc3": "Before you lead others, you lead yourself. We build the discipline, clarity, and purpose that make you the standard — not just the strategy.",
  "home.pillars.title4": "Business",
  "home.pillars.desc4": "Systems over hustle. We install the operational infrastructure, strategic thinking, and execution frameworks that scale your impact without burning you out.",

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
  "home.showcase.title1": "Private Desert Reset",
  "home.showcase.desc1": "A 4-day controlled recalibration experience in the desert. Strip away noise, confront deferred decisions, and rebuild your execution strategy from the ground up.",
  "home.showcase.cta1": "Explore UNMASKED",
  "home.showcase.title2": "Strategic Advisory",
  "home.showcase.desc2": "Ongoing strategic performance audits, execution discipline, and accountability for business owners navigating critical inflection points.",
  "home.showcase.cta2": "Learn about Advisory",
  "home.showcase.title3": "Measurable Performance",
  "home.showcase.desc3": "Track your leadership discipline with our proprietary scorecard. Identify where performance is drifting and course-correct before it compounds.",
  "home.showcase.cta3": "Take the Assessment",

  // Story
  "home.story.eyebrow": "Real People. Real Change.",
  "home.story.headline1": "Finding balance",
  "home.story.headline2": "after burnout.",
  "home.story.body": "After years of chronic stress and emotional fatigue, Maya reached out during a low point. Through small, consistent steps, she rediscovered stability and reconnected with her creative energy.",
  "home.story.cta": "Read Full Story",

  // FAQ
  "home.faq.heading": "Understanding the",
  "home.faq.headingGold": "Process.",
  "home.faq.subheading": "Have questions about our advisory and experiences? Find answers to the most common questions below.",
  "home.faq.q1": "What exactly is Leaders Performance?",
  "home.faq.a1": "We are a strategic advisory firm that builds controlled environments—both physical and operational—for founders to regain clarity and scale their businesses without sacrificing personal vitality.",
  "home.faq.q2": "Who attends the UNMASKED experience?",
  "home.faq.a2": "It is strictly for founders, CEOs, and entrepreneurs who are currently carrying heavy operational pressure and facing complex decisions. It is not for beginners or those seeking lifestyle retreats.",
  "home.faq.q3": "Why are UNMASKED editions limited to 2–4 people?",
  "home.faq.a3": "To protect privacy and ensure depth. This allows for direct, highly personalized strategic work with Lionel, rather than navigating group dynamics.",
  "home.faq.q4": "What is the difference between UNMASKED and Advisory?",
  "home.faq.a4": "UNMASKED is a rapid, 4-day physical and mental reset to establish immediate clarity. Advisory is an ongoing, long-term strategic partnership to ensure disciplined execution over time.",

  // Final CTA
  "home.finalCta.heading": "Clarity is a decision.",
  "home.finalCta.subheading": "Applications are currently open for upcoming UNMASKED editions and Advisory partnerships.",
  "home.finalCta.cta": "Begin the Application",

  // Transition section
  "home.transition.eyebrow": "Balance",
  "home.transition.headline1": "There may not be a single switch,",
  "home.transition.headline2": "but there are clear steps forward.",
  "home.transition.body": "Every path is different. These are the ways we help people move forward with confidence.",

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
  "audit.q1.optionA": "When they feel like it / \"Flexible\" start times with no core hours.",
  "audit.q1.optionB": "At the agreed time, sharp. Late arrivals are corrected immediately.",
  "audit.q2.title": "THE SILENCE TEST",
  "audit.q2.question": "If you (The CEO) leave the office for 2 weeks with zero contact, what happens?",
  "audit.q2.optionA": "Chaos. Performance drops. The phone rings constantly.",
  "audit.q2.optionB": "Execution continues. The standard holds.",
  "audit.q3.title": "THE DEADLINE PROTOCOL",
  "audit.q3.question": "How does your team handle missed deadlines?",
  "audit.q3.optionA": "They offer excuses (\"The market,\" \"The client,\" \"Traffic\"). We accept them.",
  "audit.q3.optionB": "They own it. They fix it. They ensure it doesn't happen twice.",
  "audit.q4.title": "THE CONFRONTATION",
  "audit.q4.question": "When a team member is underperforming, what does the rest of the team do?",
  "audit.q4.optionA": "They cover for them or complain behind their back.",
  "audit.q4.optionB": "They regulate them. The team demands the standard before I do.",
  "audit.q5.title": "THE MEETING TAX",
  "audit.q5.question": "Do your meetings have a clear agenda and a hard stop time?",
  "audit.q5.optionA": "No. We talk until we feel 'done.' It often drags on.",
  "audit.q5.optionB": "Yes. Clear objective. Hard stop. If you are late, the door is locked.",
  "audit.q6.title": "THE PROBLEM SOLVER",
  "audit.q6.question": "When a problem arises, what comes to your desk?",
  "audit.q6.optionA": "The problem. (\"Boss, what do we do?\")",
  "audit.q6.optionB": "The solution. (\"Boss, this broke. Here is how I fixed it.\")",
  "audit.q7.title": "THE MIRROR",
  "audit.q7.question": "Be honest. If you had to re-hire your entire current team today, would you?",
  "audit.q7.optionA": "No. I would replace at least 30% of them.",
  "audit.q7.optionB": "Yes. They are killers.",

  // Elite Hero

  "elite.hero.badge": "Elite 1-to-1 Coaching",
  "elite.hero.headline": "Transform Your Life Through Personal Elite Coaching",
  "elite.hero.description": "Unlock your full potential with personalized, high-performance coaching designed for ambitious individuals ready to break through their limits and achieve extraordinary results.",
  "elite.hero.stat1Value": "1,000+",
  "elite.hero.stat1Label": "Lives Transformed",
  "elite.hero.stat2Value": "12 Wks",
  "elite.hero.stat2Label": "Deep Transformation",
  "elite.hero.stat3Value": "100%",
  "elite.hero.stat3Label": "Personalized",
  "elite.hero.ctaPrimary": "Apply For Elite Coaching",
  "elite.hero.ctaSecondary": "Take Discipline Assessment",
  "elite.hero.disclaimer": "Limited spots available • Application required",

  // Elite – Quote
  "elite.quote1": "You're not stuck. You're just not being challenged where it matters.",
  "elite.quote2": "If you keep starting over, you don't need a new plan — you need a stronger frame.",

  // Elite – Program
  "elite.program.eyebrow": "The Program",
  "elite.program.heading": "Four Pillars of Personal Transformation",
  "elite.program.subheading": "Our elite coaching program addresses every dimension of your life, creating lasting change through a proven, holistic approach.",
  "elite.program.title1": "Vitality",
  "elite.program.desc1": "Optimize your health, energy, and physical well-being to perform at your peak every day.",
  "elite.program.title2": "Personal Development",
  "elite.program.desc2": "Unlock your potential through continuous growth, self-awareness, and mindset mastery.",
  "elite.program.title3": "Personal Leadership",
  "elite.program.desc3": "Lead yourself with discipline, clarity, and purpose before leading others.",
  "elite.program.title4": "Business",
  "elite.program.desc4": "Build and scale your business with strategic thinking, execution, and sustainable success.",

  // Elite – Transformation
  "elite.transformation.eyebrow": "The Transformation",
  "elite.transformation.heading": "From Where You Are to Where You Want to Be",
  "elite.transformation.subheading": "This isn't about small improvements. It's about a complete transformation in how you think, feel, and perform.",
  "elite.transformation.beforeTitle": "Before Elite Coaching",
  "elite.transformation.afterTitle": "After Elite Coaching",
  "elite.transformation.before1": "Poor sleep, low recovery",
  "elite.transformation.before2": "Weight goes up and down",
  "elite.transformation.before3": "Inconsistent results",
  "elite.transformation.before4": "Lack of discipline",
  "elite.transformation.before5": "Self-doubt",
  "elite.transformation.before6": "No structure or overview",
  "elite.transformation.before7": "Not living at your full potential",
  "elite.transformation.after1": "Better sleep and recovery",
  "elite.transformation.after2": "Leaner, fitter body",
  "elite.transformation.after3": "Stable, lasting results",
  "elite.transformation.after4": "Strong discipline",
  "elite.transformation.after5": "Self-confidence",
  "elite.transformation.after6": "Clear structure and focus",
  "elite.transformation.after7": "Living as your best self",

  // Elite – Process
  "elite.process.eyebrow": "Your Journey",
  "elite.process.heading": "The Path to Your Transformation",
  "elite.process.subheading": "A structured yet personalized journey designed to create deep, lasting change in your life.",
  "elite.process.step1": "Discovery Call",
  "elite.process.step1Desc": "We start with a deep-dive conversation to understand your goals, challenges, and what's truly holding you back from the life you want.",
  "elite.process.step2": "Personal Assessment",
  "elite.process.step2Desc": "Complete a comprehensive life assessment that reveals exactly where you are and creates a clear roadmap for your transformation.",
  "elite.process.step3": "Weekly 1-to-1 Sessions",
  "elite.process.step3Desc": "Engage in powerful weekly coaching sessions designed specifically for you, with ongoing support and accountability between sessions.",
  "elite.process.step4": "Lasting Transformation",
  "elite.process.step4Desc": "Integrate your new mindset, habits, and strategies for sustainable success that continues long after the program ends.",

  // Elite – Results
  "elite.results.eyebrow": "Success Stories",
  "elite.results.heading": "Real Results from Real People",
  "elite.results.subheading": "Join hundreds of individuals who have transformed their lives through elite 1-to-1 coaching.",

  // Elite – Booking
  "elite.booking.badge": "Limited Availability",
  "elite.booking.heading": "Ready to Transform Your Life?",
  "elite.booking.subheading": "This program is for ambitious individuals who are ready to invest in themselves and commit to real change. If that's you, apply for your discovery call today.",
  "elite.booking.cta": "Apply for Elite Coaching",
  "elite.booking.spotsLeft": "Only 5 spots available per month",
  "elite.booking.includedTitle": "What's Included",
  "elite.booking.include1": "12 weeks of intensive 1-to-1 coaching",
  "elite.booking.include2": "Weekly 60-minute private sessions",
  "elite.booking.include3": "Unlimited voice/text support between sessions",
  "elite.booking.include4": "Personalized action plans and exercises",
  "elite.booking.include5": "Access to exclusive resources and tools",
  "elite.booking.include6": "Lifetime access to session recordings",

  // Elite – Video
  "elite.video.cta": "Book a Consultation",

  // Elite – Footer
  "elite.footer.description": "Transforming lives through elite personal coaching and high-performance strategies.",
  "elite.footer.quickLinks": "Quick Links",
  "elite.footer.apply": "Apply Now",
  "elite.footer.legal": "Legal",
  "elite.footer.copyright": "© {year} Leaders Performance Institute. All rights reserved.",

  // Business Hero
  "business.hero.badge": "For teams of 5-50 persons",
  "business.hero.headline": "Stop Managing People. Start Leading Performers.",
  "business.hero.description": "Your business grows to the level you tolerate. If mediocrity persists, that's a choice.\n\nThe Business Reset Blueprint restructures your organisation so that accountability is in the right place and performance is no longer dependent on you alone.\n\nWithin 30 days, a system is in place that enforces discipline, ownership and results.",
  "business.hero.ctaPrimary": "Book a Consult",
  "business.hero.ctaSecondary": "Audit My Team First",

  // Business – Why Us
  "business.whyUs.eyebrow": "The Problem",
  "business.whyUs.heading": "There's no clear performance standard.",
  "business.whyUs.body1": "You hire professionals, but you keep correcting, explaining, and fixing things. Every repeated instruction takes time. Every missed deadline without consequence lowers the standard.",
  "business.whyUs.body2": "This isn't about capacity. This is about tolerance.\n\nIf you catch mistakes, no one takes ownership. If you keep adjusting, dependency becomes the culture.\n\nYour business runs. But it depends on you. And that's not a scalable system.",
  "business.whyUs.symptomsHeading": "The Symptoms",
  "business.whyUs.symptom1.title": "Lack of ownership",
  "business.whyUs.symptom1.quote": "\"I thought someone else would take care of it.\"\n\nResponsibility isn't clearly assigned. Tasks are left undone because no one feels ownership.",
  "business.whyUs.symptom2.title": "Structural dependency",
  "business.whyUs.symptom2.quote": "You're the one who always has to fix things.\n\nWhen you make the necessary adjustments, dependency becomes the norm.",
  "business.whyUs.symptom3.title": "Minimal effort",
  "business.whyUs.symptom3.quote": "Just enough is done to avoid arguments.\n\nNo initiative. No extra responsibility. No involvement beyond the minimum.",

  // Business – Services
  "business.services.eyebrow": "The Protocol",
  "business.services.heading": "We don't train. We install structure.",
  "business.services.subheading": "Motivation is temporary. Systems remain.\n\nThe Business Reset Blueprint isn't a workshop. It's an implementation.\n\nWe analyze where dependencies have arisen. Where standards have blurred. Where responsibility is unclear.\n\nThen we apply structure:\n• Clear roles\n• Clear decision rules\n• Measurable standards\n• Consequences that make sense\n\nNo extra pressure. Clear frameworks.\n\nPerformance isn't a coincidence. It becomes the result of the system.",
  "business.services.installHeading": "What We Install",
  "business.services.item1.title": "Vitality",
  "business.services.item1.desc": "Energy is the foundation. Without physical and mental sharpness, no strategy survives contact with reality.",
  "business.services.item2.title": "Personal Development",
  "business.services.item2.desc": "Growth is non-negotiable. Strip away the comfort zone and install a system for constant evolution.",
  "business.services.item3.title": "Leadership",
  "business.services.item3.desc": "You don't manage people. You set the standard. Leadership is identity, not a title.",
  "business.services.item4.title": "Business",
  "business.services.item4.desc": "Systems over hustle. Install the operational infrastructure that scales without your constant presence.",

  // Business – Process
  "business.process.eyebrow": "The Process",
  "business.process.heading": "The Toolkit.",
  "business.process.item1.title": "The Academy Access",
  "business.process.item1.desc": "Lifetime access to the core Academy for your entire team.",
  "business.process.item2.title": "The Company Culture",
  "business.process.item2.desc": "Implement our specific protocols for Meetings, Reporting, and Daily Planning.",
  "business.process.item3.title": "The Audit",
  "business.process.item3.desc": "Increase your team's effectiveness. Ultimately, it's all about the team achieving the results it was created to achieve. Every employee will be assessed individually.",
  "business.process.item4.title": "The Kickoff",
  "business.process.item4.desc": "In a 90-minute strategy call we implement the new system.",

  // Business – Results
  "business.results.eyebrow": "The Evidence",
  "business.results.heading": "Results Speak For Themselves.",
  "business.results.quote1": "We stopped babysitting. Revenue went up 40% in Q1 because I finally had time to lead instead of manage.",
  "business.results.quote2": "Lionel didn't motivate my team. He scared them straight. Best investment we made.",

  "business.booking.eyebrow": "The Decision",
  "business.booking.heading": "You Have Two Choices.",
  "business.booking.optionALabel": "Option A",
  "business.booking.optionAText": "Continue to tolerate what falls below the norm.\nContinue to compensate for lack of ownership.\nContinue to bear the pressure that should be distributed.\nContinue to build an organization that cannot function without your intervention.",
  "business.booking.optionBLabel": "Option B",
  "business.booking.optionBText": "Implement the Blueprint.\nSet the standard.\nTake back your time.",
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
  "assessmentCTA.badge": "Take The First Step",
  "assessmentCTA.heading": "Discover Your Leadership Blueprint",
  "assessmentCTA.description": "Take our comprehensive discipline assessment and receive a personalized roadmap to elite performance.",
  "assessmentCTA.benefit1": "Identify your leadership strengths & growth areas",
  "assessmentCTA.benefit2": "Get your personalized report",
  "assessmentCTA.benefit3": "Receive elite strategies for your profile",
  "assessmentCTA.cta": "Take The Assessment",
  "assessmentCTA.disclaimer": "Complete in 10 minutes • Free personalized report",
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
  "home.hero.headline1": "Een pad dat",
  "home.hero.headline2": "jouw toekomst",
  "home.hero.headline3": "Vormt.",
  "home.hero.description": "Wij bieden strategisch advies en gecontroleerde reset-omgevingen om ondernemers te helpen complexiteit met vertrouwen te navigeren. Samen bouwen we aan helderheid, uitvoeringsdiscipline en blijvende prestaties.",
  "home.hero.cta": "Kies jouw pad",

  // Intro
  "home.intro.philosophy": "Onze filosofie",
  "home.intro.text": "Bij Leaders Performance versnellen we verandering niet kunstmatig — we geven het richting. Via structuur, duidelijke verantwoordelijkheid en ritme creëren we groei die duurzaam verankerd is in gedrag en resultaat.",
  "home.intro.cta": "Over Leaders Performance",

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
  "home.mission.heading": "Onze missie",
  "home.mission.tagline": "Leiders ontwikkelen die het fundament van hun eigen succes worden.",
  "home.mission.p1": "Bij Leaders Performance bouwen we eerst de mens.",
  "home.mission.p2": "Dan de leider.",
  "home.mission.p3": "Dan het bedrijf.",
  "home.mission.pillarsIntro": "Via de RESET Blueprint integreren we vier kerndimensies:",
  "home.mission.pillar1": "Vitaliteit",
  "home.mission.pillar1desc": " — Fysieke kracht en energie als basis voor capaciteit.",
  "home.mission.pillar2": "Persoonlijke ontwikkeling",
  "home.mission.pillar2desc": " — Zelfbewustzijn, verantwoordelijkheid en autonomie voorbij conditionering.",
  "home.mission.pillar3": "Leiderschap",
  "home.mission.pillar3desc": " — Het vermogen anderen te empoweren vanuit stabiliteit en integriteit.",
  "home.mission.pillar4": "AI-integratie",
  "home.mission.pillar4desc": " — Technologie benutten als versterker zonder menselijke soevereiniteit te verliezen.",
  "home.mission.createLeaders": "Onze missie is leiders te creëren die:",
  "home.mission.bullet1": "• handelen vanuit bewuste keuze in plaats van onbewuste programmering",
  "home.mission.bullet2": "• technologie gebruiken zonder jouw denken uit te besteden",
  "home.mission.bullet3": "• bouwen vanuit afstemming in plaats van ego of validatie",
  "home.mission.bullet4": "• meetbare bedrijfsgroei realiseren als resultaat van interne congruentie",
  "home.mission.notOptimize": "De kwaliteit van een organisatie wordt bepaald",
  "home.mission.strengthen": "door de kwaliteit van degene die haar leidt.",
  "home.vision.heading": "Onze visie",
  "home.vision.tagline": "Een nieuwe generatie leiders vormen die het evenwicht beheersen tussen menselijk bewustzijn en technologische versnelling.",
  "home.vision.p1": "Nu AI industrieën hervormt en snelheid versterkt, wordt menselijk bewustzijn het echte concurrentievoordeel.",
  "home.vision.futureLeaders": "De toekomst is aan leiders die:",
  "home.vision.b1": "• fysiek sterk zijn",
  "home.vision.b2": "• mentaal helder zijn",
  "home.vision.b3": "• emotioneel volwassen zijn",
  "home.vision.b4": "• technologisch vaardig zijn",
  "home.vision.b5": "• strategisch gedisciplineerd zijn",
  "home.vision.ecosystem": "Leaders Performance bouwt een ecosysteem waar:",
  "home.vision.e1": "• topprestaties een levensstijl worden",
  "home.vision.e2": "• AI een strategische vermenigvuldiger wordt",
  "home.vision.e3": "• menselijke diepgang de onderscheidende factor blijft",
  "home.vision.e4": "• bedrijven groeien vanuit een solide intern fundament",
  "home.vision.notFollowers": "We bouwen geen volgers.",
  "home.vision.autonomous": "We bouwen autonome leiders die de bedrijven van de toekomst creëren.",

  // Pillars
  "home.pillars.eyebrow": "De vier pijlers",
  "home.pillars.cta": "Kies jouw pad",
  "home.pillars.title1": "Vitaliteit",
  "home.pillars.desc1": "Energie is het fundament van leiderschap. We optimaliseren je gezondheid, slaap, voeding en fysieke prestaties zodat je op volle capaciteit opereert — niet op een lege tank.",
  "home.pillars.title2": "Persoonlijke ontwikkeling",
  "home.pillars.desc2": "Groei is niet onderhandelbaar. We doorbreken comfortzones en installeren een systeem voor continue evolutie — scherper zelfbewustzijn, emotionele intelligentie en mindset-beheersing.",
  "home.pillars.title3": "Persoonlijk leiderschap",
  "home.pillars.desc3": "Voordat je anderen leidt, leid je jezelf. We bouwen de discipline, helderheid en doelgerichtheid die jou de standaard maken — niet slechts de strategie.",
  "home.pillars.title4": "Business",
  "home.pillars.desc4": "Systemen boven inspanning. We installeren de operationele infrastructuur, het strategisch denken en de uitvoeringsraamwerken die jouw impact vergroten zonder je op te branden.",

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
  "home.showcase.title1": "Privé woestijn reset",
  "home.showcase.desc1": "Een 4-daagse gecontroleerde heroriëntatie in de woestijn. Schrap ruis, confronteer uitgestelde beslissingen en herbouw je uitvoeringsstrategie van de grond af.",
  "home.showcase.cta1": "Verken UNMASKED",
  "home.showcase.title2": "Strategisch advies",
  "home.showcase.desc2": "Doorlopende strategische prestatieaudits, uitvoeringsdiscipline en verantwoordelijkheid voor ondernemers die cruciale keerpunten navigeren.",
  "home.showcase.cta2": "Meer over advies",
  "home.showcase.title3": "Meetbare prestaties",
  "home.showcase.desc3": "Volg je leiderschapsdiscipline met onze eigen scorecard. Identificeer waar prestaties wegglippen en corrigeer voordat het escaleert.",
  "home.showcase.cta3": "Doe de assessment",

  // Story
  "home.story.eyebrow": "Echte mensen. Echte verandering.",
  "home.story.headline1": "Balans vinden",
  "home.story.headline2": "na een burn-out.",
  "home.story.body": "Na jaren van chronische stress en emotionele vermoeidheid nam Maya contact op in een dieptepunt. Door kleine, consistente stappen herontdekte ze stabiliteit en herverbond ze zich met haar creatieve energie.",
  "home.story.cta": "Lees het volledige verhaal",

  // FAQ
  "home.faq.heading": "Begrip van het",
  "home.faq.headingGold": "Proces.",
  "home.faq.subheading": "Vragen over ons advies en onze ervaringen? Vind hieronder antwoorden op de meest gestelde vragen.",
  "home.faq.q1": "Wat is Leaders Performance precies?",
  "home.faq.a1": "Wij zijn een strategisch adviesbureau dat gecontroleerde omgevingen bouwt — zowel fysiek als operationeel — voor ondernemers om helderheid terug te vinden en hun bedrijf te laten groeien zonder persoonlijke vitaliteit op te offeren.",
  "home.faq.q2": "Wie neemt deel aan de UNMASKED-ervaring?",
  "home.faq.a2": "Uitsluitend voor ondernemers, CEO's en entrepreneurs die momenteel zware operationele druk dragen en complexe beslissingen moeten nemen. Niet voor beginners of mensen op zoek naar een lifestyleretraite.",
  "home.faq.q3": "Waarom zijn UNMASKED-edities beperkt tot 2–4 personen?",
  "home.faq.a3": "Om privacy te beschermen en diepgang te waarborgen. Dit maakt direct, hoogst gepersonaliseerd strategisch werk met Lionel mogelijk, zonder groepsdynamiek.",
  "home.faq.q4": "Wat is het verschil tussen UNMASKED en High Performance Coaching en Business Coaching?",
  "home.faq.a4": "UNMASKED is een snelle, 4-daagse fysieke en mentale reset om onmiddellijke helderheid te creëren. High Performance Coaching en Business Coaching zijn een doorlopend, langdurig strategisch partnerschap voor gedisciplineerde uitvoering in de tijd.",

  // Final CTA
  "home.finalCta.heading": "Helderheid is een beslissing.",
  "home.finalCta.subheading": "Aanmeldingen zijn momenteel open voor aankomende UNMASKED-edities en adviespartnerschappen.",
  "home.finalCta.cta": "Begin de aanmelding",

  // Transition section (NL)
  "home.transition.eyebrow": "Balans",
  "home.transition.headline1": "Er is misschien geen enkelvoudige schakelaar,",
  "home.transition.headline2": "maar er zijn duidelijke stappen vooruit.",
  "home.transition.body": "Elk pad is anders. Dit zijn de manieren waarop wij mensen helpen met vertrouwen vooruit te gaan.",

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
  "audit.q1.optionA": "Wanneer ze zin hebben / \"Flexibele\" starttijden zonder vaste uren.",
  "audit.q1.optionB": "Op de afgesproken tijd, stipt. Te laat komen wordt direct gecorrigeerd.",
  "audit.q2.title": "DE STILTETEST",
  "audit.q2.question": "Als jij (de CEO) 2 weken het kantoor verlaat zonder contact, wat gebeurt er dan?",
  "audit.q2.optionA": "Chaos. Prestaties dalen. De telefoon gaat continue over.",
  "audit.q2.optionB": "Uitvoering gaat door. De norm blijft.",
  "audit.q3.title": "HET DEADLINEPROTOCOL",
  "audit.q3.question": "Hoe gaat jouw team om met gemiste deadlines?",
  "audit.q3.optionA": "Ze wijzen naar externe factoren (\"De markt,\" \"De klant,\" \"Het verkeer\"). Dit wordt geaccepteerd.",
  "audit.q3.optionB": "Ze nemen verantwoordelijkheid. Ze lossen het op. Ze zorgen dat het niet twee keer gebeurt.",
  "audit.q4.title": "DE CONFRONTATIE",
  "audit.q4.question": "Wanneer een teamlid onderpresteert, wat doet de rest van het team?",
  "audit.q4.optionA": "Ze dekken hem/haar in of klagen achter zijn/haar rug om.",
  "audit.q4.optionB": "Ze corrigeren hem/haar. Het team eist de norm vóórdat ik dat doe.",
  "audit.q5.title": "HET VERGADER PROTOCOL",
  "audit.q5.question": "Hebben vergaderingen een duidelijke agenda en een vaste eindtijd?",
  "audit.q5.optionA": "Nee. De tijd wordt niet in de gaten gehouden, we stoppen wanneer wij vinden dat het klaar is.",
  "audit.q5.optionB": "Ja. We hebben een duidelijke structuur en een vaste eindtijd.",
  "audit.q6.title": "DE PROBLEEMOPLOSSER",
  "audit.q6.question": "Wanneer er een probleem ontstaat, wat wordt er dan met jou gecommuniceerd?",
  "audit.q6.optionA": "Het probleem. (\"Baas, wat moeten we doen?\")",
  "audit.q6.optionB": "De oplossing. (\"Baas, dit ging fout. Zo heb ik het opgelost.\")",
  "audit.q7.title": "DE SPIEGEL",
  "audit.q7.question": "Wees eerlijk. Als je vandaag je volledige team opnieuw zou moeten aannemen, doe je dat dan?",
  "audit.q7.optionA": "Nee. Ik zou minimaal 30% vervangen.",
  "audit.q7.optionB": "Ja. Het zijn toppers.",

  // Footer (NL)
  "footer.home": "Home",
  "footer.blog": "Artikelen",
  "footer.startHere": "Begin hier",
  "footer.faq": "FAQ",
  "footer.copyright": `© ${new Date().getFullYear()} Leaders Performance. Alle rechten voorbehouden.`,
  "footer.privacy": "Privacybeleid",
  "footer.terms": "Algemene voorwaarden",

  // Elite Hero

  "elite.hero.badge": "Elite 1-op-1 coaching",
  "elite.hero.headline": "Transformeer jouw leven met elite coaching",
  "elite.hero.description": "Ontgrendel jouw volledige potentieel met gepersonaliseerde, high-performance coaching, ontworpen voor ambitieuze individuen die klaar zijn hun grenzen te doorbreken en buitengewone resultaten te bereiken.",
  "elite.hero.stat1Value": "1.000+",
  "elite.hero.stat1Label": "Levens getransformeerd",
  "elite.hero.stat2Value": "12 wkn",
  "elite.hero.stat2Label": "Diepe transformatie",
  "elite.hero.stat3Value": "100%",
  "elite.hero.stat3Label": "Gepersonaliseerd",
  "elite.hero.ctaPrimary": "Aanmelden voor elite coaching",
  "elite.hero.ctaSecondary": "Start de disciplinetest",
  "elite.hero.disclaimer": "Beperkt aantal plaatsen • Aanmelding vereist",

  // Elite – Quote (NL)
  "elite.quote1": "Je zit niet vast. Je wordt alleen niet uitgedaagd waar het ertoe doet.",
  "elite.quote2": "Als je steeds opnieuw begint, heb je geen nieuw plan nodig — je hebt een sterker fundament nodig.",

  // Elite – Program (NL)
  "elite.program.eyebrow": "Het programma",
  "elite.program.heading": "De vier pijlers van persoonlijke transformatie",
  "elite.program.subheading": "Ons elite coachingsprogramma behandelt elke dimensie van je leven en creëert blijvende verandering door een bewezen, holistische aanpak.",
  "elite.program.title1": "Vitaliteit",
  "elite.program.desc1": "Optimaliseer je gezondheid, energie en fysieke welzijn om elke dag op je best te presteren.",
  "elite.program.title2": "Persoonlijke ontwikkeling",
  "elite.program.desc2": "Ontgrendel je potentieel door continue groei, zelfbewustzijn, emotionele intelligentie en mentale weerbaarheid.",
  "elite.program.title3": "Persoonlijk leiderschap",
  "elite.program.desc3": "Leid jezelf met discipline, helderheid en doelgerichtheid voordat je anderen leidt.",
  "elite.program.title4": "Business",
  "elite.program.desc4": "Bouw en schaal je bedrijf met strategisch denken, uitvoering en duurzaam succes.",

  // Elite – Transformation (NL)
  "elite.transformation.eyebrow": "De transformatie",
  "elite.transformation.heading": "Van waar je bent naar waar je wilt zijn",
  "elite.transformation.subheading": "Dit gaat niet om kleine veranderingen. Het gaat om een complete transformatie in hoe je denkt, voelt en presteert.",
  "elite.transformation.beforeTitle": "Voor Elite coaching",
  "elite.transformation.afterTitle": "Na Elite coaching",
  "elite.transformation.before1": "Slecht slaappatroon en weinig herstel",
  "elite.transformation.before2": "Gewichtsschommelingen",
  "elite.transformation.before3": "Geen blijvende resultaten",
  "elite.transformation.before4": "Gebrek aan discipline",
  "elite.transformation.before5": "Onzeker en twijfelend",
  "elite.transformation.before6": "Geen structuur of overzicht",
  "elite.transformation.before7": "Niet je volledige potentieel benutten",
  "elite.transformation.after1": "Geoptimaliseerd slaappatroon en goed herstel",
  "elite.transformation.after2": "Slanker en fitter lichaam",
  "elite.transformation.after3": "Stabiele, blijvende resultaten",
  "elite.transformation.after4": "Sterke discipline",
  "elite.transformation.after5": "Zelfvertrouwen",
  "elite.transformation.after6": "Duidelijke structuur en focus",
  "elite.transformation.after7": "Haalt het maximale uit jezelf en het leven",

  // Elite – Process (NL)
  "elite.process.eyebrow": "Werkwijze",
  "elite.process.heading": "Het pad van transformatie",
  "elite.process.subheading": "Een gestructureerde en persoonlijke reis, ontworpen om diepgaande, blijvende verandering in je leven te creëren.",
  "elite.process.step1": "Kennismakingsgesprek",
  "elite.process.step1Desc": "We beginnen met een diepgaand gesprek om je doelen, uitdagingen en obstakels in kaart te brengen die je ervan weerhouden het leven te leiden dat je wilt.",
  "elite.process.step2": "Persoonlijk Assessment",
  "elite.process.step2Desc": "Voltooi een uitgebreid assessment die precies onthult waar je op dit moment staat en die een duidelijke routekaart creëert voor jouw transformatie.",
  "elite.process.step3": "Wekelijkse 1-op-1 sessies",
  "elite.process.step3Desc": "Wekelijks heb je krachtige coachingsessies die speciaal op maat gemaakt zijn voor jou. Inclusief online ondersteuning tussen de sessies.",
  "elite.process.step4": "Blijvende transformatie",
  "elite.process.step4Desc": "Integreer je nieuwe mindset, gewoonten en strategieën voor levenslang succes.",

  // Elite – Results (NL)
  "elite.results.eyebrow": "Succesverhalen",
  "elite.results.heading": "Dit hebben jouw voorgangers bereikt",
  "elite.results.subheading": "Sluit je aan bij honderden individuen die hun leven hebben getransformeerd met elite 1-op-1 coaching.",

  // Elite – Booking (NL)
  "elite.booking.badge": "Beperkt aantal plaatsen beschikbaar",
  "elite.booking.heading": "Klaar om je leven te transformeren?",
  "elite.booking.subheading": "Dit programma is voor ambitieuze mensen die klaar zijn om in zichzelf te investeren en zich in te zetten voor echte verandering. Als dat op jou van toepassing is, vraag dan vandaag nog een kennismakingsgesprek aan.",
  "elite.booking.cta": "Aanmelden voor elite coaching",
  "elite.booking.spotsLeft": "Slechts 5 plekken per maand beschikbaar",
  "elite.booking.includedTitle": "Dit is wat je ontvangt",
  "elite.booking.include1": "12 weken intensieve 1-op-1 coaching",
  "elite.booking.include2": "Wekelijkse privé sessies van 60 minuten",
  "elite.booking.include3": "Onbeperkte online ondersteuning via spraak/tekstberichten",
  "elite.booking.include4": "Gepersonaliseerde actieplannen en oefeningen",
  "elite.booking.include5": "Toegang tot exclusieve bronnen en tools",
  "elite.booking.include6": "Onbeperkte toegang tot de opnames van jouw coachingsessies",

  // Elite – Video (NL)
  "elite.video.cta": "Boek een consult",

  // Elite – Footer (NL)
  "elite.footer.description": "Levens transformeren door elite persoonlijke coaching en high-performance strategieën.",
  "elite.footer.quickLinks": "Snelle links",
  "elite.footer.apply": "Aanmelden",
  "elite.footer.legal": "Juridisch",
  "elite.footer.copyright": "© {year} Leaders Performance Institute. Alle rechten voorbehouden.",
  "business.hero.badge": "Voor teams van 5-50 personen",
  "business.hero.headline": "Stop met managen. Begin met leiden.",
  "business.hero.description": "Je bedrijf groeit tot het niveau dat jij tolereert. Als middelmatigheid blijft bestaan, is dat een keuze.\n\nDe Business Reset Blueprint herstructureert je organisatie zodat verantwoordelijkheid weer op de juiste plek ligt en prestaties niet afhankelijk zijn van jou alleen.\n\nBinnen 30 dagen staat er een systeem dat discipline, eigenaarschap en resultaat afdwingt.",
  "business.hero.ctaPrimary": "Boek een consult",
  "business.hero.ctaSecondary": "Team audit uitvoeren",

  // Business – Why Us (NL)
  "business.whyUs.eyebrow": "Het probleem",
  "business.whyUs.heading": "Er is geen duidelijke prestatienorm.",
  "business.whyUs.body1": "Je neemt professionals aan, maar je blijft corrigeren, uitleggen en herstellen. Elke herhaalde instructie kost tijd. Elke gemiste deadline zonder consequentie verlaagt de standaard.",
  "business.whyUs.body2": "Dit gaat niet over capaciteit. Dit gaat over tolerantie.\n\nAls jij fouten opvangt, neemt niemand eigenaarschap. Als jij blijft bijsturen, wordt afhankelijkheid de cultuur.\n\nJe bedrijf draait. Maar het leunt op jou. En dat is geen schaalbaar systeem.",
  "business.whyUs.symptomsHeading": "De symptomen",
  "business.whyUs.symptom1.title": "Gebrek aan eigenaarschap",
  "business.whyUs.symptom1.quote": "\"Ik dacht dat iemand anders het oppakte.\"\n\nVerantwoordelijkheid is niet duidelijk belegd. Taken blijven liggen omdat niemand zich eigenaar voelt.",
  "business.whyUs.symptom2.title": "Structurele afhankelijkheid",
  "business.whyUs.symptom2.quote": "Jij bent degene die het steeds moet oplossen.\n\nWanneer jij standaard bijstuurt, wordt afhankelijkheid de norm.",
  "business.whyUs.symptom3.title": "Minimale inzet",
  "business.whyUs.symptom3.quote": "Er wordt precies genoeg gedaan om geen discussie te krijgen.\n\nGeen initiatief. Geen extra verantwoordelijkheid. Geen betrokkenheid boven het minimum.",

  // Business – Services (NL)
  "business.services.eyebrow": "Het protocol",
  "business.services.heading": "Wij trainen niet. Wij installeren structuur.",
  "business.services.subheading": "Motivatie is tijdelijk. Systemen blijven.\n\nDe Business Reset Blueprint is geen workshop. Het is een implementatie.\n\nWe analyseren waar afhankelijkheid is ontstaan. Waar normen vervaagd zijn. Waar verantwoordelijkheid niet helder is.\n\nVervolgens brengen we structuur aan:\n• Heldere rollen\n• Duidelijke beslisregels\n• Meetbare standaarden\n• Consequenties die kloppen\n\nGeen extra druk. Wel duidelijke kaders.\n\nPrestaties worden geen toeval. Ze worden het resultaat van het systeem.",
  "business.services.installHeading": "Wat wij installeren",
  "business.services.item1.title": "Vitaliteit",
  "business.services.item1.desc": "Vitaliteit en energie zijn de basis om op hoog niveau te kunnen presteren.",
  "business.services.item2.title": "Persoonlijke ontwikkeling",
  "business.services.item2.desc": "Groei vindt buiten de comfortzone plaats. Doorbreek de comfortzone en implementeer een systeem dat constante groei stimuleert.",
  "business.services.item3.title": "Leiderschap",
  "business.services.item3.desc": "Jij stelt de norm. Leiderschap is identiteit, geen titel.",
  "business.services.item4.title": "Business",
  "business.services.item4.desc": "Implementeer een strategie die werkt en schaalt zonder jouw constante aanwezigheid.",

  // Business – Process (NL)
  "business.process.eyebrow": "Het proces",
  "business.process.heading": "De toolkit.",
  "business.process.item1.title": "Toegang tot de Academy",
  "business.process.item1.desc": "Levenslange toegang tot de academy voor je gehele team.",
  "business.process.item2.title": "Bedrijfscultuur aanpassen",
  "business.process.item2.desc": "Implementeer onze specifieke protocollen voor vergaderingen, rapportages en dagelijkse planning.",
  "business.process.item3.title": "De audit",
  "business.process.item3.desc": "Vergroot de effectiviteit van jouw team. Het draait uiteindelijk om het behalen van de resultaten waarvoor het team is opgericht. Iedere medewerker wordt individueel beoordeeld.",
  "business.process.item4.title": "De kickoff",
  "business.process.item4.desc": "Tijdens een strategiegesprek van 90 minuten, implementeren we het nieuwe systeem.",

  // Business – Results (NL)
  "business.results.eyebrow": "Het bewijs",
  "business.results.heading": "Resultaten spreken voor zich.",
  "business.results.quote1": "We stopped babysitting. Revenue went up 40% in Q1 because I finally had time to lead instead of manage.",
  "business.results.quote2": "Lionel didn't motivate my team. He scared them straight. Best investment we made.",

  "business.booking.eyebrow": "De beslissing",
  "business.booking.heading": "Je hebt twee keuzes.",
  "business.booking.optionALabel": "Optie A",
  "business.booking.optionAText": "Blijf tolereren wat onder de norm zit.\nBlijf compenseren voor gebrek aan eigenaarschap.\nBlijf zelf de druk dragen die verdeeld zou moeten zijn.\nBlijf bouwen aan een organisatie die zonder jouw ingrijpen niet functioneert.",
  "business.booking.optionBLabel": "Optie B",
  "business.booking.optionBText": "Implementeer de Blueprint.\nZet de standaard.\nPak je tijd terug.",
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
  "assessmentCTA.badge": "Neem de eerste stap",
  "assessmentCTA.heading": "Ontdek jouw leiderschapsblauwdruk",
  "assessmentCTA.description": "Doe onze uitgebreide discipline test en ontvang een gepersonaliseerde routekaart voor topprestaties.",
  "assessmentCTA.benefit1": "Identificeer je sterke en zwakke leiderschapskwaliteiten. Ontdek waar je groei ligt.",
  "assessmentCTA.benefit2": "Ontvang direct je resultaten",
  "assessmentCTA.benefit3": "Ontvang elite strategieën op basis van jouw profiel.",
  "assessmentCTA.cta": "Doe de discipline test",
  "assessmentCTA.disclaimer": "De test duurt slechts 10 minuten en je ontvangt je resultaat direct.",
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
