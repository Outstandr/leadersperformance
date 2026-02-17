import { Link } from "react-router-dom";
import logo from "@/assets/logo.png";

export const HomeFooter = () => {
  const navItems = [
    { label: "Home", href: "/" },
    { label: "Business", href: "/business" },
    { label: "Elite", href: "/elite" },
    { label: "Blog", href: "#insights" },
    { label: "Start Here", href: "#start-here" },
    { label: "Q&A", href: "#faq" },
  ];

  return (
    <footer className="bg-foreground text-background py-16">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 pb-8 border-b border-background/10">
          <Link to="/" className="flex items-center">
            <img src={logo} alt="Leaders Performance" className="h-10 w-auto brightness-0 invert" />
          </Link>
          <div className="flex flex-wrap items-center justify-center gap-6 md:gap-8">
            {navItems.map((item) =>
              item.href.startsWith("/") ? (
                <Link
                  key={item.label}
                  to={item.href}
                  className="text-sm text-background/60 hover:text-background transition-colors"
                >
                  {item.label}
                </Link>
              ) : (
                <a
                  key={item.label}
                  href={item.href}
                  className="text-sm text-background/60 hover:text-background transition-colors"
                >
                  {item.label}
                </a>
              )
            )}
          </div>
        </div>
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8">
          <p className="text-xs text-background/40">
            © {new Date().getFullYear()} Leaders Performance. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link to="/privacy-policy" className="text-xs text-background/40 hover:text-background/60 transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms-of-service" className="text-xs text-background/40 hover:text-background/60 transition-colors">
              Terms & Conditions
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
