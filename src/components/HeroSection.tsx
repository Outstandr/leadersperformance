import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import heroImage from "@/assets/lionel-hero.jpg";

export const HeroSection = () => {
  return (
    <section className="relative min-h-screen bg-gradient-to-br from-lioner-blue to-secondary-blue overflow-hidden flex items-center">
      <div className="container mx-auto px-4 py-20">
        <div className="grid lg:grid-cols-[1.3fr,0.7fr] gap-20 items-center max-w-7xl mx-auto">
          {/* Content */}
          <div className="space-y-10 z-10">
            <h1 className="text-6xl lg:text-8xl xl:text-9xl font-bold leading-[1.05] tracking-tight">
              <span className="text-lioner-gold block mb-2">Redefine Your</span>
              <span className="text-white block mb-2">Leadership</span>
              <span className="text-white block">Potential</span>
            </h1>
            
            <h2 className="text-2xl lg:text-3xl font-medium text-neutral-gray leading-relaxed max-w-2xl">
              Through High Performance Mastery
            </h2>
            
            <p className="text-lg lg:text-xl text-neutral-gray/90 leading-relaxed max-w-2xl">
              Discover your unique Discipline Type and unlock the RESET Blueprint® 
              that aligns mind, body, and wealth for sustainable leadership excellence
            </p>
            
            <div className="space-y-6 pt-6">
              <Button 
                size="lg" 
                className="bg-lioner-gold hover:bg-lioner-gold/90 text-white font-semibold text-xl px-12 py-8 h-auto shadow-2xl hover:shadow-lioner-gold/20 transition-all duration-300 group"
              >
                <span>Take Your Free Leadership Assessment</span>
                <ChevronRight className="ml-2 h-6 w-6 group-hover:translate-x-1 transition-transform" />
              </Button>
              <p className="text-base text-neutral-gray/80">
                • 2 minutes • Instant results • Personalized roadmap
              </p>
            </div>
            
            <p className="text-neutral-gray/80 pt-8 text-lg border-t border-white/10">
              Join elite executives who've transformed their leadership through High Performance
            </p>
          </div>

          {/* Hero Image */}
          <div className="flex justify-center lg:justify-end">
            <div className="relative">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl max-w-md lg:max-w-sm">
                <img 
                  src={heroImage} 
                  alt="Lionel Eersteling - High Performance Leadership Coach" 
                  className="w-full h-auto object-cover"
                />
              </div>
              <div className="absolute -bottom-8 -right-8 w-48 h-48 bg-lioner-gold/20 rounded-full blur-3xl" />
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-lioner-gold/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary-purple/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
    </section>
  );
};
