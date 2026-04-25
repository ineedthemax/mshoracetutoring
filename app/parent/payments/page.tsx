import { DashboardSidebar } from "@/components/layout/DashboardSidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { mockPayments } from "@/lib/mock-data";
import { DollarSign, CreditCard } from "lucide-react";

export default function ParentPaymentsPage() {
  const totalPaid = mockPayments.filter(p => p.status === "paid").reduce((a, p) => a + p.amount, 0);
  const totalPending = mockPayments.filter(p => p.status === "pending").reduce((a, p) => a + p.amount, 0);

  return (
    <div className="flex min-h-screen bg-gray-50">
      <DashboardSidebar role="parent" />
      <main className="ml-64 flex-1 p-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Payments</h1>
          <p className="text-gray-500 text-sm mt-1">Your session payment history.</p>
        </div>

        <div className="grid grid-cols-3 gap-5 mb-8">
          <Card>
            <CardContent className="pt-5 pb-5">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 bg-green-50 rounded-lg flex items-center justify-center">
                  <DollarSign className="w-4 h-4 text-green-600" />
                </div>
                <span className="text-sm text-gray-500">Total Paid</span>
              </div>
              <p className="text-2xl font-bold text-gray-900">${totalPaid}</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-5 pb-5">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 bg-yellow-50 rounded-lg flex items-center justify-center">
                  <CreditCard className="w-4 h-4 text-yellow-600" />
                </div>
                <span className="text-sm text-gray-500">Pending</span>
              </div>
              <p className="text-2xl font-bold text-gray-900">${totalPending}</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-5 pb-5">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 bg-violet-50 rounded-lg flex items-center justify-center">
                  <DollarSign className="w-4 h-4 text-violet-600" />
                </div>
                <span className="text-sm text-gray-500">Total Transactions</span>
              </div>
              <p className="text-2xl font-bold text-gray-900">{mockPayments.length}</p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Payment History</CardTitle>
          </CardHeader>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b border-gray-100">
                <tr>
                  {["Date", "Description", "Amount", "Status", "Stripe ID"].map(h => (
                    <th key={h} className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {mockPayments.map((payment) => (
                  <tr key={payment.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {new Date(payment.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-800 max-w-xs">{payment.description}</td>
                    <td className="px-6 py-4 text-sm font-semibold text-gray-900">${payment.amount}</td>
                    <td className="px-6 py-4">
                      <Badge variant={payment.status === "paid" ? "success" : "warning"}>
                        {payment.status}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 text-xs text-gray-400 font-mono">{payment.stripeId || "—"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </main>
    </div>
  );
}
