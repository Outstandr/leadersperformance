import { Link } from "react-router-dom";
import logo from "@/assets/logo.png";
import { useLanguage } from "@/lib/i18n/LanguageContext";

export const EliteFooter = () => {
  const { t } = useLanguage();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-12 bg-foreground text-white">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div>
            <img src={logo} alt="Leaders Performance" className="h-12 mb-4 brightness-0 invert" />
            <p className="text-white/70 text-sm leading-relaxed">
              {t("elite.footer.description")}
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">{t("elite.footer.quickLinks")}</h4>
            <ul className="space-y-2 text-white/70 text-sm">
              <li><a href="#program" className="hover:text-white transition-colors">{t("nav.program")}</a></li>
              <li><a href="#transformation" className="hover:text-white transition-colors">{t("nav.transformation")}</a></li>
              <li><a href="#results" className="hover:text-white transition-colors">{t("nav.results")}</a></li>
              <li><a href="#apply" className="hover:text-white transition-colors">{t("elite.footer.apply")}</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">{t("elite.footer.legal")}</h4>
            <ul className="space-y-2 text-white/70 text-sm">
              <li><Link to="/privacy-policy" className="hover:text-white transition-colors">{t("footer.privacy")}</Link></li>
              <li><Link to="/terms-of-service" className="hover:text-white transition-colors">{t("footer.terms")}</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/20 pt-8 text-center text-white/60 text-sm">
          <p>{t("elite.footer.copyright").replace("{year}", String(currentYear))}</p>
        </div>
      </div>
    </footer>
  );
};
