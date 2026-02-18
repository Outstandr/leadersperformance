import { Link } from "react-router-dom";
import logo from "@/assets/logo.png";
import { useLanguage } from "@/lib/i18n/LanguageContext";

export const BusinessFooter = () => {
  const { t } = useLanguage();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-12 bg-foreground text-white">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div>
            <img src={logo} alt="Leaders Performance" className="h-12 mb-4 brightness-0 invert" />
            <p className="text-white/70 text-sm leading-relaxed">
              {t("business.footer.description")}
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">{t("business.footer.quickLinks")}</h4>
            <ul className="space-y-2 text-white/70 text-sm">
              <li><a href="#services" className="hover:text-white transition-colors">{t("nav.services")}</a></li>
              <li><a href="#why-us" className="hover:text-white transition-colors">{t("nav.whyUs")}</a></li>
              <li><a href="#results" className="hover:text-white transition-colors">{t("nav.results")}</a></li>
              <li><a href="#book-call" className="hover:text-white transition-colors">{t("business.footer.bookCall")}</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">{t("business.footer.legal")}</h4>
            <ul className="space-y-2 text-white/70 text-sm">
              <li><Link to="/privacy-policy" className="hover:text-white transition-colors">{t("footer.privacy")}</Link></li>
              <li><Link to="/terms-of-service" className="hover:text-white transition-colors">{t("footer.terms")}</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/20 pt-8 text-center text-white/60 text-sm">
          <p>{t("business.footer.copyright").replace("{year}", String(currentYear))}</p>
        </div>
      </div>
    </footer>
  );
};
