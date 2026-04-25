import Link from "next/link";
import { PublicNav } from "@/components/layout/PublicNav";
import { Footer } from "@/components/layout/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { mockTutor } from "@/lib/mock-data";
import { CheckCircle, Heart, Lightbulb, Target, Users } from "lucide-react";

const values = [
  { icon: Heart, title: "Meet Students Where They Are", desc: "No judgment on where a student starts. Every mathematician began somewhere, and every gap can be closed with the right support." },
  { icon: Lightbulb, title: "Conceptual Understanding First", desc: "Memorizing formulas doesn't build a foundation. We focus on understanding the 'why' behind every rule and procedure." },
  { icon: Target, title: "Confidence Through Repetition", desc: "Confidence isn't given it's built by doing problems until the process feels natural. That takes guided repetition, not just explanation." },
  { icon: Users, title: "Parent Partnership", desc: "Parents are partners in the process. Regular session reports and open communication keep everyone aligned on goals and progress." },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <PublicNav />

      {/* Hero */}
      <section className="bg-gradient-to-br from-violet-900 to-violet-700 text-white py-20 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <div className="w-24 h-24 bg-violet-300 rounded-full mx-auto mb-6 flex items-center justify-center">
            <span className="text-3xl font-bold text-violet-800">MH</span>
          </div>
          <h1 className="text-4xl font-bold mb-4">{mockTutor.name}</h1>
          <p className="text-violet-100 text-xl">{mockTutor.title}</p>
        </div>
      </section>

      {/* Mission */}
      <section className="bg-white py-16 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">The Mission</h2>
          <p className="text-xl text-gray-600 leading-relaxed mb-4">
            Math shouldn&apos;t feel like a wall. It should feel like a door.
          </p>
          <p className="text-gray-500 leading-relaxed">
            Too many students write themselves off as &ldquo;not a math person&rdquo; when the truth is they just haven&apos;t had the right instruction at the right time. I started tutoring to be that right instruction patient, clear, and personalized to each individual student.
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="bg-gray-50 py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="bg-gradient-to-br from-violet-100 to-violet-200 rounded-2xl aspect-square flex items-center justify-center">
              <div className="text-center p-8">
                <div className="w-20 h-20 bg-violet-300 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl font-bold text-violet-700">MH</span>
                </div>
                <p className="text-violet-700 font-medium">Marcus Horace</p>
                <p className="text-violet-500 text-sm mt-1">8 years · 200+ students</p>
              </div>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">My Story</h2>
              <div className="space-y-4 text-gray-500 text-sm leading-relaxed">
                <p>I grew up in Atlanta, where I was fortunate to have a math teacher in 9th grade who changed everything for me. He didn&apos;t just teach formulas he taught thinking. He showed me that every problem had a structure you could learn to see.</p>
                <p>I went on to study Mathematics at Morehouse College and earned my Master&apos;s in Applied Mathematics from Howard University. But the classroom kept calling. I started tutoring part-time in grad school and never stopped.</p>
                <p>Eight years and 200+ students later, I&apos;ve seen the same transformation happen over and over: a student who was failing Algebra 2 in October is acing the final in December. Not because they became magically smarter because someone took the time to explain it clearly, from the right angle, with patience.</p>
                <p>That&apos;s what I do, and I love doing it.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Credentials */}
      <section className="bg-white py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Credentials &amp; Background</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {mockTutor.credentials.map((cred) => (
              <div key={cred} className="flex items-center gap-3 bg-violet-50 rounded-xl px-4 py-3">
                <CheckCircle className="w-5 h-5 text-violet-600 flex-shrink-0" />
                <span className="text-sm text-gray-700 font-medium">{cred}</span>
              </div>
            ))}
            <div className="flex items-center gap-3 bg-violet-50 rounded-xl px-4 py-3">
              <CheckCircle className="w-5 h-5 text-violet-600 flex-shrink-0" />
              <span className="text-sm text-gray-700 font-medium">8+ years private tutoring</span>
            </div>
            <div className="flex items-center gap-3 bg-violet-50 rounded-xl px-4 py-3">
              <CheckCircle className="w-5 h-5 text-violet-600 flex-shrink-0" />
              <span className="text-sm text-gray-700 font-medium">200+ students helped</span>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-gray-50 py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">What I Believe About Teaching</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {values.map((v) => (
              <Card key={v.title}>
                <CardContent className="pt-6">
                  <div className="w-10 h-10 bg-violet-100 rounded-xl flex items-center justify-center mb-4">
                    <v.icon className="w-5 h-5 text-violet-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">{v.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{v.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-violet-600 py-16 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to work together?</h2>
          <p className="text-violet-100 mb-8">Book your first session and let&apos;s see what&apos;s possible.</p>
          <Link href="/book">
            <button className="bg-white text-violet-700 font-semibold px-8 py-4 rounded-xl hover:bg-violet-50 transition-colors text-base">
              Book a Session
            </button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
