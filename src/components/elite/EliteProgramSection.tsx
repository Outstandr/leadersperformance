import { Heart, Sparkles, Crown, Briefcase } from "lucide-react";

export const EliteProgramSection = () => {
  const pillars = [
    {
      icon: Heart,
      title: "Vitality",
      description: "Optimize your health, energy, and physical well-being to perform at your peak every day."
    },
    {
      icon: Sparkles,
      title: "Personal Development",
      description: "Unlock your potential through continuous growth, self-awareness, and mindset mastery."
    },
    {
      icon: Crown,
      title: "Personal Leadership",
      description: "Lead yourself with discipline, clarity, and purpose before leading others."
    },
    {
      icon: Briefcase,
      title: "Business",
      description: "Build and scale your business with strategic thinking, execution, and sustainable success."
    }
  ];

  return (
    <section id="program" className="py-8 lg:py-12 bg-white">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-center mb-12">
          <span className="text-sm font-medium uppercase tracking-wider text-lioner-gold">The Program</span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold font-sans mt-4 mb-6">
            Four Pillars of Personal Transformation
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Our elite coaching program addresses every dimension of your life, creating lasting change through a proven, holistic approach.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {pillars.map((pillar, index) => (
            <div 
              key={index} 
              className="group p-8 border border-border hover:border-lioner-gold/50 transition-all duration-300 hover:shadow-lg"
            >
              <div className="bg-lioner-gold/10 w-14 h-14 rounded-lg flex items-center justify-center mb-6 group-hover:bg-lioner-gold/20 transition-colors">
                <pillar.icon className="w-7 h-7 text-lioner-gold" />
              </div>
              <h3 className="text-xl font-semibold mb-3">{pillar.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{pillar.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
