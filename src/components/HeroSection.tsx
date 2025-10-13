import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Star } from "lucide-react";
import heroImage from "@/assets/lionel-hero-reset.jpg";
export const HeroSection = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return <section 
    id="hero" 
    className={`pt-20 md:pt-32 pb-12 md:pb-20 transition-colors duration-500 ${
      isScrolled ? 'bg-foreground' : 'bg-white'
    }`}
  >
      <div className="container mx-auto px-4 max-w-7xl">
        <div className={`overflow-hidden p-6 md:p-12 lg:p-16 transition-all duration-500 ${
          isScrolled ? 'bg-black border-4 border-[hsl(var(--lioner-gold))]' : 'bg-[hsl(var(--lioner-gold))]'
        }`}>
          <div className="grid md:grid-cols-[1fr_40%] gap-6 lg:gap-12 items-stretch">
            {/* Content */}
            <div className="space-y-5 md:space-y-6 text-white flex flex-col justify-center">
              {/* Rating */}
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map(star => <Star key={star} className="w-4 h-4" style={{ fill: 'url(#goldGradient)', filter: 'drop-shadow(0 1px 2px rgba(212, 175, 55, 0.4))' }} />)}
                <span className="ml-2 text-sm">Rated 4.9/5</span>
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

              {/* Headline */}
              <h1 className="text-3xl md:text-5xl lg:text-5xl font-semibold font-sans leading-tight">
                Redefine Your Leadership Potential Through High Performance Mastery
              </h1>

              {/* Description */}
              <p className="text-base md:text-lg text-white leading-relaxed">
                Join elite executives who've transformed their leadership through High Performance. Discover your unique Discipline Type and unlock the RESET Blueprint® that aligns mind, body, and wealth for sustainable leadership excellence.
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button size="lg" className="bg-white text-[hsl(var(--lioner-gold))] hover:bg-[hsl(var(--lioner-gold))] hover:text-white hover:border-white font-medium rounded-none px-7 py-3.5 h-auto group text-sm transition-all border-2 border-transparent">
                  Take Your Free Leadership Assessment
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
              <p className="text-sm text-white pt-2">2 minutes • Instant Results • Personalized Roadmap</p>
            </div>

            {/* Image */}
            <div className="relative md:order-2 h-full min-h-[300px] md:min-h-[500px]">
              <div className="relative overflow-hidden shadow-2xl h-full">
                <img src={heroImage} alt="Lionel Eersteling - High Performance Leadership Coach" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>;
};