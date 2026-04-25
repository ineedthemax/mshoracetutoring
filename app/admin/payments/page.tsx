import { mockPayments } from "@/lib/mock-data";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { DollarSign, TrendingUp, Clock } from "lucide-react";

const totalPaid = mockPayments.filter((p) => p.status === "paid").reduce((s, p) => s + p.amount, 0);
const totalPending = mockPayments.filter((p) => p.status === "pending").reduce((s, p) => s + p.amount, 0);

export default function PaymentsPage() {
  return (
    <div className="p-8 max-w-5xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Payments</h1>
        <p className="text-gray-500 text-sm mt-1">Revenue tracking and payment history.</p>
      </div>

      <div className="grid grid-cols-3 gap-5 mb-8">
        {[
          { label: "Total Collected", value: `$${totalPaid}`, icon: DollarSign, color: "text-green-600", bg: "bg-green-50" },
          { label: "Pending", value: `$${totalPending}`, icon: Clock, color: "text-yellow-600", bg: "bg-yellow-50" },
          { label: "Total Transactions", value: mockPayments.length, icon: TrendingUp, color: "text-violet-600", bg: "bg-violet-50" },
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

      <Card>
        <CardContent className="p-0">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-xs text-gray-400 border-b border-gray-100">
                <th className="px-6 py-4 font-medium">Description</th>
                <th className="px-6 py-4 font-medium">Date</th>
                <th className="px-6 py-4 font-medium">Amount</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium">Stripe ID</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {mockPayments.map((p) => (
                <tr key={p.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 text-gray-700">{p.description}</td>
                  <td className="px-6 py-4 text-gray-500">{p.date}</td>
                  <td className="px-6 py-4 font-semibold text-gray-900">${p.amount}</td>
                  <td className="px-6 py-4">
                    <Badge variant={p.status === "paid" ? "success" : "warning"}>{p.status}</Badge>
                  </td>
                  <td className="px-6 py-4 text-gray-400 font-mono text-xs">
                    {p.stripeId || "—"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
}
