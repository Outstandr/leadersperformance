import { Icon } from "@/components/ui/icon";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export const ThreePillarsSection = () => {
  const pillars = [
    {
      icon: "brain",
      title: "Mental Mastery",
      color: "border-t-lioner-gold",
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
      color: "border-t-secondary-blue",
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
      color: "border-t-secondary-purple",
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
    <section className="py-20 lg:py-32 bg-gradient-to-br from-secondary-blue to-secondary-purple">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center space-y-4 mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-lioner-gold">
            Master the Three Pillars of High Performance
          </h2>
          <p className="text-xl text-neutral-gray">
            True leadership excellence requires the integration of mind, body, and strategic alignment:
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {pillars.map((pillar, index) => (
            <Card key={index} className={`border-t-4 ${pillar.color} bg-white`}>
              <CardHeader className="text-center">
                <div className="flex justify-center mb-4">
                  <Icon name={pillar.icon} className={`w-16 h-16 ${pillar.iconColor}`} />
                </div>
                <h3 className="text-2xl font-bold text-lioner-blue">{pillar.title}</h3>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {pillar.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start text-secondary-purple">
                      <span className="mr-2">•</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
