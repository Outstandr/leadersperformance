import { Button } from "@/components/ui/button";
import { ArrowRight, Star } from "lucide-react";
import heroImage from "@/assets/lionel-hero.jpg";

export const HeroSection = () => {
  return (
    <section id="hero" className="pt-32 pb-20 bg-background">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="bg-primary rounded-3xl overflow-hidden p-8 md:p-12 lg:p-16">
          <div className="grid md:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Content */}
            <div className="space-y-6 text-white">
              {/* Rating */}
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="w-4 h-4 fill-white text-white" />
                ))}
                <span className="ml-2 text-sm">Rated 4.9/5</span>
              </div>

              {/* Headline */}
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-normal leading-tight">
                Leadership excellence that drives real results
              </h1>

              {/* Description */}
              <p className="text-lg text-white/80 leading-relaxed">
                Transform your leadership through the RESET Blueprint®—expert insights, 
                tailored strategies, and unwavering support designed for peak performance.
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button 
                  size="lg" 
                  className="bg-white text-primary hover:bg-white/90 font-medium rounded-full px-6 py-3 h-auto group"
                >
                  Get in touch
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button 
                  size="lg" 
                  variant="outline"
                  className="border-2 border-white/30 bg-transparent text-white hover:bg-white hover:text-primary font-medium rounded-full px-6 py-3 h-auto"
                >
                  What we do
                </Button>
              </div>
            </div>

            {/* Image */}
            <div className="relative md:order-2">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl aspect-[4/5] max-w-sm mx-auto">
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
          <p className="text-sm text-muted-foreground mb-8">We've partnered with:</p>
          <div className="flex flex-wrap justify-center items-center gap-8 lg:gap-16 opacity-40">
            <div className="text-base font-semibold text-foreground">Fortune 500</div>
            <div className="text-base font-semibold text-foreground">Private Equity</div>
            <div className="text-base font-semibold text-foreground">Global Firms</div>
            <div className="text-base font-semibold text-foreground">Elite Executives</div>
          </div>
        </div>
      </div>
    </section>
  );
};
