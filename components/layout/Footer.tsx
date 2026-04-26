import Link from "next/link";
import Image from "next/image";

export function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="inline-block mb-4">
              <Image
                src="/Logo.png"
                alt="MsHorace Tutoring"
                width={200}
                height={80}
                className="h-20 w-auto"
              />
            </Link>
            <p className="text-sm text-gray-400 mb-4 max-w-xs leading-relaxed">
              Live math tutoring that helps students understand the work, not just finish it. Pre-Algebra and Algebra 1 specialists.
            </p>
            <p className="text-xs text-gray-500">White Plains, Maryland · Online via Zoom nationwide</p>
            <p className="text-xs text-gray-500 mt-1">Monday–Saturday</p>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-4">Services</h4>
            <ul className="space-y-2">
              <li><Link href="/book" className="text-sm text-gray-400 hover:text-white transition-colors">Book a Session</Link></li>
              <li><Link href="/groups" className="text-sm text-gray-400 hover:text-white transition-colors">Group Classes</Link></li>
              <li><Link href="/courses" className="text-sm text-gray-400 hover:text-white transition-colors">Digital Courses</Link></li>
              <li><Link href="/subjects" className="text-sm text-gray-400 hover:text-white transition-colors">Subjects</Link></li>
              <li><Link href="/pricing" className="text-sm text-gray-400 hover:text-white transition-colors">Pricing</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white mb-4">More</h4>
            <ul className="space-y-2">
              <li><Link href="/about" className="text-sm text-gray-400 hover:text-white transition-colors">About Stenita</Link></li>
              <li><Link href="/how-it-works" className="text-sm text-gray-400 hover:text-white transition-colors">How It Works</Link></li>
              <li><Link href="/faq" className="text-sm text-gray-400 hover:text-white transition-colors">FAQ</Link></li>
              <li><Link href="/contact" className="text-sm text-gray-400 hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-8 border-t border-gray-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-500">© 2026 MsHorace Tutoring. All rights reserved.</p>
          <div className="flex gap-4">
            <Link href="/login" className="text-xs text-gray-500 hover:text-white transition-colors">Parent Login</Link>
            <Link href="/login" className="text-xs text-gray-500 hover:text-white transition-colors">Student Login</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
