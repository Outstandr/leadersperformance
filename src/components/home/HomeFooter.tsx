import { Link } from "react-router-dom";
import logo from "@/assets/logo.png";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { Youtube, Instagram, Facebook, Linkedin } from "lucide-react";

const socialLinks = [
  { label: "YouTube", href: "https://www.youtube.com/@lioneleersteling", icon: Youtube },
  { label: "Instagram", href: "https://www.instagram.com/lionel_eersteling", icon: Instagram },
  { label: "Facebook", href: "https://www.facebook.com/lionel.eersteling/", icon: Facebook },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/lionel-eersteling/", icon: Linkedin },
  { label: "TikTok", href: "https://www.tiktok.com/@lioneleersteling", icon: null },
];

const ecosystemLinks = [
  { label: "Reset by Discipline", href: "https://leaders-performance.com/reset-by-discipline" },
  { label: "Elite Self-Discipline Masterclass", href: "https://leaders-performance.com/elite-self-discipline" },
  { label: "Lionel Eersteling Official", href: "https://lioneleersteling.com" },
];

const TikTokIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.19 8.19 0 0 0 4.79 1.52V6.76a4.85 4.85 0 0 1-1.02-.07z" />
  </svg>
);

export const HomeFooter = () => {
  const { t } = useLanguage();

  const navItems = [
    { label: t("footer.home"), href: "/" },
    { label: "Business", href: "/business" },
    { label: "Elite", href: "/elite" },
    { label: t("footer.blog"), href: "/#articles" },
    { label: t("footer.startHere"), href: "/#start-here" },
    { label: t("footer.faq"), href: "/#faq" },
  ];

  return (
    <footer className="bg-foreground text-background py-16">
      <div className="container mx-auto px-6 max-w-7xl">
        {/* Top row: logo + nav */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 pb-8 border-b border-background/10">
          <Link to="/" className="flex items-center">
            <img src={logo} alt="Leaders Performance" className="h-10 w-auto brightness-0 invert" />
          </Link>
          <div className="flex flex-wrap items-center justify-center gap-6 md:gap-8">
            {navItems.map((item) =>
              item.href.startsWith("/") ? (
                <Link key={item.label} to={item.href} className="text-sm text-background/60 hover:text-background transition-colors">
                  {item.label}
                </Link>
              ) : (
                <a key={item.label} href={item.href} className="text-sm text-background/60 hover:text-background transition-colors">
                  {item.label}
                </a>
              )
            )}
          </div>
        </div>

        {/* Ecosystem + Social row */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 py-8 border-b border-background/10">
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 md:gap-6">
            <span className="text-xs font-medium tracking-widest uppercase text-lioner-gold">Ecosystem</span>
            {ecosystemLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-background/50 hover:text-lioner-gold transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Social icons */}
          <div className="flex items-center gap-5">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className="text-background/50 hover:text-lioner-gold transition-colors"
              >
                {social.icon ? <social.icon className="w-5 h-5" /> : <TikTokIcon />}
              </a>
            ))}
          </div>
        </div>

        {/* Bottom: copyright + legal */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8">
          <p className="text-xs text-background/40">{t("footer.copyright")}</p>
          <div className="flex items-center gap-6">
            <Link to="/privacy-policy" className="text-xs text-background/40 hover:text-background/60 transition-colors">
              {t("footer.privacy")}
            </Link>
            <Link to="/terms-of-service" className="text-xs text-background/40 hover:text-background/60 transition-colors">
              {t("footer.terms")}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
