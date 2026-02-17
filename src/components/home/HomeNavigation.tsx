import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import logo from "@/assets/logo.png";
import logoWhite from "@/assets/logo-white.png";

export const HomeNavigation = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [pastHero, setPastHero] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
      // After ~75% of the sticky hero (400vh), we're past it
      setPastHero(window.scrollY > window.innerHeight * 2.5);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isDark = !pastHero;

  const navItems = [
    { label: "About", href: "#about" },
    { label: "BUSINESS", href: "/business" },
    { label: "ELITE", href: "/elite" },
    { label: "Blog", href: "#insights" },
    { label: "Start Here", href: "#start-here" },
    { label: "Q&A", href: "#faq" },
  ];

  const handleNav = (href: string) => {
    setIsMobileMenuOpen(false);
    if (href.startsWith("#")) {
      const el = document.querySelector(href);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? pastHero
            ? "bg-background/80 backdrop-blur-xl border-b border-border/50"
            : "bg-foreground/40 backdrop-blur-xl border-b border-background/10"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center">
            <img
              src={isDark ? logoWhite : logo}
              alt="Leaders Performance"
              className="h-10 w-auto transition-opacity duration-300"
            />
          </Link>

          <div className="hidden lg:flex items-center gap-8">
            {navItems.map((item) =>
              item.href.startsWith("/") ? (
                <Link
                  key={item.label}
                  to={item.href}
                  className={`text-[13px] font-medium tracking-wide transition-colors ${
                    isDark
                      ? "text-background/70 hover:text-background"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {item.label}
                </Link>
              ) : (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNav(item.href);
                  }}
                  className={`text-[13px] font-medium tracking-wide transition-colors ${
                    isDark
                      ? "text-background/70 hover:text-background"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {item.label}
                </a>
              )
            )}
            <a
              href="#start-here"
              onClick={(e) => {
                e.preventDefault();
                handleNav("#start-here");
              }}
              className={`text-[13px] font-medium tracking-wide px-6 py-2.5 rounded-full transition-all ${
                isDark
                  ? "bg-background/10 backdrop-blur-sm text-background border border-background/20 hover:bg-background/20"
                  : "bg-foreground text-background hover:bg-foreground/90"
              }`}
            >
              Book a Session
            </a>
          </div>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`lg:hidden p-2 ${isDark ? "text-background" : "text-foreground"}`}
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {isMobileMenuOpen && (
          <div className={`lg:hidden py-4 border-t ${isDark ? "border-background/10" : "border-border/50"}`}>
            <div className="flex flex-col gap-1">
              {navItems.map((item) =>
                item.href.startsWith("/") ? (
                  <Link
                    key={item.label}
                    to={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                      isDark ? "text-background hover:bg-background/10" : "text-foreground hover:bg-muted"
                    }`}
                  >
                    {item.label}
                  </Link>
                ) : (
                  <a
                    key={item.label}
                    href={item.href}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNav(item.href);
                    }}
                    className={`px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                      isDark ? "text-background hover:bg-background/10" : "text-foreground hover:bg-muted"
                    }`}
                  >
                    {item.label}
                  </a>
                )
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};
