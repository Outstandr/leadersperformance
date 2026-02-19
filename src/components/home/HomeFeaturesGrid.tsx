import { motion, useInView, AnimatePresence, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { X } from "lucide-react";
import { UnmaskedBookingDialog } from "./UnmaskedBookingDialog";
import serviceUnmasked from "@/assets/unmasked-desert-new.png";
import serviceCoaching from "@/assets/service-coaching.jpg";
import serviceAcademy from "@/assets/service-academy.jpg";
import serviceBusiness from "@/assets/service-business.jpg";
import { useLanguage } from "@/lib/i18n/LanguageContext";


// ─── Translations ──────────────────────────────────────────────────────────

const cards = {
  en: [
    {
      title: "UNMASKED\nDesert Intervention",
      description: "For high-performance entrepreneurs and executives who have built success — and lost themselves in the process.\n\nThis is not a retreat.\n\nThis is an intervention.",
      details: {
        headline: "UNMASKED Private Executive Reset · Dubai",
        tag: "Invitation Only · Maximum 4 Men Per Edition",
        body: "I lead UNMASKED personally.\n\nThis is not a seminar.\n\nIt's a controlled reset.\n\nWe strip away what no longer serves you and rebuild from structure.\n\nBody.\n\nClarity.\n\nCommand.\n\nExecution.\n\nVitality — Recalibrate your biological baseline so your energy matches your ambition.\n\nMindset — Expose the patterns driving your decisions under pressure.\n\nLeadership — Reset your command presence from the inside out.\n\nBusiness — Build a precise 90-day execution map grounded in reality.\n\nMy name is Lionel Eersteling.\nFormer professional athlete.\nMulti-entrepreneur.\nInvestor.\nFounder of the Leaders Performance Group.\n\nI don't sell motivation.\n\nI build operating systems for leaders who refuse to drift.",
        bullets: [
          "Vitality — Recalibrate your biological baseline so your energy matches your ambition.",
          "Mindset — Identify the patterns shaping your decisions under pressure.",
          "Leadership — Strengthen your presence so authority comes from alignment, not force.",
          "Business — Build a precise 90-day execution map grounded in data and reality.",
        ],
        closing: "This is not about motivation. It's about internal control under external pressure.",
        cta: "Apply Here",
        disclaimer: "Investment: €8,500 · 2026 Editions: March · April · May — Dubai",
        showCalendar: false,
        isUnmasked: true,
      },
    },
    {
      title: "High Performance\nCoaching",
      description: "Work directly with Lionel in a private, high-performance mentorship built for entrepreneurs and executives ready to close the gap between where they are and where they're meant to be.",
      details: {
        headline: "Lionel Eersteling — 1-on-1 High Performance Mentorship",
        tag: "Exclusive · By Application Only",
        body: "Lionel Eersteling is a certified high-performance coach, neuroscience-informed mentor, and strategic leadership practitioner. His 1-on-1 mentorship is designed for professionals who are doing the work but not seeing the results — because effort without alignment doesn't scale.",
        bullets: [
          "1,249 Professionals Mentored",
          "€22M+ Combined Revenue Generated",
          "82% Pattern Breakthrough Rate",
          "6-Month Average Program Duration",
        ],
        closing: "Not motivation. Not theory. Structural change.",
        cta: "Apply For Mentorship",
        disclaimer: "Limited spots. Application required.",
        showCalendar: true,
        calendarUrl: "https://api.leadconnectorhq.com/widget/booking/NE13SD9blCXUJeVghk6j",
      },
    },
    {
      title: "Leaders Performance\nAcademy",
      description: "An elite leadership development platform built around the RESET Blueprint® — a proven, holistic framework to help leaders transform themselves from the inside out.",
      details: {
        headline: "Leaders Performance Academy",
        tag: "10,000+ Leaders Transformed · 95% Success Rate",
        body: "LPA combines structured digital learning, personal coaching, interactive exercises, and community support into one integrated experience. Whether you are a CEO, director, or high-performing professional, LPA guides you through a complete transformation of how you lead, think, and create impact — built around the RESET Blueprint®.",
        bullets: [
          "Leadership Masterclasses — In-depth video courses with Lionel Eersteling on elite leadership practices",
          "Digital Library (E-Reader) — Interactive exercises, reflection tools, and actionable frameworks",
          "5 Progressive Modules — Reset by Discipline, The Reset in You, Reset Your Addiction, Reset the Love in You, Reset the Trust in You",
          "Leader Community — Connect with visionary leaders on the same journey",
          "AI-Powered Coaching (Lionel Coach) — Personalized AI coach modelled on Lionel Eersteling",
          "Certification — Earn a recognized LPA Certificate upon completing each module",
        ],
        closing: "Join 10,000+ leaders creating lasting organizational change and building thriving cultures.",
        cta: "Start Your Leadership Journey",
        disclaimer: "5 Pillars To Excellence · Certification Included",
      },
    },
    {
      title: "Business\nCoaching",
      description: "Stop managing people. Start leading performers. The Business Reset Blueprint eliminates Passenger Culture and installs military-grade discipline in 30 days.",
      details: {
        headline: "Business Reset Blueprint",
        tag: "For Teams of 5 – 50",
        body: "Motivation is temporary. Systems are permanent. The Business Reset Blueprint is not a \"workshop.\" It is an installation of the Vanguard Operating System — stripping away soft corporate habits and replacing them with the protocols of high-performance units.",
        bullets: [
          "Vitality — Energy is the foundation. Without physical and mental sharpness, no strategy survives contact with reality",
          "Personal Development — Strip away the comfort zone and install a system for constant evolution",
          "Leadership — You don't manage people. You set the standard. Leadership is identity, not a title",
          "Business — Systems over hustle. Install the operational infrastructure that scales without your constant presence",
        ],
        closing: "You cannot scale chaos. Execute or be replaced.",
        cta: "Book a Consultation",
        disclaimer: "Pricing not displayed · All engagements by application",
        showCalendar: true,
        calendarUrl: "https://api.leadconnectorhq.com/widget/booking/NE13SD9blCXUJeVghk6j",
      },
    },
  ],
  nl: [
    {
      title: "UNMASKED\nWoestijn Interventie",
      description: "Voor high-performance ondernemers en executives die succes hebben opgebouwd — en zichzelf zijn kwijtgeraakt in het proces. Dit is geen retraite. Dit is een interventie.",
      details: {
        headline: "UNMASKED Privé Executive Reset · Dubai",
        tag: "Uitsluitend op uitnodiging · Maximaal 4 mannen per editie",
        body: "Ik leid UNMASKED persoonlijk.\n\nDit is geen seminar.\n\nHet is een gecontroleerde reset.\n\nWe verwijderen wat je niet meer dient en bouwen opnieuw op vanuit structuur.\n\nLichaam.\n\nHelderheid.\n\nLeiderschap.\n\nUitvoering.\n\nVitaliteit — Herkalibreer je biologische basislijn zodat je energie je ambitie ondersteunt.\n\nMindset — Maak zichtbaar welke patronen jouw beslissingen onder druk sturen.\n\nLeiderschap — Versterk je gezag van binnenuit.\n\nBusiness — Ontwikkel een scherp en realistisch 90-dagen uitvoeringsplan.\n\nMijn naam is Lionel Eersteling.\nVoormalig professioneel topsporter.\nMulti-ondernemer.\nInvesteerder.\nOprichter van de Leaders Performance Group.\n\nIk verkoop geen motivatie.\n\nIk bouw besturingssystemen voor leiders die weigeren te blijven draaien.",
        bullets: [
          "Vitaliteit — Kalibreer je biologische basislijn opnieuw zodat je energie overeenkomt met je ambitie.",
          "Mindset — Identificeer de patronen die je beslissingen onder druk bepalen.",
          "Leiderschap — Versterk je aanwezigheid zodat autoriteit voortkomt uit afstemming, niet uit kracht.",
          "Business — Bouw een nauwkeurige 90-dagen uitvoeringskaart gebaseerd op data en realiteit.",
        ],
        closing: "Dit gaat niet over motivatie. Het gaat over interne controle onder externe druk.",
        cta: "Aanmelden",
        disclaimer: "Investering: €8.500 · 2026 Edities: Maart · April · Mei — Dubai",
        showCalendar: false,
        isUnmasked: true,
      },
    },
    {
      title: "High Performance\nCoaching",
      description: "Werk direct samen met Lionel in een privé, high-performance mentorschap gebouwd voor ondernemers en executives die de kloof willen overbruggen tussen waar ze zijn en waar ze horen te zijn.",
      details: {
        headline: "Lionel Eersteling — 1-op-1 High Performance Mentorschap",
        tag: "Exclusief · Uitsluitend op aanvraag",
        body: "Lionel Eersteling is een gecertificeerde high-performance coach, neurowetenschappelijk geïnformeerde mentor en strategisch leiderschapspractitioner. Zijn 1-op-1 mentorschap is ontworpen voor professionals die hard werken maar de resultaten niet zien — omdat inspanning zonder afstemming niet schaalt.",
        bullets: [
          "1.249 professionals begeleid",
          "€22M+ gecombineerde omzet gegenereerd",
          "82% patroomdoorbraakpercentage",
          "6 maanden gemiddelde programmasduur",
        ],
        closing: "Geen motivatie. Geen theorie. Structurele verandering.",
        cta: "Aanmelden voor mentorschap",
        disclaimer: "Beperkt aantal plaatsen. Aanmelding vereist.",
        showCalendar: true,
        calendarUrl: "https://api.leadconnectorhq.com/widget/booking/NE13SD9blCXUJeVghk6j",
      },
    },
    {
      title: "Leaders Performance\nAcademie",
      description: "Een elite leiderschapsontwikkelingsplatform gebouwd rondom de RESET Blueprint® — een bewezen, holistisch raamwerk om leiders van binnenuit te transformeren.",
      details: {
        headline: "Leaders Performance Academie",
        tag: "10.000+ Leiders Getransformeerd · 95% Succespercentage",
        body: "LPA combineert gestructureerd digitaal leren, persoonlijke coaching, interactieve oefeningen en gemeenschapsondersteuning in één geïntegreerde ervaring. Of je nu CEO, directeur of high-performing professional bent — LPA begeleidt je door een complete transformatie van hoe je leidt, denkt en impact creëert, gebaseerd op de RESET Blueprint®.",
        bullets: [
          "Leadership Masterclasses — Diepgaande videocursussen met Lionel Eersteling over elite leiderschapspraktijken",
          "Digitale Bibliotheek (E-Reader) — Interactieve oefeningen, reflectietools en direct toepasbare kaders",
          "5 Progressieve Modules — Reset by Discipline, The Reset in You, Reset Your Addiction, Reset the Love in You, Reset the Trust in You",
          "Leader Community — Verbinding met visionaire leiders op dezelfde reis",
          "AI-Coaching (Lionel Coach) — Gepersonaliseerde AI-coach gemodelleerd naar Lionel Eersteling",
          "Certificering — Behaal een erkend LPA Certificaat na het voltooien van elke module",
        ],
        closing: "Sluit je aan bij 10.000+ leiders die blijvende organisatieverandering creëren en bloeiende culturen opbouwen.",
        cta: "Begin Jouw Leiderschapsreis",
        disclaimer: "5 Pijlers naar Excellentie · Certificering inbegrepen",
      },
    },
    {
      title: "Business\nCoaching",
      description: "Stop met managen. Begin met leiden. De Business Reset Blueprint elimineert Passagierscultuur en installeert militaire discipline in 30 dagen.",
      details: {
        headline: "Business Reset Blueprint",
        tag: "Voor teams van 5 – 50",
        body: "Motivatie is tijdelijk. Systemen zijn permanent. De Business Reset Blueprint is geen 'workshop.' Het is een installatie van het Vanguard Operating System — het wegsnijden van zachte bedrijfsgewoonten en vervangen door de protocollen van high-performance eenheden.",
        bullets: [
          "Vitaliteit — Energie is de basis. Zonder fysieke en mentale scherpte overleeft geen enkele strategie de realiteit",
          "Persoonlijke ontwikkeling — Verwijder de comfortzone en installeer een systeem voor constante evolutie",
          "Leiderschap — Je managet geen mensen. Je stelt de standaard. Leiderschap is identiteit, geen titel",
          "Business — Systemen boven drukte. Installeer de operationele infrastructuur die schaalt zonder jouw constante aanwezigheid",
        ],
        closing: "Je kunt chaos niet schalen. Executeer of word vervangen.",
        cta: "Boek een Consultatie",
        disclaimer: "Prijzen niet weergegeven · Alle trajecten op aanvraag",
        showCalendar: true,
        calendarUrl: "https://api.leadconnectorhq.com/widget/booking/NE13SD9blCXUJeVghk6j",
      },
    },
  ],
};

const images = [serviceUnmasked, serviceCoaching, serviceAcademy, serviceBusiness];

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
      <section className="relative z-10 pt-32 pb-20 md:pt-40 md:pb-28 bg-background">
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
                      {/* UNMASKED: open internal booking dialog */}
                      {isUnmasked && (
                        <button
                          onClick={() => { setSelected(null); setTimeout(() => setBookingOpen(true), 200); }}
                          className="w-full bg-lioner-gold hover:bg-lioner-gold/90 text-white py-4 text-sm font-semibold uppercase tracking-widest transition-colors"
                        >
                          {(services[selected].details as any).cta}
                        </button>
                      )}
                    </div>
                  )}

                  {/* Booking calendar for High Performance & Business cards */}
                  {showCalendar && !isUnmasked && (
                    <div className="pt-2">
                      <p className="text-xs font-medium tracking-widest uppercase text-lioner-gold mb-3">
                        Book Your Session
                      </p>
                      <iframe
                        src={calendarUrl}
                        style={{ width: "100%", border: "none", overflow: "hidden", minHeight: "600px" }}
                        scrolling="no"
                        id={`lc-calendar-${selected}`}
                      />
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <UnmaskedBookingDialog open={bookingOpen} onOpenChange={setBookingOpen} />
    </>
  );
};
