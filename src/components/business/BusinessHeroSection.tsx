import { Button } from "@/components/ui/button";
import { ArrowRight, Building2 } from "lucide-react";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import videoThumbnail from "@/assets/lioneltwo.png";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "@/lib/i18n/LanguageContext";

export const BusinessHeroSection = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();

  return (
    <section id="hero" className="pt-32 pb-20 bg-white">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="overflow-hidden p-8 md:p-12 lg:p-16 bg-[hsl(var(--lioner-gold))]">
          <div className="max-w-3xl mx-auto">
            <div className="space-y-4 md:space-y-6 text-white flex flex-col justify-center items-center md:items-start px-4 md:px-0 text-center md:text-left">
              <div className="inline-flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full">
                <Building2 className="w-4 h-4" />
                <span className="text-sm font-medium">{t("business.hero.badge")}</span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-5xl font-semibold font-sans leading-tight tracking-tight">
                {t("business.hero.headline")}
              </h1>
              <div className="space-y-4 text-lg text-white leading-relaxed tracking-normal max-w-xl">
                {t("business.hero.description").split("\n\n").map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>

              {/* Video */}
              <div className="w-full mt-2">
                <AspectRatio ratio={16 / 9}>
                  <video
                    className="w-full h-full rounded-lg shadow-lg"
                    controls
                    preload="none"
                    poster={videoThumbnail}
                  >
                    <source
                      src="https://sfzdecpsvgcqmlwkjibd.supabase.co/storage/v1/object/public/vsl/01.What%20you%20see%20is%20what%20you%20get..mp4"
                      type="video/mp4"
                    />
                    Your browser does not support the video tag.
                  </video>
                </AspectRatio>
                <p className="text-lg text-white leading-relaxed tracking-normal mt-4 max-w-xl">
                  {t("business.hero.belowVideo")}
                </p>
              </div>

              {/* CTA */}
              <div className="flex flex-col sm:flex-row gap-3 mt-4">
                <Button
                  size="lg"
                  onClick={() => navigate("/profit-leak-scan")}
                  className="bg-white text-[hsl(var(--lioner-gold))] hover:bg-[hsl(var(--lioner-gold))] hover:text-white hover:border-white font-medium rounded-none px-7 py-3.5 h-auto group transition-all border-2 border-transparent shadow-lg shadow-black/10"
                >
                  {t("business.hero.ctaSecondary")}
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

    </section>
  );
};
