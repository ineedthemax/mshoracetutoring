import Link from "next/link";
import { PublicNav } from "@/components/layout/PublicNav";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { mockTutor, mockPricing } from "@/lib/mock-data";
import {
  Users, Star, TrendingUp, Award, BookOpen, Video, FileText,
  CheckCircle, DollarSign, ArrowRight, Calculator, Brain,
  Target, Lightbulb, MessageSquare
} from "lucide-react";

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <PublicNav />

      {/* Hero */}
      <section className="bg-gradient-to-br from-violet-900 via-violet-800 to-violet-600 text-white py-24 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <span className="inline-flex items-center px-4 py-1.5 rounded-full text-sm font-medium bg-white/20 text-white border-0 mb-6">
            Live 1-on-1 &amp; Group Tutoring via Zoom
          </span>
          <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
            Live math tutoring that helps students{" "}
            <span className="text-violet-200">understand the work</span>, not just finish it.
          </h1>
          <p className="text-lg md:text-xl text-violet-100 mb-10 max-w-2xl mx-auto">
            From Pre-Algebra to AP Calculus — Marcus Horace brings 8 years of experience, a master&apos;s in applied math, and a patient, step-by-step teaching style to every session.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/book">
              <button className="bg-white text-violet-700 font-semibold px-8 py-4 rounded-xl hover:bg-violet-50 transition-colors text-base">
                Book a Session
              </button>
            </Link>
            <Link href="/groups">
              <button className="border-2 border-white text-white font-semibold px-8 py-4 rounded-xl hover:bg-white/10 transition-colors text-base">
                View Group Classes
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Stats bar */}
      <section className="bg-white border-b border-gray-100 py-12 px-4">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { icon: Users, label: "Students Helped", value: "200+" },
            { icon: Award, label: "Years Experience", value: "8 Years" },
            { icon: Star, label: "Average Rating", value: "4.9★" },
            { icon: TrendingUp, label: "Return Rate", value: "95%" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <stat.icon className="w-8 h-8 text-violet-600 mx-auto mb-2" />
              <div className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</div>
              <div className="text-sm text-gray-500">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Problem section */}
      <section className="bg-gray-50 py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Sound familiar?</h2>
            <p className="text-gray-500 text-lg">Many students hit these same walls. You&apos;re not alone.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: Brain,
                title: "\"I understand it in class but freeze on tests\"",
                desc: "Test anxiety and gaps in concept retention are common. We build confidence through repeated, guided practice — not just homework help."
              },
              {
                icon: Calculator,
                title: "\"My teacher moves too fast and I fall behind\"",
                desc: "Every student learns at a different pace. Marcus works at your pace, backs up when needed, and doesn't move on until the concept clicks."
              },
              {
                icon: Target,
                title: "\"I need to raise my SAT score before applications\"",
                desc: "Targeted SAT/ACT math prep with strategy coaching, timed practice, and personalized focus on your weak areas."
              },
            ].map((item) => (
              <Card key={item.title} className="p-6">
                <CardContent className="p-0">
                  <item.icon className="w-10 h-10 text-violet-500 mb-4" />
                  <h3 className="font-semibold text-gray-900 mb-2 text-base">{item.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-white py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">How It Works</h2>
            <p className="text-gray-500">From booking to breakthrough — in 5 simple steps.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-5 gap-6">
            {[
              { step: 1, icon: BookOpen, title: "Book Online", desc: "Pick your subject, grade, and session type. Choose a day and time that works." },
              { step: 2, icon: DollarSign, title: "Pay Securely", desc: "Stripe-powered checkout. Single sessions or save with packages." },
              { step: 3, icon: Video, title: "Get Zoom Link", desc: "Receive your confirmation and Zoom link instantly by email." },
              { step: 4, icon: Lightbulb, title: "Live Session", desc: "60-minute interactive session — screen sharing, digital whiteboard, guided problems." },
              { step: 5, icon: FileText, title: "Session Report", desc: "Parents receive a written report with topics covered, wins, and next steps." },
            ].map((step) => (
              <div key={step.step} className="flex flex-col items-center text-center">
                <div className="w-12 h-12 bg-violet-600 text-white rounded-full flex items-center justify-center font-bold text-lg mb-3">
                  {step.step}
                </div>
                <step.icon className="w-6 h-6 text-violet-500 mb-2" />
                <h3 className="font-semibold text-gray-900 text-sm mb-1">{step.title}</h3>
                <p className="text-xs text-gray-500 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services grid */}
      <section className="bg-violet-50 py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">What We Offer</h2>
            <p className="text-gray-500">Tailored to where your student is right now.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: Video, title: "1-on-1 Tutoring", desc: "30 or 60-minute private sessions focused entirely on your student's needs. Live Zoom, interactive whiteboard, real-time feedback." },
              { icon: Users, title: "Group Classes", desc: "Small group sessions (3-8 students) for exam prep and concept review. More affordable, still highly effective." },
              { icon: MessageSquare, title: "Homework Help", desc: "Stuck on tonight's assignment? Book a focused 30-minute session to work through specific problems together." },
              { icon: Target, title: "Exam Prep", desc: "SAT Math, ACT Math, and end-of-unit test preparation. Strategy, practice, and confidence-building." },
              { icon: Brain, title: "AP Math Courses", desc: "Specialized support for AP Calculus AB and BC. We cover every topic from limits to integration by parts." },
            ].map((service) => (
              <Card key={service.title} className="p-6 hover:shadow-md transition-shadow">
                <CardContent className="p-0">
                  <div className="w-10 h-10 bg-violet-100 rounded-xl flex items-center justify-center mb-4">
                    <service.icon className="w-5 h-5 text-violet-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">{service.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{service.desc}</p>
                </CardContent>
              </Card>
            ))}
            <Card className="p-6 bg-violet-600 text-white border-0 flex flex-col justify-between hover:shadow-md transition-shadow">
              <CardContent className="p-0">
                <h3 className="font-semibold text-white mb-2 text-lg">Ready to get started?</h3>
                <p className="text-violet-100 text-sm mb-6">Book your first session this week and see the difference personalized tutoring makes.</p>
                <Link href="/book">
                  <button className="bg-white text-violet-700 font-semibold px-5 py-2.5 rounded-xl text-sm hover:bg-violet-50 transition-colors flex items-center gap-2">
                    Book Now <ArrowRight className="w-4 h-4" />
                  </button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Tutor profile teaser */}
      <section className="bg-white py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="w-full aspect-square max-w-sm mx-auto bg-gradient-to-br from-violet-100 to-violet-200 rounded-2xl flex items-center justify-center">
                <div className="text-center">
                  <div className="w-24 h-24 bg-violet-300 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <span className="text-3xl font-bold text-violet-700">MH</span>
                  </div>
                  <p className="text-violet-600 font-medium">Marcus Horace</p>
                  <p className="text-violet-500 text-sm">Math Tutor</p>
                </div>
              </div>
            </div>
            <div>
              <Badge className="mb-4">Meet Your Tutor</Badge>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">{mockTutor.name}</h2>
              <p className="text-gray-500 text-base leading-relaxed mb-6">{mockTutor.bio}</p>
              <ul className="space-y-3 mb-8">
                {mockTutor.credentials.map((cred) => (
                  <li key={cred} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-violet-500 flex-shrink-0" />
                    <span className="text-sm text-gray-700">{cred}</span>
                  </li>
                ))}
              </ul>
              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center gap-1">
                  {[1,2,3,4,5].map(i => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                <span className="text-gray-700 font-semibold">{mockTutor.rating}</span>
                <span className="text-gray-400 text-sm">({mockTutor.reviewCount} reviews)</span>
              </div>
              <Link href="/tutor">
                <Button>View Full Profile <ArrowRight className="w-4 h-4 ml-2" /></Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Parent trust section */}
      <section className="bg-gray-50 py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Built for Parents Who Want to Know</h2>
            <p className="text-gray-500 text-lg">Full visibility into your child&apos;s learning — every session.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: FileText, title: "Session Notes After Every Class", desc: "After each session, you'll receive a written progress report: topics covered, what clicked, skill gaps, homework assigned, and next steps." },
              { icon: TrendingUp, title: "Confidence Score Tracking", desc: "We track student confidence on a 0-100 scale each session, so you can see growth over time — not just attendance." },
              { icon: Video, title: "Live Zoom Sessions", desc: "All sessions run on Zoom. Join as an observer anytime, or trust Marcus to create a productive 1-on-1 environment. No dark corners." },
            ].map((feature) => (
              <Card key={feature.title} className="p-6">
                <CardContent className="p-0">
                  <div className="w-10 h-10 bg-violet-100 rounded-xl flex items-center justify-center mb-4">
                    <feature.icon className="w-5 h-5 text-violet-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{feature.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing preview */}
      <section className="bg-white py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Simple, Transparent Pricing</h2>
            <p className="text-gray-500">No hidden fees. Pay per session or save with packages.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {mockPricing.slice(0, 3).map((plan) => (
              <Card key={plan.id} className={`p-6 relative ${plan.name === "60-Min Session" ? "border-violet-300 shadow-lg" : ""}`}>
                {plan.name === "60-Min Session" && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <Badge className="bg-violet-600 text-white border-0 text-xs px-3 py-1">Most Popular</Badge>
                  </div>
                )}
                <CardContent className="p-0 text-center">
                  <h3 className="font-semibold text-gray-900 text-lg mb-1">{plan.name}</h3>
                  <p className="text-gray-400 text-sm mb-4">{plan.description}</p>
                  <div className="text-4xl font-bold text-violet-600 mb-1">${plan.price}</div>
                  {"originalPrice" in plan && plan.originalPrice && (
                    <div className="text-sm text-gray-400 line-through mb-4">${plan.originalPrice}</div>
                  )}
                  <Link href="/book" className="block mt-6">
                    <Button className="w-full" variant={plan.name === "60-Min Session" ? "default" : "outline"}>
                      Book Now
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="text-center">
            <Link href="/pricing">
              <Button variant="ghost">View All Pricing Options <ArrowRight className="w-4 h-4 ml-2" /></Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Google Review CTA */}
      <section className="bg-violet-600 py-16 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <Star className="w-12 h-12 text-yellow-300 mx-auto mb-4 fill-yellow-300" />
          <h2 className="text-3xl font-bold text-white mb-4">Had a great session? Leave a Google Review</h2>
          <p className="text-violet-100 mb-8">Your review helps other families find quality math tutoring. It takes 2 minutes and means the world to us.</p>
          <a
            href="https://g.page/r/placeholder/review"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-white text-violet-700 font-semibold px-8 py-4 rounded-xl hover:bg-violet-50 transition-colors"
          >
            <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
            Leave a Google Review
          </a>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-gray-900 py-20 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Book your first session this week.
          </h2>
          <p className="text-gray-400 text-lg mb-10">
            Spots fill fast — especially on weekends. Secure your time slot now.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/book">
              <button className="bg-violet-600 text-white font-semibold px-8 py-4 rounded-xl hover:bg-violet-700 transition-colors text-base">
                Book a Session
              </button>
            </Link>
            <Link href="/how-it-works">
              <button className="border border-gray-600 text-gray-300 font-semibold px-8 py-4 rounded-xl hover:border-gray-400 hover:text-white transition-colors text-base">
                See How It Works
              </button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
