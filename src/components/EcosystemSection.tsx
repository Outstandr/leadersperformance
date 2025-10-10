import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useState, useEffect, useRef } from "react";

export const EcosystemSection = () => {
  const [isDark, setIsDark] = useState(true);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        const isInView = rect.top < 100 && rect.bottom > 100;
        setIsDark(!isInView);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
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
      className={`py-10 lg:py-16 transition-colors duration-700 ${
        isDark ? 'bg-background text-foreground' : 'bg-foreground/95 text-background'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 mb-4">
              
              <span className="text-lg font-medium uppercase text-white">Programs</span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold font-sans mb-4 text-lioner-gold">
              Your Path to Elite Leadership
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Choose your entry point into the Leaders Performance ecosystem
            </p>
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-white font-medium rounded-full px-6 py-3 h-auto mt-6 group">
              Get in touch
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
          
          {/* Steps - Alternating Layout */}
          <div className="space-y-24 mt-20">
            {steps.map((step, index) => <div key={index} className={`grid md:grid-cols-2 gap-12 items-center ${index % 2 === 1 ? 'md:flex-row-reverse' : ''}`}>
                {/* Image Side */}
                <div className={`${index % 2 === 1 ? 'md:order-2' : ''}`}>
                  <div className="relative">
                    <div className="aspect-[4/3] bg-muted rounded-3xl overflow-hidden">
                      {/* Placeholder for image */}
                    </div>
                  </div>
                </div>

                {/* Content Side */}
                <div className={`space-y-6 ${index % 2 === 1 ? 'md:order-1' : ''}`}>
                  <div className="flex items-center gap-4">
                    <div className="w-1 h-32 bg-border"></div>
                    <div>
                      <div className={`${step.color} text-white w-12 h-12 rounded-full flex items-center justify-center text-sm font-medium mb-4`}>
                        {step.number.padStart(2, '0')}
                      </div>
                      <h3 className="text-3xl font-normal text-foreground mb-4">{step.title}</h3>
                      <p className="text-base text-muted-foreground leading-relaxed mb-4">
                        {step.description}
                      </p>
                      <a href="#" className="inline-flex items-center text-sm text-foreground hover:text-primary transition-colors">
                        Discover More
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>)}
          </div>
        </div>
      </div>
    </section>;
};