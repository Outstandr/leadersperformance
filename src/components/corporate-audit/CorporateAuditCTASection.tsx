import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, AlertTriangle } from "lucide-react";
import { CorporateAuditDialog } from "./CorporateAuditDialog";
import { useLanguage } from "@/lib/i18n/LanguageContext";

export const CorporateAuditCTASection = () => {
  const { t } = useLanguage();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <>
      <section id="audit" className="py-16 lg:py-24 bg-background">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 border border-lioner-gold/30 rounded-none">
            <AlertTriangle className="w-5 h-5 text-lioner-gold" />
            <span className="text-sm font-semibold uppercase tracking-widest text-lioner-gold">
              {t("business.auditCTA.badge")}
            </span>
          </div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6 font-sans leading-tight">
            {t("business.auditCTA.heading")}
          </h2>

          <p className="text-lg md:text-xl text-foreground/70 mb-4 max-w-2xl mx-auto whitespace-pre-line text-center">
            {t("business.auditCTA.body1")}
          </p>

          {t("business.auditCTA.body2") && (
            <p className="text-lg md:text-xl text-foreground/70 mb-4 max-w-2xl mx-auto">
              {t("business.auditCTA.body2")}
            </p>
          )}

          <p className="text-sm text-foreground/50 mb-10">
            {t("business.auditCTA.body3")}
          </p>

          <Button
            size="lg"
            onClick={() => setIsDialogOpen(true)}
            className="bg-lioner-gold hover:bg-lioner-gold/90 text-white font-bold rounded-none px-10 py-7 h-auto group text-base uppercase tracking-wider transition-all"
          >
            {t("business.auditCTA.cta")}
            <ArrowRight className="ml-3 h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Button>

          <p className="text-xs mt-4 text-foreground/40 uppercase tracking-wide">
            {t("business.auditCTA.disclaimer")}
          </p>
        </div>
      </section>

      <CorporateAuditDialog open={isDialogOpen} onOpenChange={setIsDialogOpen} />
    </>
  );
};
