"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export async function signIn(formData: FormData) {
  const supabase = await createClient();

  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) return { error: error.message };

  const { data: { user } } = await supabase.auth.getUser();

  // Read role from user metadata (always available, no RLS issues)
  const role = user?.user_metadata?.role ?? "parent";

  revalidatePath("/", "layout");
  redirect(role === "admin" ? "/admin" : role === "student" ? "/student" : "/parent");
}

export async function signUp(formData: FormData) {
  const supabase = await createClient();

  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const name = formData.get("name") as string;
  const role = (formData.get("role") as string) || "parent";

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: { data: { name, role } },
  });

  if (error) return { error: error.message };

  revalidatePath("/", "layout");
  redirect("/parent?welcome=1");
}

export async function signOut() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  revalidatePath("/", "layout");
  redirect("/login");
}
