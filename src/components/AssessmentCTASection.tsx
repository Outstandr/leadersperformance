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
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          {/* Main content card */}
          <div className="bg-gradient-to-br from-lioner-blue/10 to-lioner-blue/5 border-2 border-lioner-gold/50 p-8 lg:p-12">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 mb-4">
                <span className="text-lg text-[#404473] font-medium uppercase">Take The First Step</span>
              </div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold font-sans text-lioner-gold mb-4">
                Discover Your Leadership Blueprint
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Take our comprehensive RESET assessment and receive a personalized roadmap to elite performance
              </p>
            </div>

            {/* Benefits Grid */}
            <div className="grid md:grid-cols-3 gap-6 mb-10">
              {benefits.map((benefit, index) => (
                <div 
                  key={index}
                  className="flex flex-col items-center text-center p-6 bg-background/50 rounded-lg border border-lioner-gold/20 hover:border-lioner-gold/40 transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="bg-lioner-gold w-14 h-14 rounded-full flex items-center justify-center mb-4">
                    <benefit.icon className="w-7 h-7 text-white" />
                  </div>
                  <p className="text-foreground/80 leading-relaxed">
                    {benefit.text}
                  </p>
                </div>
              ))}
            </div>

            {/* CTA Button */}
            <div className="text-center">
              <Button 
                size="lg"
                className="bg-lioner-gold hover:bg-lioner-gold/90 text-white px-8 py-6 text-lg font-semibold group"
              >
                Take The Assessment
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <p className="text-sm text-muted-foreground mt-4">
                Complete in 10 minutes • Free personalized report
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
