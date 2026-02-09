import { useState } from "react";
import { Quote, TrendingUp, Zap } from "lucide-react";

export const BusinessEvidenceSection = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const testimonials = [
    {
      quote: "We stopped babysitting. Revenue went up 40% in Q1 because I finally had time to be a CEO instead of a manager.",
      author: "James K.",
      role: "Logistics Founder, Dubai",
      icon: TrendingUp,
      stat: "+40%",
      statLabel: "Revenue Growth",
    },
    {
      quote: "Lionel didn't motivate my team. He scared them straight. Best investment we made.",
      author: "Sarah T.",
      role: "Real Estate Director",
      icon: Zap,
      stat: "30 Days",
      statLabel: "To Full Reset",
    },
  ];

  return (
    <section className="py-16 lg:py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="text-center mb-16">
          <span className="inline-block text-sm font-semibold uppercase text-lioner-gold tracking-[0.2em] mb-4 px-4 py-1.5 border border-lioner-gold/30">
            The Evidence
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold font-sans mt-4 mb-4 text-foreground uppercase">
            Results or <span className="text-lioner-gold">Nothing.</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              className={`relative p-8 transition-all duration-500 cursor-default overflow-hidden
                ${hoveredIndex === index
                  ? "bg-[hsl(var(--lioner-charcoal))] -translate-y-2 shadow-[0_25px_50px_-15px_rgba(0,0,0,0.3)]"
                  : "bg-muted/50 border border-border hover:border-lioner-gold/20"
                }`}
            >
              {/* Stat badge */}
              <div className={`inline-flex items-center gap-2 mb-6 px-4 py-2 transition-all duration-500
                ${hoveredIndex === index
                  ? "bg-lioner-gold/20 text-lioner-gold"
                  : "bg-lioner-gold/10 text-lioner-gold/70"
                }`}>
                <testimonial.icon className="w-4 h-4" />
                <span className="text-2xl font-black">{testimonial.stat}</span>
                <span className="text-xs uppercase tracking-wider font-medium opacity-70">{testimonial.statLabel}</span>
              </div>

              <Quote className={`w-8 h-8 mb-4 transition-all duration-300
                ${hoveredIndex === index ? "text-lioner-gold" : "text-lioner-gold/30"}`} />

              <p className={`text-lg mb-6 leading-relaxed italic transition-colors duration-500
                ${hoveredIndex === index ? "text-white" : "text-foreground"}`}>
                "{testimonial.quote}"
              </p>

              <div className={`flex items-center gap-3 pt-4 transition-colors duration-500
                ${hoveredIndex === index ? "border-t border-white/10" : "border-t border-border"}`}>
                <div className={`w-10 h-10 flex items-center justify-center text-sm font-bold uppercase transition-all duration-500
                  ${hoveredIndex === index
                    ? "bg-lioner-gold text-white"
                    : "bg-muted text-muted-foreground"
                  }`}>
                  {testimonial.author[0]}
                </div>
                <div>
                  <div className={`font-semibold transition-colors duration-500
                    ${hoveredIndex === index ? "text-white" : "text-foreground"}`}>
                    {testimonial.author}
                  </div>
                  <div className={`text-sm transition-colors duration-500
                    ${hoveredIndex === index ? "text-white/50" : "text-muted-foreground"}`}>
                    {testimonial.role}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
