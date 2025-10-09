import { useState, useEffect, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Quote, Star } from "lucide-react";

export const SocialProofSection = () => {
  const [isDark, setIsDark] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        setIsDark(rect.top <= 100);
      }
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const testimonials = [
    {
      content: "Lionel's RESET Blueprint transformed not just my performance, but my entire approach to leadership.",
      author: "Sarah Chen",
      role: "Fortune 500 CEO"
    },
    {
      content: "Finally, a system that addresses the whole leader. My productivity increased 300% while maintaining perfect work-life integration.",
      author: "Marcus Rodriguez",
      role: "Private Equity Partner"
    },
    {
      content: "The leadership assessment alone was worth millions in clarity. It showed me exactly where I was limiting my potential.",
      author: "Emma Thompson",
      role: "Global Management Consultant"
    },
    {
      content: "This methodology gave me back 15 hours per week while doubling my team's output. It's not just effective, it's transformative.",
      author: "David Park",
      role: "Tech Startup Founder"
    },
    {
      content: "I've tried every productivity system out there. This is the only one that actually worked for sustainable high performance.",
      author: "Rachel Martinez",
      role: "Investment Banker"
    },
    {
      content: "The integration of mental clarity, physical energy, and strategic execution is unlike anything I've experienced.",
      author: "James Wilson",
      role: "Board Director"
    }
  ];

  return (
    <section ref={sectionRef} id="testimonials" className={`py-10 lg:py-16 transition-colors duration-500 ${isDark ? 'bg-black' : 'bg-white'}`}>
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 mb-2">
              <span className={`text-lg font-medium uppercase transition-colors duration-500 ${isDark ? 'text-white' : 'text-muted-foreground'}`}>Testimonials</span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-5xl font-semibold font-sans text-lioner-gold max-w-4xl mx-auto leading-tight">
              Elite Leaders Choose Excellence
            </h2>
            <p className={`text-lg max-w-3xl mx-auto mt-6 transition-colors duration-500 ${isDark ? 'text-white' : 'text-muted-foreground'}`}>
              Trusted by executives and leaders worldwide
            </p>
            <div className="flex justify-center items-center gap-1 mt-4">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star key={star} className={`w-4 h-4 ${isDark ? 'text-white' : 'text-white'}`} style={{ fill: 'url(#goldGradient)', filter: 'drop-shadow(0 1px 2px rgba(212, 175, 55, 0.4))' }} />
              ))}
              <span className={`ml-2 text-sm transition-colors duration-500 ${isDark ? 'text-white' : 'text-muted-foreground'}`}>4.9/5 from leaders worldwide</span>
              <svg width="0" height="0" className="absolute">
                <defs>
                  <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style={{ stopColor: '#f4e5b8', stopOpacity: 1 }} />
                    <stop offset="25%" style={{ stopColor: '#d4af37', stopOpacity: 1 }} />
                    <stop offset="50%" style={{ stopColor: '#b8860b', stopOpacity: 1 }} />
                    <stop offset="75%" style={{ stopColor: '#d4af37', stopOpacity: 1 }} />
                    <stop offset="100%" style={{ stopColor: '#f4e5b8', stopOpacity: 1 }} />
                  </linearGradient>
                </defs>
              </svg>
            </div>
          </div>

          {/* Carousel */}
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent>
              {testimonials.map((testimonial, index) => (
                <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                  <div className="p-1">
                    <Card className={`border-2 transition-all duration-500 ${
                      isDark 
                        ? 'bg-black border-lioner-gold hover:bg-lioner-gold hover:border-white' 
                        : 'bg-white border-border hover:border-lioner-gold'
                    }`}>
                      <CardContent className="p-6 flex flex-col h-full min-h-[280px] group">
                        <Quote className={`w-8 h-8 mb-4 transition-colors duration-500 ${
                          isDark ? 'text-lioner-gold group-hover:text-white' : 'text-lioner-gold'
                        }`} />
                        <p className={`text-base leading-relaxed flex-grow mb-4 transition-colors duration-500 ${
                          isDark ? 'text-white group-hover:text-black' : 'text-foreground'
                        }`}>
                          "{testimonial.content}"
                        </p>
                        <div className={`mt-auto pt-4 border-t transition-colors duration-500 ${
                          isDark ? 'border-lioner-gold group-hover:border-white' : 'border-lioner-gold'
                        }`}>
                          <p className={`font-semibold transition-colors duration-500 ${
                            isDark ? 'text-white group-hover:text-black' : 'text-foreground'
                          }`}>{testimonial.author}</p>
                          <p className={`text-sm transition-colors duration-500 ${
                            isDark ? 'text-white/70 group-hover:text-black/70' : 'text-muted-foreground'
                          }`}>{testimonial.role}</p>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden md:flex" />
            <CarouselNext className="hidden md:flex" />
          </Carousel>
        </div>
      </div>
    </section>
  );
};