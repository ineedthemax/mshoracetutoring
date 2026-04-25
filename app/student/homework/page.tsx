"use client";
import { useState } from "react";
import { DashboardSidebar } from "@/components/layout/DashboardSidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Upload, FileText, Clock } from "lucide-react";

const previousUploads = [
  { name: "quadratic_practice_set.pdf", topic: "Quadratic Formula", session: "Apr 21 session", date: "Apr 22, 2026", status: "reviewed" },
  { name: "factoring_hw_pg142.jpg", topic: "Factoring Trinomials", session: "Apr 14 session", date: "Apr 15, 2026", status: "reviewed" },
  { name: "completing_square.pdf", topic: "Completing the Square", session: "Apr 7 session", date: "Apr 8, 2026", status: "reviewed" },
];

export default function HomeworkPage() {
  const [submitted, setSubmitted] = useState(false);
  const [topic, setTopic] = useState("");
  const [sessionRef, setSessionRef] = useState("");
  const [notes, setNotes] = useState("");

  return (
    <div className="flex min-h-screen bg-gray-50">
      <DashboardSidebar role="student" />
      <main className="ml-64 flex-1 p-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Upload Homework</h1>
          <p className="text-gray-500 text-sm mt-1">Send your work to Marcus for review before or after your session.</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Upload form */}
          <Card>
            <CardHeader>
              <CardTitle>New Upload</CardTitle>
            </CardHeader>
            <CardContent>
              {submitted ? (
                <div className="text-center py-8">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-xl">✓</span>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-1">Uploaded!</h3>
                  <p className="text-sm text-gray-500 mb-4">Marcus will review it before your next session.</p>
                  <Button variant="outline" onClick={() => setSubmitted(false)}>Upload Another</Button>
                </div>
              ) : (
                <div className="space-y-4">
                  {/* Drop zone */}
                  <div className="border-2 border-dashed border-gray-200 rounded-xl p-10 text-center hover:border-violet-300 transition-colors cursor-pointer bg-gray-50">
                    <Upload className="w-10 h-10 text-gray-300 mx-auto mb-3" />
                    <p className="text-sm font-medium text-gray-600">Click to browse or drag &amp; drop</p>
                    <p className="text-xs text-gray-400 mt-1">PDF, JPG, PNG max 10MB</p>
                    <button className="mt-3 text-xs text-violet-600 hover:underline">Choose File</button>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Topic</label>
                    <select
                      value={topic}
                      onChange={(e) => setTopic(e.target.value)}
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 bg-white"
                    >
                      <option value="">Select topic...</option>
                      <option>Quadratic Formula</option>
                      <option>Factoring Trinomials</option>
                      <option>Completing the Square</option>
                      <option>Polynomial Division</option>
                      <option>Complex Numbers</option>
                      <option>Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Related Session</label>
                    <select
                      value={sessionRef}
                      onChange={(e) => setSessionRef(e.target.value)}
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 bg-white"
                    >
                      <option value="">Link to a session (optional)...</option>
                      <option>Apr 28 Algebra 2</option>
                      <option>Apr 21 Algebra 2</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Notes for Marcus</label>
                    <textarea
                      rows={3}
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="Describe what you're stuck on or what feedback you need..."
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 bg-white resize-none"
                    />
                  </div>

                  <Button className="w-full" onClick={() => setSubmitted(true)}>
                    <Upload className="w-4 h-4 mr-2" /> Upload Homework
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Previous uploads */}
          <Card>
            <CardHeader>
              <CardTitle>Previous Uploads</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {previousUploads.map((file) => (
                  <div key={file.name} className="flex items-start gap-3 p-3 bg-gray-50 rounded-xl">
                    <div className="w-9 h-9 bg-violet-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <FileText className="w-4 h-4 text-violet-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-800 truncate">{file.name}</p>
                      <p className="text-xs text-gray-400">{file.topic} · {file.session}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <Clock className="w-3 h-3 text-gray-300" />
                        <span className="text-xs text-gray-400">{file.date}</span>
                      </div>
                    </div>
                    <Badge variant="success" className="text-xs flex-shrink-0">{file.status}</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
