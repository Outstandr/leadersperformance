import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Crown, Check, Users } from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { EliteBookingDialog } from "./EliteBookingDialog";

export const EliteBookingSection = () => {
  const { t } = useLanguage();
  const [bookingOpen, setBookingOpen] = useState(false);

  const includes = [
    t("elite.booking.include1"),
    t("elite.booking.include2"),
    t("elite.booking.include3"),
    t("elite.booking.include4"),
    t("elite.booking.include5"),
    t("elite.booking.include6"),
  ];

  return (
    <section id="apply" className="py-8 lg:py-12 bg-white">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="bg-[hsl(var(--lioner-gold))] p-8 md:p-12 lg:p-16">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-white">
              <div className="inline-flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full mb-6">
                <Crown className="w-4 h-4" />
                <span className="text-sm font-medium">{t("elite.booking.badge")}</span>
              </div>
              
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold font-sans mb-6">
                {t("elite.booking.heading")}
              </h2>
              <p className="text-lg leading-relaxed mb-8 text-white/90">
                {t("elite.booking.subheading")}
              </p>
              
              <Button 
                size="lg" 
                onClick={() => setBookingOpen(true)}
                className="bg-white text-[hsl(var(--lioner-gold))] hover:bg-white/90 font-medium rounded-none px-8 py-4 h-auto group"
              >
                {t("elite.booking.cta")}
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              
              <p className="text-sm text-white/70 mt-4">
                <Users className="w-4 h-4 inline mr-1" />
                {t("elite.booking.spotsLeft")}
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm p-8 border border-white/20 text-white">
              <h3 className="text-2xl font-semibold mb-6">{t("elite.booking.includedTitle")}</h3>
              <ul className="space-y-4">
                {includes.map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="bg-white/20 w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-4 h-4" />
                    </div>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      <EliteBookingDialog open={bookingOpen} onOpenChange={setBookingOpen} />
    </section>
  );
};
