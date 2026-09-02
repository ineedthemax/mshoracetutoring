import Link from "next/link";
import Image from "next/image";
import { PublicNav } from "@/components/layout/PublicNav";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { GoogleReviews } from "@/components/GoogleReviews";
import { mockTutor, mockPricing } from "@/lib/mock-data";
import {
  Users, Star, TrendingUp, Award, BookOpen, Video, FileText,
  CheckCircle, DollarSign, ArrowRight, Calculator, Brain,
  Target, Lightbulb, MessageSquare, Flame, Calendar, Zap
} from "lucide-react";

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <PublicNav />

      {/* Back to School urgency banner */}
      <div className="bg-amber-500 text-white text-center py-3 px-4 text-sm font-semibold">
        📚 Back to School 2026 enrollment open. Get your student ready now. <Link href="/book" className="underline ml-1">Reserve your slot now →</Link>
      </div>

      {/* Hero */}
      <section className="bg-gradient-to-br from-violet-900 via-violet-800 to-violet-600 text-white py-24 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <span className="inline-flex items-center px-4 py-1.5 rounded-full text-sm font-medium bg-white/20 text-white border-0 mb-6">
            <Flame className="w-4 h-4 mr-2 text-amber-300" /> Back to School 2026 Enrollment Open
          </span>
          <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
            Start the school year{" "}
            <span className="text-amber-300">confident</span>{" "}
            and prepared.
          </h1>
          <p className="text-lg md:text-xl text-violet-100 mb-10 max-w-2xl mx-auto">
            Get ahead before school starts with expert 1-on-1 math tutoring. Build confidence, master key concepts, and arrive on day one ready to succeed. Based in White Plains, Maryland serving students online via Zoom nationwide.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/book">
              <button className="bg-amber-400 text-gray-900 font-bold px-8 py-4 rounded-xl hover:bg-amber-300 transition-colors text-base">
                Book a Session Now
              </button>
            </Link>
            <Link href="/groups">
              <button className="border-2 border-white text-white font-semibold px-8 py-4 rounded-xl hover:bg-white/10 transition-colors text-base">
                View Group Classes
              </button>
            </Link>
          </div>
          <p className="text-violet-300 text-sm mt-6">Starting at $25/session · No contracts · Cancel anytime</p>
        </div>
      </section>

      {/* Stats bar */}
      <section className="bg-white border-b border-gray-100 py-12 px-4">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { icon: Users, label: "Students Helped", value: "900+" },
            { icon: Award, label: "Years Experience", value: "6+ Years" },
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

      {/* Student photos */}
      <section className="bg-white py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">Built for middle school students</h2>
            <p className="text-gray-500">6th through 9th grade · Pre-Algebra & Algebra 1 · Online via Zoom</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              {
                src: "https://images.unsplash.com/photo-1588072432836-e10032774350?w=600&h=400&fit=crop",
                alt: "Middle school student studying math",
                caption: "Building confidence one concept at a time",
              },
              {
                src: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=600&h=400&fit=crop",
                alt: "Student learning online via laptop",
                caption: "Live sessions via Zoom - from anywhere",
              },
              {
                src: "https://images.unsplash.com/photo-1606326608606-aa0b62935f2b?w=600&h=400&fit=crop",
                alt: "Student focused on schoolwork",
                caption: "Step-by-step until it clicks",
              },
            ].map((photo) => (
              <div key={photo.src} className="rounded-2xl overflow-hidden shadow-sm group">
                <div className="relative h-56 w-full overflow-hidden">
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="bg-violet-50 px-4 py-3">
                  <p className="text-sm text-violet-700 font-medium text-center">{photo.caption}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Back to School offer cards */}
      <section className="bg-amber-50 py-20 px-4 border-b border-amber-100">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-amber-500 text-white border-0">Back to School Offers</Badge>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Back to School Plans</h2>
            <p className="text-gray-500 text-lg">Flexible options to get your student ready for success this year.</p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                icon: Zap,
                badge: "First Grading Period",
                title: "The Foundation Pack",
                subtitle: "4 sessions · $75/session",
                price: "$300",
                original: null,
                desc: "4 live 1-on-1 Zoom sessions (60 min each). Valid 60 days. Perfect to get ahead of the first grading period.",
                cta: "Get Started",
                highlight: false,
                packageType: "4-session",
              },
              {
                icon: Flame,
                badge: "Best Value",
                title: "The 8-Session Pack",
                subtitle: "8 sessions · $75/session",
                price: "$600",
                original: null,
                desc: "8 live 1-on-1 Zoom sessions (60 min each). Valid 90 days. Build real, lasting confidence in math.",
                cta: "Get the Pack",
                highlight: true,
                packageType: "8-session",
              },
            ].map((offer) => (
              <Card key={offer.title} className={`p-6 relative ${offer.highlight ? "border-amber-400 shadow-lg ring-1 ring-amber-400" : ""}`}>
                {offer.badge && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <Badge className={`border-0 text-xs px-3 py-1 ${offer.highlight ? "bg-amber-500 text-white" : "bg-violet-600 text-white"}`}>{offer.badge}</Badge>
                  </div>
                )}
                <CardContent className="p-0 text-center">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4 ${offer.highlight ? "bg-amber-100" : "bg-violet-100"}`}>
                    <offer.icon className={`w-6 h-6 ${offer.highlight ? "text-amber-600" : "text-violet-600"}`} />
                  </div>
                  <h3 className="font-bold text-gray-900 text-lg mb-1">{offer.title}</h3>
                  <p className="text-gray-400 text-sm mb-3">{offer.subtitle}</p>
                  <div className={`text-4xl font-bold mb-1 ${offer.highlight ? "text-amber-500" : "text-violet-600"}`}>{offer.price}</div>
                  {offer.original && <div className="text-sm text-gray-400 line-through mb-3">{offer.original}</div>}
                  <p className="text-sm text-gray-500 leading-relaxed mb-6">{offer.desc}</p>
                  <Link href={offer.packageType ? `/checkout?type=${offer.packageType}` : "/book"} className="block">
                    <Button className={`w-full ${offer.highlight ? "bg-amber-500 hover:bg-amber-600 text-white" : ""}`} variant={offer.highlight ? "default" : "outline"}>
                      {offer.cta}
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Problem section */}
      <section className="bg-gray-50 py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Before school starts, get your student ready.</h2>
            <p className="text-gray-500 text-lg">Which student will walk into class in September?</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: Brain,
                title: "\"They struggled last year and I don't want that again\"",
                desc: "Gaps from last year don't go away on their own. A few focused sessions now fill holes in understanding before school starts. No pressure, just clarity."
              },
              {
                icon: Calculator,
                title: "\"They want to feel more confident in math\"",
                desc: "Confidence matters more than you think. Students who start strong stay strong. A few sessions now prove they can do this."
              },
              {
                icon: Target,
                title: "\"They want to be ahead from day one\"",
                desc: "Students who preview next year's material start the school year ahead of the curve. We cover Pre-Algebra and Algebra 1 at their pace."
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
            <p className="text-gray-500">From booking to breakthrough in 5 simple steps.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-5 gap-6">
            {[
              { step: 1, icon: BookOpen, title: "Book Online", desc: "Pick your subject, grade, and session type. Choose a day and time that works." },
              { step: 2, icon: DollarSign, title: "Pay Securely", desc: "Stripe-powered checkout. Single sessions or save with packages." },
              { step: 3, icon: Video, title: "Get Zoom Link", desc: "Receive your confirmation and Zoom link instantly by email." },
              { step: 4, icon: Lightbulb, title: "Live Session", desc: "Interactive live session screen sharing, digital whiteboard, guided problems." },
              { step: 5, icon: FileText, title: "Progress Report", desc: "Parents receive a written report with topics covered, wins, and next steps." },
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

      {/* Subjects we teach */}
      <section className="bg-violet-50 py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">What We Teach</h2>
            <p className="text-gray-500">Specialized, focused instruction in the two subjects students need most.</p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              { icon: Calculator, title: "Pre-Algebra", grade: "6th–8th Grade", desc: "Fractions, decimals, ratios, integers, order of operations, and solving equations. We build the foundation students need before high school math." },
              { icon: Brain, title: "Algebra 1", grade: "8th–9th Grade", desc: "Linear equations, inequalities, systems, functions, graphing, polynomials, and factoring. The most important math class your student will take." },
            ].map((service) => (
              <Card key={service.title} className="p-8 hover:shadow-md transition-shadow">
                <CardContent className="p-0">
                  <div className="w-12 h-12 bg-violet-100 rounded-xl flex items-center justify-center mb-4">
                    <service.icon className="w-6 h-6 text-violet-600" />
                  </div>
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="font-bold text-gray-900 text-xl">{service.title}</h3>
                    <span className="text-xs text-violet-600 bg-violet-100 px-2 py-0.5 rounded-full font-medium">{service.grade}</span>
                  </div>
                  <p className="text-sm text-gray-500 leading-relaxed">{service.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Tutor profile teaser */}
      <section className="bg-white py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="w-full aspect-square max-w-sm mx-auto bg-gradient-to-br from-violet-100 to-violet-200 rounded-2xl overflow-hidden flex items-center justify-center">
                <div className="text-center p-6">
                  <div className="w-40 h-40 rounded-full mx-auto mb-4 overflow-hidden border-4 border-violet-300 shadow-lg">
                    <Image src="/stenita-horace.jpg" alt="Stenita Horace" width={160} height={160} className="w-full h-full object-cover object-top" />
                  </div>
                  <p className="text-violet-700 font-semibold text-lg">Stenita Horace</p>
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

      {/* Sample Session Report */}
      <section className="bg-white py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <Badge className="mb-3 bg-violet-100 text-violet-700 border-0">After Every Session</Badge>
            <h2 className="text-3xl font-bold text-gray-900 mb-3">Here's exactly what you'll receive</h2>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto">Every session ends with a detailed report sent straight to your inbox. No guessing. No "I don't know what they covered." Full visibility, every time.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-10 items-center">
            {/* Sample report card */}
            <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-lg">
              {/* Header */}
              <div className="bg-gradient-to-r from-violet-600 to-violet-800 px-6 py-5">
                <div className="flex items-center gap-3 mb-3">
                  <Image src="/Logo.png" alt="MsHorace Tutoring" width={70} height={28} className="h-7 w-auto" />
                  <span className="text-violet-200 text-xs font-semibold uppercase tracking-wider">Session Report</span>
                </div>
                <h3 className="text-white font-bold text-lg">Jordan Campbell</h3>
                <p className="text-violet-200 text-sm">Algebra 1 · 1-on-1 · May 15, 2026</p>
              </div>
              {/* Confidence score */}
              <div className="px-6 py-4 bg-violet-50 border-b border-violet-100">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-semibold text-violet-700 uppercase tracking-wide text-xs">Confidence Score</span>
                  <span className="text-2xl font-bold text-green-600">82%</span>
                </div>
                <div className="h-2 bg-violet-100 rounded-full overflow-hidden">
                  <div className="h-2 bg-green-500 rounded-full" style={{width:"82%"}} />
                </div>
              </div>
              {/* Body */}
              <div className="px-6 py-4 space-y-4">
                <div>
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Topics Covered</p>
                  <p className="text-sm text-gray-700">Slope-intercept form, graphing linear equations, identifying slope and y-intercept from an equation.</p>
                </div>
                <div className="bg-green-50 border-l-4 border-green-500 rounded-r-xl p-3">
                  <p className="text-xs font-bold text-green-700 uppercase tracking-wide mb-1">Win This Session</p>
                  <p className="text-sm text-green-800">Jordan correctly identified slope and y-intercept on 9 out of 10 problems independently. Huge improvement from last week!</p>
                </div>
                <div className="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-3">
                  <p className="text-xs font-bold text-amber-700 uppercase tracking-wide mb-1">Keep Working On</p>
                  <p className="text-sm text-amber-800">Graphing from standard form. Will practice converting to slope-intercept form first.</p>
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Recommended Next Step</p>
                  <p className="text-sm text-gray-700">Practice writing equations from two points. Next session: graphing systems of equations.</p>
                </div>
              </div>
            </div>

            {/* Value points */}
            <div className="space-y-6">
              {[
                { icon: "📊", title: "Confidence Score Every Session", desc: "A 0-100 score so you can track real growth over time - not just whether they showed up. Watch the number climb as the weeks go on." },
                { icon: "🏆", title: "Wins Highlighted Every Time", desc: "Every report starts with what your student did well. Progress gets celebrated before problems are discussed." },
                { icon: "📚", title: "Homework + Next Step Included", desc: "You always know exactly what was assigned and what Ms. Horace recommends focusing on before the next session." },
                { icon: "📬", title: "Delivered to Your Inbox", desc: "Reports arrive automatically after every session. No app to check, no portal to log into. Just an email." },
              ].map((item) => (
                <div key={item.title} className="flex gap-4">
                  <div className="text-2xl flex-shrink-0">{item.icon}</div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">{item.title}</h3>
                    <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
              <Link href="/book">
                <Button className="mt-2">Book a Session - See It for Real</Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Parent trust section */}
      <section className="bg-gray-50 py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Parents stay in the loop every session.</h2>
            <p className="text-gray-500 text-lg">No guessing. No &ldquo;I don&apos;t know what they covered.&rdquo; Full visibility, every week.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: FileText, title: "Written Report After Every Session", desc: "Topics covered, what clicked, skill gaps identified, homework assigned, and the recommended next step delivered to your inbox after each session." },
              { icon: TrendingUp, title: "Confidence Score Tracking", desc: "We rate student confidence 0–100 each session so you can see real progress, not just whether they showed up." },
              { icon: Video, title: "Live Zoom Sessions", desc: "All sessions run on Zoom. You can observe any session at any time. Transparent, safe, and flexible around your schedule." },
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

      {/* Urgency CTA */}
      <section className="bg-gradient-to-br from-amber-500 to-orange-500 py-20 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <Calendar className="w-12 h-12 text-white mx-auto mb-4" />
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Back to school is coming. Math gaps don&apos;t fix themselves.
          </h2>
          <p className="text-amber-100 text-lg mb-8">
            Spots are limited before the school year starts. Book now to guarantee the time slot and prepare your student for success.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/book">
              <button className="bg-white text-amber-600 font-bold px-8 py-4 rounded-xl hover:bg-amber-50 transition-colors text-base">
                Book a Session Now
              </button>
            </Link>
            <Link href="/groups">
              <button className="border-2 border-white text-white font-semibold px-8 py-4 rounded-xl hover:bg-white/10 transition-colors text-base">
                See Group Classes
              </button>
            </Link>
          </div>
          <p className="text-amber-200 text-sm mt-6">Starting at $25 · Flexible scheduling · Cancel anytime</p>
        </div>
      </section>

      {/* Live Google Reviews */}
      <GoogleReviews />

      {/* Google Review CTA */}
      <section className="bg-violet-600 py-16 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <Star className="w-12 h-12 text-yellow-300 mx-auto mb-4 fill-yellow-300" />
          <h2 className="text-3xl font-bold text-white mb-4">Had a great session? Leave a Google Review</h2>
          <p className="text-violet-100 mb-8">Your review helps other families find quality math tutoring. It takes 2 minutes and means the world to us.</p>
          <a
            href="https://www.google.com/maps/place/MsHoraceTutoring/@38.6214401,-76.9105131,17z/data=!3m1!4b1!4m6!3m5!1s0x89b7a1c13c687af7:0x35a4299364cda514!8m2!3d38.6214401!4d-76.9105131!16s%2Fg%2F11z9xt4xzz"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-white text-violet-700 font-semibold px-8 py-4 rounded-xl hover:bg-violet-50 transition-colors"
          >
            <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
            Leave a Google Review
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
}
