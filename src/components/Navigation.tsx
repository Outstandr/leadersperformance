import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, ArrowRight } from "lucide-react";

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
      setIsScrolled(window.scrollY > 20);
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
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md shadow-sm">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          <a href="#hero" onClick={(e) => { e.preventDefault(); scrollToSection("#hero"); }} className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-sm">S</span>
            </div>
            <span className="text-xl font-normal text-foreground">Stratex</span>
          </a>

          <div className="hidden lg:flex items-center space-x-8">
            {navItems.map((item) => (
              <a key={item.href} href={item.href} onClick={(e) => { e.preventDefault(); scrollToSection(item.href); }} className="text-sm font-normal text-foreground hover:text-primary transition-colors">
                {item.label}
              </a>
            ))}
            <Button onClick={() => scrollToSection("#assessment")} className="bg-primary hover:bg-primary/90 text-white rounded-full px-6 py-2 text-sm font-medium">
              Get in touch
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>

          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="lg:hidden p-2 rounded-lg text-foreground hover:bg-muted transition-colors">
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {isMobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-border/10">
            <div className="flex flex-col space-y-2">
              {navItems.map((item) => (
                <a key={item.href} href={item.href} onClick={(e) => { e.preventDefault(); scrollToSection(item.href); }} className="px-4 py-3 rounded-lg font-medium text-foreground hover:bg-muted transition-colors">
                  {item.label}
                </a>
              ))}
              <Button onClick={() => scrollToSection("#assessment")} className="mx-4 bg-primary hover:bg-primary/90 text-white rounded-full py-3">
                Get in touch
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};
