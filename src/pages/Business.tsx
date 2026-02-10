import { BusinessNavigation } from "@/components/business/BusinessNavigation";
import { BusinessHeroSection } from "@/components/business/BusinessHeroSection";
import { BusinessQuoteSection } from "@/components/business/BusinessQuoteSection";

import { BusinessWhyUsSection } from "@/components/business/BusinessWhyUsSection";
import { BusinessServicesSection } from "@/components/business/BusinessServicesSection";
import { BusinessProcessSection } from "@/components/business/BusinessProcessSection";
import { BusinessResultsSection } from "@/components/business/BusinessResultsSection";
import { CorporateAuditCTASection } from "@/components/corporate-audit/CorporateAuditCTASection";
import { BusinessBookingSection } from "@/components/business/BusinessBookingSection";
import { BusinessFooter } from "@/components/business/BusinessFooter";

const Business = () => {
  return (
    <div className="bg-white">
      <BusinessNavigation />
      <main className="min-h-screen">
        <BusinessHeroSection />
        
        <BusinessQuoteSection />
        <BusinessWhyUsSection />
        <BusinessServicesSection />
        <BusinessProcessSection />
        <BusinessResultsSection />
        <CorporateAuditCTASection />
        <BusinessBookingSection />
      </main>
      <BusinessFooter />
    </div>
  );
};

export default Business;
