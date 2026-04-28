import { PublicNav } from "@/components/layout/PublicNav";
import { Footer } from "@/components/layout/Footer";

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <PublicNav />

      <div className="max-w-3xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Privacy Policy</h1>
        <p className="text-sm text-gray-400 mb-10">Last updated: April 28, 2026</p>

        <div className="bg-white rounded-2xl p-8 shadow-sm space-y-8 text-sm text-gray-600 leading-relaxed">

          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-3">1. Who We Are</h2>
            <p>MsHorace Tutoring is operated by Stenita Horace, based in White Plains, Maryland. We provide online math tutoring services for students in 6th–9th grade via Zoom. You can reach us at <a href="mailto:MsHoraceTutoring06@gmail.com" className="text-violet-600 hover:underline">MsHoraceTutoring06@gmail.com</a> or <a href="tel:2272206227" className="text-violet-600 hover:underline">(227) 220-6227</a>.</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-3">2. Information We Collect</h2>
            <p className="mb-3">We collect the following information when you book a session, create an account, or contact us:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Parent or guardian full name and email address</li>
              <li>Student first name and grade level</li>
              <li>Phone number (optional)</li>
              <li>Payment information (processed securely by Stripe — we never store card details)</li>
              <li>Session history and progress notes</li>
              <li>Messages sent through our contact form</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-3">3. Children&apos;s Privacy (COPPA)</h2>
            <p className="mb-3">Our services are directed to students in grades 6–9. We are committed to protecting children&apos;s privacy in compliance with the Children&apos;s Online Privacy Protection Act (COPPA).</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>We do not knowingly collect personal information directly from children under 13 without verifiable parental consent.</li>
              <li>All account registration and booking must be completed by a parent or guardian.</li>
              <li>Parents may request to review, update, or delete their child&apos;s information at any time by contacting us.</li>
              <li>We do not sell or share children&apos;s personal information with third parties for marketing purposes.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-3">4. How We Use Your Information</h2>
            <ul className="list-disc pl-5 space-y-1">
              <li>To book and confirm tutoring sessions</li>
              <li>To send session reports and progress updates to parents</li>
              <li>To process payments via Stripe</li>
              <li>To respond to inquiries submitted through our contact form</li>
              <li>To deliver purchased digital courses and study materials</li>
              <li>To improve our services</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-3">5. How We Share Your Information</h2>
            <p className="mb-3">We do not sell your personal information. We share data only with trusted service providers necessary to operate our business:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li><strong>Stripe</strong> — Payment processing</li>
              <li><strong>Resend</strong> — Transactional email delivery</li>
              <li><strong>Supabase</strong> — Secure database hosting</li>
              <li><strong>Tawk.to</strong> — Live chat support</li>
              <li><strong>Zoom</strong> — Video session delivery</li>
            </ul>
            <p className="mt-3">Each provider has their own privacy policy and we require them to keep your data confidential.</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-3">6. Cookies</h2>
            <p>Our website uses cookies to improve your experience. This includes cookies from Tawk.to (live chat) and essential site functionality cookies. You may disable cookies in your browser settings, though some features may not work as expected. By using our site, you consent to our use of cookies.</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-3">7. Data Security</h2>
            <p>We take reasonable measures to protect your personal information. Payments are encrypted and processed by Stripe. We do not store credit card numbers. Access to student data is restricted to Ms. Horace only.</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-3">8. Your Rights</h2>
            <p className="mb-3">You have the right to:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Request access to the personal data we hold about you or your child</li>
              <li>Request correction or deletion of your data</li>
              <li>Opt out of non-essential communications at any time</li>
              <li>Withdraw consent for data processing</li>
            </ul>
            <p className="mt-3">To exercise any of these rights, email us at <a href="mailto:MsHoraceTutoring06@gmail.com" className="text-violet-600 hover:underline">MsHoraceTutoring06@gmail.com</a>.</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-3">9. Changes to This Policy</h2>
            <p>We may update this Privacy Policy from time to time. Changes will be posted on this page with an updated date. Continued use of our services after changes constitutes acceptance of the updated policy.</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-3">10. Contact Us</h2>
            <p>If you have any questions about this Privacy Policy, please contact us:</p>
            <div className="mt-3 bg-gray-50 rounded-xl p-4">
              <p className="font-medium text-gray-900">MsHorace Tutoring</p>
              <p>Stenita Horace</p>
              <p>White Plains, Maryland</p>
              <p><a href="mailto:MsHoraceTutoring06@gmail.com" className="text-violet-600 hover:underline">MsHoraceTutoring06@gmail.com</a></p>
              <p><a href="tel:2272206227" className="text-violet-600 hover:underline">(227) 220-6227</a></p>
            </div>
          </section>

        </div>
      </div>

      <Footer />
    </div>
  );
}
