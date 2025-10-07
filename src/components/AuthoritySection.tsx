import portraitImage from "@/assets/lionel-portrait.jpg";
import { Check } from "lucide-react";
export const AuthoritySection = () => {
  const bio = "Elite entrepreneur, High Performance Coach, and Leadership Expert since 2005. Founder of BodyMentors, the Netherlands' first High-Performance & Health Institute. Lionel empowers leaders by integrating physical vitality, mental clarity, and strategic leadership for sustainable success.";
  const achievements = ["Global High-Performance Strategist", "20+ Years Elite Leadership", "BodyMentors Institute Founder", "Trusted by Fortune 500 executives"];
  return <section id="about" className="py-20 lg:py-32 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Section Label */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 mb-6">
              <div className="w-2 h-2 rounded-full bg-primary"></div>
              <span className="text-sm text-primary font-medium">About</span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-normal text-foreground leading-tight">
              Meet Lionel Eersteling
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto mt-6">
              {bio}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center max-w-5xl mx-auto">
            {/* Image */}
            <div className="relative aspect-[3/4] bg-muted rounded-3xl overflow-hidden shadow-2xl">
              <img src={portraitImage} alt="Lionel Eersteling" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            </div>

            {/* Achievement Badges */}
            <div className="space-y-6">
              {achievements.map((achievement, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div className="mt-1 rounded-full bg-primary p-2 shrink-0">
                    <Check className="w-5 h-5 text-primary-foreground" />
                  </div>
                  <p className="text-lg text-foreground font-medium">{achievement}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>;
};