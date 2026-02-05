import { Button } from "@/components/ui/button";
import { ArrowRight, Crown, Target, Zap } from "lucide-react";
import heroImage from "@/assets/lionel-elite-hero.png";

const bookingUrl = "https://api.leadconnectorhq.com/widget/booking/q8RommFFkbptaoyv1MRY";

export const EliteHeroSection = () => {
  return (
    <section id="hero" className="pt-32 pb-20 bg-white">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="overflow-hidden p-8 md:p-12 lg:p-16 bg-[hsl(var(--lioner-gold))]">
          <div className="grid md:grid-cols-1 lg:grid-cols-[1fr_40%] gap-8 lg:gap-12 items-center">
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

              {/* CTA */}
              <Button 
                size="lg" 
                asChild
                className="bg-white text-[hsl(var(--lioner-gold))] hover:bg-[hsl(var(--lioner-gold))] hover:text-white hover:border-white font-medium rounded-none px-7 py-3.5 h-auto mt-4 group transition-all border-2 border-transparent shadow-lg shadow-black/10"
              >
                <a href={bookingUrl} target="_blank" rel="noopener noreferrer">
                  Apply For Elite Coaching
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </a>
              </Button>
              <p className="text-sm text-white/90 pt-2">Limited spots available • Application required</p>
            </div>

            {/* Image */}
            <div className="relative aspect-[3/4] overflow-hidden shadow-2xl mx-auto md:mx-auto md:w-full md:max-w-full lg:max-w-none lg:mx-0">
              <img 
                src={heroImage} 
                alt="Lionel Eersteling - Elite Performance Coach" 
                className="w-full h-full object-cover object-center" 
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
