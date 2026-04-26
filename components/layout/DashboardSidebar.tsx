"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard, Calendar, TrendingUp, CreditCard, BookOpen, Upload,
  History, Users, FileText, Group, Settings, User, LogOut, Clock, BarChart2
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
    { label: "Upload Homework", href: "/student/homework", icon: Upload },
    { label: "Session History", href: "/student/history", icon: History },
  ],
  admin: [
    { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { label: "Bookings", href: "/admin/bookings", icon: Calendar },
    { label: "Students", href: "/admin/students", icon: Users },
    { label: "Courses", href: "/admin/courses", icon: BookOpen },
    { label: "Session Reports", href: "/admin/reports", icon: FileText },
    { label: "Group Classes", href: "/admin/groups", icon: BarChart2 },
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

export function DashboardSidebar({ role }: SidebarProps) {
  const pathname = usePathname();
  const items = navItems[role];
  const user = roleUsers[role];

  return (
    <aside className="fixed left-0 top-0 h-full w-64 bg-white border-r border-gray-100 flex flex-col z-40">
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
          const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href) && item.href.length > 6);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors",
                isActive
                  ? "bg-violet-50 text-violet-700"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              )}
            >
              <Icon className={cn("w-4 h-4", isActive ? "text-violet-600" : "text-gray-400")} />
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
  );
}
