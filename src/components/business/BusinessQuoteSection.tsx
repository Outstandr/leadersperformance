import { useState } from "react";
import { Quote } from "lucide-react";

export const BusinessQuoteSection = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <section
      className="py-16 bg-white overflow-hidden relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Subtle gold gradient glow */}
      <div className={`absolute inset-0 bg-gradient-to-r from-transparent via-lioner-gold/5 to-transparent transition-opacity duration-1000
        ${isHovered ? "opacity-100" : "opacity-0"}`} />

      <div className="container mx-auto px-4 max-w-4xl text-center relative z-10">
        <Quote className={`w-12 h-12 mx-auto mb-6 transition-all duration-700
          ${isHovered ? "text-lioner-gold scale-110" : "text-lioner-gold/40 scale-100"}`} />

        <blockquote className="text-xl md:text-2xl lg:text-3xl font-light text-foreground leading-relaxed italic">
          "You cannot scale chaos.{" "}
          <span className={`transition-colors duration-500 ${isHovered ? "text-lioner-gold" : "text-foreground"}`}>
            Execute or be replaced.
          </span>"
        </blockquote>

        <div className={`mt-8 transition-all duration-500 ${isHovered ? "opacity-100" : "opacity-70"}`}>
          <div className={`w-12 h-0.5 mx-auto mb-4 transition-all duration-700
            ${isHovered ? "bg-lioner-gold w-20" : "bg-foreground/20 w-12"}`} />
          <p className="text-2xl md:text-3xl text-lioner-gold font-semibold" style={{ fontFamily: "'Great Vibes', cursive" }}>
            - Lionel -
          </p>
        </div>
      </div>
    </section>
  );
};
