import Link from "next/link";
import { PublicNav } from "@/components/layout/PublicNav";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { mockTutor, mockAvailability, mockPricing } from "@/lib/mock-data";
import { Star, CheckCircle, Clock, BookOpen } from "lucide-react";

const testimonials = [
  { name: "Lisa Campbell", role: "Parent of 9th Grader", text: "Ms. Horace completely turned Jordan's confidence around. She went from dreading Algebra to actually enjoying it. The session reports keep me in the loop every week.", stars: 5 },
  { name: "Devon Harris", role: "9th Grade Student", text: "I was failing Algebra 1 at the start of the year. After 6 sessions with Ms. Horace I went from a D to a B. She breaks everything down so it actually makes sense.", stars: 5 },
  { name: "Renee Williams", role: "Parent of 9th Grader", text: "I appreciate how Ms. Horace explains everything step-by-step. Aisha finally understands geometry proofs. The Zoom setup was easy and the price is fair for the quality.", stars: 5 },
];

export default function TutorPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <PublicNav />

      <div className="max-w-4xl mx-auto px-4 py-12 space-y-8">
        {/* Hero Card */}
        <Card className="overflow-hidden">
          <div className="bg-gradient-to-r from-violet-600 to-violet-800 px-8 pt-8 pb-16 flex items-start justify-between">
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 bg-violet-200 rounded-2xl border-4 border-white/30 shadow-lg flex items-center justify-center flex-shrink-0">
                <span className="text-2xl font-bold text-violet-700">SH</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">{mockTutor.name}</h1>
                <p className="text-violet-200 text-sm mt-0.5">{mockTutor.title}</p>
                <div className="flex items-center gap-2 mt-2">
                  <div className="flex gap-0.5">
                    {[1,2,3,4,5].map(i => (
                      <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                    ))}
                  </div>
                  <span className="font-bold text-white text-sm">{mockTutor.rating}</span>
                  <span className="text-violet-200 text-xs">({mockTutor.reviewCount} reviews)</span>
                  <Badge className="bg-white/20 text-white border-0 text-xs">{mockTutor.experience} experience</Badge>
                </div>
              </div>
            </div>
            <Link href="/book">
              <Button size="lg" className="bg-white text-violet-700 hover:bg-violet-50 hidden sm:flex">Book a Session</Button>
            </Link>
          </div>
          <CardContent className="px-8 pb-8 pt-4">
            <Link href="/book" className="sm:hidden block mb-4">
              <Button className="w-full">Book a Session</Button>
            </Link>
          </CardContent>
        </Card>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-6">
            {/* Bio */}
            <Card>
              <CardContent className="pt-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">About Stenita</h2>
                <p className="text-gray-600 leading-relaxed mb-4">{mockTutor.bio}</p>
                <blockquote className="border-l-4 border-violet-500 pl-4 italic text-gray-500 text-sm">
                  &ldquo;{mockTutor.teachingStyle}&rdquo;
                </blockquote>
              </CardContent>
            </Card>

            {/* Credentials */}
            <Card>
              <CardContent className="pt-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Credentials</h2>
                <ul className="space-y-3">
                  {mockTutor.credentials.map((cred) => (
                    <li key={cred} className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-violet-500 flex-shrink-0" />
                      <span className="text-gray-700 text-sm">{cred}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Subjects */}
            <Card>
              <CardContent className="pt-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Subjects Taught</h2>
                <div className="flex flex-wrap gap-2 mb-4">
                  {mockTutor.subjects.map((s) => (
                    <Badge key={s} variant="outline">{s}</Badge>
                  ))}
                </div>
                <h3 className="text-base font-semibold text-gray-800 mt-4 mb-3">Grade Levels</h3>
                <div className="flex flex-wrap gap-2">
                  {mockTutor.gradeLevels.map((g) => (
                    <Badge key={g} className="bg-gray-100 text-gray-600">{g}</Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Testimonials */}
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-4">What Families Say</h2>
              <div className="space-y-4">
                {testimonials.map((t) => (
                  <Card key={t.name}>
                    <CardContent className="pt-6">
                      <div className="flex gap-0.5 mb-3">
                        {Array.from({ length: t.stars }).map((_, i) => (
                          <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                        ))}
                      </div>
                      <p className="text-gray-600 text-sm leading-relaxed mb-4">&ldquo;{t.text}&rdquo;</p>
                      <div>
                        <p className="font-semibold text-gray-900 text-sm">{t.name}</p>
                        <p className="text-gray-400 text-xs">{t.role}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Pricing */}
            <Card>
              <CardContent className="pt-6">
                <h2 className="text-lg font-bold text-gray-900 mb-4">Pricing</h2>
                <div className="space-y-3">
                  {mockPricing.map((p) => (
                    <div key={p.id} className="flex justify-between items-center py-2 border-b border-gray-50 last:border-0">
                      <div>
                        <p className="text-sm font-medium text-gray-800">{p.name}</p>
                        <p className="text-xs text-gray-400">{p.description}</p>
                      </div>
                      <span className="font-bold text-violet-600">${p.price}</span>
                    </div>
                  ))}
                </div>
                <Link href="/book" className="block mt-4">
                  <Button className="w-full">Book Now</Button>
                </Link>
              </CardContent>
            </Card>

            {/* Availability */}
            <Card>
              <CardContent className="pt-6">
                <h2 className="text-lg font-bold text-gray-900 mb-4">
                  <Clock className="w-4 h-4 inline mr-2 text-violet-500" />
                  Availability
                </h2>
                <div className="space-y-2">
                  {mockAvailability.map((a) => (
                    <div key={a.day} className="flex justify-between items-start text-sm">
                      <span className="font-medium text-gray-700 w-24">{a.day}</span>
                      <span className="text-gray-400 text-right text-xs leading-relaxed">
                        {a.slots[0]} – {a.slots[a.slots.length - 1]}
                      </span>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-gray-400 mt-3">All times Eastern (ET). Saturday & Sunday off.</p>
              </CardContent>
            </Card>

            {/* Stats */}
            <Card className="bg-violet-50 border-violet-200">
              <CardContent className="pt-6">
                <div className="space-y-4">
                  {[
                    { label: "Sessions Taught", value: "500+" },
                    { label: "Students Helped", value: "900+" },
                    { label: "Satisfaction Rate", value: "98%" },
                    { label: "Hourly Rate", value: `$${mockTutor.hourlyRate}` },
                  ].map((s) => (
                    <div key={s.label} className="flex justify-between">
                      <span className="text-sm text-gray-600">{s.label}</span>
                      <span className="font-bold text-violet-700">{s.value}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Sticky CTA */}
      <div className="fixed bottom-6 right-6 z-50">
        <Link href="/book">
          <button className="bg-violet-600 text-white font-semibold px-6 py-3.5 rounded-2xl shadow-xl hover:bg-violet-700 transition-colors flex items-center gap-2 text-sm">
            <BookOpen className="w-4 h-4" />
            Book with Ms. Horace
          </button>
        </Link>
      </div>

      <Footer />
    </div>
  );
}
