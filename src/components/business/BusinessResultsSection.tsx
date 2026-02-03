import { TrendingUp, Users, Award, Target } from "lucide-react";
import hansImage from "@/assets/testimonial-hans.png";
import reneImage from "@/assets/testimonial-rene.png";
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
      quote: "Lionel is intense, direct, and confrontational. He naturally pushes you to expand your limits, draw out your best and open up. This journey has significantly increased my self-awareness and confidence in my abilities. I highly recommend Lionel for anyone looking to become stronger and more mindful in all aspects of life.",
      author: "Hans van Berghem",
      role: "Manager Underwriting & Broking, Post & Co",
      image: hansImage
    },
    {
      quote: "Working with Lionel was a game-changer for our growing company. His fresh perspective helped me reevaluate old habits and sparked significant personal and leadership growth. Lionel's passionate approach stands out, offering clear insights and motivating dedication. I highly recommend him for anyone looking to make real changes.",
      author: "Rene Hogerheide",
      role: "DGA, H2i isolatie bv",
      image: reneImage
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
              <div className="flex items-center gap-4">
                <img 
                  src={testimonial.image} 
                  alt={testimonial.author}
                  className="w-16 h-16 rounded-full object-cover object-center"
                />
                <div>
                  <div className="font-semibold text-foreground">{testimonial.author}</div>
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
