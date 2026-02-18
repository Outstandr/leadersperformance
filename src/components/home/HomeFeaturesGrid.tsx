import { motion, useInView, AnimatePresence, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef, useState } from "react";
import { X } from "lucide-react";
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
      description: "For high-performance entrepreneurs and executives who have built success — and lost themselves in the process. This is not a retreat. This is an intervention.",
      details: {
        headline: "UNMASKED Private Executive Reset · Dubai",
        tag: "Invitation Only · Maximum 4 Men Per Edition",
        body: "Motivation is a sedative. Discipline is the cure. He doesn't tell you what you want to hear. He tells you what you need to hear. The mirror you've been avoiding — no fluff, no theory, no inspiration porn.",
        bullets: [
          "Vitality — Recalibrate your biological baseline",
          "Mindset — Map the patterns running your decisions",
          "Leadership — Reset your command presence",
          "Business — Build your 90-day war map",
        ],
        closing: "This is not a retreat. It's an intervention.",
        cta: "Apply Here",
        disclaimer: "Investment: €8,500 · 2026 Editions: March · April · May — Dubai",
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
      description: "Goal-focused sessions to build direction, sustainable performance, and executive confidence.",
      details: {
        headline: "Business Coaching",
        body: "Structured coaching engagements for leaders ready to build the discipline, presence, and strategic thinking required to lead at the highest level. This is where ambition meets execution — where you stop managing and start commanding your trajectory.",
        bullets: [
          "Goal-oriented coaching trajectory",
          "Leadership identity and presence development",
          "Sustainable high-performance systems",
          "Stress mastery and energy management",
          "Quarterly progress reviews and recalibration",
        ],
        closing: "Leadership isn't a title. It's a daily practice of showing up at your standard.",
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
        body: "Motivatie is een kalmeringsmiddel. Discipline is het antwoord. Hij vertelt je niet wat je wilt horen. Hij vertelt je wat je moet horen. De spiegel die je al een tijdje vermijdt — geen fluff, geen theorie, geen inspiratieporno.",
        bullets: [
          "Vitaliteit — Kalibreer je biologische basislijn opnieuw",
          "Mindset — Breng de patronen in kaart die je beslissingen sturen",
          "Leiderschap — Reset je commandopositie",
          "Business — Bouw je 90-dagenoorlogskaart",
        ],
        closing: "Dit is geen retraite. Het is een interventie.",
        cta: "Aanmelden",
        disclaimer: "Investering: €8.500 · 2026 Edities: Maart · April · Mei — Dubai",
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
      description: "Doelgerichte sessies om richting, duurzame prestaties en executive-vertrouwen op te bouwen.",
      details: {
        headline: "Business Coaching",
        body: "Gestructureerde coachingstrajecten voor leiders die klaar zijn om de discipline, aanwezigheid en het strategisch denken te ontwikkelen die nodig zijn om op het hoogste niveau te leiden. Hier ontmoet ambitie de uitvoering — hier stop je met managen en begin je je koers te commanderen.",
        bullets: [
          "Doelgericht coachingstraject",
          "Ontwikkeling van leiderschapsidentiteit en -aanwezigheid",
          "Duurzame high-performance systemen",
          "Stressbeheersing en energiemanagement",
          "Kwartaalreview en heroriëntatie",
        ],
        closing: "Leiderschap is geen titel. Het is een dagelijkse praktijk van verschijnen op jouw standaard.",
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
          <p className="text-sm text-background/70 leading-relaxed mb-6">
            {service.description}
          </p>
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
              className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto bg-background border-2 border-lioner-gold/30 shadow-2xl"
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

                <p className="text-muted-foreground leading-relaxed">
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
                    <div className="space-y-2">
                      <button className="w-full bg-lioner-gold text-background font-medium text-sm tracking-wider uppercase py-3 px-6 hover:bg-lioner-gold/90 transition-colors">
                        {(services[selected].details as any).cta}
                      </button>
                      <p className="text-center text-xs text-muted-foreground">
                        {(services[selected].details as any).disclaimer}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
