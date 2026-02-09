import { BusinessNavigation } from "@/components/business/BusinessNavigation";
import { BusinessHeroSection } from "@/components/business/BusinessHeroSection";
import { BusinessQuoteSection } from "@/components/business/BusinessQuoteSection";
import { BusinessVideoSection } from "@/components/business/BusinessVideoSection";
import { BusinessProblemSection } from "@/components/business/BusinessProblemSection";
import { BusinessSolutionSection } from "@/components/business/BusinessSolutionSection";
import { BusinessToolkitSection } from "@/components/business/BusinessToolkitSection";
import { BusinessEvidenceSection } from "@/components/business/BusinessEvidenceSection";
import { BusinessDecisionSection } from "@/components/business/BusinessDecisionSection";
import { BusinessFooter } from "@/components/business/BusinessFooter";

const Business = () => {
  return (
    <div className="bg-white">
      <BusinessNavigation />
      <main className="min-h-screen">
        <BusinessHeroSection />
        <BusinessProblemSection />
        <BusinessQuoteSection />
        <BusinessVideoSection />
        <BusinessSolutionSection />
        <BusinessToolkitSection />
        <BusinessEvidenceSection />
        <BusinessDecisionSection />
      </main>
      <BusinessFooter />
    </div>
  );
};

export default Business;
