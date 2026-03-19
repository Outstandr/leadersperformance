import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { FounderPressureScanDialog } from "@/components/founder-scan/FounderPressureScanDialog";

export const ElitePressureScanCTA = () => {
  const { t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <section className="py-12 lg:py-16 bg-[hsl(var(--lioner-charcoal))]">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-white mb-8 leading-relaxed">
            {t("elite.pressureCTA.headline")}
          </h2>
          <Button
            size="lg"
            onClick={() => setIsOpen(true)}
            className="bg-[hsl(var(--lioner-gold))] text-white hover:bg-[hsl(var(--lioner-gold))]/90 font-medium rounded-none px-8 py-4 h-auto group transition-all"
          >
            {t("elite.pressureCTA.cta")}
            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Button>
          <p className="text-sm text-white/60 mt-4">{t("elite.pressureCTA.duration")}</p>
        </div>
      </section>

      <FounderPressureScanDialog open={isOpen} onOpenChange={setIsOpen} />
    </>
  );
};
