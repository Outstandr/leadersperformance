import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

export const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { label: "Home", href: "#hero" },
    { label: "Why Us", href: "#comparison" },
    { label: "RESET Method", href: "#reset" },
    { label: "About", href: "#about" },
    { label: "Pillars", href: "#pillars" },
    { label: "Testimonials", href: "#testimonials" },
    { label: "Programs", href: "#programs" }
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
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/95 backdrop-blur-md shadow-lg"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <a
            href="#hero"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection("#hero");
            }}
            className="flex items-center space-x-2"
          >
            <div className="w-10 h-10 bg-lioner-gold rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">LE</span>
            </div>
            <span
              className={`font-bold text-xl transition-colors ${
                isScrolled ? "text-lioner-blue" : "text-white"
              }`}
            >
              Leaders Performance
            </span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(item.href);
                }}
                className={`px-4 py-2 rounded-full font-medium transition-colors ${
                  isScrolled
                    ? "text-muted-foreground hover:text-lioner-blue hover:bg-muted"
                    : "text-white/90 hover:text-white hover:bg-white/10"
                }`}
              >
                {item.label}
              </a>
            ))}
            <Button
              onClick={() => scrollToSection("#assessment")}
              className="ml-4 bg-lioner-gold hover:bg-lioner-gold/90 text-white rounded-full px-6"
            >
              Free Assessment
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`lg:hidden p-2 rounded-lg transition-colors ${
              isScrolled
                ? "text-lioner-blue hover:bg-muted"
                : "text-white hover:bg-white/10"
            }`}
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-border/10">
            <div className="flex flex-col space-y-2">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(item.href);
                  }}
                  className={`px-4 py-3 rounded-lg font-medium transition-colors ${
                    isScrolled
                      ? "text-muted-foreground hover:text-lioner-blue hover:bg-muted"
                      : "text-white/90 hover:text-white hover:bg-white/10"
                  }`}
                >
                  {item.label}
                </a>
              ))}
              <Button
                onClick={() => scrollToSection("#assessment")}
                className="mx-4 bg-lioner-gold hover:bg-lioner-gold/90 text-white rounded-full"
              >
                Free Assessment
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};
