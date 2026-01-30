import { TrendingUp, Users, Award, Target } from "lucide-react";

export const BusinessResultsSection = () => {
  const results = [
    {
      metric: "85%",
      label: "Performance Improvement",
      description: "Average increase in leadership effectiveness scores",
      icon: TrendingUp
    },
    {
      metric: "40%",
      label: "Higher Retention",
      description: "Reduction in leadership turnover for our clients",
      icon: Users
    },
    {
      metric: "3x",
      label: "ROI",
      description: "Average return on coaching investment within 12 months",
      icon: Award
    },
    {
      metric: "92%",
      label: "Goal Achievement",
      description: "Of participants achieve their primary objectives",
      icon: Target
    }
  ];

  const testimonials = [
    {
      quote: "The transformation in our leadership team has been remarkable. We've seen measurable improvements in engagement and productivity across all departments.",
      author: "Sarah Chen",
      role: "CEO, TechVentures Inc."
    },
    {
      quote: "Lionel's approach goes beyond typical leadership training. The RESET methodology helped us build a performance culture that scales.",
      author: "Michael Roberts",
      role: "CHRO, Global Manufacturing Co."
    }
  ];

  return (
    <section id="results" className="py-8 lg:py-12 bg-white">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="text-sm font-medium uppercase text-muted-foreground tracking-wider">Proven Results</span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold font-sans mt-4 mb-4 text-lioner-gold">
            Measurable Impact for Your Business
          </h2>
          <p className="text-lg max-w-2xl mx-auto text-muted-foreground">
            Our clients don't just feel different—they see tangible results that impact the bottom line.
          </p>
        </div>

        {/* Metrics Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {results.map((result, index) => (
            <div 
              key={index} 
              className="p-6 bg-[hsl(var(--lioner-gold))] text-white text-center"
            >
              <result.icon className="w-8 h-8 mx-auto mb-4 opacity-80" />
              <div className="text-4xl font-bold mb-2">{result.metric}</div>
              <div className="font-semibold mb-1">{result.label}</div>
              <p className="text-sm text-white/80">{result.description}</p>
            </div>
          ))}
        </div>

        {/* Testimonials */}
        <div className="grid md:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index} 
              className="p-8 bg-muted/50 border border-lioner-gold/20"
            >
              <div className="text-4xl text-lioner-gold mb-4">"</div>
              <p className="text-lg text-foreground mb-6 leading-relaxed italic">
                {testimonial.quote}
              </p>
              <div>
                <div className="font-semibold text-foreground">{testimonial.author}</div>
                <div className="text-sm text-muted-foreground">{testimonial.role}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
