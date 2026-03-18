import { BusinessNavigation } from "@/components/business/BusinessNavigation";
import { BusinessHeroSection } from "@/components/business/BusinessHeroSection";
import { BusinessQuoteSection } from "@/components/business/BusinessQuoteSection";

import { BusinessWhyUsSection } from "@/components/business/BusinessWhyUsSection";
import { BusinessServicesSection } from "@/components/business/BusinessServicesSection";
import { BusinessProcessSection } from "@/components/business/BusinessProcessSection";
import { BusinessResultsSection } from "@/components/business/BusinessResultsSection";
import { CorporateAuditCTASection } from "@/components/corporate-audit/CorporateAuditCTASection";
import { CapitalProtectionCTASection } from "@/components/capital-protection/CapitalProtectionCTASection";
import { CapitalAssessmentCTASection } from "@/components/capital-assessment/CapitalAssessmentCTASection";
import { BusinessBookingSection } from "@/components/business/BusinessBookingSection";
import { HomeFooter } from "@/components/home/HomeFooter";

const Business = () => {
  return (
    <div className="bg-white">
      <BusinessNavigation />
      <main className="min-h-screen">
        <BusinessHeroSection />
        <BusinessWhyUsSection />
        <BusinessServicesSection />
        <BusinessProcessSection />
        <BusinessResultsSection />
        <CorporateAuditCTASection />
        <CapitalProtectionCTASection />
        <CapitalAssessmentCTASection />
        <BusinessBookingSection />
        <BusinessQuoteSection />
      </main>
      <HomeFooter />
    </div>
  );
};

export default Business;
