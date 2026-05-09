"use client";
import Link from "next/link";
import { ArrowLeft, Eye } from "lucide-react";

interface Props {
  role: "parent" | "student";
}

export function PreviewBanner({ role }: Props) {
  return (
    <div className="bg-amber-500 text-white px-4 py-2 flex items-center justify-between text-sm font-medium z-50">
      <div className="flex items-center gap-2">
        <Eye className="w-4 h-4" />
        <span>Previewing as <strong>{role === "parent" ? "Parent" : "Student"}</strong></span>
      </div>
      <Link href="/admin" className="flex items-center gap-1.5 bg-white/20 hover:bg-white/30 px-3 py-1 rounded-lg transition-colors text-xs font-semibold">
        <ArrowLeft className="w-3.5 h-3.5" /> Back to Admin
      </Link>
    </div>
  );
}
