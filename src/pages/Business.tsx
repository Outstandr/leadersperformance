import { BusinessNavigation } from "@/components/business/BusinessNavigation";
import { BusinessHeroSection } from "@/components/business/BusinessHeroSection";
import { BusinessQuoteSection } from "@/components/business/BusinessQuoteSection";
import { BusinessServicesSection } from "@/components/business/BusinessServicesSection";
import { BusinessWhyUsSection } from "@/components/business/BusinessWhyUsSection";
import { BusinessResultsSection } from "@/components/business/BusinessResultsSection";
import { BusinessProcessSection } from "@/components/business/BusinessProcessSection";
import { BusinessBookingSection } from "@/components/business/BusinessBookingSection";
import { BusinessFooter } from "@/components/business/BusinessFooter";

const Business = () => {
  return (
    <div className="bg-white">
      <BusinessNavigation />
      <main className="min-h-screen">
        <BusinessHeroSection />
        <BusinessQuoteSection />
        <BusinessServicesSection />
        <BusinessWhyUsSection />
        <BusinessResultsSection />
        <BusinessProcessSection />
        <BusinessBookingSection calendlyUrl="https://api.leadconnectorhq.com/widget/booking/q8RommFFkbptaoyv1MRY" />
      </main>
      <BusinessFooter />
    </div>
  );
};

export default Business;
