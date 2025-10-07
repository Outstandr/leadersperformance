import { Button } from "@/components/ui/button";
import { Check, ArrowRight } from "lucide-react";

export const FinalCTASection = () => {
  const benefits = [
    "Instant results",
    "Personalized roadmap",
    "Elite strategies",
    "100% complimentary"
  ];

  return (
    <section className="relative py-20 lg:py-32 bg-gradient-to-br from-lioner-blue via-secondary-blue to-lioner-blue overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-8 md:space-y-10">
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight">
            Your Leadership Excellence Journey{" "}
            <span className="text-lioner-gold">Starts Now</span>
          </h2>
          <p className="text-lg md:text-xl lg:text-2xl text-neutral-gray leading-relaxed">

            Don't let another quarter pass without unlocking your true leadership potential. 
            Join elite executives who've already discovered their High Performance profile.
          </p>
          
          <div>
            <Button 
              size="lg" 
              className="bg-lioner-gold hover:bg-lioner-gold/90 text-white font-bold text-lg px-10 py-6 h-auto rounded-full shadow-2xl group"
            >
              Get Your Free Leadership Assessment
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>

          <div className="flex flex-wrap justify-center gap-6 lg:gap-8 pt-6">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-center gap-2">
                <div className="rounded-full bg-lioner-gold/20 p-1">
                  <Check className="w-4 h-4 text-lioner-gold" />
                </div>
                <span className="text-neutral-gray font-medium">{benefit}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-lioner-gold/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary-purple/10 rounded-full blur-3xl" />
    </section>
  );
};
