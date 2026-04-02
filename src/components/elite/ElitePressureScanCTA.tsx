import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "@/lib/i18n/LanguageContext";

export const ElitePressureScanCTA = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();

  return (
    <section className="py-12 lg:py-16 bg-[hsl(var(--lioner-charcoal))]">
      <div className="container mx-auto px-4 max-w-4xl text-center">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-white mb-8 leading-relaxed">
          {t("elite.pressureCTA.headline")}
        </h2>
        <Button
          size="lg"
          onClick={() => navigate("/pressurescan")}
          className="bg-[hsl(var(--lioner-gold))] text-white hover:bg-[hsl(var(--lioner-gold))]/90 font-medium rounded-none px-8 py-4 h-auto group transition-all"
        >
          {t("elite.pressureCTA.cta")}
          <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
        </Button>
        <p className="text-sm text-white/60 mt-4">{t("elite.pressureCTA.duration")}</p>
      </div>
    </section>
  );
};