"use client";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useState } from "react";

export function PublicNav() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image src="/Logo.png" alt="MsHorace Tutoring" width={180} height={72} className="h-16 w-auto" />
          </Link>

          {/* Center nav - desktop */}
          <div className="hidden md:flex items-center gap-6">
            <Link href="/" className="text-sm text-gray-600 hover:text-violet-600 transition-colors">Home</Link>
            <Link href="/subjects" className="text-sm text-gray-600 hover:text-violet-600 transition-colors">Subjects</Link>
            <Link href="/groups" className="text-sm text-gray-600 hover:text-violet-600 transition-colors">Group Classes</Link>
            <Link href="/pricing" className="text-sm text-gray-600 hover:text-violet-600 transition-colors">Pricing</Link>
            <Link href="/courses" className="text-sm text-gray-600 hover:text-violet-600 transition-colors">Courses</Link>
            <Link href="/about" className="text-sm text-gray-600 hover:text-violet-600 transition-colors">About</Link>
          </div>

          {/* Right buttons - desktop */}
          <div className="hidden md:flex items-center gap-3">
            <Link href="/login">
              <Button variant="ghost" size="sm">Log In</Button>
            </Link>
            <Link href="/book">
              <Button size="sm">Book a Session</Button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 text-gray-600"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="md:hidden pb-4 space-y-2">
            <Link href="/" className="block px-2 py-2 text-sm text-gray-600 hover:text-violet-600" onClick={() => setMobileOpen(false)}>Home</Link>
            <Link href="/subjects" className="block px-2 py-2 text-sm text-gray-600 hover:text-violet-600" onClick={() => setMobileOpen(false)}>Subjects</Link>
            <Link href="/groups" className="block px-2 py-2 text-sm text-gray-600 hover:text-violet-600" onClick={() => setMobileOpen(false)}>Group Classes</Link>
            <Link href="/pricing" className="block px-2 py-2 text-sm text-gray-600 hover:text-violet-600" onClick={() => setMobileOpen(false)}>Pricing</Link>
            <Link href="/courses" className="block px-2 py-2 text-sm text-gray-600 hover:text-violet-600" onClick={() => setMobileOpen(false)}>Courses</Link>
            <Link href="/about" className="block px-2 py-2 text-sm text-gray-600 hover:text-violet-600" onClick={() => setMobileOpen(false)}>About</Link>
            <div className="flex gap-3 pt-2">
              <Link href="/login" onClick={() => setMobileOpen(false)}>
                <Button variant="ghost" size="sm">Log In</Button>
              </Link>
              <Link href="/book" onClick={() => setMobileOpen(false)}>
                <Button size="sm">Book a Session</Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
