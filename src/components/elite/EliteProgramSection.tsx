import { Heart, Sparkles, Crown, Briefcase } from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageContext";

export const EliteProgramSection = () => {
  const { t } = useLanguage();

  const pillars = [
    { icon: Heart, title: t("elite.program.title1"), description: t("elite.program.desc1") },
    { icon: Sparkles, title: t("elite.program.title2"), description: t("elite.program.desc2") },
    { icon: Crown, title: t("elite.program.title3"), description: t("elite.program.desc3") },
    { icon: Briefcase, title: t("elite.program.title4"), description: t("elite.program.desc4") },
  ];

  return (
    <section id="program" className="py-8 lg:py-12 bg-white">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-center mb-12">
          <span className="text-sm font-medium uppercase tracking-wider text-lioner-gold">{t("elite.program.eyebrow")}</span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold font-sans mt-4 mb-6">
            {t("elite.program.heading")}
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            {t("elite.program.subheading")}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {pillars.map((pillar, index) => (
            <div 
              key={index} 
              className="group p-8 border border-border hover:border-lioner-gold/50 transition-all duration-300 hover:shadow-lg"
            >
              <div className="bg-lioner-gold/10 w-14 h-14 rounded-lg flex items-center justify-center mb-6 group-hover:bg-lioner-gold/20 transition-colors">
                <pillar.icon className="w-7 h-7 text-lioner-gold" />
              </div>
              <h3 className="text-xl font-semibold mb-3">{pillar.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{pillar.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
