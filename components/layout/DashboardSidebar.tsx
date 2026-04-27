"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard, Calendar, TrendingUp, CreditCard, BookOpen, Upload,
  History, Users, FileText, BarChart2, User, LogOut, Clock,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface SidebarProps {
  role: "parent" | "student" | "admin";
}

const navItems = {
  parent: [
    { label: "Dashboard", href: "/parent", icon: LayoutDashboard },
    { label: "Sessions", href: "/parent/sessions", icon: Calendar },
    { label: "Progress", href: "/parent/progress/st1", icon: TrendingUp },
    { label: "Payments", href: "/parent/payments", icon: CreditCard },
    { label: "Book Session", href: "/book", icon: BookOpen },
  ],
  student: [
    { label: "Dashboard", href: "/student", icon: LayoutDashboard },
    { label: "My Sessions", href: "/student/sessions", icon: Calendar },
    { label: "My Courses", href: "/student/courses", icon: BookOpen },
    { label: "Homework", href: "/student/homework", icon: Upload },
    { label: "History", href: "/student/history", icon: History },
  ],
  admin: [
    { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { label: "Bookings", href: "/admin/bookings", icon: Calendar },
    { label: "Students", href: "/admin/students", icon: Users },
    { label: "Courses", href: "/admin/courses", icon: BookOpen },
    { label: "Reports", href: "/admin/reports", icon: FileText },
    { label: "Groups", href: "/admin/groups", icon: BarChart2 },
    { label: "Payments", href: "/admin/payments", icon: CreditCard },
    { label: "Availability", href: "/admin/availability", icon: Clock },
    { label: "Profile", href: "/admin/profile", icon: User },
  ],
};

const roleLabels = {
  parent: "Parent Portal",
  student: "Student Portal",
  admin: "Tutor Dashboard",
};

const roleUsers = {
  parent: { name: "Lisa Campbell", initials: "LC" },
  student: { name: "Jordan Campbell", initials: "JC" },
  admin: { name: "Stenita Horace", initials: "SH" },
};

// Show only 4-5 items in the bottom nav on mobile
const mobileNavItems = {
  parent: [
    { label: "Home", href: "/parent", icon: LayoutDashboard },
    { label: "Sessions", href: "/parent/sessions", icon: Calendar },
    { label: "Progress", href: "/parent/progress/st1", icon: TrendingUp },
    { label: "Book", href: "/book", icon: BookOpen },
  ],
  student: [
    { label: "Home", href: "/student", icon: LayoutDashboard },
    { label: "Sessions", href: "/student/sessions", icon: Calendar },
    { label: "Courses", href: "/student/courses", icon: BookOpen },
    { label: "Homework", href: "/student/homework", icon: Upload },
  ],
  admin: [
    { label: "Home", href: "/admin", icon: LayoutDashboard },
    { label: "Bookings", href: "/admin/bookings", icon: Calendar },
    { label: "Students", href: "/admin/students", icon: Users },
    { label: "Reports", href: "/admin/reports", icon: FileText },
    { label: "More", href: "/admin/courses", icon: BarChart2 },
  ],
};

export function DashboardSidebar({ role }: SidebarProps) {
  const pathname = usePathname();
  const items = navItems[role];
  const mobileItems = mobileNavItems[role];
  const user = roleUsers[role];

  const isActive = (href: string) =>
    pathname === href || (href.length > 6 && pathname.startsWith(href));

  return (
    <>
      {/* ── Desktop sidebar ── */}
      <aside className="hidden md:flex fixed left-0 top-0 h-full w-64 bg-white border-r border-gray-100 flex-col z-40">
        {/* Logo + role */}
        <div className="p-6 border-b border-gray-100">
          <Link href="/" className="flex items-center mb-1">
            <Image src="/Logo.png" alt="MsHorace Tutoring" width={100} height={40} className="h-10 w-auto" />
          </Link>
          <span className="text-xs text-gray-400 font-medium uppercase tracking-wide">{roleLabels[role]}</span>
        </div>

        {/* Nav items */}
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {items.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors",
                  active ? "bg-violet-50 text-violet-700" : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                )}
              >
                <Icon className={cn("w-4 h-4", active ? "text-violet-600" : "text-gray-400")} />
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Bottom user area */}
        <div className="p-4 border-t border-gray-100">
          <div className="flex items-center gap-3 mb-3">
            <Avatar className="w-8 h-8">
              <AvatarFallback className="text-xs">{user.initials}</AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">{user.name}</p>
              <p className="text-xs text-gray-400 capitalize">{role}</p>
            </div>
          </div>
          <Link
            href="/login"
            className="flex items-center gap-2 px-3 py-2 rounded-xl text-sm text-gray-500 hover:bg-gray-50 hover:text-gray-700 transition-colors w-full"
          >
            <LogOut className="w-4 h-4" />
            Log Out
          </Link>
        </div>
      </aside>

      {/* ── Mobile top bar ── */}
      <header className="md:hidden fixed top-0 left-0 right-0 z-40 bg-white border-b border-gray-100 flex items-center justify-between px-4 h-14">
        <Link href="/">
          <Image src="/Logo.png" alt="MsHorace Tutoring" width={80} height={32} className="h-8 w-auto" />
        </Link>
        <div className="flex items-center gap-2">
          <Avatar className="w-8 h-8">
            <AvatarFallback className="text-xs">{user.initials}</AvatarFallback>
          </Avatar>
          <Link href="/login" className="p-1.5 text-gray-400 hover:text-gray-600">
            <LogOut className="w-4 h-4" />
          </Link>
        </div>
      </header>

      {/* ── Mobile bottom navigation ── */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-gray-100 flex items-center justify-around px-2 h-16 safe-area-inset-bottom">
        {mobileItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className="flex flex-col items-center gap-0.5 px-3 py-1 rounded-xl transition-colors min-w-0"
            >
              <Icon className={cn("w-5 h-5", active ? "text-violet-600" : "text-gray-400")} />
              <span className={cn("text-[10px] font-medium truncate", active ? "text-violet-600" : "text-gray-400")}>
                {item.label}
              </span>
            </Link>
          );
        })}
      </nav>
    </>
  );
}
