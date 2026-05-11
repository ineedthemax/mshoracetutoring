import { redirect } from "next/navigation";

// This was a hardcoded demo page — redirect to the real sessions/reports page
export default function OldProgressPage() {
  redirect("/parent/sessions");
}
