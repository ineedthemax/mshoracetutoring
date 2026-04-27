import Link from "next/link";
import { PublicNav } from "@/components/layout/PublicNav";
import { Footer } from "@/components/layout/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calculator, TrendingUp, ArrowRight, Clock } from "lucide-react";

const activeSubjects = [
  {
    name: "Pre-Algebra",
    grades: ["6th Grade", "7th Grade", "8th Grade"],
    desc: "Foundations of math: integers, fractions, ratios, proportions, basic equations. Build the skills needed for success in Algebra 1.",
    topics: ["Integers & number sense", "Fractions & decimals", "Ratios & proportions", "Basic equations", "Coordinate plane"],
  },
  {
    name: "Algebra 1",
    grades: ["8th Grade", "9th Grade"],
    desc: "The gateway to higher math. Linear equations, inequalities, systems of equations, polynomials, and factoring.",
    topics: ["Linear equations & inequalities", "Systems of equations", "Polynomials", "Factoring", "Functions & graphing"],
  },
];

const comingSoonSubjects = [
  {
    name: "Geometry",
    grades: ["9th Grade", "10th Grade"],
    desc: "Shapes, proofs, and spatial reasoning. From angles and triangles to circles and coordinate geometry.",
    topics: ["Triangle congruence & similarity", "Two-column proofs", "Circle theorems", "Area & volume", "Coordinate geometry"],
  },
  {
    name: "Algebra 2",
    grades: ["9th Grade", "10th Grade", "11th Grade"],
    desc: "Advanced algebraic concepts including quadratics, polynomials, rational expressions, logarithms, and complex numbers.",
    topics: ["Quadratic functions", "Polynomial division", "Logarithms & exponents", "Complex numbers", "Sequences & series"],
  },
  {
    name: "Trigonometry",
    grades: ["10th Grade", "11th Grade"],
    desc: "Angles, triangles, and the unit circle. Master sin, cos, tan and their applications.",
    topics: ["Unit circle", "Trig ratios & identities", "Graphing trig functions", "Law of sines & cosines", "Inverse trig"],
  },
  {
    name: "Pre-Calculus",
    grades: ["11th Grade", "12th Grade"],
    desc: "Bridging Algebra and Calculus functions, limits, parametric equations, and polar coordinates.",
    topics: ["Functions & transformations", "Limits introduction", "Polynomial & rational functions", "Trig identities", "Vectors"],
  },
  {
    name: "Calculus",
    grades: ["12th Grade"],
    desc: "Derivatives, integrals, and the fundamental theorem of calculus.",
    topics: ["Limits & continuity", "Derivatives", "Rules of differentiation", "Integration basics", "FTC"],
  },
  {
    name: "SAT Math",
    grades: ["10th Grade", "11th Grade", "12th Grade"],
    desc: "Targeted SAT Math prep covering Heart of Algebra, Problem Solving, and Advanced Math.",
    topics: ["Heart of Algebra", "Problem solving & data", "Advanced math", "Calculator strategies", "Timed practice"],
  },
];

export default function SubjectsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <PublicNav />

      {/* Hero */}
      <section className="bg-white py-16 px-4 border-b border-gray-100">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Subjects We Cover</h1>
          <p className="text-xl text-gray-500">Specialized instruction in Pre-Algebra and Algebra 1, with more subjects coming soon.</p>
        </div>
      </section>

      {/* Active subjects */}
      <section className="max-w-5xl mx-auto px-4 py-12">
        <div className="flex items-center gap-3 mb-6">
          <Calculator className="w-6 h-6 text-violet-600" />
          <h2 className="text-2xl font-bold text-gray-900">Now Available</h2>
          <Badge className="bg-violet-600 text-white border-0">Enrolling Now</Badge>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          {activeSubjects.map((s) => (
            <Card key={s.name} className="hover:shadow-md transition-shadow border-violet-200">
              <CardContent className="pt-6">
                <h3 className="text-lg font-bold text-gray-900 mb-1">{s.name}</h3>
                <div className="flex flex-wrap gap-1 mb-3">
                  {s.grades.map(g => <Badge key={g} variant="outline" className="text-xs">{g}</Badge>)}
                </div>
                <p className="text-sm text-gray-500 leading-relaxed mb-4">{s.desc}</p>
                <ul className="space-y-1 mb-5">
                  {s.topics.map(t => (
                    <li key={t} className="text-xs text-gray-400 flex items-center gap-2">
                      <span className="w-1 h-1 bg-violet-400 rounded-full flex-shrink-0" />
                      {t}
                    </li>
                  ))}
                </ul>
                <Link href="/book">
                  <Button size="sm" className="w-full">
                    Book {s.name} <ArrowRight className="w-3 h-3 ml-1" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Coming soon */}
      <section className="max-w-5xl mx-auto px-4 pb-16">
        <div className="flex items-center gap-3 mb-6">
          <TrendingUp className="w-6 h-6 text-gray-400" />
          <h2 className="text-2xl font-bold text-gray-700">Coming Soon</h2>
          <Badge variant="outline" className="text-gray-400 border-gray-300">In Development</Badge>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {comingSoonSubjects.map((s) => (
            <Card key={s.name} className="opacity-70">
              <CardContent className="pt-6">
                <div className="flex items-start justify-between mb-1">
                  <h3 className="text-lg font-bold text-gray-600">{s.name}</h3>
                  <div className="flex items-center gap-1 text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full ml-2 flex-shrink-0">
                    <Clock className="w-3 h-3" /> Coming Soon
                  </div>
                </div>
                <div className="flex flex-wrap gap-1 mb-3">
                  {s.grades.map(g => <Badge key={g} variant="outline" className="text-xs text-gray-400 border-gray-200">{g}</Badge>)}
                </div>
                <p className="text-sm text-gray-400 leading-relaxed mb-4">{s.desc}</p>
                <ul className="space-y-1 mb-5">
                  {s.topics.map(t => (
                    <li key={t} className="text-xs text-gray-300 flex items-center gap-2">
                      <span className="w-1 h-1 bg-gray-300 rounded-full flex-shrink-0" />
                      {t}
                    </li>
                  ))}
                </ul>
                <Button variant="outline" size="sm" className="w-full text-gray-400 border-gray-200 cursor-not-allowed" disabled>
                  Coming Soon
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}
