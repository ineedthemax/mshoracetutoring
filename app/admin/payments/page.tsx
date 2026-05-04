import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { DollarSign, TrendingUp, Clock, BookOpen, Calendar } from "lucide-react";
import { createAdminClient } from "@/lib/supabase/admin";

export const dynamic = "force-dynamic";

export default async function PaymentsPage() {
  const admin = createAdminClient();

  // Fetch session payments
  const { data: sessionPayments } = await admin
    .from("payments")
    .select(`
      id, amount_cents, status, stripe_payment_intent_id,
      stripe_checkout_session_id, created_at
    `)
    .order("created_at", { ascending: false });

  // Fetch digital product purchases
  const { data: digitalPurchases } = await admin
    .from("digital_purchases")
    .select("id, buyer_email, product_name, amount_cents, status, stripe_session_id, created_at")
    .order("created_at", { ascending: false });

  // Fetch sessions for descriptions
  const { data: sessions } = await admin
    .from("sessions")
    .select("stripe_session_id, parent_email, subject, session_date, session_type")
    .order("created_at", { ascending: false });

  const sessionMap: Record<string, any> = {};
  (sessions ?? []).forEach(s => {
    if (s.stripe_session_id) sessionMap[s.stripe_session_id] = s;
  });

  // Combine all transactions
  const allTransactions = [
    ...(sessionPayments ?? []).map(p => {
      const session = sessionMap[p.stripe_checkout_session_id ?? ""];
      return {
        id: p.id,
        description: session
          ? `${session.session_type === "group" ? "Group Class" : "1-on-1 Session"} - ${session.subject}`
          : "Tutoring Session",
        email: session?.parent_email ?? "",
        date: p.created_at,
        amount: (p.amount_cents ?? 0) / 100,
        status: p.status === "succeeded" ? "paid" : p.status,
        stripeId: p.stripe_payment_intent_id ?? p.stripe_checkout_session_id ?? "",
        type: "session",
      };
    }),
    ...(digitalPurchases ?? []).map(p => ({
      id: p.id,
      description: p.product_name ?? "Digital Product",
      email: p.buyer_email ?? "",
      date: p.created_at,
      amount: (p.amount_cents ?? 0) / 100,
      status: p.status,
      stripeId: p.stripe_session_id ?? "",
      type: "digital",
    })),
  ].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const totalCollected = allTransactions
    .filter(t => t.status === "paid" || t.status === "succeeded")
    .reduce((s, t) => s + t.amount, 0);

  const totalPending = allTransactions
    .filter(t => t.status === "pending")
    .reduce((s, t) => s + t.amount, 0);

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Payments</h1>
        <p className="text-gray-500 text-sm mt-1">All revenue from sessions and digital products.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-8">
        {[
          { label: "Total Collected", value: `$${totalCollected.toFixed(0)}`, icon: DollarSign, color: "text-green-600", bg: "bg-green-50" },
          { label: "Pending", value: `$${totalPending.toFixed(0)}`, icon: Clock, color: "text-yellow-600", bg: "bg-yellow-50" },
          { label: "Total Transactions", value: allTransactions.length, icon: TrendingUp, color: "text-violet-600", bg: "bg-violet-50" },
        ].map((stat) => (
          <Card key={stat.label}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm text-gray-500">{stat.label}</span>
                <div className={`w-9 h-9 ${stat.bg} rounded-xl flex items-center justify-center`}>
                  <stat.icon className={`w-5 h-5 ${stat.color}`} />
                </div>
              </div>
              <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Transactions table */}
      <Card>
        <CardContent className="p-0">
          {allTransactions.length === 0 ? (
            <div className="text-center py-16 text-gray-400">
              <DollarSign className="w-10 h-10 mx-auto mb-3 opacity-30" />
              <p className="font-medium">No payments yet</p>
              <p className="text-sm mt-1">Payments will appear here after customers complete checkout.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-xs text-gray-400 border-b border-gray-100">
                    <th className="px-5 py-4 font-medium">Type</th>
                    <th className="px-5 py-4 font-medium">Description</th>
                    <th className="px-5 py-4 font-medium">Customer</th>
                    <th className="px-5 py-4 font-medium">Date</th>
                    <th className="px-5 py-4 font-medium">Amount</th>
                    <th className="px-5 py-4 font-medium">Status</th>
                    <th className="px-5 py-4 font-medium">Stripe ID</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {allTransactions.map((t) => (
                    <tr key={t.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-5 py-4">
                        {t.type === "session" ? (
                          <div className="flex items-center gap-1.5 text-violet-600">
                            <Calendar className="w-3.5 h-3.5" />
                            <span className="text-xs font-medium">Session</span>
                          </div>
                        ) : (
                          <div className="flex items-center gap-1.5 text-blue-600">
                            <BookOpen className="w-3.5 h-3.5" />
                            <span className="text-xs font-medium">Digital</span>
                          </div>
                        )}
                      </td>
                      <td className="px-5 py-4 text-gray-700 max-w-[200px] truncate">{t.description}</td>
                      <td className="px-5 py-4 text-gray-500 text-xs">{t.email || "--"}</td>
                      <td className="px-5 py-4 text-gray-500 text-xs">
                        {new Date(t.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                      </td>
                      <td className="px-5 py-4 font-semibold text-gray-900">${t.amount.toFixed(0)}</td>
                      <td className="px-5 py-4">
                        <Badge variant={t.status === "paid" || t.status === "succeeded" ? "success" : "warning"}>
                          {t.status}
                        </Badge>
                      </td>
                      <td className="px-5 py-4 text-gray-400 font-mono text-xs truncate max-w-[120px]">
                        {t.stripeId ? (
                          <a
                            href={`https://dashboard.stripe.com/payments/${t.stripeId}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-violet-600 transition-colors"
                            title={t.stripeId}
                          >
                            {t.stripeId.slice(0, 16)}...
                          </a>
                        ) : "--"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
