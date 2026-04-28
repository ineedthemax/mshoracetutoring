import Link from "next/link";
import Image from "next/image";
import { PublicNav } from "@/components/layout/PublicNav";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
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

      {/* Summer urgency banner */}
      <div className="bg-amber-500 text-white text-center py-3 px-4 text-sm font-semibold">
        🌞 Summer 2026 spots are filling fast limited availability for June, July &amp; August. <Link href="/book" className="underline ml-1">Reserve your slot now →</Link>
      </div>

      {/* Hero */}
      <section className="bg-gradient-to-br from-violet-900 via-violet-800 to-violet-600 text-white py-24 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <span className="inline-flex items-center px-4 py-1.5 rounded-full text-sm font-medium bg-white/20 text-white border-0 mb-6">
            <Flame className="w-4 h-4 mr-2 text-amber-300" /> Summer 2026 Enrollment Open
          </span>
          <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
            Don&apos;t let summer{" "}
            <span className="text-amber-300">erase</span>{" "}
            a whole year of math.
          </h1>
          <p className="text-lg md:text-xl text-violet-100 mb-10 max-w-2xl mx-auto">
            Summer is the best time to close skill gaps, get ahead for next year, and build the confidence your student needs before school starts again. Based in White Plains, Maryland serving students online via Zoom nationwide.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/book">
              <button className="bg-amber-400 text-gray-900 font-bold px-8 py-4 rounded-xl hover:bg-amber-300 transition-colors text-base">
                Book a Summer Session
              </button>
            </Link>
            <Link href="/groups">
              <button className="border-2 border-white text-white font-semibold px-8 py-4 rounded-xl hover:bg-white/10 transition-colors text-base">
                View Summer Group Classes
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
                caption: "Live sessions via Zoom — from anywhere",
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

      {/* Summer offer cards */}
      <section className="bg-amber-50 py-20 px-4 border-b border-amber-100">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-amber-500 text-white border-0">Summer 2026 Offers</Badge>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Pick your summer plan</h2>
            <p className="text-gray-500 text-lg">Flexible options built around your student&apos;s summer schedule.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: Zap,
                badge: "Most Popular",
                title: "Summer Boost Pack",
                subtitle: "8 sessions · save 13%",
                price: "$522",
                original: "$600",
                desc: "Perfect for students who want to get ahead or recover before the new school year. 8 sessions scheduled at your pace all summer.",
                cta: "Get the Pack",
                highlight: true,
              },
              {
                icon: Users,
                badge: "Best Value",
                title: "Group Review Classes",
                subtitle: "3–10 students per class",
                price: "$25",
                original: null,
                desc: "Weekly small group sessions covering Pre-Algebra and Algebra 1. Affordable, social, and still highly effective.",
                cta: "Browse Classes",
                highlight: false,
              },
              {
                icon: BookOpen,
                badge: "Self-Paced",
                title: "Digital Courses",
                subtitle: "Pre-Algebra & Algebra 1",
                price: "$197",
                original: null,
                desc: "PDF-based self-paced courses your student can work through anytime. Step-by-step lessons, practice problems, and answer keys included.",
                cta: "View Courses",
                highlight: false,
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
                  <Link href={offer.cta === "View Courses" ? "/courses" : "/book"} className="block">
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
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Summer is when students fall behind or pull ahead.</h2>
            <p className="text-gray-500 text-lg">Which one will your student be in September?</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: Brain,
                title: "\"They forgot everything from last year\"",
                desc: "Summer learning loss is real studies show students can lose up to 2 months of math skills over summer. A few sessions a week keeps their mind sharp and ready."
              },
              {
                icon: Calculator,
                title: "\"They struggled all year and I don't want that again\"",
                desc: "Summer is the perfect reset. No pressure, no grades just time to actually understand the concepts that got skipped over during the school year."
              },
              {
                icon: Target,
                title: "\"They want to be ahead when school starts\"",
                desc: "Students who preview next year's material in summer start the school year with confidence. We cover Pre-Algebra and Algebra 1 at their pace."
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
              { step: 2, icon: DollarSign, title: "Pay Securely", desc: "Stripe-powered checkout. Single sessions or save with summer packages." },
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

      {/* Summer subjects */}
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
              <div className="w-full aspect-square max-w-sm mx-auto bg-gradient-to-br from-violet-100 to-violet-200 rounded-2xl flex items-center justify-center">
                <div className="text-center">
                  <div className="w-24 h-24 bg-violet-300 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <span className="text-3xl font-bold text-violet-700">SH</span>
                  </div>
                  <p className="text-violet-600 font-medium">Stenita Horace</p>
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
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Parents stay in the loop every session.</h2>
            <p className="text-gray-500 text-lg">No guessing. No &ldquo;I don&apos;t know what they covered.&rdquo; Full visibility, every week.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: FileText, title: "Written Report After Every Session", desc: "Topics covered, what clicked, skill gaps identified, homework assigned, and the recommended next step delivered to your inbox after each session." },
              { icon: TrendingUp, title: "Confidence Score Tracking", desc: "We rate student confidence 0–100 each session so you can see real growth over the summer not just whether they showed up." },
              { icon: Video, title: "Live Zoom Sessions", desc: "All sessions run on Zoom. You can observe any session at any time. Transparent, safe, and flexible around your family's summer schedule." },
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
            <p className="text-gray-500">No hidden fees. Pay per session or save with summer packages.</p>
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
            Summer goes fast. Math gaps don&apos;t fix themselves.
          </h2>
          <p className="text-amber-100 text-lg mb-8">
            June, July, and August slots are limited. Families who book early get the best time slots and the most sessions before school starts.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/book">
              <button className="bg-white text-amber-600 font-bold px-8 py-4 rounded-xl hover:bg-amber-50 transition-colors text-base">
                Book a Summer Session
              </button>
            </Link>
            <Link href="/groups">
              <button className="border-2 border-white text-white font-semibold px-8 py-4 rounded-xl hover:bg-white/10 transition-colors text-base">
                See Group Classes
              </button>
            </Link>
          </div>
          <p className="text-amber-200 text-sm mt-6">Starting at $25 · Flexible summer scheduling · Cancel anytime</p>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-white py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <Badge className="mb-3 bg-violet-100 text-violet-700 border-0">What Families Are Saying</Badge>
            <h2 className="text-3xl font-bold text-gray-900 mb-3">Real results from real students</h2>
            <p className="text-gray-500">Hear from the parents and students who&apos;ve worked with Ms. Horace.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                name: "Lisa Campbell",
                role: "Parent · 10th Grader",
                text: "Ms. Horace completely turned my daughter's confidence around. She went from dreading Algebra to actually enjoying it. The session reports after every class keep me in the loop every week.",
                stars: 5,
                initial: "LC",
                color: "bg-violet-100 text-violet-700",
              },
              {
                name: "Kezia Thompson",
                role: "8th Grade Student",
                text: "I used to freeze up on tests but now I actually understand what I'm doing. Ms. Horace breaks everything down so it makes sense. My grade went from a D to a B in one semester.",
                stars: 5,
                initial: "KT",
                color: "bg-blue-100 text-blue-700",
              },
              {
                name: "Renee Williams",
                role: "Parent · 9th Grader",
                text: "I appreciate how Ms. Horace explains everything step-by-step. My daughter finally understands math concepts she's been struggling with for years. Worth every dollar.",
                stars: 5,
                initial: "RW",
                color: "bg-green-100 text-green-700",
              },
            ].map((t) => (
              <Card key={t.name} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex gap-0.5 mb-4">
                    {[1,2,3,4,5].map(i => (
                      <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                    ))}
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed mb-6 italic">&ldquo;{t.text}&rdquo;</p>
                  <div className="flex items-center gap-3">
                    <div className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold ${t.color}`}>
                      {t.initial}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-900">{t.name}</p>
                      <p className="text-xs text-gray-400">{t.role}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
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

      <Footer />
    </div>
  );
}
