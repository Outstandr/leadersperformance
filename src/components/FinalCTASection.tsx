import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, TrendingUp, Users, Award, Target, Briefcase, BarChart } from "lucide-react";
export const FinalCTASection = () => {
  const [isDark, setIsDark] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  useEffect(() => {
    const handleScroll = () => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        setIsDark(rect.top <= 100);
      }
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  const stats = [{
    icon: TrendingUp,
    value: "$7M+",
    label: "Revenue Generated",
    description: "For our clients"
  }, {
    icon: BarChart,
    value: "72%",
    label: "Average Growth",
    description: "Year over year"
  }, {
    icon: Award,
    value: "65%",
    label: "Skill Improvement",
    description: "In 90 days"
  }, {
    icon: Target,
    value: "78%",
    label: "Market Impact",
    description: "Measured results"
  }, {
    icon: Users,
    value: "1%",
    label: "Elite Network",
    description: "Top performers"
  }, {
    icon: Briefcase,
    value: "10+",
    label: "Expert Consultants",
    description: "On your team"
  }];
  return <section ref={sectionRef} className={`py-10 lg:py-16 transition-colors duration-500 relative overflow-hidden ${isDark ? 'bg-black' : 'bg-white'}`}>
      {/* Background decoration */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5" />
      
      <div className="container mx-auto px-4 relative">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 mb-2">
              <span className={`text-lg font-medium uppercase transition-colors duration-500 ${isDark ? 'text-white' : 'text-muted-foreground'}`}>Proven Track Record</span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-5xl font-semibold font-sans text-lioner-gold mb-4">
              Your Leadership Excellence<br />Journey Starts Now
            </h2>
            <p className={`text-lg max-w-2xl mx-auto transition-colors duration-500 ${isDark ? 'text-white' : 'text-muted-foreground'}`}>
              Don't let another quarter pass without unlocking your true leadership potential
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {stats.map((stat, index) => {
            const Icon = stat.icon;
            return <div key={index} className={`group relative border-2 p-8 transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 ${isDark ? 'bg-black border-lioner-gold' : 'bg-gradient-to-br from-lioner-blue/20 to-lioner-blue/5 border-lioner-gold/50'}`}>
                  <div className="flex items-start gap-4">
                    <div className={`p-2.5 transition-all duration-500 ${isDark ? 'bg-lioner-gold' : 'bg-lioner-gold'}`}>
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className={`text-3xl font-bold mb-1 transition-colors duration-500 ${isDark ? 'text-white' : 'text-foreground'}`}>
                        {stat.value}
                      </div>
                      <div className={`text-base font-semibold mb-1 transition-colors duration-500 ${isDark ? 'text-white' : 'text-foreground'}`}>
                        {stat.label}
                      </div>
                      <div className={`text-sm transition-colors duration-500 ${isDark ? 'text-white/80' : 'text-foreground/80'}`}>
                        {stat.description}
                      </div>
                    </div>
                  </div>
                  {/* Decorative corner accent */}
                  <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-lioner-blue/20 to-lioner-blue/5 opacity-50 blur-2xl -z-10 transition-opacity duration-300 group-hover:opacity-100" />
                </div>;
          })}
          </div>

          {/* CTA */}
          <div className={`text-center p-12 transition-all duration-500 ${isDark ? 'bg-black border-4 border-[hsl(var(--lioner-gold))]' : 'bg-[hsl(var(--lioner-gold))]'}`}>
            <h3 className="text-3xl md:text-4xl font-semibold font-sans text-white mb-4">
              Get Your Free Leadership Assessment
            </h3>
            <p className="text-white text-lg mb-2 max-w-2xl mx-auto">
              Join elite executives who've already discovered their High Performance profile
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-white text-sm mb-8">
              <span>✓ Instant results</span>
              <span>✓ Personalized roadmap</span>
              <span>✓ Elite strategies</span>
              <span>✓ 100% complimentary</span>
            </div>
            <Button size="lg" className="bg-white text-[hsl(var(--lioner-gold))] hover:bg-[hsl(var(--lioner-gold))] hover:text-white hover:border-white font-medium rounded-none px-10 py-3.5 h-auto group transition-all border-2 border-transparent">
              <span className="flex items-center gap-2">
                Take Assessment Now
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
            </Button>
            <div className="mt-4">
              
            </div>
          </div>
        </div>
      </div>
    </section>;
};