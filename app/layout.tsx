import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ChatWidget } from "@/components/ChatWidget";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Mshorace Tutoring Live Math Tutoring for Middle & High School",
  description: "Live 1-on-1 and small group math tutoring via Zoom. Pre-algebra through AP Calculus.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gray-50`}>
        {children}
        <ChatWidget />
      </body>
    </html>
  );
}
