import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Crown } from "lucide-react";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import eliteThumbnail from "@/assets/lionel-portrait-new-5.jpg";
import { AssessmentDialog } from "@/components/assessment/AssessmentDialog";

const bookingUrl = "https://api.leadconnectorhq.com/widget/booking/q8RommFFkbptaoyv1MRY";

export const EliteHeroSection = () => {
  const [isAssessmentOpen, setIsAssessmentOpen] = useState(false);
  return (
    <section id="hero" className="pt-32 pb-20 bg-white">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="overflow-hidden p-8 md:p-12 lg:p-16 bg-[hsl(var(--lioner-gold))]">
          <div className="flex flex-col gap-8">
            {/* Content */}
            <div className="space-y-4 md:space-y-6 text-white flex flex-col justify-center items-center md:items-start px-4 md:px-0 text-center md:text-left">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full">
                <Crown className="w-4 h-4" />
                <span className="text-sm font-medium">Elite 1-to-1 Coaching</span>
              </div>

              {/* Headline */}
              <h1 className="text-4xl md:text-5xl lg:text-5xl font-semibold font-sans leading-tight tracking-tight">
                Transform Your Life Through Personal Elite Coaching
              </h1>

              {/* Description */}
              <p className="text-lg text-white leading-relaxed tracking-normal max-w-xl">
                Unlock your full potential with personalized, high-performance coaching designed for ambitious individuals ready to break through their limits and achieve extraordinary results.
              </p>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 py-4 w-full max-w-md">
                <div className="text-center">
                  <div className="text-3xl font-bold">1,000+</div>
                  <div className="text-sm text-white/80">Lives Transformed</div>
                </div>
                <div className="text-center border-x border-white/20">
                  <div className="text-3xl font-bold">12 Wks</div>
                  <div className="text-sm text-white/80">Deep Transformation</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold">100%</div>
                  <div className="text-sm text-white/80">Personalized</div>
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
                    src="https://sfzdecpsvgcqmlwkjibd.supabase.co/storage/v1/object/public/vsl//High ticket Choice 02.mov"
                    type="video/mp4"
                  />
                  Your browser does not support the video tag.
                </video>
              </AspectRatio>
            </div>

            {/* CTA */}
            <div className="flex flex-col sm:flex-row gap-3 items-center justify-center">
              <Button 
                size="lg" 
                asChild
                className="bg-white text-[hsl(var(--lioner-gold))] hover:bg-[hsl(var(--lioner-gold))] hover:text-white hover:border-white font-medium rounded-none px-7 py-3.5 h-auto group transition-all border-2 border-transparent shadow-lg shadow-black/10"
              >
                <a href={bookingUrl} target="_blank" rel="noopener noreferrer">
                  Apply For Elite Coaching
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </a>
              </Button>
              <Button 
                size="lg" 
                onClick={() => setIsAssessmentOpen(true)}
                className="bg-transparent text-white border-2 border-white hover:bg-white hover:text-[hsl(var(--lioner-gold))] font-medium rounded-none px-7 py-3.5 h-auto group transition-all"
              >
                Take Leader Assessment
              </Button>
            </div>
            <p className="text-sm text-white/90 text-center">Limited spots available • Application required</p>
          </div>
        </div>
      </div>

      <AssessmentDialog open={isAssessmentOpen} onOpenChange={setIsAssessmentOpen} />
    </section>
  );
};
