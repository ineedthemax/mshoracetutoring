import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center mb-3">
              <span className="text-lg font-medium text-white">Mshorace</span>
              <span className="text-lg font-bold text-violet-400">Tutoring</span>
            </div>
            <p className="text-sm text-gray-400 mb-4 max-w-xs">
              Live math tutoring that helps students understand the work — not just finish it. Pre-Algebra through AP Calculus.
            </p>
            <p className="text-xs text-gray-500">Available Monday–Saturday via Zoom</p>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-4">Services</h4>
            <ul className="space-y-2">
              <li><Link href="/book" className="text-sm text-gray-400 hover:text-white transition-colors">Book a Session</Link></li>
              <li><Link href="/groups" className="text-sm text-gray-400 hover:text-white transition-colors">Group Classes</Link></li>
              <li><Link href="/subjects" className="text-sm text-gray-400 hover:text-white transition-colors">Subjects</Link></li>
              <li><Link href="/pricing" className="text-sm text-gray-400 hover:text-white transition-colors">Pricing</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white mb-4">More</h4>
            <ul className="space-y-2">
              <li><Link href="/about" className="text-sm text-gray-400 hover:text-white transition-colors">About Marcus</Link></li>
              <li><Link href="/how-it-works" className="text-sm text-gray-400 hover:text-white transition-colors">How It Works</Link></li>
              <li><Link href="/faq" className="text-sm text-gray-400 hover:text-white transition-colors">FAQ</Link></li>
              <li><Link href="/contact" className="text-sm text-gray-400 hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-500">© 2026 Mshorace Tutoring. All rights reserved.</p>
          <div className="flex gap-4">
            <Link href="/login" className="text-xs text-gray-500 hover:text-white transition-colors">Parent Login</Link>
            <Link href="/login" className="text-xs text-gray-500 hover:text-white transition-colors">Student Login</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
