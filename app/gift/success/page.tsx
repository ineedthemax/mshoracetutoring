import Link from "next/link";
import { PublicNav } from "@/components/layout/PublicNav";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { CheckCircle, Gift } from "lucide-react";

export default async function GiftSuccessPage({ searchParams }: { searchParams: Promise<{ recipient?: string }> }) {
 const { recipient: recipientParam } = await searchParams;
 const recipient = recipientParam || "your recipient";

 return (
 <div className="min-h-screen bg-gray-50">
 <PublicNav />
 <div className="max-w-lg mx-auto px-4 py-24 text-center">
 <div className="w-16 h-16 bg-violet-100 rounded-full flex items-center justify-center mx-auto mb-6">
 <Gift className="w-8 h-8 text-violet-600" />
 </div>
 <h1 className="text-3xl font-bold text-gray-900 mb-3">Gift Sent!</h1>
 <p className="text-gray-500 mb-2 text-lg">
 {recipient} will receive an email with their session gift and a link to book.
 </p>
 <p className="text-gray-400 text-sm mb-8">A receipt and confirmation were also sent to your email.</p>
 <div className="flex gap-3 justify-center">
 <Link href="/"><Button variant="outline">Back to Home</Button></Link>
 <Link href="/book"><Button>Book for Yourself</Button></Link>
 </div>
 </div>
 <Footer />
 </div>
 );
}
