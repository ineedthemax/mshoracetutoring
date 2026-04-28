import { PublicNav } from "@/components/layout/PublicNav";
import { Footer } from "@/components/layout/Footer";
import { CheckCircle, XCircle, AlertCircle } from "lucide-react";

export default function RefundsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <PublicNav />

      <div className="max-w-3xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Cancellation & Refund Policy</h1>
        <p className="text-sm text-gray-400 mb-10">Last updated: April 28, 2026</p>

        <div className="space-y-5">

          {/* Live Sessions */}
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Live Sessions (1-on-1 & Group)</h2>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium text-gray-800">Cancelled 24+ hours before session</p>
                  <p className="text-sm text-gray-500">Full refund or free reschedule — no questions asked.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-amber-500 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium text-gray-800">Cancelled within 24 hours</p>
                  <p className="text-sm text-gray-500">Non-refundable. You may reschedule for a $15 rescheduling fee.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <XCircle className="w-5 h-5 text-red-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium text-gray-800">No-show (no notice given)</p>
                  <p className="text-sm text-gray-500">Session is forfeited. No refund or reschedule.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium text-gray-800">First-session guarantee</p>
                  <p className="text-sm text-gray-500">Not satisfied after your first session? Contact us within 48 hours for a full refund.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Digital Courses */}
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Digital Courses & Study Resources</h2>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <XCircle className="w-5 h-5 text-red-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium text-gray-800">All digital sales are final</p>
                  <p className="text-sm text-gray-500">Due to the downloadable nature of our products, we do not offer refunds after purchase. Please review the free preview lessons before buying.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium text-gray-800">Technical issues</p>
                  <p className="text-sm text-gray-500">If you experience a problem accessing your purchase, contact us within 7 days and we will resolve it promptly.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Session Packs */}
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Session Packages (4-Pack & 8-Pack)</h2>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium text-gray-800">Unused sessions</p>
                  <p className="text-sm text-gray-500">Unused sessions from a pack may be refunded on a pro-rated basis (minus any discount received) within 60 days of purchase.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-amber-500 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium text-gray-800">Installment plans</p>
                  <p className="text-sm text-gray-500">Installment plans are binding. If you cancel mid-plan, you are responsible for any sessions already completed at the standard (non-discounted) rate.</p>
                </div>
              </div>
            </div>
          </div>

          {/* How to request */}
          <div className="bg-violet-50 border border-violet-200 rounded-2xl p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-3">How to Request a Refund or Cancellation</h2>
            <p className="text-sm text-gray-600 mb-4">Email us at <a href="mailto:MsHoraceTutoring06@gmail.com" className="text-violet-600 hover:underline font-medium">MsHoraceTutoring06@gmail.com</a> or call <a href="tel:2272206227" className="text-violet-600 hover:underline font-medium">(227) 220-6227</a> with your name, session date, and reason. We respond within 24 hours.</p>
          </div>

        </div>
      </div>

      <Footer />
    </div>
  );
}
