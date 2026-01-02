"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

function getChallengeYear(): number {
  return new Date().getFullYear();
}

// Generate a random color for new members
function generateRandomColor(): string {
  const hue = Math.floor(Math.random() * 360);
  return `oklch(0.65 0.2 ${hue})`;
}

export async function acceptChallenge(): Promise<{ error?: string }> {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: "Not authenticated" };
  }

  const year = getChallengeYear();

  // Check if member exists, if not create one
  const { data: existingMember, error: memberCheckError } = await supabase
    .from("members")
    .select("id")
    .eq("user_id", user.id)
    .single();

  if (memberCheckError && memberCheckError.code !== "PGRST116") {
    // PGRST116 = no rows returned, which is fine
    console.error("Error checking member:", memberCheckError);
  }

  if (!existingMember) {
    // Create member record
    const userName =
      user.user_metadata?.full_name ||
      user.user_metadata?.name ||
      user.email?.split("@")[0] ||
      "Anonymous";

    const avatarUrl =
      user.user_metadata?.avatar_url ||
      `https://api.dicebear.com/9.x/avataaars/svg?seed=${userName}`;

    const { error: memberError } = await supabase.from("members").insert({
      user_id: user.id,
      name: userName,
      avatar_url: avatarUrl,
      color: generateRandomColor(),
    });

    if (memberError) {
      console.error("Error creating member:", memberError);
      return { error: `Failed to create member: ${memberError.message}` };
    }
  }

  // Insert challenge acceptance
  const { error } = await supabase.from("challenge_acceptances").insert({
    user_id: user.id,
    year: year,
  });

  if (error) {
    console.error("Error accepting challenge:", error);
    // Ignore unique constraint violation (already accepted)
    if (error.code !== "23505") {
      return { error: `Failed to accept challenge: ${error.message}` };
    }
  }

  revalidatePath("/");
  return {};
}

export async function hasAcceptedChallenge(): Promise<boolean> {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return false;
  }

  const year = getChallengeYear();

  const { data } = await supabase
    .from("challenge_acceptances")
    .select("id")
    .eq("user_id", user.id)
    .eq("year", year)
    .single();

  return !!data;
}
