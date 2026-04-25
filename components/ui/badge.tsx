import * as React from "react"
import { cn } from "@/lib/utils"

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "success" | "warning" | "destructive" | "outline"
}

export function Badge({ className, variant = "default", ...props }: BadgeProps) {
  return (
    <span className={cn(
      "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
      variant === "default" && "bg-violet-100 text-violet-700",
      variant === "success" && "bg-green-100 text-green-700",
      variant === "warning" && "bg-yellow-100 text-yellow-700",
      variant === "destructive" && "bg-red-100 text-red-700",
      variant === "outline" && "border border-gray-200 text-gray-600",
      className
    )} {...props} />
  )
}
