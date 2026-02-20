import { Clock, Tag, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/lib/i18n/LanguageContext";

const articles = {
  en: [
    {
      tag: "Mental Performance",
      readTime: "6 min read",
      title: "The Power of Mental Sovereignty",
      description: "Most leaders outsource their thinking to urgency, notifications, and other people's agendas. Reclaiming mental sovereignty means deciding — consciously — what gets your attention, energy, and time.",
      link: "/articles/mental-sovereignty",
    },
    {
      tag: "Discipline",
      readTime: "5 min read",
      title: "Why Discipline Beats Motivation Every Time",
      description: "Motivation is a feeling. Discipline is a system. The leaders who consistently outperform aren't more inspired — they've built structures that make the right action the default action.",
      link: "/articles/discipline-beats-motivation",
    },
    {
      tag: "Leadership",
      readTime: "7 min read",
      title: "Leading Through Uncertainty Without Losing Your Team",
      description: "When the environment is volatile, your team doesn't need optimism — they need clarity. How you show up under pressure sets the standard for every person watching you.",
      link: "/articles/leading-through-uncertainty",
    },
    {
      tag: "The RESET Method",
      readTime: "8 min read",
      title: "The RESET Blueprint® — A Deep Dive",
      description: "Not a framework you study. A system you install. The RESET Blueprint® is built around four non-negotiable pillars: Vitality, Personal Development, Personal Leadership, and Business — in that order.",
      link: "/articles/reset-blueprint",
    },
  ],
  nl: [
    {
      tag: "Mentale Prestaties",
      readTime: "6 min lezen",
      title: "De Kracht van Mentale Soevereiniteit",
      description: "De meeste leiders besteden hun denken uit aan urgentie, notificaties en de agenda's van anderen. Mentale soevereiniteit terugwinnen betekent bewust beslissen wat jouw aandacht, energie en tijd krijgt.",
      link: "/articles/mental-sovereignty",
    },
    {
      tag: "Discipline",
      readTime: "5 min lezen",
      title: "Waarom Discipline Altijd Wint van Motivatie",
      description: "Motivatie is een gevoel. Discipline is een systeem. De leiders die consistent beter presteren zijn niet geïnspireerder — ze hebben structuren gebouwd die de juiste actie de standaardactie maken.",
      link: "/articles/discipline-beats-motivation",
    },
    {
      tag: "Leiderschap",
      readTime: "7 min lezen",
      title: "Leiding Geven in Onzekerheid Zonder Je Team te Verliezen",
      description: "Wanneer de omgeving volatiel is, heeft je team geen optimisme nodig — ze hebben duidelijkheid nodig. Hoe jij verschijnt onder druk bepaalt de standaard voor iedereen die naar je kijkt.",
      link: "/articles/leading-through-uncertainty",
    },
    {
      tag: "De RESET Methode",
      readTime: "8 min lezen",
      title: "De RESET Blueprint® — Een Diepgaande Verkenning",
      description: "Geen raamwerk dat je bestudeert. Een systeem dat je installeert. De RESET Blueprint® is gebouwd rond vier niet-onderhandelbare pijlers: Vitaliteit, Persoonlijke Ontwikkeling, Persoonlijk Leiderschap en Business — in die volgorde.",
      link: "/articles/reset-blueprint",
    },
  ],
};

export const HomeArticlesSection = () => {
  const { language } = useLanguage();
  const list = articles[language];

  const eyebrow = language === "nl" ? "Inzichten" : "Insights";
  const heading = language === "nl" ? "Laatste" : "Latest";
  const headingGold = language === "nl" ? "Artikelen" : "Articles";
  const subheading = language === "nl"
    ? "Verken ons laatste denken over leiderschap, discipline en persoonlijke meesterschap."
    : "Explore our latest thinking on leadership, discipline, and personal mastery.";
  const readLabel = language === "nl" ? "Lees" : "Read";

  return (
    <section id="articles" className="relative z-10 py-20 lg:py-28" style={{ background: "hsl(0 0% 12%)" }}>
      <div className="container mx-auto px-6 max-w-7xl">
        {/* Header */}
        <div className="mb-14">
          <p className="text-xs font-medium tracking-[0.3em] uppercase text-lioner-gold mb-4">
            {eyebrow}
          </p>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-medium leading-tight text-white">
            {heading}{" "}
            <span className="text-lioner-gold italic">{headingGold}</span>
          </h2>
          <p className="mt-4 max-w-2xl text-base md:text-lg leading-relaxed text-white/60">
            {subheading}
          </p>
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {list.map((article, i) => (
            <div
              key={i}
              className="group relative flex flex-col min-h-[300px] p-8 transition-all duration-300 hover:border-lioner-gold/40"
              style={{
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.08)",
              }}
            >
              {/* Top meta row */}
              <div className="flex items-center gap-4 mb-6">
                <span className="flex items-center gap-1.5 text-xs font-medium tracking-widest uppercase text-lioner-gold">
                  <Tag className="w-3 h-3" />
                  {article.tag}
                </span>
                <span className="flex items-center gap-1.5 text-xs text-white/40">
                  <Clock className="w-3 h-3" />
                  {article.readTime}
                </span>
              </div>

              {/* Title */}
              <h3 className="font-serif text-xl md:text-2xl font-medium text-white leading-snug mb-4">
                {article.title}
              </h3>

              {/* Description */}
              <p className="text-sm md:text-base leading-relaxed text-white/60 flex-1 mb-8">
                {article.description}
              </p>

              {/* Read button — left aligned, under content */}
              <div>
                <Link
                  to={article.link}
                  className="inline-flex items-center gap-2 text-sm font-medium text-lioner-gold border border-lioner-gold/40 hover:border-lioner-gold hover:bg-lioner-gold hover:text-white px-5 py-2.5 transition-all duration-200 group/btn"
                >
                  <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-0.5 transition-transform" />
                  {readLabel}
                </Link>
              </div>

              {/* Gold hover line */}
              <div
                className="absolute bottom-0 left-0 h-[2px] w-0 bg-lioner-gold group-hover:w-full transition-all duration-500"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
