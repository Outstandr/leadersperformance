import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";

export const FinalCTASection = () => {
  const benefits = [
    "Instant results",
    "Personalized roadmap",
    "Elite strategies",
    "100% complimentary"
  ];

  return (
    <section className="relative py-20 lg:py-32 bg-gradient-to-br from-lioner-blue to-secondary-blue overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center space-y-8 relative z-10">
          <h2 className="text-4xl lg:text-5xl font-bold text-lioner-gold">
            Your Leadership Excellence Journey Starts Now
          </h2>
          <p className="text-xl lg:text-2xl text-neutral-gray leading-relaxed">
            Don't let another quarter pass without unlocking your true leadership potential. 
            Join elite executives who've already discovered their High Performance profile.
          </p>
          
          <Button 
            size="lg" 
            className="bg-lioner-gold hover:bg-lioner-gold/90 text-white font-bold text-2xl px-16 py-10 h-auto"
          >
            Get Your Free Leadership Assessment
          </Button>
          
          <div className="flex flex-wrap justify-center gap-8 pt-6">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-center space-x-2">
                <Icon name="checkCircle" className="text-lioner-gold" />
                <span className="text-neutral-gray">{benefit}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-1/3 h-1/3 bg-lioner-gold/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-secondary-blue/10 rounded-full blur-3xl" />
      
      {/* Logo Placeholder - Bottom Right */}
      <div className="absolute bottom-8 right-8 z-20">
        <div className="w-20 h-20 bg-lioner-gold/20 rounded-lg flex items-center justify-center">
          <span className="text-white text-2xl font-bold">LE</span>
        </div>
      </div>
    </section>
  );
};
