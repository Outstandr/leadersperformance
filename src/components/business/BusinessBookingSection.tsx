import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { CorporateAuditDialog } from "@/components/corporate-audit/CorporateAuditDialog";
import { useLanguage } from "@/lib/i18n/LanguageContext";

export const BusinessBookingSection = () => {
  const { t } = useLanguage();
  const [isAuditOpen, setIsAuditOpen] = useState(false);

  return (
    <section id="book-call" className="py-8 lg:py-12 bg-white">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="bg-[hsl(var(--lioner-charcoal))] p-8 md:p-12 lg:p-16">
          <div className="max-w-3xl mx-auto text-center text-white">
            <span className="text-sm font-medium uppercase tracking-wider text-white/80">{t("business.booking.eyebrow")}</span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold font-sans mt-4 mb-8">
              {t("business.booking.heading")}
            </h2>

            <div className="grid md:grid-cols-2 gap-8 mb-10 text-left">
              <div className="p-6 border border-white/20">
                <h3 className="text-xl font-bold mb-3 text-white/60">{t("business.booking.optionALabel")}</h3>
                <p className="text-white/70 leading-relaxed whitespace-pre-line">
                  {t("business.booking.optionAText")}
                </p>
              </div>
              <div className="p-6 border-2 border-[hsl(var(--lioner-gold))]">
                <h3 className="text-xl font-bold mb-3 text-[hsl(var(--lioner-gold))]">{t("business.booking.optionBLabel")}</h3>
                <p className="text-white/90 leading-relaxed whitespace-pre-line">
                  {t("business.booking.optionBText")}
                </p>
              </div>
            </div>

            <p className="text-lg text-white/70 italic mb-8">
              {t("business.booking.quote")}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                onClick={() => setIsAuditOpen(true)}
                className="bg-[hsl(var(--lioner-gold))] hover:bg-[hsl(var(--lioner-gold))]/90 text-white font-bold rounded-none px-8 py-5 h-auto group text-base uppercase tracking-wider"
              >
                {t("business.booking.ctaSecondary")}
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      <BusinessConsultationDialog open={isConsultationOpen} onOpenChange={setIsConsultationOpen} />
      <CorporateAuditDialog open={isAuditOpen} onOpenChange={setIsAuditOpen} />
    </section>
  );
};
