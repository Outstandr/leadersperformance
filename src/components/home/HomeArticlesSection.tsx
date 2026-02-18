import { ArrowUpRight, Clock, Tag } from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageContext";

const articles = {
  en: [
    {
      tag: "Mental Performance",
      readTime: "6 min read",
      title: "The Power of Mental Sovereignty",
      description: "Most leaders outsource their thinking to urgency, notifications, and other people's agendas. Reclaiming mental sovereignty means deciding — consciously — what gets your attention, energy, and time.",
      link: "#",
    },
    {
      tag: "Discipline",
      readTime: "5 min read",
      title: "Why Discipline Beats Motivation Every Time",
      description: "Motivation is a feeling. Discipline is a system. The leaders who consistently outperform aren't more inspired — they've built structures that make the right action the default action.",
      link: "#",
    },
    {
      tag: "Leadership",
      readTime: "7 min read",
      title: "Leading Through Uncertainty Without Losing Your Team",
      description: "When the environment is volatile, your team doesn't need optimism — they need clarity. How you show up under pressure sets the standard for every person watching you.",
      link: "#",
    },
    {
      tag: "The RESET Method",
      readTime: "8 min read",
      title: "The RESET Blueprint® — A Deep Dive",
      description: "Not a framework you study. A system you install. The RESET Blueprint® is built around four non-negotiable pillars: Vitality, Personal Development, Personal Leadership, and Business — in that order.",
      link: "#",
    },
  ],
  nl: [
    {
      tag: "Mentale Prestaties",
      readTime: "6 min lezen",
      title: "De Kracht van Mentale Soevereiniteit",
      description: "De meeste leiders besteden hun denken uit aan urgentie, notificaties en de agenda's van anderen. Mentale soevereiniteit terugwinnen betekent bewust beslissen wat jouw aandacht, energie en tijd krijgt.",
      link: "#",
    },
    {
      tag: "Discipline",
      readTime: "5 min lezen",
      title: "Waarom Discipline Altijd Wint van Motivatie",
      description: "Motivatie is een gevoel. Discipline is een systeem. De leiders die consistent beter presteren zijn niet geïnspireerder — ze hebben structuren gebouwd die de juiste actie de standaardactie maken.",
      link: "#",
    },
    {
      tag: "Leiderschap",
      readTime: "7 min lezen",
      title: "Leiding Geven in Onzekerheid Zonder Je Team te Verliezen",
      description: "Wanneer de omgeving volatiel is, heeft je team geen optimisme nodig — ze hebben duidelijkheid nodig. Hoe jij verschijnt onder druk bepaalt de standaard voor iedereen die naar je kijkt.",
      link: "#",
    },
    {
      tag: "De RESET Methode",
      readTime: "8 min lezen",
      title: "De RESET Blueprint® — Een Diepgaande Verkenning",
      description: "Geen raamwerk dat je bestudeert. Een systeem dat je installeert. De RESET Blueprint® is gebouwd rond vier niet-onderhandelbare pijlers: Vitaliteit, Persoonlijke Ontwikkeling, Persoonlijk Leiderschap en Business — in die volgorde.",
      link: "#",
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
            <a
              key={i}
              href={article.link}
              className="group relative flex flex-col justify-between min-h-[300px] p-8 transition-all duration-300 hover:border-lioner-gold/40"
              style={{
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.08)",
              }}
            >
              {/* Top meta */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                  <span className="flex items-center gap-1.5 text-xs font-medium tracking-widest uppercase text-lioner-gold">
                    <Tag className="w-3 h-3" />
                    {article.tag}
                  </span>
                  <span className="flex items-center gap-1.5 text-xs text-white/40">
                    <Clock className="w-3 h-3" />
                    {article.readTime}
                  </span>
                </div>
                <div className="w-9 h-9 rounded-full bg-lioner-gold/10 border border-lioner-gold/30 flex items-center justify-center group-hover:bg-lioner-gold group-hover:border-lioner-gold transition-all duration-300">
                  <ArrowUpRight className="w-4 h-4 text-lioner-gold group-hover:text-white transition-colors duration-300" />
                </div>
              </div>

              {/* Description */}
              <p className="text-sm md:text-base leading-relaxed text-white/60 flex-1 mb-8">
                {article.description}
              </p>

              {/* Title at bottom */}
              <h3 className="font-serif text-xl md:text-2xl font-medium text-white leading-snug">
                {article.title}
              </h3>

              {/* Gold hover line */}
              <div
                className="absolute bottom-0 left-0 h-[2px] w-0 bg-lioner-gold group-hover:w-full transition-all duration-500"
              />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};
