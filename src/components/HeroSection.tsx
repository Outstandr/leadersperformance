import { Button } from "@/components/ui/button";
import { ArrowRight, Star } from "lucide-react";
import heroImage from "@/assets/lionel-hero-new.jpg";

export const HeroSection = () => {
  return (
    <section id="hero" className="pt-32 pb-20 bg-background">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="bg-primary overflow-hidden p-8 md:p-12 lg:p-16">
          <div className="grid md:grid-cols-[1fr_40%] gap-8 lg:gap-12 items-stretch">
            {/* Content */}
            <div className="space-y-6 text-white flex flex-col justify-center">
              {/* Rating */}
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="w-4 h-4 fill-white text-white" />
                ))}
                <span className="ml-2 text-sm">Rated 4.9/5</span>
              </div>

              {/* Headline */}
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-normal leading-tight">
                Redefine Your Leadership Potential Through High Performance Mastery
              </h1>

              {/* Description */}
              <p className="text-lg text-white/80 leading-relaxed">
                Discover your unique Discipline Type and unlock the RESET Blueprint® that aligns mind, body, and wealth for sustainable leadership excellence
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button 
                  size="lg" 
                  className="bg-white text-primary hover:bg-white/90 font-medium rounded-full px-8 py-4 h-auto group text-base"
                >
                  Take Your Free Leadership Assessment
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
              <p className="text-sm text-white/60 pt-2">
                2 minutes • Instant results • Personalized roadmap
              </p>
            </div>

            {/* Image */}
            <div className="relative md:order-2 h-full min-h-[500px] md:min-h-full">
              <div className="relative overflow-hidden shadow-2xl h-full">
                <img 
                  src={heroImage} 
                  alt="Lionel Eersteling - High Performance Leadership Coach" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Social Proof */}
        <div className="text-center mt-16">
          <p className="text-sm text-muted-foreground mb-4">
            Join elite executives who've transformed their leadership through High Performance
          </p>
        </div>
      </div>
    </section>
  );
};
