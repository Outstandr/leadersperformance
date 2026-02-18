import { Quote } from "lucide-react";
import willemImage from "@/assets/testimonial-willem-elite.png";
import jittekeImage from "@/assets/testimonial-jitteke.png";

export const EliteResultsSection = () => {
  const testimonials = [
    {
      name: "Willem Ledeboer",
      role: "Partner at Amrop Executive Search and Leadership Service",
      quote: "Lionel excels in delivering no-nonsense guidance and is a committed advocate for your personal advancement. A dynamic business motivator and a unifier of teams, he's always on the lookout for your business's next big stride. I warmly recommend him, but you've got to be all in.",
      image: willemImage
    },
    {
      name: "Jitteke Blussé",
      role: "Lawyer, Caland Advocaten",
      quote: "Working with Lionel was transformative. Facing crucial changes, his no-nonsense approach gave me the clarity and drive to start my own office. Lionel's coaching is direct and efficient, making you move beyond your limitations. I highly recommend his program, impactful results.",
      image: jittekeImage
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

        <div className="grid md:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index} 
              className="p-8 bg-muted/50 border border-lioner-gold/20"
            >
              <Quote className="w-10 h-10 text-lioner-gold/40 mb-4" />
              
              <p className="text-lg text-foreground leading-relaxed mb-6 italic">
                "{testimonial.quote}"
              </p>
              
              <div className="flex items-center gap-4 pt-4 border-t border-border">
                <img 
                  src={testimonial.image} 
                  alt={testimonial.name}
                  className="w-16 h-16 rounded-full object-cover object-center"
                />
                <div>
                  <div className="font-semibold text-foreground">{testimonial.name}</div>
                  <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
