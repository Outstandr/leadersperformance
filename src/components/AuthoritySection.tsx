import portraitImage from "@/assets/lionel-portrait-new.jpg";
import { Check } from "lucide-react";
export const AuthoritySection = () => {
  const bio = "Elite entrepreneur, High Performance Coach, and Leadership Expert since 2005. Founder of BodyMentors, the Netherlands' first High-Performance & Health Institute. Lionel empowers leaders by integrating physical vitality, mental clarity, and strategic leadership for sustainable success.";
  const achievements = ["Global High-Performance Strategist", "20+ Years Elite Leadership", "6 Figure Entrepreneur", "Trusted by executives worldwide"];
  return <section id="about" className="py-20 lg:py-32 bg-background">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="bg-[#404473] overflow-hidden p-8 md:p-12 lg:p-16">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            {/* Left Column: Header + Achievements */}
            <div className="space-y-8 flex flex-col justify-center">
              {/* Section Header */}
              <div>
                <div className="inline-flex items-center gap-2 mb-2">
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
              {achievements.map((achievement, index) => <div key={index} className="flex items-start gap-4">
                  <div className="mt-1 rounded-full bg-white p-2 shrink-0">
                    <Check className="w-5 h-5 text-lioner-blue" />
                  </div>
                  <p className="text-lg text-white font-medium">{achievement}</p>
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