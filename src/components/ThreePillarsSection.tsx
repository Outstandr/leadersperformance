import { useState, useEffect, useRef } from "react";
import { Icon } from "@/components/ui/icon";
import { Check } from "lucide-react";

export const ThreePillarsSection = () => {
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
  
  const pillars = [{
    icon: "brain",
    title: "Mental Mastery",
    gradient: "from-lioner-blue/20 to-lioner-blue/5",
    iconBg: "bg-lioner-gold",
    borderColor: "border-lioner-gold/50",
    features: ["Cognitive Sovereignty", "Strategic Decision Making", "Mental Toughness Protocols", "Focus & Attention Mastery", "Outcome Independence", "Leadership Mindset Design"]
  }, {
    icon: "muscle",
    title: "Physical Excellence",
    gradient: "from-lioner-blue/20 to-lioner-blue/5",
    iconBg: "bg-lioner-gold",
    borderColor: "border-lioner-gold/50",
    features: ["Executive Vitality Protocols", "Strategic Energy Management", "Performance Nutrition Systems", "Recovery & Optimization", "Stress Resilience Building", "Peak Physical Conditioning"]
  }, {
    icon: "star",
    title: "Strategic Alignment",
    gradient: "from-lioner-blue/20 to-lioner-blue/5",
    iconBg: "bg-lioner-gold",
    borderColor: "border-lioner-gold/50",
    features: ["Purpose-Driven Leadership", "Values-Based Decision Making", "Legacy & Impact Planning", "Wealth & Success Integration", "Sustainable Performance", "Leadership by Design"]
  }];

  return (
    <section ref={sectionRef} id="pillars" className={`py-10 lg:py-16 transition-colors duration-500 ${isDark ? 'bg-black' : 'bg-white'}`}>
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 mb-2">
              <span className="text-lg text-[#404473] font-medium uppercase">The Framework</span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-5xl font-semibold font-sans text-lioner-gold max-w-4xl mx-auto leading-tight">
              The Three Pillars of Elite Leadership
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto mt-6">
              A holistic system designed to elevate every dimension of your leadership and life
            </p>
          </div>

          {/* Pillars Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {pillars.map((pillar, index) => (
              <div 
                key={index} 
                className={`group relative bg-gradient-to-br ${pillar.gradient} border-2 ${pillar.borderColor} p-8 transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 hover:border-opacity-60`}
              >
                {/* Title */}
                <h3 className="text-2xl font-semibold text-foreground mb-6 font-sans">
                  {pillar.title}
                </h3>

                {/* Features List */}
                <div className="space-y-3">
                  {pillar.features.map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <div className={`${pillar.iconBg} rounded-full p-1 shrink-0 mt-0.5`}>
                        <Check className="w-3 h-3 text-white" />
                      </div>
                      <p className="text-sm text-foreground/80 leading-relaxed">
                        {feature}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Decorative corner accent */}
                <div className={`absolute top-0 right-0 w-20 h-20 bg-gradient-to-br ${pillar.gradient} opacity-50 blur-2xl -z-10 transition-opacity duration-300 group-hover:opacity-100`} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};