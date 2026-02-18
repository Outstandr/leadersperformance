import { Navigation } from "@/components/Navigation";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Privacy Policy - Leaders Performance</title>
        <meta name="description" content="Privacy Policy for Leaders Performance - How we collect, use, and protect your personal information" />
        <meta name="robots" content="index, follow" />
      </Helmet>
      
      <Navigation />
      <main className="container mx-auto px-4 pt-32 pb-16 max-w-4xl">
        <h1 className="text-4xl font-bold mb-4">Privacy Policy</h1>
        <p className="text-sm text-foreground/60 mb-8">Last Updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
        
        <div className="space-y-8 text-foreground/80 leading-relaxed">
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-foreground">1. Introduction</h2>
            <p className="mb-3">Welcome to Leaders Performance ("we," "our," or "us"). We are committed to protecting your personal information and your right to privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website, use our services, or engage with our coaching programs.</p>
            <p>Please read this Privacy Policy carefully. If you do not agree with the terms of this Privacy Policy, please do not access our services. By using our services, you consent to the practices described in this Privacy Policy.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-foreground">2. Information We Collect</h2>
            <p className="mb-4 font-semibold">We collect personal information that you voluntarily provide to us when you:</p>
            
            <h3 className="text-xl font-semibold mb-3 text-foreground">2.1 Personal Information You Provide</h3>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li><strong>Account Registration:</strong> Name, email address, phone number, username, password</li>
              <li><strong>Profile Information:</strong> Professional background, goals, preferences, biographical information</li>
              <li><strong>Payment Information:</strong> Billing address, payment card details (processed securely by third-party payment processors)</li>
              <li><strong>Communications:</strong> Information you provide when contacting us, feedback, survey responses</li>
              <li><strong>Program Participation:</strong> Assessment results, progress data, performance metrics, coaching notes</li>
            </ul>

            <h3 className="text-xl font-semibold mb-3 text-foreground">2.2 Information Automatically Collected</h3>
            <p className="mb-3">When you access our services, we automatically collect certain information:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Device Information:</strong> IP address, browser type, operating system, device identifiers</li>
              <li><strong>Usage Data:</strong> Pages visited, time spent on pages, links clicked, referring website</li>
              <li><strong>Cookies and Tracking:</strong> Session data, preferences, analytics information</li>
              <li><strong>Location Data:</strong> General geographic location based on IP address</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-foreground">3. How We Use Your Information</h2>
            <p className="mb-4">We use the information we collect for various purposes, including:</p>
            
            <h3 className="text-xl font-semibold mb-3 text-foreground">3.1 Service Delivery</h3>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li>Providing, maintaining, and improving our coaching programs and services</li>
              <li>Processing transactions and managing subscriptions</li>
              <li>Creating and managing your account</li>
              <li>Personalizing your experience and content</li>
              <li>Tracking your progress and performance metrics</li>
            </ul>

            <h3 className="text-xl font-semibold mb-3 text-foreground">3.2 Communication</h3>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li>Sending you program updates, schedules, and coaching materials</li>
              <li>Responding to your inquiries and providing customer support</li>
              <li>Sending administrative information, such as changes to terms or policies</li>
              <li>Sending marketing communications about our services (with your consent)</li>
            </ul>

            <h3 className="text-xl font-semibold mb-3 text-foreground">3.3 Analytics and Improvement</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>Analyzing usage patterns to improve our services</li>
              <li>Conducting research and analytics to enhance user experience</li>
              <li>Monitoring and preventing fraud and security threats</li>
              <li>Complying with legal obligations and protecting our rights</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-foreground">4. How We Share Your Information</h2>
            <p className="mb-4">We do not sell your personal information. We may share your information in the following circumstances:</p>
            
            <h3 className="text-xl font-semibold mb-3 text-foreground">4.1 Service Providers</h3>
            <p className="mb-3">We share information with third-party service providers who perform services on our behalf:</p>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li>Payment processors for transaction processing</li>
              <li>Email service providers for communications</li>
              <li>Cloud hosting providers for data storage</li>
              <li>Analytics providers to understand service usage</li>
              <li>Customer support tools and platforms</li>
            </ul>
            <p className="mb-4">These service providers are contractually obligated to protect your information and use it only for the purposes we specify.</p>

            <h3 className="text-xl font-semibold mb-3 text-foreground">4.2 Legal Requirements</h3>
            <p className="mb-3">We may disclose your information if required by law or in response to:</p>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li>Legal processes, court orders, or government requests</li>
              <li>Protection of our rights, property, or safety</li>
              <li>Prevention of fraud or security threats</li>
              <li>Enforcement of our Terms of Service</li>
            </ul>

            <h3 className="text-xl font-semibold mb-3 text-foreground">4.3 Business Transfers</h3>
            <p>If we are involved in a merger, acquisition, or sale of assets, your information may be transferred as part of that transaction. We will notify you of any such change in ownership or control of your personal information.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-foreground">5. Cookies and Tracking Technologies</h2>
            <p className="mb-4">We use cookies and similar tracking technologies to track activity on our services and store certain information. Types of cookies we use:</p>
            
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Essential Cookies:</strong> Necessary for the website to function properly</li>
              <li><strong>Analytics Cookies:</strong> Help us understand how visitors interact with our website</li>
              <li><strong>Preference Cookies:</strong> Remember your preferences and settings</li>
              <li><strong>Marketing Cookies:</strong> Track your activity across websites for advertising purposes</li>
            </ul>
            
            <p className="mt-4">You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, you may not be able to use some portions of our services.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-foreground">6. Data Security</h2>
            <p className="mb-4">We implement appropriate technical and organizational security measures to protect your personal information from unauthorized access, alteration, disclosure, or destruction. These measures include:</p>
            
            <ul className="list-disc pl-6 space-y-2">
              <li>Encryption of data in transit and at rest using industry-standard protocols</li>
              <li>Regular security assessments and vulnerability testing</li>
              <li>Access controls limiting who can access personal information</li>
              <li>Secure authentication mechanisms for user accounts</li>
              <li>Regular backup procedures and disaster recovery plans</li>
            </ul>
            
            <p className="mt-4">However, please note that no method of transmission over the internet or electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your personal information, we cannot guarantee its absolute security.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-foreground">7. Data Retention</h2>
            <p className="mb-4">We retain your personal information only for as long as necessary to fulfill the purposes outlined in this Privacy Policy, unless a longer retention period is required or permitted by law. Retention periods vary based on:</p>
            
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Account Information:</strong> Retained while your account is active and for a reasonable period thereafter</li>
              <li><strong>Transaction Records:</strong> Retained for accounting and legal compliance purposes (typically 7 years)</li>
              <li><strong>Marketing Data:</strong> Retained until you opt out or request deletion</li>
              <li><strong>Analytics Data:</strong> Typically anonymized and retained for analytical purposes</li>
            </ul>
            
            <p className="mt-4">When we no longer need your personal information, we will securely delete or anonymize it.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-foreground">8. Your Privacy Rights</h2>
            <p className="mb-4">Depending on your location, you may have the following rights regarding your personal information:</p>
            
            <h3 className="text-xl font-semibold mb-3 text-foreground">8.1 Access and Portability</h3>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li>Request access to the personal information we hold about you</li>
              <li>Receive a copy of your personal information in a portable format</li>
            </ul>

            <h3 className="text-xl font-semibold mb-3 text-foreground">8.2 Correction and Update</h3>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li>Update or correct inaccurate or incomplete personal information</li>
              <li>Access account settings to modify your information directly</li>
            </ul>

            <h3 className="text-xl font-semibold mb-3 text-foreground">8.3 Deletion</h3>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li>Request deletion of your personal information</li>
              <li>Close your account and remove associated data</li>
            </ul>

            <h3 className="text-xl font-semibold mb-3 text-foreground">8.4 Marketing Opt-Out</h3>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li>Unsubscribe from marketing emails using the link in our emails</li>
              <li>Opt out of marketing communications in your account settings</li>
              <li>Contact us to be removed from marketing lists</li>
            </ul>

            <h3 className="text-xl font-semibold mb-3 text-foreground">8.5 Cookie Preferences</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>Manage cookie preferences through your browser settings</li>
              <li>Opt out of analytics tracking</li>
            </ul>
            
            <p className="mt-4">To exercise any of these rights, please contact us using the information provided in Section 13. We will respond to your request within 30 days.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-foreground">9. Third-Party Links and Services</h2>
            <p className="mb-4">Our services may contain links to third-party websites, applications, or services that are not owned or controlled by Leaders Performance. We are not responsible for the privacy practices or content of these third-party sites.</p>
            <p>We encourage you to review the privacy policies of any third-party sites you visit. This Privacy Policy applies only to information collected by our services.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-foreground">10. Children's Privacy</h2>
            <p className="mb-4">Our services are not intended for individuals under the age of 18. We do not knowingly collect personal information from children under 18.</p>
            <p>If we become aware that we have collected personal information from a child under 18 without verification of parental consent, we will take steps to remove that information from our servers. If you believe we have collected information from a child under 18, please contact us immediately.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-foreground">11. International Data Transfers</h2>
            <p className="mb-4">Your information may be transferred to and maintained on servers located outside of your country, state, or jurisdiction where data protection laws may differ from those in your jurisdiction.</p>
            <p className="mb-4">If you are located outside the United Arab Emirates and choose to provide information to us, please note that we transfer the data to the UAE and process it there.</p>
            <p>By submitting your personal information, you consent to this transfer, storing, and processing. We will take all steps reasonably necessary to ensure that your data is treated securely and in accordance with this Privacy Policy.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-foreground">12. Changes to This Privacy Policy</h2>
            <p className="mb-4">We may update our Privacy Policy from time to time to reflect changes in our practices, technology, legal requirements, or other factors. When we make changes, we will:</p>
            
            <ul className="list-disc pl-6 space-y-2">
              <li>Update the "Last Updated" date at the top of this Privacy Policy</li>
              <li>Post the new Privacy Policy on our website</li>
              <li>Notify you via email or prominent notice on our services for material changes</li>
              <li>Obtain your consent if required by applicable law</li>
            </ul>
            
            <p className="mt-4">We encourage you to review this Privacy Policy periodically to stay informed about how we are protecting your information. Your continued use of our services after changes are posted constitutes your acceptance of the updated Privacy Policy.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-foreground">13. Contact Us</h2>
            <p className="mb-4">If you have any questions, concerns, or requests regarding this Privacy Policy or our privacy practices, please contact us:</p>
            
            <div className="bg-muted/50 p-6 rounded-lg space-y-2">
              <p className="font-semibold text-lg">Leaders Performance</p>
              <p><strong>Email:</strong> privacy@leadersperformance.ae</p>
              <p><strong>Support:</strong> support@leadersperformance.ae</p>
              <p><strong>Website:</strong> https://leadersperformance.ae</p>
              <p className="pt-2 text-sm">We will respond to all legitimate requests within 30 days.</p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-foreground">14. Data Protection Officer</h2>
            <p>If you have questions about how your personal data is processed or would like to exercise your privacy rights, you may contact our Data Protection Officer at: dpo@leadersperformance.ae</p>
          </section>

          <section className="border-t border-border pt-6">
            <p className="text-sm text-foreground/60">
              By using Leaders Performance services, you acknowledge that you have read and understood this Privacy Policy and agree to its terms.
            </p>
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

export default PrivacyPolicy;
