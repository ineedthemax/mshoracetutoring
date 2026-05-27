"use client";
import { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { User, Upload, Loader2, CheckCircle } from "lucide-react";
import Image from "next/image";

interface Profile {
  id: string;
  name: string;
  title: string;
  experience: string;
  hourlyRate: number;
  bio: string;
  teachingStyle: string;
  photoUrl: string;
}

export default function ProfilePage() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/admin/get-profile")
      .then(r => r.json())
      .then(d => { setProfile(d); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  function update(key: keyof Profile, value: string | number) {
    setProfile(p => p ? { ...p, [key]: value } : p);
    setSaved(false);
  }

  async function handlePhotoClick() {
    fileInputRef.current?.click();
  }

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file || !profile) return;

    setUploading(true);
    setError("");
    try {
      const form = new FormData();
      form.append("file", file);
      const res = await fetch("/api/admin/upload-photo", { method: "POST", body: form });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      update("photoUrl", data.url + "?t=" + Date.now()); // cache bust
    } catch (err: any) {
      setError(err.message ?? "Upload failed");
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  }

  async function handleSave() {
    if (!profile) return;
    setSaving(true);
    setError("");
    try {
      const res = await fetch("/api/admin/save-profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(profile),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (err: any) {
      setError(err.message ?? "Failed to save");
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div className="p-8 flex items-center justify-center min-h-64">
        <Loader2 className="w-6 h-6 animate-spin text-violet-500" />
      </div>
    );
  }

  if (!profile) {
    return <div className="p-8 text-red-500">Failed to load profile.</div>;
  }

  return (
    <div className="p-8 max-w-3xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Tutor Profile</h1>
          <p className="text-gray-500 text-sm mt-1">This is what families see on your public profile page.</p>
        </div>
        <Button onClick={handleSave} disabled={saving || saved}>
          {saving ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" />Saving…</> :
           saved  ? <><CheckCircle className="w-4 h-4 mr-2" />Saved!</> :
           "Save Changes"}
        </Button>
      </div>

      {error && (
        <div className="mb-4 bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 rounded-xl">{error}</div>
      )}

      <div className="space-y-6">
        {/* Photo */}
        <Card>
          <CardHeader><CardTitle>Profile Photo</CardTitle></CardHeader>
          <CardContent>
            <div className="flex items-center gap-6">
              <div className="w-20 h-20 bg-violet-100 rounded-2xl overflow-hidden flex items-center justify-center flex-shrink-0">
                {profile.photoUrl ? (
                  <Image
                    src={profile.photoUrl}
                    alt="Profile"
                    width={80}
                    height={80}
                    className="w-full h-full object-cover"
                    unoptimized
                  />
                ) : (
                  <User className="w-10 h-10 text-violet-400" />
                )}
              </div>
              <div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  className="hidden"
                  onChange={handleFileChange}
                />
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handlePhotoClick}
                  disabled={uploading}
                >
                  {uploading
                    ? <><Loader2 className="w-3.5 h-3.5 mr-1.5 animate-spin" />Uploading…</>
                    : <><Upload className="w-3.5 h-3.5 mr-1.5" />Upload Photo</>
                  }
                </Button>
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
              { label: "Full Name", key: "name" as const, type: "text" },
              { label: "Title / Headline", key: "title" as const, type: "text" },
              { label: "Years of Experience", key: "experience" as const, type: "text" },
              { label: "Hourly Rate ($)", key: "hourlyRate" as const, type: "number" },
            ].map((field) => (
              <div key={field.key}>
                <label className="block text-sm font-medium text-gray-700 mb-1">{field.label}</label>
                <input
                  type={field.type}
                  value={profile[field.key] ?? ""}
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
              value={profile.bio}
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
              value={profile.teachingStyle}
              onChange={(e) => update("teachingStyle", e.target.value)}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 bg-white resize-none"
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
