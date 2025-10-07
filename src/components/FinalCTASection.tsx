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
    <section className="relative py-16 lg:py-24 bg-gradient-to-br from-lioner-blue via-secondary-blue to-lioner-blue overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-6 md:space-y-8">
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
            Your Leadership Excellence Journey{" "}
            <span className="text-lioner-gold">Starts Now</span>
          </h2>
          <p className="text-base md:text-lg text-neutral-gray leading-relaxed">

            Don't let another quarter pass without unlocking your true leadership potential. 
            Join elite executives who've already discovered their High Performance profile.
          </p>
          
          <div>
            <Button 
              size="lg" 
              className="bg-lioner-gold hover:bg-lioner-gold/90 text-white font-bold text-base px-6 py-3.5 h-auto rounded-full shadow-2xl group"
            >
              Get Your Free Leadership Assessment
              <ArrowRight className="ml-1.5 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>

          <div className="flex flex-wrap justify-center gap-4 lg:gap-6 pt-4">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-center gap-2">
                <div className="rounded-full bg-lioner-gold/20 p-0.5">
                  <Check className="w-3.5 h-3.5 text-lioner-gold" />
                </div>
                <span className="text-sm text-neutral-gray font-medium">{benefit}</span>
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
