import Link from "next/link";
import { CheckCircle, Video, Calendar, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function BookingSuccessPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-lg w-full">
        <Card>
          <CardContent className="pt-10 pb-10 px-8 text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-green-600" />
            </div>

            <h1 className="text-2xl font-bold text-gray-900 mb-2">You&apos;re booked!</h1>
            <p className="text-gray-500 mb-8">
              Payment confirmed. Check your email for your Zoom link and session details.
            </p>

            <div className="space-y-3 text-left mb-8">
              {[
                { icon: Mail, text: "Confirmation email sent to your inbox" },
                { icon: Video, text: "Zoom link included in your confirmation email" },
                { icon: Calendar, text: "Session added to your parent dashboard" },
              ].map((item) => (
                <div key={item.text} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                  <div className="w-8 h-8 bg-violet-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <item.icon className="w-4 h-4 text-violet-600" />
                  </div>
                  <span className="text-sm text-gray-700">{item.text}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-col gap-3">
              <Link href="/parent">
                <Button className="w-full">Go to My Dashboard</Button>
              </Link>
              <Link href="/book">
                <Button variant="outline" className="w-full">Book Another Session</Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        <p className="text-center text-sm text-gray-400 mt-4">
          Questions? Email us at{" "}
          <a href="mailto:MsHoraceTutoring06@gmail.com" className="text-violet-600 hover:underline">
            MsHoraceTutoring06@gmail.com
          </a>
        </p>
      </div>
    </div>
  );
}
