import { HeroSection } from "@/components/HeroSection";
import { AuthoritySection } from "@/components/AuthoritySection";
import { PhilosophySection } from "@/components/PhilosophySection";
import { ResetMethodSection } from "@/components/ResetMethodSection";
import { ThreePillarsSection } from "@/components/ThreePillarsSection";
import { SocialProofSection } from "@/components/SocialProofSection";
import { AssessmentCTASection } from "@/components/AssessmentCTASection";
import { EcosystemSection } from "@/components/EcosystemSection";
import { FinalCTASection } from "@/components/FinalCTASection";

const Index = () => {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <AuthoritySection />
      <PhilosophySection />
      <ResetMethodSection />
      <ThreePillarsSection />
      <SocialProofSection />
      <AssessmentCTASection />
      <EcosystemSection />
      <FinalCTASection />
    </main>
  );
};

export default Index;
