import { Users, Target, BarChart3, Briefcase, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export const BusinessServicesSection = () => {
  const services = [
    {
      icon: Users,
      title: "Leadership Coaching",
      description: "One-on-one and group coaching for executives and senior leaders to maximize their potential and drive organizational success.",
      features: ["Executive 1:1 Coaching", "C-Suite Development", "Leadership Assessments"]
    },
    {
      icon: Target,
      title: "Team Performance",
      description: "Transform team dynamics and unlock collective potential with our proven high-performance methodology.",
      features: ["Team Alignment Workshops", "Performance Optimization", "Culture Transformation"]
    },
    {
      icon: BarChart3,
      title: "Strategic Planning",
      description: "Align your leadership vision with actionable strategies that deliver measurable business outcomes.",
      features: ["Vision & Mission Alignment", "OKR Implementation", "Quarterly Planning Sessions"]
    },
    {
      icon: Briefcase,
      title: "Corporate Training",
      description: "Scalable training programs designed to elevate leadership capabilities across your organization.",
      features: ["Custom Workshops", "Train-the-Trainer", "Ongoing Development"]
    }
  ];

  const scrollToBooking = () => {
    const element = document.querySelector("#book-call");
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section id="services" className="py-8 lg:py-12 bg-white">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="text-sm font-medium uppercase text-muted-foreground tracking-wider">Our Services</span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold font-sans mt-4 mb-4 text-lioner-gold">
            Tailored Solutions for Your Organization
          </h2>
          <p className="text-lg max-w-2xl mx-auto text-muted-foreground">
            Whether you're developing individual leaders or transforming your entire organization, we have the expertise to drive results.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {services.map((service, index) => (
            <div 
              key={index} 
              className="p-8 bg-white border border-lioner-gold/20 hover:border-lioner-gold/40 transition-all duration-300 hover:-translate-y-1 group"
            >
              <div className="bg-lioner-gold/10 w-14 h-14 rounded-full flex items-center justify-center mb-6 group-hover:bg-lioner-gold/20 transition-colors">
                <service.icon className="w-7 h-7 text-lioner-gold" />
              </div>
              <h3 className="text-2xl font-semibold mb-3 text-foreground">{service.title}</h3>
              <p className="text-muted-foreground mb-4 leading-relaxed">{service.description}</p>
              <ul className="space-y-2">
                {service.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <div className="w-1.5 h-1.5 rounded-full bg-lioner-gold"></div>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <Button 
            size="lg" 
            onClick={scrollToBooking}
            className="bg-lioner-gold hover:bg-lioner-gold/90 text-white rounded-none px-8 py-4 h-auto group"
          >
            Discuss Your Needs
            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </div>
    </section>
  );
};
