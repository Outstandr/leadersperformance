import { EliteNavigation } from "@/components/elite/EliteNavigation";
import { EliteHeroSection } from "@/components/elite/EliteHeroSection";
import { EliteQuoteSection } from "@/components/elite/EliteQuoteSection";

import { EliteProgramSection } from "@/components/elite/EliteProgramSection";
import { EliteTransformationSection } from "@/components/elite/EliteTransformationSection";
import { EliteResultsSection } from "@/components/elite/EliteResultsSection";
import { EliteQuoteSection2 } from "@/components/elite/EliteQuoteSection2";
import { EliteProcessSection } from "@/components/elite/EliteProcessSection";
import { EliteBookingSection } from "@/components/elite/EliteBookingSection";
import { HomeFooter } from "@/components/home/HomeFooter";
import { AssessmentCTASection } from "@/components/AssessmentCTASection";

const Elite = () => {
  return (
    <div className="bg-white">
      <EliteNavigation />
      <main className="min-h-screen">
        <EliteHeroSection />
        <EliteQuoteSection />
        
        <EliteProgramSection />
        <EliteTransformationSection />
        <EliteResultsSection />
        <AssessmentCTASection source="elite" />
        <EliteQuoteSection2 />
        <EliteProcessSection />
        <EliteBookingSection />
      </main>
      <HomeFooter />
    </div>
  );
};

export default Elite;
