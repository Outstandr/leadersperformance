import hansImage from "@/assets/testimonial-hans.png";
import reneImage from "@/assets/testimonial-rene.png";
import { useLanguage } from "@/lib/i18n/LanguageContext";

export const BusinessResultsSection = () => {
  const { t } = useLanguage();

  const testimonials = [
    {
      quote: t("business.results.quote1"),
      author: "Hans van Berghem",
      role: "Manager Underwriting & Broking, Post & Co",
      image: hansImage,
    },
    {
      quote: t("business.results.quote2"),
      author: "Rene Hogerheide",
      role: "DGA, H2i isolatie bv",
      image: reneImage,
    },
  ];

  return (
    <section id="results" className="py-8 lg:py-12 bg-white">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-center mb-12">
          <span className="text-sm font-medium uppercase text-muted-foreground tracking-wider">{t("business.results.eyebrow")}</span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold font-sans mt-4 mb-4 text-lioner-gold">
            {t("business.results.heading")}
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="p-8 bg-muted/50 border border-lioner-gold/20"
            >
              <div className="text-4xl text-lioner-gold mb-4">"</div>
              <p className="text-lg text-foreground mb-6 leading-relaxed italic">
                {testimonial.quote}
              </p>
              <div className="flex items-center gap-4">
                <img
                  src={testimonial.image}
                  alt={testimonial.author}
                  className="w-16 h-16 rounded-full object-cover object-center"
                />
                <div>
                  <div className="font-semibold text-foreground">{testimonial.author}</div>
                  <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
