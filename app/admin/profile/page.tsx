"use client";
import { useState } from "react";
import { mockTutor } from "@/lib/mock-data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { User } from "lucide-react";

export default function ProfilePage() {
  const [form, setForm] = useState({
    name: mockTutor.name,
    title: mockTutor.title,
    bio: mockTutor.bio,
    experience: mockTutor.experience,
    hourlyRate: mockTutor.hourlyRate,
    teachingStyle: mockTutor.teachingStyle,
  });

  function update(key: string, value: string | number) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  return (
    <div className="p-8 max-w-3xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Tutor Profile</h1>
          <p className="text-gray-500 text-sm mt-1">This is what families see on your public profile page.</p>
        </div>
        <Button onClick={() => alert("Profile saved! (Supabase sync coming soon)")}>Save Changes</Button>
      </div>

      <div className="space-y-6">
        {/* Photo */}
        <Card>
          <CardHeader><CardTitle>Profile Photo</CardTitle></CardHeader>
          <CardContent>
            <div className="flex items-center gap-6">
              <div className="w-20 h-20 bg-violet-100 rounded-2xl flex items-center justify-center">
                <User className="w-10 h-10 text-violet-400" />
              </div>
              <div>
                <Button variant="outline" size="sm">Upload Photo</Button>
                <p className="text-xs text-gray-400 mt-1">JPG or PNG, max 2MB</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Basic info */}
        <Card>
          <CardHeader><CardTitle>Basic Information</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            {[
              { label: "Full Name", key: "name", type: "text" },
              { label: "Title / Headline", key: "title", type: "text" },
              { label: "Years of Experience", key: "experience", type: "text" },
              { label: "Hourly Rate ($)", key: "hourlyRate", type: "number" },
            ].map((field) => (
              <div key={field.key}>
                <label className="block text-sm font-medium text-gray-700 mb-1">{field.label}</label>
                <input
                  type={field.type}
                  value={form[field.key as keyof typeof form]}
                  onChange={(e) => update(field.key, field.type === "number" ? Number(e.target.value) : e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 bg-white"
                />
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Bio */}
        <Card>
          <CardHeader><CardTitle>Bio</CardTitle></CardHeader>
          <CardContent>
            <textarea
              rows={5}
              value={form.bio}
              onChange={(e) => update("bio", e.target.value)}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 bg-white resize-none"
            />
          </CardContent>
        </Card>

        {/* Teaching style */}
        <Card>
          <CardHeader><CardTitle>Teaching Style</CardTitle></CardHeader>
          <CardContent>
            <textarea
              rows={3}
              value={form.teachingStyle}
              onChange={(e) => update("teachingStyle", e.target.value)}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 bg-white resize-none"
            />
          </CardContent>
        </Card>

        {/* Subjects */}
        <Card>
          <CardHeader><CardTitle>Subjects</CardTitle></CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {mockTutor.subjects.map((s) => (
                <span key={s} className="px-3 py-1 bg-violet-100 text-violet-700 rounded-full text-sm font-medium">{s}</span>
              ))}
            </div>
            <p className="text-xs text-gray-400 mt-3">Subject editing coming in next update.</p>
          </CardContent>
        </Card>

        {/* Credentials */}
        <Card>
          <CardHeader><CardTitle>Credentials</CardTitle></CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {mockTutor.credentials.map((c) => (
                <li key={c} className="flex items-center gap-2 text-sm text-gray-700">
                  <span className="w-1.5 h-1.5 bg-violet-500 rounded-full" />
                  {c}
                </li>
              ))}
            </ul>
            <p className="text-xs text-gray-400 mt-3">Credential editing coming in next update.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
