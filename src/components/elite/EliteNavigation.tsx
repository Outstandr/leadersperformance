import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import logo from "@/assets/logo.png";
import { AssessmentDialog } from "@/components/assessment/AssessmentDialog";

const bookingUrl = "https://api.leadconnectorhq.com/widget/booking/q8RommFFkbptaoyv1MRY";

export const EliteNavigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAssessmentOpen, setIsAssessmentOpen] = useState(false);

  const navItems = [
    { label: "Program", href: "#program" },
    { label: "Transformation", href: "#transformation" },
    { label: "Results", href: "#results" },
    { label: "Process", href: "#process" }
  ];

  const openAssessment = () => {
    setIsMobileMenuOpen(false);
    setIsAssessmentOpen(true);
  };

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
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md transition-all duration-300 bg-white/95 shadow-sm">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="flex items-center justify-between h-20">
            <Link to="/" className="flex items-center">
              <img 
                src={logo} 
                alt="Leaders Performance" 
                className="h-14 md:h-16 lg:h-20 w-auto transition-all duration-300"
              />
            </Link>

            <div className="hidden lg:flex items-center space-x-6">
              {navItems.map((item) => (
                <a 
                  key={item.href} 
                  href={item.href} 
                  onClick={(e) => { e.preventDefault(); scrollToSection(item.href); }} 
                  className="text-sm font-normal text-foreground hover:text-primary transition-colors duration-300"
                >
                  {item.label}
                </a>
              ))}
              <Button 
                onClick={openAssessment}
                variant="outline"
                className="border-lioner-gold text-lioner-gold hover:bg-lioner-gold hover:text-white rounded-none px-5 py-2 text-sm font-medium"
              >
                Take Leader Assessment
              </Button>
              <Button 
                asChild
                className="bg-lioner-gold hover:bg-lioner-gold/90 text-white rounded-none px-5 py-2 text-sm font-medium"
              >
                <a href={bookingUrl} target="_blank" rel="noopener noreferrer">
                  Apply Now
                  <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </Button>
            </div>

            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
              className="lg:hidden p-2 rounded-lg transition-colors duration-300 text-foreground hover:bg-muted"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {isMobileMenuOpen && (
            <div className="lg:hidden py-4 border-t transition-colors duration-300 border-border/10">
              <div className="flex flex-col space-y-2">
                {navItems.map((item) => (
                  <a 
                    key={item.href} 
                    href={item.href} 
                    onClick={(e) => { e.preventDefault(); scrollToSection(item.href); }} 
                    className="px-4 py-3 rounded-lg font-medium transition-colors duration-300 text-foreground hover:bg-muted"
                  >
                    {item.label}
                  </a>
                ))}
                <Button 
                  onClick={openAssessment}
                  variant="outline"
                  className="mx-4 border-lioner-gold text-lioner-gold hover:bg-lioner-gold hover:text-white rounded-none py-3"
                >
                  Take Leader Assessment
                </Button>
                <Button 
                  asChild
                  className="mx-4 bg-lioner-gold hover:bg-lioner-gold/90 text-white rounded-none py-3"
                >
                  <a href={bookingUrl} target="_blank" rel="noopener noreferrer">
                    Apply Now
                  </a>
                </Button>
              </div>
            </div>
          )}
        </div>
      </nav>

      <AssessmentDialog open={isAssessmentOpen} onOpenChange={setIsAssessmentOpen} />
    </>
  );
};
