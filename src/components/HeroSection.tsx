import { Button } from "@/components/ui/button";
import { ArrowRight, Star } from "lucide-react";
import heroImage from "@/assets/lionel-hero.jpg";

export const HeroSection = () => {
  return (
    <section id="hero" className="pt-24 pb-10 lg:pt-32 lg:pb-16 bg-background">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="bg-lioner-blue rounded-[2rem] overflow-hidden p-5 md:p-8 lg:p-12">
          <div className="grid md:grid-cols-2 gap-6 md:gap-8 lg:gap-10 items-center">
            {/* Content */}
            <div className="space-y-4 md:space-y-5 lg:space-y-6 text-white">
              {/* Rating */}
              <div className="flex items-center gap-1.5">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="w-3.5 h-3.5 md:w-4 md:h-4 fill-lioner-gold text-lioner-gold" />
                ))}
                <span className="ml-1.5 text-xs font-medium">Trusted by Elite Leaders</span>
              </div>

              {/* Headline */}
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-[1.1]">
                Leadership excellence that drives real results
              </h1>

              {/* Description */}
              <p className="text-base md:text-lg text-neutral-gray leading-relaxed">
                Transform your leadership through the RESET Blueprint®—expert insights, 
                tailored strategies, and unwavering support designed for peak performance.
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row flex-wrap gap-3 pt-2">
                <Button 
                  size="lg" 
                  className="bg-white text-lioner-blue hover:bg-white/90 font-semibold text-sm md:text-base px-4 md:px-5 py-3 md:py-3.5 h-auto rounded-full group"
                >
                  Take Free Assessment
                  <ArrowRight className="ml-1.5 h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button 
                  size="lg" 
                  className="border-2 border-white/40 bg-transparent text-white hover:bg-white hover:text-lioner-blue font-semibold text-sm md:text-base px-4 md:px-5 py-3 md:py-3.5 h-auto rounded-full backdrop-blur-sm transition-all"
                >
                  Learn More
                </Button>
              </div>
            </div>

            {/* Image */}
            <div className="relative md:order-2">
              <div className="relative rounded-2xl overflow-hidden shadow-xl aspect-[4/5] max-w-xs md:max-w-sm lg:max-w-xs mx-auto">

                <img 
                  src={heroImage} 
                  alt="Lionel Eersteling - High Performance Leadership Coach" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Partners/Trust Section */}
        <div className="text-center mt-12">
          <p className="text-sm text-muted-foreground mb-6">Trusted by leaders at:</p>
          <div className="flex flex-wrap justify-center items-center gap-6 lg:gap-12 opacity-50">
            <div className="text-lg font-bold text-muted-foreground">Fortune 500</div>
            <div className="text-lg font-bold text-muted-foreground">Private Equity</div>
            <div className="text-lg font-bold text-muted-foreground">Global Firms</div>
            <div className="text-lg font-bold text-muted-foreground">Elite Executives</div>
          </div>
        </div>
      </div>
    </section>
  );
};
