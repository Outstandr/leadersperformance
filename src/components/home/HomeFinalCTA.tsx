import { Button } from "@/components/ui/button";
import { useLanguage } from "@/lib/i18n/LanguageContext";

export const HomeFinalCTA = () => {
  const { t } = useLanguage();
  return (
    <section className="py-24 md:py-32 bg-foreground text-background">
      <div className="container mx-auto px-6 max-w-3xl text-center">
        <h2 className="text-3xl md:text-5xl lg:text-6xl font-semibold tracking-tight leading-tight">
          {t("home.finalCta.heading")}
        </h2>
        <p className="mt-6 text-base text-background/60 max-w-xl mx-auto">
          {t("home.finalCta.subheading")}
        </p>
        <div className="mt-10">
          <Button className="bg-lioner-gold hover:bg-lioner-gold/90 text-foreground rounded-full px-10 py-3 h-auto text-sm font-medium">
            {t("home.finalCta.cta")}
          </Button>
        </div>
      </div>
    </section>
  );
};
