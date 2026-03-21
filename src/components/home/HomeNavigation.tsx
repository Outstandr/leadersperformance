import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, X, Mic } from "lucide-react";
import logo from "@/assets/logo.png";
import logoWhite from "@/assets/logo-white.png";
import { LanguageToggle } from "@/components/LanguageToggle";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { useVoiceAgent } from "@/components/voice/VoiceAgentContext";


export const HomeNavigation = () => {
  const { t } = useLanguage();
  const { openVoiceAgent } = useVoiceAgent();
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

  const bookingUrl = "https://api.leadconnectorhq.com/widget/booking/q8RommFFkbptaoyv1MRY";

  const navItems = [
    { label: t("nav.about"), href: "#about" },
    { label: "FOUNDER ADVISORY", href: "/elite" },
    { label: "UNMASKED", href: "https://unmasked.leadersperformance.ae/business" },
    { label: "ACADEMY", href: "#articles" },
    { label: "ARTICLES", href: "#articles" },
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
            ? "bg-white shadow-sm border-b border-border/30"
            : "bg-foreground/70 backdrop-blur-xl border-b border-background/10"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex-shrink-0">
            <img
              src={isDark ? logoWhite : logo}
              alt="Leaders Performance"
              className="h-12 xl:h-14 w-auto transition-opacity duration-300"
            />
          </Link>

          <div className="hidden lg:flex items-center gap-4 xl:gap-6">
            {navItems.map((item) =>
              item.href.startsWith("http") ? (
                <a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`whitespace-nowrap text-[11px] xl:text-[13px] font-medium tracking-widest uppercase transition-colors ${
                    isDark
                      ? "text-background/70 hover:text-background"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {item.label}
                </a>
              ) : item.href.startsWith("/") ? (
                <Link
                  key={item.label}
                  to={item.href}
                  className={`whitespace-nowrap text-[11px] xl:text-[13px] font-medium tracking-widest uppercase transition-colors ${
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
                  className={`whitespace-nowrap text-[11px] xl:text-[13px] font-medium tracking-widest uppercase transition-colors ${
                    isDark
                      ? "text-background/70 hover:text-background"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {item.label}
                </a>
              )
            )}
            {/* Voice Agent Button */}
            <button
              onClick={() => openVoiceAgent()}
              className={`flex items-center gap-2 whitespace-nowrap text-[11px] xl:text-[13px] font-medium tracking-wide px-3 xl:px-4 py-2 rounded-full transition-all border ${
                isDark
                  ? "border-lioner-gold/50 text-lioner-gold hover:bg-lioner-gold/10"
                  : "border-lioner-gold/50 text-lioner-gold hover:bg-lioner-gold/10"
              }`}
            >
              <Mic className="w-3.5 h-3.5 flex-shrink-0" />
              Find Your Next Move
            </button>
            <a
              href={bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`whitespace-nowrap text-[11px] xl:text-[13px] font-medium tracking-wide px-4 xl:px-6 py-2.5 transition-all ${
                isDark
                  ? "bg-lioner-gold text-white hover:bg-lioner-gold/90"
                  : "bg-foreground text-background hover:bg-foreground/90"
              }`}
            >
              {t("nav.bookSession")}
            </a>
            <LanguageToggle dark={isDark} />
          </div>

          <div className="flex items-center gap-3 lg:hidden">
            <button
              onClick={() => openVoiceAgent()}
              className={`p-2 rounded-full border border-[#b39758]/40 text-[#b39758]`}
            >
              <Mic className="w-4 h-4" />
            </button>
            <LanguageToggle dark={isDark} />
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`p-2 ${isDark ? "text-background" : "text-foreground"}`}
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {isMobileMenuOpen && (
          <div className={`lg:hidden py-4 border-t ${isDark ? "border-background/10" : "border-border/50"}`}>
            <div className="flex flex-col gap-1">
              {navItems.map((item) =>
                item.href.startsWith("http") ? (
                  <a
                    key={item.label}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                      isDark ? "text-background hover:bg-background/10" : "text-foreground hover:bg-muted"
                    }`}
                  >
                    {item.label}
                  </a>
                ) : item.href.startsWith("/") ? (
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
