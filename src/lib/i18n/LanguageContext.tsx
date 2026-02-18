import { createContext, useContext, useState, ReactNode } from "react";

export type Language = "en" | "nl";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
};

export { LanguageContext };

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
  "nav.takeLeaderAssessment": "Take Leader Assessment",
  "nav.applyNow": "Apply Now",

  // Hero – Home
  "home.hero.headline1": "A Path That",
  "home.hero.headline2": "Shapes Your",
  "home.hero.headline3": "Future.",
  "home.hero.description": "We offer strategic advisory and controlled reset environments to help founders navigate complexity with confidence. Together, we'll build clarity, execution discipline, and lasting performance.",
  "home.hero.cta": "Choose Your Path",

  // Intro
  "home.intro.philosophy": "Our Philosophy",
  "home.intro.text": "At Leaders Performance, we don't rush change — we help it unfold with intention. Through structured environments, strategic accountability, and a steady pace, we support growth that lasts.",
  "home.intro.cta": "About Leaders Performance",

  // Offerings
  "home.offerings.eyebrow1": "Private Reset",
  "home.offerings.title1": "UNMASKED",
  "home.offerings.body1": "A 4-day controlled recalibration in the desert. Designed to strip away noise and rebuild execution strategy.",
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
  "home.mission.bullet2": "• use technology without becoming dependent on it",
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

  // Footer
  "footer.home": "Home",
  "footer.blog": "Blog",
  "footer.startHere": "Start Here",
  "footer.faq": "Q&A",
  "footer.copyright": `© ${new Date().getFullYear()} Leaders Performance. All rights reserved.`,
  "footer.privacy": "Privacy Policy",
  "footer.terms": "Terms & Conditions",

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
  "elite.hero.ctaSecondary": "Take Leader Assessment",
  "elite.hero.disclaimer": "Limited spots available • Application required",

  // Business Hero
  "business.hero.badge": "For teams of 5-50 persons",
  "business.hero.headline": "Stop Managing People. Start Leading Performers.",
  "business.hero.description": "Your business is not scaling because you are tolerating mediocrity. The Business Reset Blueprint is the operational system to eliminate \"Passenger Culture\" and install military-grade discipline in 30 days.",
  "business.hero.ctaPrimary": "Book a Consult",
  "business.hero.ctaSecondary": "Audit My Team First",

  // Business – Why Us
  "business.whyUs.eyebrow": "The Problem",
  "business.whyUs.heading": "No Company Culture.",
  "business.whyUs.body1": "You hire adults, but you manage children. Every time you repeat an instruction, you lose money. Every time you accept a missed deadline with an excuse, you lower the standard.",
  "business.whyUs.body2": "Your team is not \"confused.\" They are comfortable. They know you will fix their mistakes. They know you will stay late to finish their work. You have built a nursery, not a business.",
  "business.whyUs.symptomsHeading": "The Symptoms",
  "business.whyUs.symptom1.title": "Zero Ownership",
  "business.whyUs.symptom1.quote": "\"I thought someone else was doing it.\"",
  "business.whyUs.symptom2.title": "The Hero Trap",
  "business.whyUs.symptom2.quote": "You are the only one who can solve problems.",
  "business.whyUs.symptom3.title": "Quiet Quitting",
  "business.whyUs.symptom3.quote": "They do the bare minimum to not get fired.",

  // Business – Services
  "business.services.eyebrow": "The Protocol",
  "business.services.heading": "We Don't Train. We Install Structure.",
  "business.services.subheading": "Motivation is temporary. Systems are permanent. The Business Reset Blueprint is not a \"workshop.\" It is an installation of the Vanguard Operating System. We strip away the \"soft\" corporate habits and replace them with the protocols of high-performance units.",
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
  "business.process.eyebrow": "The Arsenal",
  "business.process.heading": "The Toolkit.",
  "business.process.item1.title": "The Academy Access",
  "business.process.item1.desc": "Lifetime access to the core doctrine for your entire team.",
  "business.process.item2.title": "The Company Culture Report",
  "business.process.item2.desc": "Copy-paste our specific protocols for Meetings, Reporting, and Daily Planning.",
  "business.process.item3.title": "The Audit",
  "business.process.item3.desc": "Increase your team's effectiveness. Ultimately, it's all about the team achieving the results it was created to achieve. The proprietary \"Discipline Scorecard\" to grade every employee.",
  "business.process.item4.title": "The Kickoff",
  "business.process.item4.desc": "A 90-Minute \"Hard Reset\" Strategy Call to deploy the system.",

  // Business – Results
  "business.results.eyebrow": "The Evidence",
  "business.results.heading": "Results Speak For Themselves.",
  "business.results.quote1": "We stopped babysitting. Revenue went up 40% in Q1 because I finally had time to lead instead of manage.",
  "business.results.quote2": "Lionel didn't motivate my team. He scared them straight. Best investment we made.",

  "business.booking.eyebrow": "The Decision",
  "business.booking.heading": "You Have Two Choices.",
  "business.booking.optionALabel": "Option A",
  "business.booking.optionAText": "Keep tolerating the excuses. Keep working weekends to fix their mess. Keep the \"Passenger Culture.\"",
  "business.booking.optionBLabel": "Option B",
  "business.booking.optionBText": "Install the Blueprint. Set the Standard. Reclaim your time.",
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
  "business.auditCTA.heading": "Is your team an asset or a liability?",
  "business.auditCTA.body1": "Increase your team's effectiveness. Ultimately, it's all about the team achieving the results it was created to achieve.",
  "business.auditCTA.body2": "Audit them in 2 minutes. Get a score. Get the truth.",
  "business.auditCTA.body3": "7 questions. No fluff. Immediate verdict.",
  "business.auditCTA.cta": "Start The Audit",
  "business.auditCTA.disclaimer": "Warning: The truth doesn't care about your feelings.",
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
  "nav.takeLeaderAssessment": "Leider assessment doen",
  "nav.applyNow": "Nu aanmelden",

  // Hero – Home
  "home.hero.headline1": "Een pad dat",
  "home.hero.headline2": "jouw toekomst",
  "home.hero.headline3": "Vormt.",
  "home.hero.description": "Wij bieden strategisch advies en gecontroleerde reset-omgevingen om ondernemers te helpen complexiteit met vertrouwen te navigeren. Samen bouwen we aan helderheid, uitvoeringsdiscipline en blijvende prestaties.",
  "home.hero.cta": "Kies jouw pad",

  // Intro
  "home.intro.philosophy": "Onze filosofie",
  "home.intro.text": "Bij Leaders Performance haasten we verandering niet — we helpen het zich ontvouwen met intentie. Via gestructureerde omgevingen, strategische verantwoordelijkheid en een consistent tempo, ondersteunen we groei die beklijft.",
  "home.intro.cta": "Over Leaders Performance",

  // Offerings
  "home.offerings.eyebrow1": "Privé reset",
  "home.offerings.title1": "UNMASKED",
  "home.offerings.body1": "Een 4-daagse gecontroleerde heroriëntatie in de woestijn. Ontworpen om ruis weg te nemen en je uitvoeringsstrategie opnieuw op te bouwen.",
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
  "home.mission.bullet2": "• technologie gebruiken zonder er afhankelijk van te worden",
  "home.mission.bullet3": "• bouwen vanuit afstemming in plaats van ego of validatie",
  "home.mission.bullet4": "• meetbare bedrijfsgroei realiseren als resultaat van interne congruentie",
  "home.mission.notOptimize": "Wij optimaliseren bedrijven niet als eerste.",
  "home.mission.strengthen": "Wij versterken de persoon die ze leidt.",
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
  "home.pillars.desc1": "Energie is het fundament van leiderschap. We optimaliseren je gezondheid, slaap, voeding en fysieke prestaties zodat je op volle capaciteit opereert — niet op lege tank.",
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
  "home.faq.q4": "Wat is het verschil tussen UNMASKED en advies?",
  "home.faq.a4": "UNMASKED is een snelle, 4-daagse fysieke en mentale reset om onmiddellijke helderheid te creëren. Advies is een doorlopend, langdurig strategisch partnerschap voor gedisciplineerde uitvoering in de tijd.",

  // Final CTA
  "home.finalCta.heading": "Helderheid is een beslissing.",
  "home.finalCta.subheading": "Aanmeldingen zijn momenteel open voor aankomende UNMASKED-edities en adviespartnerschappen.",
  "home.finalCta.cta": "Begin de aanmelding",

  // Footer
  "footer.home": "Home",
  "footer.blog": "Blog",
  "footer.startHere": "Begin hier",
  "footer.faq": "V&A",
  "footer.copyright": `© ${new Date().getFullYear()} Leaders Performance. Alle rechten voorbehouden.`,
  "footer.privacy": "Privacybeleid",
  "footer.terms": "Algemene voorwaarden",

  // Elite Hero
  "elite.hero.badge": "Elite 1-op-1 coaching",
  "elite.hero.headline": "Transformeer jouw leven via persoonlijke elite coaching",
  "elite.hero.description": "Ontgrendel jouw volledige potentieel met gepersonaliseerde, high-performance coaching ontworpen voor ambitieuze individuen die klaar zijn hun grenzen te doorbreken en buitengewone resultaten te bereiken.",
  "elite.hero.stat1Value": "1.000+",
  "elite.hero.stat1Label": "Levens getransformeerd",
  "elite.hero.stat2Value": "12 wkn",
  "elite.hero.stat2Label": "Diepe transformatie",
  "elite.hero.stat3Value": "100%",
  "elite.hero.stat3Label": "Gepersonaliseerd",
  "elite.hero.ctaPrimary": "Aanmelden voor elite coaching",
  "elite.hero.ctaSecondary": "Doe de leider assessment",
  "elite.hero.disclaimer": "Beperkt aantal plaatsen • Aanmelding vereist",

  // Business Hero
  "business.hero.badge": "Voor teams van 5-50 personen",
  "business.hero.headline": "Stop met managen. Begin met leiden.",
  "business.hero.description": "Jouw bedrijf schaalt niet omdat je middelmatigheid tolereert. De Business Reset Blueprint is het operationeel systeem om 'passagierscultuur' te elimineren en militaire discipline te installeren in 30 dagen.",
  "business.hero.ctaPrimary": "Boek een consult",
  "business.hero.ctaSecondary": "Team audit uitvoeren",

  // Business – Why Us (NL)
  "business.whyUs.eyebrow": "Het probleem",
  "business.whyUs.heading": "Geen bedrijfscultuur.",
  "business.whyUs.body1": "Je huurt volwassenen in, maar je managet kinderen. Elke keer dat je een instructie herhaalt, verlies je geld. Elke keer dat je een gemiste deadline accepteert met een excuus, verlaag je de norm.",
  "business.whyUs.body2": "Jouw team is niet \"in de war.\" Ze zijn comfortabel. Ze weten dat jij hun fouten herstelt. Ze weten dat jij overwerkt om hun werk af te maken. Je hebt een crèche gebouwd, geen bedrijf.",
  "business.whyUs.symptomsHeading": "De symptomen",
  "business.whyUs.symptom1.title": "Nul eigenaarschap",
  "business.whyUs.symptom1.quote": "\"Ik dacht dat iemand anders het deed.\"",
  "business.whyUs.symptom2.title": "De heldenval",
  "business.whyUs.symptom2.quote": "Jij bent de enige die problemen kan oplossen.",
  "business.whyUs.symptom3.title": "Stil stoppen",
  "business.whyUs.symptom3.quote": "Ze doen het absolute minimum om niet ontslagen te worden.",

  // Business – Services (NL)
  "business.services.eyebrow": "Het protocol",
  "business.services.heading": "Wij trainen niet. Wij installeren structuur.",
  "business.services.subheading": "Motivatie is tijdelijk. Systemen zijn permanent. De Business Reset Blueprint is geen \"workshop.\" Het is een installatie van het Vanguard Operating System. Wij stropen de \"zachte\" bedrijfsgewoonten weg en vervangen ze door de protocollen van high-performance eenheden.",
  "business.services.installHeading": "Wat wij installeren",
  "business.services.item1.title": "Vitaliteit",
  "business.services.item1.desc": "Energie is het fundament. Zonder fysieke en mentale scherpte overleeft geen enkele strategie de confrontatie met de realiteit.",
  "business.services.item2.title": "Persoonlijke ontwikkeling",
  "business.services.item2.desc": "Groei is niet onderhandelbaar. Breek de comfortzone en installeer een systeem voor constante evolutie.",
  "business.services.item3.title": "Leiderschap",
  "business.services.item3.desc": "Je managet geen mensen. Je stelt de norm. Leiderschap is identiteit, geen titel.",
  "business.services.item4.title": "Business",
  "business.services.item4.desc": "Systemen boven inspanning. Installeer de operationele infrastructuur die schaalt zonder jouw constante aanwezigheid.",

  // Business – Process (NL)
  "business.process.eyebrow": "Het arsenaal",
  "business.process.heading": "De toolkit.",
  "business.process.item1.title": "Toegang tot de Academy",
  "business.process.item1.desc": "Levenslange toegang tot de kerndoctrine voor je gehele team.",
  "business.process.item2.title": "Het bedrijfscultuurrapport",
  "business.process.item2.desc": "Kopieer en plak onze specifieke protocollen voor vergaderingen, rapportages en dagelijkse planning.",
  "business.process.item3.title": "De audit",
  "business.process.item3.desc": "Vergroot de effectiviteit van jouw team. Het draait uiteindelijk om het behalen van de resultaten waarvoor het team is opgericht. De eigen \"Discipline Scorecard\" om elke medewerker te beoordelen.",
  "business.process.item4.title": "De kickoff",
  "business.process.item4.desc": "Een 90 minuten durend \"Hard Reset\" strategiegesprek om het systeem te implementeren.",

  // Business – Results (NL)
  "business.results.eyebrow": "Het bewijs",
  "business.results.heading": "Resultaten spreken voor zich.",
  "business.results.quote1": "We zijn gestopt met kleuterwerk. De omzet steeg met 40% in Q1 omdat ik eindelijk tijd had om te leiden in plaats van te managen.",
  "business.results.quote2": "Lionel motiveerde mijn team niet. Hij schrikte ze wakker. Beste investering die we hebben gedaan.",

  "business.booking.eyebrow": "De beslissing",
  "business.booking.heading": "Je hebt twee keuzes.",
  "business.booking.optionALabel": "Optie A",
  "business.booking.optionAText": "Blijf de excuses tolereren. Blijf in het weekend werken om hun rommel op te ruimen. Houd de \"passagierscultuur\" in stand.",
  "business.booking.optionBLabel": "Optie B",
  "business.booking.optionBText": "Installeer de Blueprint. Stel de norm. Herwin je tijd.",
  "business.booking.quote": "De norm die jij accepteert, is de norm die jij instelt.",
  "business.booking.ctaPrimary": "Boek een consult",
  "business.booking.ctaSecondary": "Team audit uitvoeren",

  // Business – Quote (NL)
  "business.quote.text": "\"Je kunt chaos niet opschalen. Voer uit of word vervangen.\"",

  // Business – Footer (NL)
  "business.footer.description": "Organisaties transformeren via elite leiderschapsontwikkeling en high-performance coaching.",
  "business.footer.quickLinks": "Snelle links",
  "business.footer.bookCall": "Boek een gesprek",
  "business.footer.legal": "Juridisch",
  "business.footer.copyright": "© {year} Leaders Performance Institute. Alle rechten voorbehouden.",

  // Business – Audit CTA (NL)
  "business.auditCTA.badge": "Bedrijfsdiscipline audit",
  "business.auditCTA.heading": "Is jouw team een aanwinst of een aansprakelijkheid?",
  "business.auditCTA.body1": "Vergroot de effectiviteit van jouw team. Het draait uiteindelijk om het behalen van de resultaten waarvoor het team is opgericht.",
  "business.auditCTA.body2": "Auditeer ze in 2 minuten. Krijg een score. Krijg de waarheid.",
  "business.auditCTA.body3": "7 vragen. Geen opvulling. Onmiddellijk oordeel.",
  "business.auditCTA.cta": "Start de audit",
  "business.auditCTA.disclaimer": "Waarschuwing: De waarheid geeft niet om jouw gevoelens.",
};
