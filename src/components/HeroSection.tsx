import { Button } from "@/components/ui/button";
import heroImage from "@/assets/lionel-hero.jpg";

export const HeroSection = () => {
  return (
    <section className="relative min-h-screen bg-gradient-to-br from-lioner-blue to-secondary-blue overflow-hidden">
      <div className="container mx-auto px-4 py-20 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8 z-10">
            <h1 className="text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight">
              <span className="text-lioner-gold">Redefine Your Leadership Potential</span>
              <br />
              <span className="text-white">Through High Performance Mastery</span>
            </h1>
            
            <h2 className="text-xl lg:text-2xl font-medium text-neutral-gray leading-relaxed">
              Discover your unique Discipline Type and unlock the RESET Blueprint® 
              that aligns mind, body, and wealth for sustainable leadership excellence
            </h2>
            
            <div className="space-y-4">
              <Button 
                size="lg" 
                className="bg-lioner-gold hover:bg-lioner-gold/90 text-white font-semibold text-lg px-8 py-6 h-auto"
              >
                <div className="flex flex-col items-start">
                  <span>Take Your Free Leadership Assessment</span>
                  <span className="text-sm font-normal opacity-90">• 2 minutes • Instant results • Personalized roadmap</span>
                </div>
              </Button>
            </div>
            
            <p className="text-neutral-gray">
              Join elite executives who've transformed their leadership through High Performance
            </p>
          </div>

          {/* Hero Image */}
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img 
                src={heroImage} 
                alt="Lionel Eersteling - High Performance Leadership Coach" 
                className="w-full h-auto object-cover"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-lioner-gold/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-secondary-blue/10 rounded-full blur-3xl" />
    </section>
  );
};
