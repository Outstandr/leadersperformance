import { motion, useInView, AnimatePresence, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { UnmaskedBookingDialog } from "./UnmaskedBookingDialog";
import { MentorshipApplicationDialog } from "./MentorshipApplicationDialog";
import { BusinessConsultationDialog } from "./BusinessConsultationDialog";

import serviceUnmasked from "@/assets/card-unmasked.png";
import serviceCoaching from "@/assets/card-coaching.png";
import serviceAcademy from "@/assets/card-masterclass.png";
import serviceBusiness from "@/assets/card-business.png";
import serviceBusinessConsulting from "@/assets/card-business-consulting.jpg";
import serviceRoundTable from "@/assets/card-roundtable.jpg";
import { useLanguage } from "@/lib/i18n/LanguageContext";


// ─── Translations ──────────────────────────────────────────────────────────

const cards = {
  en: [
    {
      title: "UNMASKED\nIntervention",
      description: "A private intervention environment designed for founders and leadership teams who require clarity, structural reset and decisive execution.",
      details: {
        headline: "UNMASKED Intervention",
        tag: "Invitation Only · Dubai Desert",
        body: "A private intervention environment designed for founders and leadership teams who require clarity, structural reset and decisive execution.\n\nUNMASKED takes place in the Dubai desert and removes the distractions of daily operations.\n\nThis is not a seminar or retreat.\n\nIt is a controlled reset where leadership structure and decision clarity are rebuilt from the ground up.\n\nUNMASKED is available in two formats:\n\nFounder Edition\nFocused on the founder as the central decision maker.\n\nBusiness Edition\nFocused on founders together with their leadership or management team to improve company performance.",
        bullets: [
          "Clarity",
          "Command",
          "Execution",
        ],
        closing: "Leaders Performance is where founders sharpen strategy, strengthen leadership and protect what they have built.",
        cta: "Apply for UNMASKED",
        disclaimer: "Investment: €8,500 · 2026 Editions: March · April · May — Dubai",
        showCalendar: false,
        isUnmasked: true,
      },
    },
    {
      title: "Founder Strategic\nAdvisory",
      description: "Work directly with Lionel Eersteling as a strategic sparring partner for sharper strategic thinking, stronger leadership discipline and disciplined execution.",
      details: {
        headline: "Founder Strategic Advisory",
        tag: "Limited · By Application Only",
        body: "Work directly with Lionel Eersteling as a strategic sparring partner.\n\nThis engagement is designed for founders who want sharper strategic thinking, stronger leadership discipline and disciplined execution inside their company.",
        bullets: [
          "Strategic decision making",
          "Leadership responsibility under pressure",
          "Scaling company structure",
          "Navigating complex founder situations",
          "Strengthening long-term value creation",
        ],
        closing: "Engagement is limited and by application only.",
        cta: "Take the Founder Pressure Scan",
        disclaimer: "All engagements by application",
        showCalendar: false,
      },
    },
    {
      title: "Capital Protection\n& Special Situations",
      description: "For founders facing situations where capital, partnerships or ownership structures become exposed. Supported by an international network of legal, forensic and investigative specialists.",
      details: {
        headline: "Capital Protection & Special Situations",
        tag: "Cases from €1M+",
        body: "Founders occasionally face situations where capital, partnerships or ownership structures become exposed.\n\nIn these cases Lionel works alongside an international network of legal, forensic and investigative specialists to structure the situation and guide the strategic process.\n\nCases typically involve capital exposure starting from €1M.",
        bullets: [
          "Partner conflicts",
          "Fraud",
          "Misappropriation of capital",
          "Shareholder disputes",
          "Cross-border financial conflicts",
        ],
        closing: "Leaders Performance is where founders sharpen strategy, strengthen leadership and protect what they have built.",
        cta: "Start Capital Protection Scan",
        disclaimer: "Confidential · International network",
        showCalendar: false,
      },
    },
    {
      title: "Leaders Performance\nAcademy",
      description: "The digital leadership platform built around the RESET Blueprint. Structured learning, leadership frameworks and development tools for discipline, decision-making and execution.",
      details: {
        headline: "Leaders Performance Academy",
        tag: "Digital Leadership Platform",
        body: "The Leaders Performance Academy is the digital leadership platform built around the RESET Blueprint.\n\nIt combines structured digital learning, leadership frameworks and development tools designed to strengthen discipline, decision-making and execution.\n\nThe platform supports founders, executives and professionals who want to strengthen their leadership capacity and performance.",
        bullets: [
          "Leadership masterclasses",
          "Structured RESET Blueprint modules",
          "The RESET book series",
          "Digital leadership tools",
          "AI-supported coaching tools",
          "A leadership community",
        ],
        closing: "Built for founders, executives and professionals serious about leadership.",
        cta: "Explore the Academy",
        disclaimer: "RESET Blueprint® Ecosystem",
      },
    },
    {
      title: "Business\nConsulting",
      description: "Strategic consulting for companies looking to strengthen their internal structure, leadership and execution to scale sustainably.",
      details: {
        headline: "Business Consulting",
        tag: "For Companies · Strategic Growth",
        body: "Leaders Performance works with companies that need to strengthen their internal structure, sharpen leadership and improve execution across the organisation.\n\nThis is not generic consulting.\n\nIt is a hands-on strategic engagement designed to identify where the company is losing money, where leadership gaps exist and how to build a structure that supports sustainable growth.",
        bullets: [
          "Corporate discipline audits",
          "Capital protection assessments",
          "Leadership structure reviews",
          "Execution gap analysis",
          "Strategic growth planning",
        ],
        closing: "For companies serious about fixing what's broken and building what lasts.",
        cta: "View Business",
        disclaimer: "Strategic engagements by consultation",
        showCalendar: false,
      },
    },
    {
      title: "The Round Table",
      description: "An exclusive, invite-only series of breakfasts, lunches and dinners for founders and entrepreneurs. No pitches. No panels. Just real conversation at the highest level.",
      details: {
        headline: "The Round Table",
        tag: "Strict Invite Only · Founders & Entrepreneurs",
        body: "The Round Table is an exclusive, invite-only series of private breakfasts, lunches and dinners designed for founders and entrepreneurs operating at the highest level.\n\nThis is not a networking event.\n\nIt is a curated gathering where founders share openly, challenge each other and build relationships that compound over time.\n\nNo pitches. No panels. No sponsors.\n\nJust real conversation between people who build real companies.",
        bullets: [
          "Private breakfast, lunch and dinner formats",
          "Curated founder-only guest lists",
          "Confidential and off-the-record",
          "Hosted in premium private venues",
          "Limited to 12 seats per event",
        ],
        closing: "If you're building something real, this is where you belong.",
        cta: "Request an Invitation",
        disclaimer: "By invitation only · Limited seats",
        showCalendar: false,
      },
    },
    {
      title: "UNMASKED\nInterventie",
      description: "Een privé interventieomgeving ontworpen voor founders en leiderschapsteams die helderheid, structurele reset en besluitvaardige uitvoering nodig hebben.",
      details: {
        headline: "UNMASKED Interventie",
        tag: "Uitsluitend op uitnodiging · Dubai woestijn",
        body: "Een privé interventieomgeving ontworpen voor founders en leiderschapsteams die helderheid, structurele reset en besluitvaardige uitvoering nodig hebben.\n\nUNMASKED vindt plaats in de woestijn van Dubai en verwijdert de afleidingen van dagelijkse operaties.\n\nDit is geen seminar of retraite.\n\nHet is een gecontroleerde reset waarbij leiderschapsstructuur en besluitvaardigheid van de grond af worden opgebouwd.\n\nUNMASKED is beschikbaar in twee formaten:\n\nFounder Editie\nGericht op de founder als centrale beslisser.\n\nBusiness Editie\nGericht op founders samen met hun leiderschaps- of managementteam om bedrijfsprestaties te verbeteren.",
        bullets: [
          "Helderheid",
          "Leiderschap",
          "Uitvoering",
        ],
        closing: "Leaders Performance is waar founders strategie aanscherpen, leiderschap versterken en beschermen wat ze hebben opgebouwd.",
        cta: "Aanmelden voor UNMASKED",
        disclaimer: "Investering: €8.500 · 2026 Edities: Maart · April · Mei — Dubai",
        showCalendar: false,
        isUnmasked: true,
      },
    },
    {
      title: "Founder Strategisch\nAdvies",
      description: "Werk direct samen met Lionel Eersteling als strategische sparringpartner voor scherpere strategische besluitvorming, sterker leiderschap en gedisciplineerde uitvoering.",
      details: {
        headline: "Founder Strategisch Advies",
        tag: "Beperkt · Uitsluitend op aanvraag",
        body: "Werk direct samen met Lionel Eersteling als strategische sparringpartner.\n\nDit traject is ontworpen voor founders die scherpere strategische besluitvorming, sterkere leiderschapsdiscipline en gedisciplineerde uitvoering binnen hun bedrijf willen.",
        bullets: [
          "Strategische besluitvorming",
          "Leiderschapsverantwoordelijkheid onder druk",
          "Schalen van bedrijfsstructuur",
          "Navigeren van complexe founder-situaties",
          "Versterken van langetermijn waardecreatie",
        ],
        closing: "Het traject is beperkt en uitsluitend op aanvraag.",
        cta: "Start de Founder Pressure Scan",
        disclaimer: "Alle trajecten op aanvraag",
        showCalendar: false,
      },
    },
    {
      title: "Kapitaalbescherming\n& Bijzondere Situaties",
      description: "Voor founders die geconfronteerd worden met situaties waarbij kapitaal, partnerschappen of eigendomsstructuren worden blootgesteld. Ondersteund door een internationaal netwerk van juridische, forensische en onderzoeksspecialisten.",
      details: {
        headline: "Kapitaalbescherming & Bijzondere Situaties",
        tag: "Zaken vanaf €1M+",
        body: "Founders worden soms geconfronteerd met situaties waarbij kapitaal, partnerschappen of eigendomsstructuren worden blootgesteld.\n\nIn deze gevallen werkt Lionel samen met een internationaal netwerk van juridische, forensische en onderzoeksspecialisten om de situatie te structureren en het strategische proces te begeleiden.\n\nZaken betreffen doorgaans kapitaalblootstelling vanaf €1M.",
        bullets: [
          "Partnersconflicten",
          "Fraude",
          "Verduistering van kapitaal",
          "Aandeelhoudersgeschillen",
          "Grensoverschrijdende financiële conflicten",
        ],
        closing: "Leaders Performance is waar founders strategie aanscherpen, leiderschap versterken en beschermen wat ze hebben opgebouwd.",
        cta: "Start Kapitaalbeschermingsassessment",
        disclaimer: "Vertrouwelijk · Internationaal netwerk",
        showCalendar: false,
      },
    },
    {
      title: "Leaders Performance\nAcademie",
      description: "Het digitale leiderschapsplatform gebouwd rondom de RESET Blueprint. Gestructureerd leren, leiderschapskaders en ontwikkeltools voor discipline, besluitvorming en uitvoering.",
      details: {
        headline: "Leaders Performance Academie",
        tag: "Digitaal Leiderschapsplatform",
        body: "De Leaders Performance Academy is het digitale leiderschapsplatform gebouwd rondom de RESET Blueprint.\n\nHet combineert gestructureerd digitaal leren, leiderschapskaders en ontwikkeltools ontworpen om discipline, besluitvorming en uitvoering te versterken.\n\nHet platform ondersteunt founders, executives en professionals die hun leiderschapscapaciteit en prestaties willen versterken.",
        bullets: [
          "Leiderschap masterclasses",
          "Gestructureerde RESET Blueprint modules",
          "De RESET boekenserie",
          "Digitale leiderschapstools",
          "AI-ondersteunde coaching tools",
          "Een leiderschapscommunity",
        ],
        closing: "Gebouwd voor founders, executives en professionals die serieus zijn over leiderschap.",
        cta: "Ontdek de Academie",
        disclaimer: "RESET Blueprint® Ecosysteem",
      },
    },
  ],
};

const images = [serviceUnmasked, serviceCoaching, serviceBusiness, serviceAcademy];

// ─── Sub-components ────────────────────────────────────────────────────────

const ParallaxCard = ({
  service,
  i,
  isInView,
  onClick,
}: {
  service: (typeof cards.en)[number];
  i: number;
  isInView: boolean;
  onClick: () => void;
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"],
  });
  const rawY = useTransform(scrollYProgress, [0, 1], ["-12%", "12%"]);
  const y = useSpring(rawY, { stiffness: 60, damping: 20, mass: 0.1 });

  return (
    <motion.div
      ref={cardRef}
      key={service.title}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: i * 0.12, ease: "easeOut" }}
      className="group relative overflow-hidden cursor-pointer"
      style={{
        height: i % 2 === 0 ? "520px" : "580px",
        marginTop: i % 2 === 1 ? "60px" : "0px",
      }}
      onClick={onClick}
    >
      <motion.img
        src={images[i]}
        alt={service.title}
        style={{ y }}
        loading="lazy"
        width={400}
        height={600}
        className="absolute inset-0 w-full h-[130%] object-cover -top-[15%]"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-foreground/20 via-foreground/30 to-foreground/80" />
      <div className="relative h-full flex flex-col justify-between p-7">
        <h3 className="font-serif text-2xl md:text-3xl text-background leading-tight whitespace-pre-line">
          {service.title}
        </h3>
        <div>
          <div className="mb-6">
            <p className="text-sm text-background/70 leading-relaxed whitespace-pre-line">
              {service.description}
            </p>
          </div>
          <div className="w-3 h-3 rounded-full border-2 border-lioner-gold group-hover:bg-lioner-gold transition-colors" />
        </div>
      </div>
    </motion.div>
  );
};

// ─── Main component ────────────────────────────────────────────────────────

export const HomeFeaturesGrid = () => {
  const { language } = useLanguage();
  const services = cards[language];

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [selected, setSelected] = useState<number | null>(null);
  const [bookingOpen, setBookingOpen] = useState(false);
  const [mentorshipOpen, setMentorshipOpen] = useState(false);
  const [businessConsultOpen, setBusinessConsultOpen] = useState(false);
  
  const navigate = useNavigate();
  const selectedService = selected !== null ? services[selected] : null;
  const showCalendar = selectedService && (selectedService.details as any).showCalendar;
  const calendarUrl = selectedService ? (selectedService.details as any).calendarUrl : null;
  const isUnmasked = selectedService ? (selectedService.details as any).isUnmasked : false;

  // Load LeadConnector script once when a calendar card is opened
  useEffect(() => {
    if (!showCalendar) return;
    const existing = document.getElementById("lc-form-embed-script");
    if (!existing) {
      const script = document.createElement("script");
      script.id = "lc-form-embed-script";
      script.src = "https://link.msgsndr.com/js/form_embed.js";
      script.type = "text/javascript";
      document.body.appendChild(script);
    }
  }, [showCalendar]);

  return (
    <>
      <section id="features" className="relative z-10 pt-32 pb-20 md:pt-40 md:pb-28 bg-background">
        <div className="container mx-auto px-6 max-w-7xl" ref={ref}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 items-start">
            {services.map((service, i) => (
              <ParallaxCard
                key={i}
                service={service}
                i={i}
                isInView={isInView}
                onClick={() => setSelected(i)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Detail Modal */}
      <AnimatePresence>
        {selected !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 pt-20 md:pt-24"
            onClick={() => setSelected(null)}
          >
            <div className="absolute inset-0 bg-foreground/80 backdrop-blur-sm" />

            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.97 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-background border-2 border-lioner-gold/30 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Hero image */}
              <div className="relative h-48 md:h-64 overflow-hidden">
                <img
                  src={images[selected]}
                  alt={services[selected].details.headline}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-foreground/30 to-foreground/80" />
                <h2 className="absolute bottom-6 left-8 right-16 font-serif text-3xl md:text-4xl text-background leading-tight">
                  {services[selected].details.headline}
                </h2>
                <button
                  onClick={() => setSelected(null)}
                  className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center bg-foreground/50 hover:bg-foreground/70 text-background rounded-full transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Body */}
              <div className="p-8 md:p-10 space-y-6">
                {'tag' in services[selected].details && (
                  <span className="inline-block text-xs font-medium tracking-widest uppercase text-lioner-gold border border-lioner-gold/40 px-3 py-1">
                    {(services[selected].details as any).tag}
                  </span>
                )}

                <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                  {services[selected].details.body}
                </p>

                <div className="space-y-3">
                  {services[selected].details.bullets.map((bullet, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-lioner-gold mt-2 shrink-0" />
                      <span className="text-sm text-foreground/80">{bullet}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-4 border-t border-lioner-gold/20 space-y-4">
                  <p className="text-sm font-medium text-lioner-gold italic">
                    {services[selected].details.closing}
                  </p>
                  {'cta' in services[selected].details && (
                    <div className="space-y-3">
                      <p className="text-center text-xs text-muted-foreground">
                        {(services[selected].details as any).disclaimer}
                      </p>

                      {/* UNMASKED (index 0): scan + external link */}
                      {selected === 0 && (
                        <div className="flex flex-col gap-2">
                          <button
                            onClick={() => { setSelected(null); navigate("/burnout-scan"); }}
                            className="w-full bg-lioner-gold hover:bg-lioner-gold/90 text-white py-4 text-sm font-semibold uppercase tracking-widest transition-colors"
                          >
                            {language === "nl" ? "Start de Founder Pressure Scan" : "Take the Founder Pressure Scan"}
                          </button>
                          <a
                            href="https://unmasked.leadersperformance.ae/business"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full block text-center border-2 border-lioner-gold/40 text-foreground py-3 text-sm font-semibold uppercase tracking-widest hover:bg-lioner-gold/10 transition-colors"
                          >
                            {language === "nl" ? "Bekijk UNMASKED" : "View UNMASKED"}
                          </a>
                        </div>
                      )}

                      {/* Founder Strategic Advisory (index 1): scan + view page */}
                      {selected === 1 && (
                        <div className="flex flex-col gap-2">
                          <button
                            onClick={() => { setSelected(null); navigate("/burnout-scan"); }}
                            className="w-full bg-lioner-gold hover:bg-lioner-gold/90 text-white py-4 text-sm font-semibold uppercase tracking-widest transition-colors"
                          >
                            {(services[selected].details as any).cta}
                          </button>
                          <button
                            onClick={() => { setSelected(null); navigate("/elite"); }}
                            className="w-full border-2 border-lioner-gold/40 text-foreground py-3 text-sm font-semibold uppercase tracking-widest hover:bg-lioner-gold/10 transition-colors"
                          >
                            {language === "nl" ? "Bekijk Founders Advisory" : "View Founders Advisory"}
                          </button>
                        </div>
                      )}

                      {/* Capital Protection (index 2): scan + view page */}
                      {selected === 2 && (
                        <div className="flex flex-col gap-2">
                          <button
                            onClick={() => { setSelected(null); navigate("/capital-protection"); }}
                            className="w-full bg-lioner-gold hover:bg-lioner-gold/90 text-white py-4 text-sm font-semibold uppercase tracking-widest transition-colors"
                          >
                            {(services[selected].details as any).cta}
                          </button>
                          <button
                            onClick={() => { setSelected(null); navigate("/capital-protection"); }}
                            className="w-full border-2 border-lioner-gold/40 text-foreground py-3 text-sm font-semibold uppercase tracking-widest hover:bg-lioner-gold/10 transition-colors"
                          >
                            {language === "nl" ? "Bekijk Kapitaalbescherming" : "View Capital Protection"}
                          </button>
                        </div>
                      )}

                      {/* Academy (index 3): external link */}
                      {selected === 3 && (
                        <a
                          href="https://testgroup.leadersperformance.ae/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block w-full bg-lioner-gold hover:bg-lioner-gold/90 text-white py-4 text-sm font-semibold uppercase tracking-widest transition-colors text-center"
                        >
                          {(services[selected].details as any).cta}
                        </a>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <UnmaskedBookingDialog open={bookingOpen} onOpenChange={setBookingOpen} />
      <MentorshipApplicationDialog open={mentorshipOpen} onOpenChange={setMentorshipOpen} />
      <BusinessConsultationDialog open={businessConsultOpen} onOpenChange={setBusinessConsultOpen} />
      
      
    </>
  );
};
