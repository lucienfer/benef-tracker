import { createClient } from "@/lib/supabase/server";
import type { Member } from "@/types/member";
import type { HistoryPoint } from "@/lib/mock-data";

// Challenge year helpers
function getChallengeYear(): number {
  return new Date().getFullYear();
}

function getChallengeStartDate(): string {
  return `${getChallengeYear()}-01-01T00:00:00.000Z`;
}

function getChallengeEndDate(): string {
  return `${getChallengeYear()}-12-31T23:59:59.999Z`;
}

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
  const challengeStart = getChallengeStartDate();
  const challengeEnd = getChallengeEndDate();

  // Get all members
  const { data: members } = await supabase
    .from("members")
    .select("id, user_id, name, avatar_url, color, created_at")
    .order("created_at", { ascending: true });

  if (!members) return [];

  // Get benefit history for current challenge year only
  const { data: history } = await supabase
    .from("benefit_history")
    .select("member_id, amount, recorded_at")
    .gte("recorded_at", challengeStart)
    .lte("recorded_at", challengeEnd)
    .order("recorded_at", { ascending: false });

  return members.map((member) => {
    // Sum all profits for this member in current year
    const memberHistory = history?.filter((h) => h.member_id === member.id);
    const totalBenefit =
      memberHistory?.reduce((sum, h) => sum + Number(h.amount), 0) ?? 0;

    return {
      id: member.id,
      userId: member.user_id,
      name: member.name,
      avatar:
        member.avatar_url ||
        `https://api.dicebear.com/9.x/avataaars/svg?seed=${member.name}`,
      color: member.color,
      currentBenefit: totalBenefit,
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
  const challengeYear = getChallengeYear();
  const challengeStart = getChallengeStartDate();
  const challengeEnd = getChallengeEndDate();

  // Get all members
  const { data: members } = await supabase
    .from("members")
    .select("id, name")
    .order("created_at", { ascending: true });

  if (!members || members.length === 0) return [];

  // Get benefit history for current challenge year only
  const { data: history } = await supabase
    .from("benefit_history")
    .select("member_id, amount, recorded_at")
    .gte("recorded_at", challengeStart)
    .lte("recorded_at", challengeEnd)
    .order("recorded_at", { ascending: true });

  // Generate all 12 months of the challenge year
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const yearSuffix = String(challengeYear).slice(-2);

  // Initialize monthly profit sums (individual profits per month)
  const monthlyProfits = new Map<string, Record<string, number>>();
  for (const monthName of monthNames) {
    const monthKey = `${monthName} '${yearSuffix}`;
    monthlyProfits.set(monthKey, {});
    for (const member of members) {
      monthlyProfits.get(monthKey)![member.name] = 0;
    }
  }

  // Sum up profits per member per month
  if (history) {
    for (const entry of history) {
      const date = new Date(entry.recorded_at);
      const monthIndex = date.getMonth();
      const monthKey = `${monthNames[monthIndex]} '${yearSuffix}`;

      const member = members.find((m) => m.id === entry.member_id);
      if (member) {
        const current = monthlyProfits.get(monthKey)!;
        // Add to the monthly sum
        current[member.name] =
          (current[member.name] || 0) + Number(entry.amount);
      }
    }
  }

  // Convert to HistoryPoint array with running cumulative totals
  const result: HistoryPoint[] = [];
  const cumulativeTotals: Record<string, number> = {};
  for (const member of members) {
    cumulativeTotals[member.name] = 0;
  }

  for (const monthName of monthNames) {
    const monthKey = `${monthName} '${yearSuffix}`;
    const monthProfits = monthlyProfits.get(monthKey)!;
    const point: HistoryPoint = { date: monthKey };

    for (const member of members) {
      // Add this month's profit to running total
      cumulativeTotals[member.name] += monthProfits[member.name] || 0;
      point[member.name] = cumulativeTotals[member.name];
    }

    result.push(point);
  }

  return result;
}

export async function getCurrentUserMember(): Promise<MemberWithBenefit | null> {
  const supabase = await createClient();
  const challengeStart = getChallengeStartDate();
  const challengeEnd = getChallengeEndDate();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return null;

  // Get member info
  const { data: member } = await supabase
    .from("members")
    .select("id, user_id, name, avatar_url, color, created_at")
    .eq("user_id", user.id)
    .single();

  if (!member) return null;

  // Get all benefit history for current challenge year and sum them
  const { data: history } = await supabase
    .from("benefit_history")
    .select("amount")
    .eq("member_id", member.id)
    .gte("recorded_at", challengeStart)
    .lte("recorded_at", challengeEnd);

  const totalBenefit =
    history?.reduce((sum, h) => sum + Number(h.amount), 0) ?? 0;

  return {
    id: member.id,
    userId: member.user_id,
    name: member.name,
    avatar:
      member.avatar_url ||
      `https://api.dicebear.com/9.x/avataaars/svg?seed=${member.name}`,
    color: member.color,
    currentBenefit: totalBenefit,
    createdAt: member.created_at,
  };
}
