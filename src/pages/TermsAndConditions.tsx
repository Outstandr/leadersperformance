import { Navigation } from "@/components/Navigation";
import { Link } from "react-router-dom";

const TermsAndConditions = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="container mx-auto px-4 py-16 max-w-4xl">
        <h1 className="text-4xl font-bold mb-8">Terms & Conditions</h1>
        
        <div className="space-y-6 text-foreground/80">
          <section>
            <h2 className="text-2xl font-semibold mb-4">1. Introduction</h2>
            <p>These Terms and Conditions govern your use of our services and programs. By enrolling in any of our programs or services, you agree to these terms.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">2. Services Offered</h2>
            <p>Lionel Eersteling offers high-performance leadership coaching, including The RESET Blueprint®, The Elite Academy, and The Elite Masterclass. All services are designed to enhance leadership performance integrating mind, body, and wealth strategies.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">3. Payment Terms</h2>
            <p>Payment for services must be made in full unless otherwise agreed upon in writing. All prices are subject to change with notice. Refund policies vary by program and will be communicated at the time of enrollment.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">4. Client Responsibilities</h2>
            <p>Clients are expected to actively participate in the programs, complete assigned work, and maintain open communication. Success in our programs requires commitment and consistent effort from the participant.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">5. Confidentiality</h2>
            <p>All information shared during coaching sessions and programs is confidential. We respect your privacy and will not share your personal information without your explicit consent, except where required by law.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">6. Intellectual Property</h2>
            <p>All materials, including but not limited to the RESET Blueprint®, assessments, frameworks, and program content, are the intellectual property of Lionel Eersteling and may not be reproduced or distributed without written permission.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">7. Limitation of Liability</h2>
            <p>While we strive to provide exceptional coaching and guidance, results may vary based on individual effort and circumstances. Lionel Eersteling is not liable for any indirect, consequential, or incidental damages arising from the use of our services.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">8. Termination</h2>
            <p>Either party may terminate the coaching relationship with written notice. Termination terms and any applicable refunds will be handled according to the specific program agreement.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">9. Amendments</h2>
            <p>We reserve the right to modify these Terms and Conditions at any time. Changes will be communicated to active clients and posted on our website.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">10. Contact Information</h2>
            <p>For questions regarding these Terms and Conditions, please contact us through the information provided on our website.</p>
          </section>
        </div>

        <div className="mt-12">
          <Link to="/" className="text-primary hover:underline">
            ← Back to Home
          </Link>
        </div>
      </main>
    </div>
  );
};

export default TermsAndConditions;
