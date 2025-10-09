import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, ArrowRight } from "lucide-react";
import logo from "@/assets/logo.png";
import logoWhite from "@/assets/logo-white.png";

export const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { label: "Services", href: "#reset" },
    { label: "Features", href: "#pillars" },
    { label: "Pricing", href: "#programs" },
    { label: "How it works", href: "#about" }
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 backdrop-blur-md transition-all duration-300 ${
      isScrolled 
        ? 'bg-foreground/95 shadow-lg' 
        : 'bg-white/95 shadow-sm'
    }`}>
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          <a href="#hero" onClick={(e) => { e.preventDefault(); scrollToSection("#hero"); }} className="flex items-center">
            <img 
              src={isScrolled ? logoWhite : logo} 
              alt="Leaders Performance" 
              className="h-12 w-auto transition-all duration-300"
            />
          </a>

          <div className="hidden lg:flex items-center space-x-8">
            {navItems.map((item) => (
              <a 
                key={item.href} 
                href={item.href} 
                onClick={(e) => { e.preventDefault(); scrollToSection(item.href); }} 
                className={`text-sm font-normal hover:text-primary transition-colors duration-300 ${
                  isScrolled ? 'text-white/90' : 'text-foreground'
                }`}
              >
                {item.label}
              </a>
            ))}
            <Button onClick={() => scrollToSection("#assessment")} className="bg-lioner-gold hover:bg-lioner-gold/90 text-white rounded-full px-6 py-2 text-sm font-medium">
              Get in touch
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>

          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
            className={`lg:hidden p-2 rounded-lg transition-colors duration-300 ${
              isScrolled ? 'text-white hover:bg-white/10' : 'text-foreground hover:bg-muted'
            }`}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {isMobileMenuOpen && (
          <div className={`lg:hidden py-4 border-t transition-colors duration-300 ${
            isScrolled ? 'border-white/10' : 'border-border/10'
          }`}>
            <div className="flex flex-col space-y-2">
              {navItems.map((item) => (
                <a 
                  key={item.href} 
                  href={item.href} 
                  onClick={(e) => { e.preventDefault(); scrollToSection(item.href); }} 
                  className={`px-4 py-3 rounded-lg font-medium transition-colors duration-300 ${
                    isScrolled ? 'text-white hover:bg-white/10' : 'text-foreground hover:bg-muted'
                  }`}
                >
                  {item.label}
                </a>
              ))}
              <Button onClick={() => scrollToSection("#assessment")} className="mx-4 bg-lioner-gold hover:bg-lioner-gold/90 text-white rounded-full py-3">
                Get in touch
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};
