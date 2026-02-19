import { Link } from "react-router-dom";
import { Youtube, Instagram, Facebook, Linkedin } from "lucide-react";

// TikTok icon component (not available in lucide-react)
const TikTokIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
  </svg>
);

export const Footer = () => {
  const socialLinks = [
    { icon: Youtube, href: "https://www.youtube.com/@lioneleersteling", label: "YouTube" },
    { icon: Instagram, href: "https://www.instagram.com/lionel_eersteling", label: "Instagram" },
    { icon: Facebook, href: "https://www.facebook.com/lionel.eersteling/?locale=nl_NL", label: "Facebook" },
    { icon: Linkedin, href: "https://www.linkedin.com/in/lionel-eersteling/", label: "LinkedIn" },
    { icon: TikTokIcon, href: "https://www.tiktok.com/@lioneleersteling?lang=en", label: "TikTok" },
  ];

  const externalLinks = [
    { label: "The Reset by Discipline", href: "https://leaders-performance.com/reset-by-discipline" },
    { label: "Elite Self-Discipline Masterclass", href: "https://leaders-performance.com/elite-self-discipline" },
    { label: "Lionel Eersteling Official Site", href: "https://lioneleersteling.com" },
  ];

  return (
    <footer className="bg-primary text-primary-foreground py-12 mt-16">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Main Footer Content */}
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Brand & Social */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Leaders Performance</h3>
            <p className="text-sm text-primary-foreground/80">
              Transforming leaders through high performance mastery and the RESET Blueprint®.
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full bg-primary-foreground/10 hover:bg-primary-foreground/20 transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Programs */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Programs</h3>
            <ul className="space-y-2">
              {externalLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-primary-foreground/80 hover:text-primary-foreground hover:underline transition-all"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/terms-of-service"
                  className="text-sm text-primary-foreground/80 hover:text-primary-foreground hover:underline transition-all"
                >
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link
                  to="/privacy-policy"
                  className="text-sm text-primary-foreground/80 hover:text-primary-foreground hover:underline transition-all"
                >
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-primary-foreground/20 pt-8">
          <p className="text-sm text-center text-primary-foreground/60">
            © {new Date().getFullYear()} Lionel Eersteling. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
