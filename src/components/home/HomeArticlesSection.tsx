import { ArrowUpRight } from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageContext";

export const HomeArticlesSection = () => {
  const { t } = useLanguage();

  const articles = [
    {
      title: t("home.articles.title1"),
      description: t("home.articles.desc1"),
      link: "/blog",
    },
    {
      title: t("home.articles.title2"),
      description: t("home.articles.desc2"),
      link: "/blog",
    },
    {
      title: t("home.articles.title3"),
      description: t("home.articles.desc3"),
      link: "/blog",
    },
    {
      title: t("home.articles.title4"),
      description: t("home.articles.desc4"),
      link: "/blog",
    },
  ];

  return (
    <section className="relative z-10 py-20 lg:py-28" style={{ background: "hsl(0 0% 12%)" }}>
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="mb-14">
          <p className="text-xs font-medium tracking-[0.3em] uppercase text-lioner-gold mb-4">
            {t("home.articles.eyebrow")}
          </p>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-medium leading-tight" style={{ color: "white" }}>
            {t("home.articles.heading")} <span className="text-lioner-gold italic">{t("home.articles.headingGold")}</span>
          </h2>
          <p className="mt-4 max-w-2xl text-base md:text-lg leading-relaxed" style={{ color: "rgba(255,255,255,0.6)" }}>
            {t("home.articles.subheading")}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {articles.map((article, i) => (
            <a
              key={i}
              href={article.link}
              className="group relative p-8 pb-20 flex flex-col justify-between min-h-[280px] transition-colors"
              style={{
                background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.08)",
              }}
            >
              <div className="flex items-start justify-between gap-4">
                <p className="text-sm md:text-base leading-relaxed max-w-[80%]" style={{ color: "rgba(255,255,255,0.7)" }}>
                  {article.description}
                </p>
                <div className="shrink-0 w-11 h-11 rounded-full bg-lioner-gold flex items-center justify-center group-hover:scale-110 transition-transform">
                  <ArrowUpRight className="w-5 h-5" style={{ color: "white" }} />
                </div>
              </div>
              <h3 className="absolute bottom-8 left-8 font-serif text-xl md:text-2xl font-medium" style={{ color: "white" }}>
                {article.title}
              </h3>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};
