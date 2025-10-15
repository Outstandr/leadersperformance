import { Button } from "@/components/ui/button";
import { Target, BarChart3, Rocket, ArrowRight } from "lucide-react";

export const AssessmentCTASection = () => {

  const benefits = [
    { icon: Target, text: "Identify your leadership strengths & growth areas" },
    { icon: BarChart3, text: "Get your personalized RESET Blueprint report" },
    { icon: Rocket, text: "Receive elite strategies for your profile" }
  ];

  return (
    <section id="assessment" className="py-10 lg:py-16 bg-gradient-to-b from-muted/60 to-muted/80">
      <div className="container mx-auto px-4 max-w-7xl">
          {/* Header */}
          <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 mb-4">
                <span className="text-lg font-medium uppercase text-muted-foreground">Take The First Step</span>
              </div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold font-sans mb-4 text-lioner-gold">
                Discover Your Leadership Blueprint
              </h2>
              <p className="text-lg max-w-2xl mx-auto text-muted-foreground">
                Take our comprehensive RESET assessment and receive a personalized roadmap to elite performance
              </p>
            </div>

            {/* Benefits Grid */}
            <div className="grid md:grid-cols-3 gap-6 mb-10">
              {benefits.map((benefit, index) => (
                <div 
                  key={index}
                  className="flex flex-col items-center text-center p-6 bg-white rounded-lg border border-lioner-gold/20 hover:border-lioner-gold/40 transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="bg-white w-14 h-14 rounded-full flex items-center justify-center mb-4 border-2 border-lioner-gold">
                    <benefit.icon className="w-7 h-7 text-lioner-gold" />
                  </div>
                  <p className="text-lioner-gold leading-relaxed">
                    {benefit.text}
                  </p>
                </div>
              ))}
            </div>

            {/* CTA Button */}
            <div className="text-center">
              <Button 
                size="lg"
                className="bg-white text-lioner-gold hover:bg-lioner-gold hover:text-white hover:border-white font-medium rounded-none px-7 py-3.5 h-auto group text-sm transition-all border-2 border-transparent"
              >
                Take The Assessment
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <p className="text-sm mt-4 text-muted-foreground">
                Complete in 10 minutes • Free personalized report
              </p>
          </div>
      </div>
    </section>
  );
};
