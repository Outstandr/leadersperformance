import { Button } from "@/components/ui/button";
import { ArrowRight, Star } from "lucide-react";
import heroImage from "@/assets/lionel-hero.jpg";

export const HeroSection = () => {
  return (
    <section id="hero" className="pt-32 pb-12 lg:pt-40 lg:pb-20 bg-background">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="bg-lioner-blue rounded-[2.5rem] overflow-hidden p-6 md:p-12 lg:p-16">
          <div className="grid md:grid-cols-2 gap-8 md:gap-10 lg:gap-12 items-center">
            {/* Content */}
            <div className="space-y-6 md:space-y-7 lg:space-y-8 text-white">
              {/* Rating */}
              <div className="flex items-center gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="w-4 h-4 md:w-5 md:h-5 fill-lioner-gold text-lioner-gold" />
                ))}
                <span className="ml-2 text-xs md:text-sm font-medium">Trusted by Elite Leaders</span>
              </div>

              {/* Headline */}
              <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold leading-[1.1]">
                Leadership excellence that drives real results
              </h1>

              {/* Description */}
              <p className="text-lg md:text-xl lg:text-xl text-neutral-gray leading-relaxed">
                Transform your leadership through the RESET Blueprint®—expert insights, 
                tailored strategies, and unwavering support designed for peak performance.
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row flex-wrap gap-4 pt-4">
                <Button 
                  size="lg" 
                  className="bg-white text-lioner-blue hover:bg-white/90 font-semibold text-base md:text-lg px-6 md:px-8 py-5 md:py-6 h-auto rounded-full group"
                >
                  Take Free Assessment
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button 
                  size="lg" 
                  variant="outline"
                  className="border-2 border-white/30 text-white hover:bg-white/10 font-semibold text-base md:text-lg px-6 md:px-8 py-5 md:py-6 h-auto rounded-full backdrop-blur-sm"
                >
                  Learn More
                </Button>
              </div>
            </div>

            {/* Image */}
            <div className="relative md:order-2">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl aspect-[4/5] max-w-sm md:max-w-md lg:max-w-sm mx-auto">

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
        <div className="text-center mt-16">
          <p className="text-muted-foreground mb-8">Trusted by leaders at:</p>
          <div className="flex flex-wrap justify-center items-center gap-8 lg:gap-16 opacity-50">
            <div className="text-2xl font-bold text-muted-foreground">Fortune 500</div>
            <div className="text-2xl font-bold text-muted-foreground">Private Equity</div>
            <div className="text-2xl font-bold text-muted-foreground">Global Firms</div>
            <div className="text-2xl font-bold text-muted-foreground">Elite Executives</div>
          </div>
        </div>
      </div>
    </section>
  );
};
