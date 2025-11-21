import { Navigation } from "@/components/Navigation";
import { HeroSection } from "@/components/HeroSection";
import { ComparisonSection } from "@/components/ComparisonSection";
import { AuthoritySection } from "@/components/AuthoritySection";
import { ResetMethodSection } from "@/components/ResetMethodSection";
import { ThreePillarsSection } from "@/components/ThreePillarsSection";
import { SocialProofSection } from "@/components/SocialProofSection";
import { AssessmentCTASection } from "@/components/AssessmentCTASection";
import { EcosystemSection } from "@/components/EcosystemSection";
import { FinalCTASection } from "@/components/FinalCTASection";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="bg-white">
      <Navigation />
      <main className="min-h-screen">
      <HeroSection />
      <ComparisonSection />
      <ResetMethodSection />
      <AuthoritySection />
      <ThreePillarsSection />
      <SocialProofSection />
      <AssessmentCTASection />
      <EcosystemSection />
      <FinalCTASection />
    </main>
    <Footer />
    </div>
  );
};

export default Index;
