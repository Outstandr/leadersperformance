import { Shield, Award, Clock, CheckCircle2 } from "lucide-react";

export const BusinessWhyUsSection = () => {
  const differentiators = [
    {
      icon: Shield,
      title: "Proven Methodology",
      description: "The RESET Blueprint® combines neuroscience, peak performance, and business strategy for lasting transformation."
    },
    {
      icon: Award,
      title: "Executive Experience",
      description: "Led by a 7-Figure Entrepreneur with decades of experience coaching Fortune 500 leaders and high-growth companies."
    },
    {
      icon: Clock,
      title: "Results-Focused",
      description: "We measure success by your outcomes—improved retention, higher engagement, and measurable performance gains."
    },
    {
      icon: CheckCircle2,
      title: "Customized Approach",
      description: "No cookie-cutter solutions. Every engagement is tailored to your organization's unique culture and challenges."
    }
  ];

  return (
    <section id="why-us" className="py-8 lg:py-12 bg-gradient-to-b from-muted/60 to-muted/80">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="text-sm font-medium uppercase text-muted-foreground tracking-wider">Why Choose Us</span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold font-sans mt-4 mb-4 text-lioner-gold">
            What Sets Us Apart
          </h2>
          <p className="text-lg max-w-2xl mx-auto text-muted-foreground">
            We don't just train leaders—we transform organizations from the inside out.
          </p>
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {differentiators.map((item, index) => (
            <div 
              key={index} 
              className="p-6 bg-white rounded-lg border border-lioner-gold/20 hover:border-lioner-gold/40 transition-all duration-300 hover:-translate-y-1 text-center"
            >
              <div className="bg-white w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-lioner-gold">
                <item.icon className="w-7 h-7 text-lioner-gold" />
              </div>
              <h3 className="text-lg font-semibold mb-2 text-foreground">{item.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
