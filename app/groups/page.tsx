import Link from "next/link";
import { PublicNav } from "@/components/layout/PublicNav";
import { Footer } from "@/components/layout/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { mockGroupClasses } from "@/lib/mock-data";
import { Users, Clock, Calendar } from "lucide-react";

export default function GroupsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <PublicNav />

      {/* Hero */}
      <section className="bg-white py-16 px-4 border-b border-gray-100">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Group Classes</h1>
          <p className="text-xl text-gray-500 mb-6">Small group sessions (3-8 students) for exam prep, concept review, and shared learning. More affordable still high impact.</p>
          <div className="flex flex-wrap gap-4 justify-center text-sm text-gray-500">
            <span className="flex items-center gap-1.5"><Users className="w-4 h-4 text-violet-500" /> 3-8 students max</span>
            <span className="flex items-center gap-1.5"><Clock className="w-4 h-4 text-violet-500" /> 90-120 minutes</span>
            <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4 text-violet-500" /> Evenings &amp; weekends</span>
          </div>
        </div>
      </section>

      {/* Classes grid */}
      <section className="max-w-5xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 gap-6">
          {mockGroupClasses.map((cls) => {
            const spotsLeft = cls.capacity - cls.enrolled;
            const isFull = cls.status === "full";
            return (
              <Card key={cls.id} className={`overflow-hidden ${isFull ? "opacity-80" : "hover:shadow-md transition-shadow"}`}>
                <div className="bg-gradient-to-r from-violet-50 to-violet-100 px-6 py-4 border-b border-gray-100">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-bold text-gray-900 text-lg">{cls.title}</h3>
                      <p className="text-sm text-violet-600 font-medium mt-0.5">{cls.subject} · {cls.grade}</p>
                    </div>
                    {isFull ? (
                      <Badge variant="destructive">Full</Badge>
                    ) : spotsLeft <= 2 ? (
                      <Badge variant="warning">Only {spotsLeft} left!</Badge>
                    ) : (
                      <Badge variant="success">{spotsLeft} spots left</Badge>
                    )}
                  </div>
                </div>
                <CardContent className="pt-5">
                  <p className="text-sm text-gray-500 leading-relaxed mb-4">{cls.description}</p>
                  <div className="grid grid-cols-2 gap-3 text-sm mb-5">
                    <div className="flex items-center gap-2 text-gray-600">
                      <Calendar className="w-4 h-4 text-violet-400" />
                      {new Date(cls.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <Clock className="w-4 h-4 text-violet-400" />
                      {cls.time} · {cls.duration} min
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <Users className="w-4 h-4 text-violet-400" />
                      {cls.enrolled}/{cls.capacity} enrolled
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-2xl font-bold text-violet-600">${cls.price}</span>
                      <span className="text-gray-400 text-xs">per student</span>
                    </div>
                  </div>

                  {/* Enrollment bar */}
                  <div className="mb-5">
                    <div className="flex justify-between text-xs text-gray-400 mb-1">
                      <span>Enrollment</span>
                      <span>{cls.enrolled}/{cls.capacity}</span>
                    </div>
                    <div className="h-1.5 bg-gray-100 rounded-full">
                      <div
                        className={`h-1.5 rounded-full ${isFull ? "bg-red-400" : "bg-violet-500"}`}
                        style={{ width: `${(cls.enrolled / cls.capacity) * 100}%` }}
                      />
                    </div>
                  </div>

                  <Link href="/book">
                    <Button
                      className="w-full"
                      variant={isFull ? "outline" : "default"}
                      disabled={isFull}
                    >
                      {isFull ? "Join Waitlist" : "Enroll Now $" + cls.price}
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      {/* Info section */}
      <section className="bg-white py-12 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">How Group Classes Work</h2>
          <p className="text-gray-500 mb-8">Same quality as 1-on-1 just shared with a small, focused group at a fraction of the price.</p>
          <div className="grid sm:grid-cols-3 gap-6 text-left">
            {[
              { title: "Small Size, High Impact", desc: "Max 8 students per class. Marcus interacts with each student personally and calls on everyone." },
              { title: "Live on Zoom", desc: "Not a video a real live session. Ask questions, work problems, and get feedback in real time." },
              { title: "Subject-Focused", desc: "Each class targets one subject and one set of concepts. Students come prepared and leave with clarity." },
            ].map((item) => (
              <div key={item.title} className="bg-gray-50 rounded-2xl p-5">
                <h3 className="font-semibold text-gray-900 mb-2 text-sm">{item.title}</h3>
                <p className="text-xs text-gray-500 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
