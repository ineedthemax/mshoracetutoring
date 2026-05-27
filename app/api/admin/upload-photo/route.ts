import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";

const ALLOWED_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
  "image/heic",   // iPhone photos
  "image/heif",   // iPhone photos (alternate)
  "image/gif",
];

// Map HEIC/HEIF to jpg for storage compatibility
function getStorageExt(file: File): string {
  if (file.type === "image/heic" || file.type === "image/heif") return "jpg";
  const ext = file.name.split(".").pop()?.toLowerCase();
  return ext ?? "jpg";
}

export async function POST(req: NextRequest) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user || user.user_metadata?.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const formData = await req.formData();
  const file = formData.get("file") as File;

  if (!file) return NextResponse.json({ error: "No file provided" }, { status: 400 });

  // 5MB limit (increased from 2MB for HEIC which can be larger)
  if (file.size > 5 * 1024 * 1024) {
    return NextResponse.json({ error: "File too large (max 5MB)" }, { status: 400 });
  }

  if (!ALLOWED_TYPES.includes(file.type)) {
    return NextResponse.json({
      error: `File type not supported. Please use a JPG, PNG, or photo from your camera roll.`
    }, { status: 400 });
  }

  const admin = createAdminClient();
  const ext = getStorageExt(file);
  const fileName = `tutor-profile.${ext}`;

  // For HEIC files, store as-is (browsers can display them, Supabase serves them)
  const contentType = (file.type === "image/heic" || file.type === "image/heif")
    ? "image/jpeg"
    : file.type;

  const { error: uploadError } = await admin.storage
    .from("avatars")
    .upload(fileName, file, { upsert: true, contentType });

  if (uploadError) {
    return NextResponse.json({ error: uploadError.message }, { status: 500 });
  }

  const { data: { publicUrl } } = admin.storage.from("avatars").getPublicUrl(fileName);

  // Also save the URL directly to tutor_profile
  await admin.from("tutor_profile").update({ profile_photo_url: publicUrl }).neq("id", "");

  return NextResponse.json({ url: publicUrl });
}
