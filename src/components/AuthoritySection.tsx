import { useState, useEffect, useRef } from "react";
import portraitImage from "@/assets/lionel-portrait-new.jpg";
import { Check } from "lucide-react";
export const AuthoritySection = () => {
  const [isDark, setIsDark] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  useEffect(() => {
    const handleScroll = () => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        setIsDark(rect.top <= 100);
      }
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  const bio = "Elite entrepreneur, High Performance Coach, and Leadership Expert since 2005. Founder of BodyMentors, the Netherlands' first High-Performance & Health Institute. Lionel empowers leaders by integrating physical vitality, mental clarity, and strategic leadership for sustainable success.";
  const achievements = ["Global High-Performance Strategist", "20+ Years Elite Leadership", "6 Figure Entrepreneur", "Trusted by executives worldwide"];
  return <section ref={sectionRef} id="about" className={`py-10 lg:py-16 transition-colors duration-500 ${isDark ? 'bg-black' : 'bg-white'}`}>
      <div className="container mx-auto px-4 max-w-7xl">
        <div className={`overflow-hidden p-8 md:p-12 lg:p-16 transition-all duration-500 ${isDark ? 'bg-black border-2 border-lioner-gold' : 'bg-lioner-gold'}`}>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left Column: Header + Achievements */}
            <div className="space-y-8 flex flex-col justify-center text-center md:text-left">
              {/* Section Header */}
              <div>
                <div className="inline-flex items-center gap-2 mb-2 justify-center md:justify-start">
                  <span className="text-lg text-white/80 font-medium uppercase">About</span>
                </div>
                <h2 className="text-4xl md:text-5xl lg:text-5xl font-semibold font-sans text-white leading-tight mb-6">
                  Meet Lionel Eersteling
                </h2>
                <p className="text-lg text-white/90">
                  {bio}
                </p>
              </div>

              {/* Achievement Badges */}
              <div className="space-y-6">
              {achievements.map((achievement, index) => <div key={index} className="flex items-center gap-4">
                  <div className={`rounded-full p-2 shrink-0 transition-colors duration-500 ${isDark ? 'bg-lioner-gold' : 'bg-white'}`}>
                    <Check className={`w-5 h-5 transition-colors duration-500 ${isDark ? 'text-black' : 'text-lioner-gold'}`} />
                  </div>
                  <p className="text-lg text-white text-left">{achievement}</p>
                 </div>)}
              </div>
            </div>

            {/* Right Column: Image */}
            <div className="relative aspect-[3/4] overflow-hidden shadow-2xl">
              <img src={portraitImage} alt="Lionel Eersteling" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            </div>
          </div>
        </div>
      </div>
    </section>;
};