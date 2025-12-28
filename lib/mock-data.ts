import { Member } from "@/types/member";

export const mockMembers: Member[] = [
  {
    id: "1",
    name: "Alex",
    avatar: "https://api.dicebear.com/9.x/avataaars/svg?seed=Alex",
    currentBenefit: 45000,
    color: "oklch(0.65 0.2 150)",
  },
  {
    id: "2",
    name: "Jordan",
    avatar: "https://api.dicebear.com/9.x/avataaars/svg?seed=Jordan",
    currentBenefit: 32500,
    color: "oklch(0.65 0.2 220)",
  },
  {
    id: "3",
    name: "Sam",
    avatar: "https://api.dicebear.com/9.x/avataaars/svg?seed=Sam",
    currentBenefit: 67800,
    color: "oklch(0.65 0.2 290)",
  },
  {
    id: "4",
    name: "Taylor",
    avatar: "https://api.dicebear.com/9.x/avataaars/svg?seed=Taylor",
    currentBenefit: 12300,
    color: "oklch(0.65 0.2 40)",
  },
  {
    id: "5",
    name: "Morgan",
    avatar: "https://api.dicebear.com/9.x/avataaars/svg?seed=Morgan",
    currentBenefit: 89500,
    color: "oklch(0.65 0.2 80)",
  },
];

export interface HistoryPoint {
  date: string;
  [memberName: string]: number | string;
}

export const mockHistory: HistoryPoint[] = [
  { date: "Jan", Alex: 0, Jordan: 0, Sam: 0, Taylor: 0, Morgan: 0 },
  {
    date: "Feb",
    Alex: 5000,
    Jordan: 2000,
    Sam: 8000,
    Taylor: 1000,
    Morgan: 12000,
  },
  {
    date: "Mar",
    Alex: 12000,
    Jordan: 8000,
    Sam: 15000,
    Taylor: 2500,
    Morgan: 25000,
  },
  {
    date: "Apr",
    Alex: 18000,
    Jordan: 12000,
    Sam: 28000,
    Taylor: 4000,
    Morgan: 38000,
  },
  {
    date: "May",
    Alex: 22000,
    Jordan: 15000,
    Sam: 35000,
    Taylor: 5500,
    Morgan: 48000,
  },
  {
    date: "Jun",
    Alex: 28000,
    Jordan: 18000,
    Sam: 42000,
    Taylor: 6800,
    Morgan: 55000,
  },
  {
    date: "Jul",
    Alex: 32000,
    Jordan: 22000,
    Sam: 48000,
    Taylor: 8000,
    Morgan: 62000,
  },
  {
    date: "Aug",
    Alex: 35000,
    Jordan: 25000,
    Sam: 52000,
    Taylor: 9200,
    Morgan: 70000,
  },
  {
    date: "Sep",
    Alex: 38000,
    Jordan: 27000,
    Sam: 58000,
    Taylor: 10000,
    Morgan: 78000,
  },
  {
    date: "Oct",
    Alex: 41000,
    Jordan: 29000,
    Sam: 62000,
    Taylor: 11000,
    Morgan: 82000,
  },
  {
    date: "Nov",
    Alex: 43000,
    Jordan: 31000,
    Sam: 65000,
    Taylor: 11800,
    Morgan: 86000,
  },
  {
    date: "Dec",
    Alex: 45000,
    Jordan: 32500,
    Sam: 67800,
    Taylor: 12300,
    Morgan: 89500,
  },
];
