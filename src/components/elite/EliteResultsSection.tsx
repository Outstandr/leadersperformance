import { Star, Quote } from "lucide-react";

export const EliteResultsSection = () => {
  const testimonials = [
    {
      name: "Michael R.",
      role: "Entrepreneur",
      quote: "This program changed everything. I went from burnout and confusion to clarity, energy, and purpose. My business grew 3x, but more importantly, I found myself again.",
      result: "3x Business Growth"
    },
    {
      name: "Sarah K.",
      role: "Executive",
      quote: "I was skeptical about coaching, but this was different. The depth of transformation I experienced in 12 weeks surpassed years of self-help books and seminars.",
      result: "Promoted to VP"
    },
    {
      name: "David L.",
      role: "Professional",
      quote: "The personalized approach made all the difference. Every session was tailored to exactly what I needed. I'm now performing at a level I never thought possible.",
      result: "Complete Life Redesign"
    }
  ];

  return (
    <section id="results" className="py-8 lg:py-12 bg-white">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-center mb-12">
          <span className="text-sm font-medium uppercase tracking-wider text-lioner-gold">Success Stories</span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold font-sans mt-4 mb-6">
            Real Results from Real People
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Join hundreds of individuals who have transformed their lives through elite 1-to-1 coaching.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index} 
              className="bg-muted/30 p-8 border border-border relative"
            >
              <Quote className="w-10 h-10 text-lioner-gold/20 absolute top-6 right-6" />
              
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-lioner-gold text-lioner-gold" />
                ))}
              </div>
              
              <p className="text-foreground/80 leading-relaxed mb-6 relative z-10">
                "{testimonial.quote}"
              </p>
              
              <div className="border-t border-border pt-4">
                <div className="font-semibold">{testimonial.name}</div>
                <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                <div className="mt-2 inline-block bg-lioner-gold/10 text-lioner-gold text-sm font-medium px-3 py-1">
                  {testimonial.result}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
