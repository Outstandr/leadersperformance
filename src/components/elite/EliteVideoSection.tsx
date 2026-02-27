import { useState } from "react";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { EliteBookingDialog } from "./EliteBookingDialog";

export const EliteVideoSection = () => {
  const { t } = useLanguage();
  const [bookingOpen, setBookingOpen] = useState(false);

  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4 max-w-4xl">
        <AspectRatio ratio={16 / 9}>
          <video
            className="w-full h-full rounded-lg shadow-lg"
            controls
            preload="metadata"
          >
            <source
              src="https://sfzdecpsvgcqmlwkjibd.supabase.co/storage/v1/object/public/vsl//High ticket Choice 02.mov"
              type="video/quicktime"
            />
            Your browser does not support the video tag.
          </video>
        </AspectRatio>
        
        <div className="text-center mt-8">
          <Button 
            size="lg" 
            onClick={() => setBookingOpen(true)}
            className="bg-lioner-gold text-white hover:bg-lioner-gold/90 font-medium rounded-none px-8 py-4 h-auto group"
          >
            {t("elite.video.cta")}
            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </div>

      <EliteBookingDialog open={bookingOpen} onOpenChange={setBookingOpen} />
    </section>
  );
};
