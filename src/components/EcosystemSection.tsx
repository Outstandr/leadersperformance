import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useState, useEffect, useRef } from "react";

export const EcosystemSection = () => {
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
  const steps = [{
    number: "1",
    title: "RESET Book Series",
    description: "Foundation knowledge for High Performance leadership mastery",
    action: 'Start with "Reset by Discipline"',
    color: "bg-lioner-gold"
  }, {
    number: "2",
    title: "Elite Masterclass Series",
    description: "Deep-dive training for each pillar with practical implementation",
    action: "25-30 minute intensive sessions",
    color: "bg-secondary-blue"
  }, {
    number: "3",
    title: "Leaders Performance Academy",
    description: "Complete system with community and ongoing support",
    action: "Full transformation program",
    color: "bg-secondary-purple"
  }, {
    number: "4",
    title: "Leaders Performance Elite",
    description: "Private mentorship with Lionel for executive excellence",
    action: "Exclusive access • Limited availability",
    color: "bg-lioner-gold"
  }];
  return <section 
      ref={sectionRef}
      id="programs" 
      className={`py-10 lg:py-16 transition-colors duration-500 ${
        isDark ? 'bg-black' : 'bg-white'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 mb-2">
              <span className={`text-lg font-medium uppercase transition-colors duration-500 ${isDark ? 'text-white' : 'text-muted-foreground'}`}>Programs</span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-5xl font-semibold font-sans text-lioner-gold mb-4">
              Your Path to Elite Leadership
            </h2>
            <p className={`text-lg max-w-2xl mx-auto transition-colors duration-500 ${isDark ? 'text-white' : 'text-muted-foreground'}`}>
              Choose your entry point into the Leaders Performance ecosystem
            </p>
            <Button size="lg" className="bg-white text-[hsl(var(--lioner-gold))] hover:bg-[hsl(var(--lioner-gold))] hover:text-white hover:border-white font-medium rounded-none px-7 py-3.5 h-auto mt-6 group transition-all border-2 border-transparent">
              Get in touch
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
          
          {/* Steps - Four Columns */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
            {steps.map((step, index) => (
              <div key={index} className="space-y-4">
                {/* Number Badge */}
                <div className={`rounded-full w-12 h-12 flex items-center justify-center text-sm font-medium transition-colors duration-500 ${
                  isDark ? 'bg-lioner-gold text-black' : 'bg-white text-lioner-gold border-2 border-lioner-gold'
                }`}>
                  {step.number.padStart(2, '0')}
                </div>
                
                {/* Content */}
                <div className="space-y-3">
                  <h3 className={`text-xl font-semibold transition-colors duration-500 ${isDark ? 'text-white' : 'text-foreground'}`}>
                    {step.title}
                  </h3>
                  <p className={`text-sm leading-relaxed transition-colors duration-500 ${isDark ? 'text-white/80' : 'text-muted-foreground'}`}>
                    {step.description}
                  </p>
                  <p className={`text-xs font-medium transition-colors duration-500 ${isDark ? 'text-lioner-gold' : 'text-lioner-gold'}`}>
                    {step.action}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>;
};