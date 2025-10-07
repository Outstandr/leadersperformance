import { Icon } from "@/components/ui/icon";
import { Card, CardContent } from "@/components/ui/card";
import { Check } from "lucide-react";

export const ThreePillarsSection = () => {
  const pillars = [
    {
      icon: "brain",
      title: "Mental Mastery",
      color: "border-lioner-gold",
      iconBg: "bg-lioner-gold/10",
      iconColor: "text-lioner-gold",
      features: [
        "Cognitive Sovereignty",
        "Strategic Decision Making",
        "Mental Toughness Protocols",
        "Focus & Attention Mastery",
        "Outcome Independence",
        "Leadership Mindset Design"
      ]
    },
    {
      icon: "muscle",
      title: "Physical Excellence",
      color: "border-secondary-blue",
      iconBg: "bg-secondary-blue/10",
      iconColor: "text-secondary-blue",
      features: [
        "Executive Vitality Protocols",
        "Strategic Energy Management",
        "Performance Nutrition Systems",
        "Recovery & Optimization",
        "Stress Resilience Building",
        "Peak Physical Conditioning"
      ]
    },
    {
      icon: "star",
      title: "Strategic Alignment",
      color: "border-secondary-purple",
      iconBg: "bg-secondary-purple/10",
      iconColor: "text-secondary-purple",
      features: [
        "Purpose-Driven Leadership",
        "Values-Based Decision Making",
        "Legacy & Impact Planning",
        "Wealth & Success Integration",
        "Sustainable Performance",
        "Leadership by Design"
      ]
    }
  ];

  return (
    <section className="py-20 lg:py-32 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16 space-y-4">
            <span className="inline-block px-4 py-2 bg-lioner-gold/10 text-lioner-gold font-semibold rounded-full mb-4">
              Our Approach
            </span>
            <h2 className="text-4xl lg:text-6xl font-bold text-lioner-blue">
              Master the Three Pillars
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              True leadership excellence requires the integration of mind, body, and strategic alignment
            </p>
          </div>
          
          {/* Pillars Grid */}
          <div className="grid md:grid-cols-3 gap-8">
            {pillars.map((pillar, index) => (
              <Card key={index} className={`border-2 ${pillar.color} hover:shadow-lg transition-shadow`}>
                <CardContent className="p-8 space-y-6">
                  <div className={`${pillar.iconBg} w-16 h-16 rounded-2xl flex items-center justify-center`}>
                    <Icon name={pillar.icon} className={`w-8 h-8 ${pillar.iconColor}`} />
                  </div>
                  <h3 className="text-2xl font-bold text-lioner-blue">{pillar.title}</h3>
                  <ul className="space-y-3">
                    {pillar.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-muted-foreground shrink-0 mt-0.5" />
                        <span className="text-muted-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
