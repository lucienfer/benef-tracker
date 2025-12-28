"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

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

  // Get the member
  const { data: member } = await supabase
    .from("members")
    .select("id")
    .eq("user_id", user.id)
    .single();

  if (!member) {
    return { error: "Member not found" };
  }

  // Get current benefit
  const { data: latestHistory } = await supabase
    .from("benefit_history")
    .select("amount")
    .eq("member_id", member.id)
    .order("recorded_at", { ascending: false })
    .limit(1)
    .single();

  const currentAmount = latestHistory ? Number(latestHistory.amount) : 0;
  const newAmount = currentAmount + amount;

  // Parse the date and set to noon to avoid timezone issues
  const recordedAt = new Date(`${date}T12:00:00`);

  // Insert new history entry with the specified date
  const { error } = await supabase.from("benefit_history").insert({
    member_id: member.id,
    amount: newAmount,
    recorded_at: recordedAt.toISOString(),
  });

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/");
  return {};
}
