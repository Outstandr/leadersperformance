import { Button } from "@/components/ui/button";
import { ArrowRight, TrendingUp, Users, Award, Target, Briefcase, BarChart } from "lucide-react";

export const FinalCTASection = () => {
  const stats = [
    { icon: TrendingUp, value: "$7M+", label: "Revenue Generated", description: "For our clients" },
    { icon: BarChart, value: "72%", label: "Average Growth", description: "Year over year" },
    { icon: Award, value: "65%", label: "Skill Improvement", description: "In 90 days" },
    { icon: Target, value: "78%", label: "Market Impact", description: "Measured results" },
    { icon: Users, value: "1%", label: "Elite Network", description: "Top performers" },
    { icon: Briefcase, value: "10+", label: "Expert Consultants", description: "On your team" }
  ];

  return (
    <section className="py-10 lg:py-16 bg-gradient-to-br from-foreground/5 via-foreground/10 to-foreground/5 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5" />
      
      <div className="container mx-auto px-4 relative">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center space-y-6 mb-20">
            <div className="inline-block px-6 py-2 bg-primary/10 rounded-full mb-4">
              <span className="text-primary font-semibold text-sm uppercase tracking-wider">
                Proven Track Record
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-normal text-foreground leading-tight max-w-4xl mx-auto">
              Your Leadership Excellence Journey Starts Now
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Don't let another quarter pass without unlocking your true leadership potential
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div 
                  key={index}
                  className="group relative bg-card border border-border rounded-2xl p-8 hover:shadow-xl hover:border-primary/50 transition-all duration-300"
                >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-full -z-10 group-hover:bg-primary/10 transition-colors" />
                  
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-primary/10 rounded-xl group-hover:bg-primary group-hover:scale-110 transition-all duration-300">
                      <Icon className="w-6 h-6 text-primary group-hover:text-primary-foreground" />
                    </div>
                    <div className="flex-1">
                      <div className="text-4xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                        {stat.value}
                      </div>
                      <div className="text-lg font-semibold text-foreground mb-1">
                        {stat.label}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {stat.description}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* CTA */}
          <div className="text-center bg-gradient-to-r from-primary via-primary to-accent/80 rounded-3xl p-12 shadow-2xl">
            <h3 className="text-3xl md:text-4xl font-semibold text-primary-foreground mb-4">
              Get Your Free Leadership Assessment
            </h3>
            <p className="text-primary-foreground/90 text-lg mb-2 max-w-2xl mx-auto">
              Join elite executives who've already discovered their High Performance profile
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-primary-foreground/80 text-sm mb-8">
              <span>✓ Instant results</span>
              <span>✓ Personalized roadmap</span>
              <span>✓ Elite strategies</span>
              <span>✓ 100% complimentary</span>
            </div>
            <Button 
              size="lg"
              className="bg-background text-primary hover:bg-background/90 text-lg px-8 py-6 h-auto group"
            >
              Start Your Assessment Now
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
