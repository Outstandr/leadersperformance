import { Navigation } from "@/components/Navigation";
import { Link } from "react-router-dom";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="container mx-auto px-4 py-16 max-w-4xl">
        <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
        
        <div className="space-y-6 text-foreground/80">
          <section>
            <h2 className="text-2xl font-semibold mb-4">1. Information We Collect</h2>
            <p>We collect information that you provide directly to us, including name, email address, phone number, and any other information you choose to provide when you register for our programs, take assessments, or contact us.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">2. How We Use Your Information</h2>
            <p>We use the information we collect to provide, maintain, and improve our services, to communicate with you about our programs, to send you updates and marketing communications, and to personalize your experience with our coaching programs.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">3. Information Sharing</h2>
            <p>We do not sell, trade, or rent your personal information to third parties. We may share your information with service providers who assist us in operating our website and conducting our business, provided they agree to keep this information confidential.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">4. Cookies and Tracking</h2>
            <p>We use cookies and similar tracking technologies to track activity on our website and store certain information. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">5. Data Security</h2>
            <p>We implement appropriate security measures to protect your personal information from unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the internet is 100% secure.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">6. Your Rights</h2>
            <p>You have the right to access, update, or delete your personal information at any time. You may also opt out of receiving marketing communications from us by following the unsubscribe link in our emails.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">7. Third-Party Links</h2>
            <p>Our website may contain links to third-party websites. We are not responsible for the privacy practices or content of these third-party sites. We encourage you to review their privacy policies.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">8. Children's Privacy</h2>
            <p>Our services are not intended for individuals under the age of 18. We do not knowingly collect personal information from children under 18.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">9. Changes to This Policy</h2>
            <p>We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">10. Contact Us</h2>
            <p>If you have any questions about this Privacy Policy, please contact us through the information provided on our website.</p>
          </section>

          <p className="text-sm text-foreground/60 mt-8">Last Updated: {new Date().toLocaleDateString()}</p>
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

export default PrivacyPolicy;
