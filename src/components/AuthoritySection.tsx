import portraitImage from "@/assets/lionel-portrait-new.jpg";
import { Check } from "lucide-react";
export const AuthoritySection = () => {
  const bio = "Elite entrepreneur, High Performance Coach, and Leadership Expert since 2005. Founder of BodyMentors, the Netherlands' first High-Performance & Health Institute. Lionel empowers leaders by integrating physical vitality, mental clarity, and strategic leadership for sustainable success.";
  const achievements = ["Global High-Performance Strategist", "20+ Years Elite Leadership", "6 Figure Entrepreneur", "Trusted by executives worldwide"];
  return <section id="about" className="py-10 lg:py-16 bg-white">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="overflow-hidden p-8 md:p-12 lg:p-16 bg-lioner-gold">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
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
                  <div className="rounded-full p-2 shrink-0 bg-white">
                    <Check className="w-5 h-5 text-lioner-gold" />
                  </div>
                  <p className="text-lg text-white text-left">{achievement}</p>
                 </div>)}
              </div>
            </div>

            {/* Right Column: Image */}
            <div className="relative aspect-[3/4] overflow-hidden shadow-2xl mx-auto md:mx-auto md:w-full md:max-w-full lg:mx-0">
              <img src={portraitImage} alt="Lionel Eersteling" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            </div>
          </div>
        </div>
      </div>
    </section>;
};