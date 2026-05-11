import { redirect } from "next/navigation";
import { DashboardSidebar } from "@/components/layout/DashboardSidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { createClient } from "@/lib/supabase/server";
import { DollarSign, CreditCard, Receipt } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function ParentPaymentsPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const { data: sessions } = await supabase
    .from("sessions")
    .select("id, subject, session_date, session_type, price_cents, payment_status, stripe_session_id, created_at")
    .eq("parent_email", user.email ?? "")
    .order("created_at", { ascending: false });

  const payments = sessions ?? [];
  const totalPaid = payments
    .filter(p => p.payment_status === "paid")
    .reduce((a, p) => a + (p.price_cents ?? 0), 0) / 100;

  return (
    <div className="flex min-h-screen bg-[#f8f8fb]">
      <DashboardSidebar role="parent" />
      <main className="md:ml-64 flex-1 p-4 md:p-6 pt-18 md:pt-6 pb-20 md:pb-6 max-w-5xl">
        <div className="mb-6">
          <h1 className="text-xl font-bold text-gray-900">Payments</h1>
          <p className="text-gray-400 text-xs mt-0.5">Your session payment history.</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-white rounded-2xl p-4 border border-gray-100">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-7 h-7 bg-green-50 rounded-lg flex items-center justify-center">
                <DollarSign className="w-3.5 h-3.5 text-green-600" />
              </div>
              <span className="text-xs text-gray-400">Total Paid</span>
            </div>
            <p className="text-2xl font-bold text-gray-900">${totalPaid.toFixed(0)}</p>
          </div>
          <div className="bg-white rounded-2xl p-4 border border-gray-100">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-7 h-7 bg-violet-50 rounded-lg flex items-center justify-center">
                <Receipt className="w-3.5 h-3.5 text-violet-600" />
              </div>
              <span className="text-xs text-gray-400">Sessions Booked</span>
            </div>
            <p className="text-2xl font-bold text-gray-900">{payments.length}</p>
          </div>
          <div className="bg-white rounded-2xl p-4 border border-gray-100">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-7 h-7 bg-blue-50 rounded-lg flex items-center justify-center">
                <CreditCard className="w-3.5 h-3.5 text-blue-600" />
              </div>
              <span className="text-xs text-gray-400">Avg Per Session</span>
            </div>
            <p className="text-2xl font-bold text-gray-900">
              ${payments.length > 0 ? (totalPaid / payments.length).toFixed(0) : "0"}
            </p>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-semibold text-gray-800">Payment History</CardTitle>
          </CardHeader>
          {payments.length === 0 ? (
            <CardContent>
              <p className="text-sm text-gray-400 text-center py-6">No payments yet. Book a session to get started.</p>
            </CardContent>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="border-b border-gray-100">
                  <tr>
                    {["Date", "Session", "Type", "Amount", "Status"].map(h => (
                      <th key={h} className="text-left px-5 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wide">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {payments.map((p) => (
                    <tr key={p.id} className="hover:bg-gray-50">
                      <td className="px-5 py-4 text-sm text-gray-600">
                        {p.session_date
                          ? new Date(p.session_date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
                          : new Date(p.created_at).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
                        }
                      </td>
                      <td className="px-5 py-4 text-sm font-medium text-gray-800">{p.subject}</td>
                      <td className="px-5 py-4">
                        <Badge variant="outline" className="text-xs">{p.session_type}</Badge>
                      </td>
                      <td className="px-5 py-4 text-sm font-semibold text-gray-900">
                        ${((p.price_cents ?? 0) / 100).toFixed(0)}
                      </td>
                      <td className="px-5 py-4">
                        <Badge variant={p.payment_status === "paid" ? "success" : "warning"} className="text-xs">
                          {p.payment_status ?? "pending"}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </Card>
      </main>
    </div>
  );
}
