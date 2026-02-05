import { EliteNavigation } from "@/components/elite/EliteNavigation";
import { EliteHeroSection } from "@/components/elite/EliteHeroSection";
import { EliteQuoteSection } from "@/components/elite/EliteQuoteSection";
import { EliteVideoSection } from "@/components/elite/EliteVideoSection";
import { EliteProgramSection } from "@/components/elite/EliteProgramSection";
import { EliteTransformationSection } from "@/components/elite/EliteTransformationSection";
import { EliteResultsSection } from "@/components/elite/EliteResultsSection";
import { EliteQuoteSection2 } from "@/components/elite/EliteQuoteSection2";
import { EliteProcessSection } from "@/components/elite/EliteProcessSection";
import { EliteBookingSection } from "@/components/elite/EliteBookingSection";
import { EliteFooter } from "@/components/elite/EliteFooter";
import { AssessmentCTASection } from "@/components/AssessmentCTASection";

const Elite = () => {
  return (
    <div className="bg-white">
      <EliteNavigation />
      <main className="min-h-screen">
        <EliteHeroSection />
        <EliteQuoteSection />
        <EliteVideoSection />
        <EliteProgramSection />
        <EliteTransformationSection />
        <EliteResultsSection />
        <AssessmentCTASection />
        <EliteQuoteSection2 />
        <EliteProcessSection />
        <EliteBookingSection />
      </main>
      <EliteFooter />
    </div>
  );
};

export default Elite;
