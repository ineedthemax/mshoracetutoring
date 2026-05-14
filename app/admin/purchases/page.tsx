import { createAdminClient } from "@/lib/supabase/admin";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { ResendDeliveryButton } from "./ResendDeliveryButton";
import { Package } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function PurchasesPage() {
  const admin = createAdminClient();

  const { data: purchases } = await admin
    .from("digital_purchases")
    .select("*")
    .order("created_at", { ascending: false });

  const rows = purchases ?? [];

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Digital Purchases</h1>
        <p className="text-gray-500 text-sm mt-1">All digital product purchases. Use Resend to manually deliver if a customer didn&apos;t receive their file.</p>
      </div>

      {rows.length === 0 ? (
        <Card>
          <CardContent className="py-16 text-center">
            <Package className="w-10 h-10 text-gray-200 mx-auto mb-3" />
            <p className="text-gray-400 text-sm">No digital purchases yet.</p>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-xs text-gray-400 border-b border-gray-100">
                  <th className="px-5 py-4 font-medium">Date</th>
                  <th className="px-5 py-4 font-medium">Customer</th>
                  <th className="px-5 py-4 font-medium">Product</th>
                  <th className="px-5 py-4 font-medium">Amount</th>
                  <th className="px-5 py-4 font-medium">Delivered</th>
                  <th className="px-5 py-4 font-medium">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {rows.map((p) => (
                  <tr key={p.id} className="hover:bg-gray-50">
                    <td className="px-5 py-4 text-gray-500 whitespace-nowrap">
                      {new Date(p.created_at).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                    </td>
                    <td className="px-5 py-4 text-gray-800 font-medium">{p.buyer_email || "—"}</td>
                    <td className="px-5 py-4 text-gray-700">{p.product_name}</td>
                    <td className="px-5 py-4 font-semibold text-gray-900">
                      ${((p.amount_cents ?? 0) / 100).toFixed(2)}
                    </td>
                    <td className="px-5 py-4">
                      <Badge variant={p.download_sent ? "success" : "destructive"} className="text-xs">
                        {p.download_sent ? "Sent" : "Not Sent"}
                      </Badge>
                    </td>
                    <td className="px-5 py-4">
                      <ResendDeliveryButton
                        purchaseId={p.id}
                        productKey={p.product_key}
                        productName={p.product_name}
                        buyerEmail={p.buyer_email}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}
    </div>
  );
}
