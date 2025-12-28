"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

// Challenge runs from Jan 1 to Dec 31 of the current year
function getChallengeYear(): number {
  return new Date().getFullYear();
}

function getChallengeStartDate(): Date {
  const year = getChallengeYear();
  return new Date(`${year}-01-01T00:00:00`);
}

function getChallengeEndDate(): Date {
  const year = getChallengeYear();
  return new Date(`${year}-12-31T23:59:59`);
}

export async function addBenefit(
  amount: number,
  date: string
): Promise<{ error?: string }> {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: "Not authenticated" };
  }

  // Validate date is within current challenge year
  const recordedAt = new Date(`${date}T12:00:00`);
  const challengeStart = getChallengeStartDate();
  const challengeEnd = getChallengeEndDate();

  if (recordedAt < challengeStart || recordedAt > challengeEnd) {
    return {
      error: `Date must be within the ${getChallengeYear()} challenge year`,
    };
  }

  // Cannot add profit for future dates
  if (recordedAt > new Date()) {
    return { error: "Cannot add profit for future dates" };
  }

  // Get the member
  const { data: member } = await supabase
    .from("members")
    .select("id")
    .eq("user_id", user.id)
    .single();

  if (!member) {
    return { error: "Member not found" };
  }

  // Insert individual profit entry (cumulative is calculated on read)
  const { error } = await supabase.from("benefit_history").insert({
    member_id: member.id,
    amount: amount,
    recorded_at: recordedAt.toISOString(),
  });

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/");
  return {};
}
