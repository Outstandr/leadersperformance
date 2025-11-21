import { Navigation } from "@/components/Navigation";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

const TermsOfService = () => {
  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Terms of Service - Leaders Performance</title>
        <meta name="description" content="Terms of Service for Leaders Performance coaching and training programs" />
        <meta name="robots" content="index, follow" />
      </Helmet>
      
      <Navigation />
      <main className="container mx-auto px-4 py-16 max-w-4xl">
        <h1 className="text-4xl font-bold mb-4">Terms of Service</h1>
        <p className="text-sm text-foreground/60 mb-8">Last Updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
        
        <div className="space-y-8 text-foreground/80 leading-relaxed">
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-foreground">1. Agreement to Terms</h2>
            <p className="mb-3">Welcome to Leaders Performance. By accessing or using our website, coaching programs, training services, and related services (collectively, the "Services"), you agree to be bound by these Terms of Service ("Terms"). If you do not agree to these Terms, please do not use our Services.</p>
            <p>These Terms constitute a legally binding agreement between you and Leaders Performance ("Company," "we," "us," or "our") regarding your use of our Services. We reserve the right to modify these Terms at any time, and such modifications will be effective immediately upon posting.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-foreground">2. Description of Services</h2>
            <p className="mb-3">Leaders Performance provides elite coaching, training programs, masterclasses, and performance optimization services designed for high-achieving individuals. Our Services include but are not limited to:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Online coaching programs and courses</li>
              <li>One-on-one coaching sessions</li>
              <li>Group training and masterclasses</li>
              <li>Digital content, resources, and assessments</li>
              <li>Community access and support</li>
              <li>Performance tracking and analytics tools</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-foreground">3. User Accounts and Registration</h2>
            <p className="mb-3">To access certain features of our Services, you may be required to create an account. When creating an account, you agree to:</p>
            <ul className="list-disc pl-6 space-y-2 mb-3">
              <li>Provide accurate, current, and complete information</li>
              <li>Maintain and promptly update your account information</li>
              <li>Maintain the security of your password and account</li>
              <li>Accept all responsibility for activities that occur under your account</li>
              <li>Notify us immediately of any unauthorized use of your account</li>
            </ul>
            <p>You are responsible for all activities that occur under your account. We reserve the right to terminate accounts that violate these Terms.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-foreground">4. Payment Terms and Refund Policy</h2>
            <p className="mb-3">Payment is required for premium Services. By purchasing our Services, you agree to the following:</p>
            <ul className="list-disc pl-6 space-y-2 mb-3">
              <li>All prices are stated in the currency shown at checkout</li>
              <li>Payments are processed securely through third-party payment processors</li>
              <li>Subscription services auto-renew unless cancelled before the renewal date</li>
              <li>You authorize us to charge your payment method for all fees incurred</li>
            </ul>
            <p className="mb-3"><strong>Refund Policy:</strong> Due to the digital nature of our Services and immediate access granted upon purchase, all sales are final. Refunds are considered on a case-by-case basis for exceptional circumstances within 7 days of purchase. To request a refund, contact us with your order details and reason for the request.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-foreground">5. Intellectual Property Rights</h2>
            <p className="mb-3">All content, materials, features, and functionality of our Services, including but not limited to text, graphics, logos, videos, audio, software, and course materials, are the exclusive property of Leaders Performance and are protected by international copyright, trademark, and other intellectual property laws.</p>
            <p className="mb-3">You are granted a limited, non-exclusive, non-transferable license to access and use the Services for personal, non-commercial purposes only. You may not:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Reproduce, distribute, modify, or create derivative works of our content</li>
              <li>Share your account access with others</li>
              <li>Record, screenshot, or redistribute our proprietary content</li>
              <li>Use our Services for any commercial purpose without written permission</li>
              <li>Remove or modify any copyright, trademark, or proprietary notices</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-foreground">6. User Conduct and Prohibited Activities</h2>
            <p className="mb-3">You agree not to engage in any of the following prohibited activities:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Violating any applicable laws or regulations</li>
              <li>Infringing on intellectual property rights of others</li>
              <li>Harassing, threatening, or defaming others</li>
              <li>Transmitting viruses, malware, or harmful code</li>
              <li>Attempting to gain unauthorized access to our systems</li>
              <li>Interfering with the proper functioning of our Services</li>
              <li>Collecting information about other users without consent</li>
              <li>Impersonating others or providing false information</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-foreground">7. Medical and Professional Disclaimer</h2>
            <p className="mb-3">The information and coaching provided through our Services are for educational and informational purposes only. They are not intended to be a substitute for professional medical advice, diagnosis, or treatment.</p>
            <p className="mb-3">Always seek the advice of your physician or other qualified health provider with any questions you may have regarding a medical condition. Never disregard professional medical advice or delay in seeking it because of something you have read or learned through our Services.</p>
            <p>Results may vary. Individual results depend on many factors including but not limited to commitment, effort, genetics, and individual circumstances. We make no guarantees regarding specific outcomes.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-foreground">8. Limitation of Liability</h2>
            <p className="mb-3">To the maximum extent permitted by law, Leaders Performance, its directors, employees, partners, and agents shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including but not limited to loss of profits, data, use, goodwill, or other intangible losses resulting from:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Your access to or use of (or inability to access or use) the Services</li>
              <li>Any conduct or content of any third party on the Services</li>
              <li>Any content obtained from the Services</li>
              <li>Unauthorized access, use, or alteration of your content</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-foreground">9. Indemnification</h2>
            <p>You agree to indemnify, defend, and hold harmless Leaders Performance and its officers, directors, employees, agents, and partners from and against any claims, liabilities, damages, losses, costs, expenses, or fees (including reasonable attorneys' fees) arising from your use of the Services, your violation of these Terms, or your violation of any rights of a third party.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-foreground">10. Termination</h2>
            <p className="mb-3">We reserve the right to terminate or suspend your account and access to the Services immediately, without prior notice or liability, for any reason, including but not limited to breach of these Terms.</p>
            <p>Upon termination, your right to use the Services will immediately cease. All provisions of these Terms which by their nature should survive termination shall survive, including but not limited to ownership provisions, warranty disclaimers, indemnity, and limitations of liability.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-foreground">11. Governing Law and Dispute Resolution</h2>
            <p className="mb-3">These Terms shall be governed by and construed in accordance with the laws of the United Arab Emirates, without regard to its conflict of law provisions.</p>
            <p>Any disputes arising from these Terms or the Services shall be resolved through binding arbitration in accordance with the arbitration rules of the Dubai International Arbitration Centre (DIAC). The arbitration shall be conducted in English in Dubai, UAE.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-foreground">12. Changes to Terms</h2>
            <p>We reserve the right to modify or replace these Terms at any time at our sole discretion. If a revision is material, we will provide at least 30 days' notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion. By continuing to access or use our Services after revisions become effective, you agree to be bound by the revised terms.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-foreground">13. Contact Information</h2>
            <p className="mb-3">If you have any questions about these Terms of Service, please contact us:</p>
            <div className="bg-muted/50 p-4 rounded-lg">
              <p className="font-semibold">Leaders Performance</p>
              <p>Email: support@leadersperformance.ae</p>
              <p>Website: https://leadersperformance.ae</p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-foreground">14. Severability</h2>
            <p>If any provision of these Terms is found to be unenforceable or invalid, that provision will be limited or eliminated to the minimum extent necessary so that these Terms will otherwise remain in full force and effect and enforceable.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-foreground">15. Entire Agreement</h2>
            <p>These Terms, together with our Privacy Policy and any other legal notices published by us on the Services, constitute the entire agreement between you and Leaders Performance concerning the Services and supersede all prior or contemporaneous communications and proposals, whether electronic, oral, or written.</p>
          </section>
        </div>

        <div className="mt-12 pt-8 border-t border-border">
          <Link to="/" className="text-primary hover:underline inline-flex items-center gap-2">
            ← Back to Home
          </Link>
        </div>
      </main>
    </div>
  );
};

export default TermsOfService;
