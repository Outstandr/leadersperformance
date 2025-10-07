import { Icon } from "@/components/ui/icon";
import { Card, CardContent } from "@/components/ui/card";
import { Check } from "lucide-react";
export const ThreePillarsSection = () => {
  const pillars = [{
    icon: "brain",
    title: "Mental Mastery",
    color: "border-lioner-gold",
    iconBg: "bg-lioner-gold/10",
    iconColor: "text-lioner-gold",
    features: ["Cognitive Sovereignty", "Strategic Decision Making", "Mental Toughness Protocols", "Focus & Attention Mastery", "Outcome Independence", "Leadership Mindset Design"]
  }, {
    icon: "muscle",
    title: "Physical Excellence",
    color: "border-secondary-blue",
    iconBg: "bg-secondary-blue/10",
    iconColor: "text-secondary-blue",
    features: ["Executive Vitality Protocols", "Strategic Energy Management", "Performance Nutrition Systems", "Recovery & Optimization", "Stress Resilience Building", "Peak Physical Conditioning"]
  }, {
    icon: "star",
    title: "Strategic Alignment",
    color: "border-secondary-purple",
    iconBg: "bg-secondary-purple/10",
    iconColor: "text-secondary-purple",
    features: ["Purpose-Driven Leadership", "Values-Based Decision Making", "Legacy & Impact Planning", "Wealth & Success Integration", "Sustainable Performance", "Leadership by Design"]
  }];
  return <section id="pillars" className="py-20 pb-32 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          {/* Pillars Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
            {pillars.map((pillar, index) => (
              <div key={index} className="text-center space-y-6">
                <div className={`${pillar.iconBg} w-16 h-16 mx-auto rounded-2xl flex items-center justify-center`}>
                  <Icon name={pillar.icon} className={`w-8 h-8 ${pillar.iconColor}`} />
                </div>
                <h3 className="text-2xl font-normal text-foreground">{pillar.title}</h3>
                <p className="text-base text-muted-foreground leading-relaxed max-w-xs mx-auto">
                  {pillar.features[0]}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>;
};