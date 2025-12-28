import { createClient } from "@/lib/supabase/server";
import type { Member } from "@/types/member";
import type { HistoryPoint } from "@/lib/mock-data";

export interface MemberWithBenefit {
  id: string;
  userId: string;
  name: string;
  avatar: string;
  color: string;
  currentBenefit: number;
  createdAt: string;
}

export async function getMembers(): Promise<MemberWithBenefit[]> {
  const supabase = await createClient();

  // Get all members with their latest benefit amount
  const { data: members } = await supabase
    .from("members")
    .select(
      `
      id,
      user_id,
      name,
      avatar_url,
      color,
      created_at,
      benefit_history (
        amount,
        recorded_at
      )
    `
    )
    .order("created_at", { ascending: true });

  if (!members) return [];

  return members.map((member) => {
    const history = member.benefit_history as Array<{
      amount: number;
      recorded_at: string;
    }>;
    const latestBenefit = history?.length
      ? Math.max(...history.map((h) => Number(h.amount)))
      : 0;

    return {
      id: member.id,
      userId: member.user_id,
      name: member.name,
      avatar:
        member.avatar_url ||
        `https://api.dicebear.com/9.x/avataaars/svg?seed=${member.name}`,
      color: member.color,
      currentBenefit: latestBenefit,
      createdAt: member.created_at,
    };
  });
}

export async function getMembersForChart(): Promise<Member[]> {
  const members = await getMembers();
  return members.map((m) => ({
    id: m.id,
    name: m.name,
    avatar: m.avatar,
    currentBenefit: m.currentBenefit,
    color: m.color,
  }));
}

export async function getHistoryForChart(): Promise<HistoryPoint[]> {
  const supabase = await createClient();

  // Get all members
  const { data: members } = await supabase
    .from("members")
    .select("id, name")
    .order("created_at", { ascending: true });

  if (!members || members.length === 0) return [];

  // Get all benefit history
  const { data: history } = await supabase
    .from("benefit_history")
    .select("member_id, amount, recorded_at")
    .order("recorded_at", { ascending: true });

  if (!history || history.length === 0) return [];

  // Group history by month
  const monthlyData = new Map<string, Record<string, number>>();

  for (const entry of history) {
    const date = new Date(entry.recorded_at);
    const monthKey = date.toLocaleDateString("en-US", {
      month: "short",
      year: "2-digit",
    });

    if (!monthlyData.has(monthKey)) {
      monthlyData.set(monthKey, {});
    }

    const member = members.find((m) => m.id === entry.member_id);
    if (member) {
      const current = monthlyData.get(monthKey)!;
      // Keep the highest value for each member in each month
      current[member.name] = Math.max(
        current[member.name] || 0,
        Number(entry.amount)
      );
    }
  }

  // Convert to HistoryPoint array
  const result: HistoryPoint[] = [];
  const sortedMonths = Array.from(monthlyData.keys()).sort((a, b) => {
    const dateA = new Date(a);
    const dateB = new Date(b);
    return dateA.getTime() - dateB.getTime();
  });

  // Carry forward values for members who joined later
  const lastKnownValues: Record<string, number> = {};
  for (const name of members.map((m) => m.name)) {
    lastKnownValues[name] = 0;
  }

  for (const month of sortedMonths) {
    const data = monthlyData.get(month)!;
    const point: HistoryPoint = { date: month };

    for (const member of members) {
      if (data[member.name] !== undefined) {
        lastKnownValues[member.name] = data[member.name];
      }
      point[member.name] = lastKnownValues[member.name];
    }

    result.push(point);
  }

  return result;
}

export async function getCurrentUserMember(): Promise<MemberWithBenefit | null> {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return null;

  const { data: member } = await supabase
    .from("members")
    .select(
      `
      id,
      user_id,
      name,
      avatar_url,
      color,
      created_at,
      benefit_history (
        amount,
        recorded_at
      )
    `
    )
    .eq("user_id", user.id)
    .single();

  if (!member) return null;

  const history = member.benefit_history as Array<{
    amount: number;
    recorded_at: string;
  }>;
  const latestBenefit = history?.length
    ? Math.max(...history.map((h) => Number(h.amount)))
    : 0;

  return {
    id: member.id,
    userId: member.user_id,
    name: member.name,
    avatar:
      member.avatar_url ||
      `https://api.dicebear.com/9.x/avataaars/svg?seed=${member.name}`,
    color: member.color,
    currentBenefit: latestBenefit,
    createdAt: member.created_at,
  };
}
