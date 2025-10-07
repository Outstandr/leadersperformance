import { Button } from "@/components/ui/button";
import { Target, BarChart3, Rocket, ArrowRight } from "lucide-react";

export const AssessmentCTASection = () => {
  const benefits = [
    { icon: Target, text: "Identify your leadership strengths & growth areas" },
    { icon: BarChart3, text: "Get your personalized RESET Blueprint report" },
    { icon: Rocket, text: "Receive elite strategies for your profile" }
  ];

  return (
    <section id="assessment" className="py-20 lg:py-32 bg-lioner-blue">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-6 md:p-12 lg:p-16 border border-white/10">
            <div className="text-center space-y-6 md:space-y-8">
              <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white">
                Discover Your Leadership Profile
              </h2>
              <p className="text-lg md:text-xl text-neutral-gray leading-relaxed max-w-3xl mx-auto">
                Take our scientifically-backed assessment to identify your unique leadership profile 
                and receive a personalized roadmap to High Performance excellence.
              </p>
              
              <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 py-6 md:py-8">

                {benefits.map((benefit, index) => {
                  const IconComponent = benefit.icon;
                  return (
                    <div key={index} className="flex flex-col items-center gap-3 text-center">
                      <div className="w-12 h-12 rounded-full bg-lioner-gold/10 flex items-center justify-center">
                        <IconComponent className="w-6 h-6 text-lioner-gold" />
                      </div>
                      <span className="text-neutral-gray">{benefit.text}</span>
                    </div>
                  );
                })}
              </div>
              
              <Button 
                size="lg" 
                className="bg-lioner-gold hover:bg-lioner-gold/90 text-white font-bold text-lg px-10 py-6 h-auto rounded-full group"
              >
                Start Your Free Assessment
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>

              <p className="text-sm text-neutral-gray/70">
                Takes 2 minutes • Instant results • 100% secure and confidential
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
