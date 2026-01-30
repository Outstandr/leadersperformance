import { BusinessNavigation } from "@/components/business/BusinessNavigation";
import { BusinessHeroSection } from "@/components/business/BusinessHeroSection";
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
        <BusinessServicesSection />
        <BusinessWhyUsSection />
        <BusinessResultsSection />
        <BusinessProcessSection />
        <BusinessBookingSection calendlyUrl="https://calendly.com" />
      </main>
      <BusinessFooter />
    </div>
  );
};

export default Business;
