import { EliteNavigation } from "@/components/elite/EliteNavigation";
import { EliteHeroSection } from "@/components/elite/EliteHeroSection";
import { EliteQuoteSection } from "@/components/elite/EliteQuoteSection";
import { EliteVideoSection } from "@/components/elite/EliteVideoSection";
import { EliteProgramSection } from "@/components/elite/EliteProgramSection";
import { EliteTransformationSection } from "@/components/elite/EliteTransformationSection";
import { EliteResultsSection } from "@/components/elite/EliteResultsSection";
import { EliteProcessSection } from "@/components/elite/EliteProcessSection";
import { EliteBookingSection } from "@/components/elite/EliteBookingSection";
import { EliteFooter } from "@/components/elite/EliteFooter";

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
        <EliteProcessSection />
        <EliteBookingSection />
      </main>
      <EliteFooter />
    </div>
  );
};

export default Elite;
