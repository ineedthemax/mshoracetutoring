import { PublicNav } from "@/components/layout/PublicNav";
import { Footer } from "@/components/layout/Footer";

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <PublicNav />

      <div className="max-w-3xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Terms of Service</h1>
        <p className="text-sm text-gray-400 mb-10">Last updated: April 28, 2026</p>

        <div className="bg-white rounded-2xl p-8 shadow-sm space-y-8 text-sm text-gray-600 leading-relaxed">

          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-3">1. Acceptance of Terms</h2>
            <p>By booking a session, creating an account, or using any services provided by MsHorace Tutoring (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;), you agree to these Terms of Service. These terms apply to all clients, parents, guardians, and students. If you do not agree, please do not use our services.</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-3">2. Services Provided</h2>
            <p className="mb-3">MsHorace Tutoring provides:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Live 1-on-1 math tutoring sessions via Zoom (30 or 60 minutes)</li>
              <li>Small group tutoring classes via Zoom (3–10 students)</li>
              <li>Self-paced digital courses (PDF downloads)</li>
              <li>Individual study resources (worksheets, study guides, practice tests)</li>
            </ul>
            <p className="mt-3">All live sessions are conducted online via Zoom. A stable internet connection and a device with a camera and microphone are required.</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-3">3. Parental Responsibility</h2>
            <p>Because our students are minors (ages approximately 11–15), a parent or guardian must create the account and agree to these terms on the student&apos;s behalf. By booking a session, the parent or guardian confirms they have the authority to do so and takes responsibility for ensuring their child participates appropriately.</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-3">4. Payments</h2>
            <ul className="list-disc pl-5 space-y-1">
              <li>All payments are processed securely through Stripe.</li>
              <li>Payment is due at the time of booking.</li>
              <li>Session packages and digital course purchases are non-transferable.</li>
              <li>Installment plans are binding - missed payments may result in loss of access to course materials.</li>
              <li>Prices are listed in USD and are subject to change with notice.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-3">5. Cancellation & Refund Policy</h2>
            <ul className="list-disc pl-5 space-y-1">
              <li><strong>Cancellation 24+ hours before session:</strong> Full refund or free reschedule.</li>
              <li><strong>Cancellation within 24 hours:</strong> Non-refundable, but may be rescheduled for a $15 fee.</li>
              <li><strong>No-show (student does not attend without notice):</strong> Session is forfeited, no refund.</li>
              <li><strong>Digital courses & study resources:</strong> All sales are final due to the digital nature of the product. If you experience a technical issue accessing your purchase, contact us within 7 days.</li>
              <li><strong>First-session guarantee:</strong> If you are not satisfied after your first session, contact us within 48 hours and we will work to make it right or issue a full refund.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-3">6. Session Conduct</h2>
            <ul className="list-disc pl-5 space-y-1">
              <li>Students are expected to arrive on time and be prepared with any relevant materials.</li>
              <li>Respectful behavior is required at all times. Abusive, disruptive, or inappropriate behavior may result in termination of the session without refund.</li>
              <li>Sessions may be recorded by the tutor for quality and note-taking purposes. Recordings will not be shared publicly.</li>
              <li>Parents are welcome to observe any session.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-3">7. Digital Course Access</h2>
            <ul className="list-disc pl-5 space-y-1">
              <li>Upon purchase, you receive lifetime access to the digital course materials for personal, non-commercial use.</li>
              <li>Course materials may not be shared, resold, redistributed, or reproduced without written permission.</li>
              <li>We reserve the right to update course content at any time to improve quality.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-3">8. Results Disclaimer</h2>
            <p>MsHorace Tutoring makes every effort to provide high-quality instruction tailored to each student. However, we cannot guarantee specific academic outcomes, grade improvements, or test score increases. Results depend on student effort, consistency, and individual learning factors beyond our control.</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-3">9. Intellectual Property</h2>
            <p>All content on this website - including course materials, worksheets, session reports, lesson plans, and website design - is the intellectual property of MsHorace Tutoring and may not be copied, reproduced, or used without written permission.</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-3">10. Limitation of Liability</h2>
            <p>MsHorace Tutoring is not liable for any indirect, incidental, or consequential damages arising from use of our services. Our total liability shall not exceed the amount paid for the specific session or product in question.</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-3">11. Changes to Terms</h2>
            <p>We reserve the right to update these Terms of Service at any time. Updated terms will be posted on this page. Continued use of our services after changes constitutes acceptance.</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-3">12. Governing Law</h2>
            <p>These terms are governed by the laws of the State of Maryland. Any disputes shall be resolved in the courts of Charles County, Maryland.</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-3">13. Contact Us</h2>
            <p>Questions about these terms? Reach out:</p>
            <div className="mt-3 bg-gray-50 rounded-xl p-4">
              <p className="font-medium text-gray-900">MsHorace Tutoring</p>
              <p>Stenita Horace - White Plains, Maryland</p>
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
