import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Crown } from "lucide-react";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import eliteThumbnail from "@/assets/lionelone.png";
import { AssessmentDialog } from "@/components/assessment/AssessmentDialog";
import { useLanguage } from "@/lib/i18n/LanguageContext";

const bookingUrl = "https://api.leadconnectorhq.com/widget/booking/q8RommFFkbptaoyv1MRY";

export const EliteHeroSection = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [isAssessmentOpen, setIsAssessmentOpen] = useState(false);

  return (
    <section id="hero" className="pt-32 pb-20 bg-white">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="overflow-hidden p-8 md:p-12 lg:p-16 bg-[hsl(var(--lioner-gold))]">
          <div className="flex flex-col gap-8">
            {/* Content */}
            <div className="space-y-4 md:space-y-6 text-white flex flex-col justify-center items-center md:items-start px-4 md:px-0 text-center md:text-left">
              <div className="inline-flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full">
                <Crown className="w-4 h-4" />
                <span className="text-sm font-medium">{t("elite.hero.badge")}</span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-5xl font-semibold font-sans leading-tight tracking-tight">
                {t("elite.hero.headline")}
              </h1>
              <p className="text-lg text-white leading-relaxed tracking-normal max-w-xl">
                {t("elite.hero.description")}
              </p>
              <div className="grid grid-cols-3 gap-4 py-4 w-full max-w-md">
                <div className="text-center">
                  <div className="text-sm font-semibold uppercase tracking-wider">{t("elite.hero.stat1Label")}</div>
                </div>
                <div className="text-center border-x border-white/20">
                  <div className="text-sm font-semibold uppercase tracking-wider">{t("elite.hero.stat2Label")}</div>
                </div>
                <div className="text-center">
                  <div className="text-sm font-semibold uppercase tracking-wider">{t("elite.hero.stat3Label")}</div>
                </div>
              </div>
            </div>

            {/* VSL Video */}
            <div className="w-full">
              <AspectRatio ratio={16 / 9}>
                <video
                  className="w-full h-full rounded-lg shadow-lg"
                  controls
                  preload="none"
                  poster={eliteThumbnail}
                >
                  <source
                    src="https://sfzdecpsvgcqmlwkjibd.supabase.co/storage/v1/object/public/vsl//Unmasked intervention website.mp4"
                    type="video/mp4"
                  />
                  Your browser does not support the video tag.
                </video>
              </AspectRatio>
            </div>

            {/* Pressure Scan CTA */}
            <div className="text-center space-y-3">
              <p className="text-lg md:text-xl font-medium text-white">
                {t("elite.hero.pressureHeadline")}
              </p>
              <Button
                size="lg"
                onClick={() => navigate("/burnout-scan")}
                className="bg-white text-[hsl(var(--lioner-gold))] hover:bg-[hsl(var(--lioner-gold))] hover:text-white hover:border-white font-medium rounded-none px-7 py-3.5 h-auto group transition-all border-2 border-transparent shadow-lg shadow-black/10"
              >
                {t("elite.hero.pressureCTA")}
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <p className="text-sm text-white/80">{t("elite.hero.pressureDuration")}</p>
            </div>
          </div>
        </div>
      </div>

      <AssessmentDialog open={isAssessmentOpen} onOpenChange={setIsAssessmentOpen} source="elite" />
    </section>
  );
};