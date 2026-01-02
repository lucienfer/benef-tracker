"use client";

import { GOAL_AMOUNT } from "@/types/member";

interface ChallengeStatsProps {
  isLoggedIn: boolean;
  currentAmount?: number;
}

function getRemainingDays(): number {
  const now = new Date();
  const endOfYear = new Date(now.getFullYear(), 11, 31, 23, 59, 59);
  const diffTime = endOfYear.getTime() - now.getTime();
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}

function formatCurrency(value: number): string {
  if (value >= 1000) {
    return `$${(value / 1000).toFixed(1)}k`;
  }
  return `$${value.toFixed(0)}`;
}

function formatPreciseCurrency(value: number): string {
  return value.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
}

export function ChallengeStats({
  isLoggedIn,
  currentAmount = 0,
}: ChallengeStatsProps) {
  const remainingDays = getRemainingDays();
  const remainingWeeks = remainingDays / 7;
  const remainingMonths = remainingDays / 30;

  const amountNeeded = GOAL_AMOUNT - currentAmount;
  const perDay = amountNeeded / remainingDays;
  const perWeek = amountNeeded / remainingWeeks;
  const perMonth = amountNeeded / remainingMonths;

  const stats = [
    {
      label: "Par jour",
      value: perDay,
      icon: "📅",
    },
    {
      label: "Par semaine",
      value: perWeek,
      icon: "📆",
    },
    {
      label: "Par mois",
      value: perMonth,
      icon: "🗓️",
    },
  ];

  return (
    <div className="mt-8 rounded-xl border border-border bg-card p-6">
      <h3 className="mb-4 text-center text-lg font-semibold text-foreground">
        {isLoggedIn
          ? "Pour atteindre ton objectif"
          : "Pour atteindre $100k cette annee"}
      </h3>

      <p className="mb-6 text-center text-sm text-muted-foreground">
        {isLoggedIn ? (
          <>
            Il te reste{" "}
            <span className="font-bold text-foreground">
              {formatPreciseCurrency(amountNeeded)}
            </span>{" "}
            a gagner en{" "}
            <span className="font-bold text-foreground">{remainingDays}</span>{" "}
            jours
          </>
        ) : (
          <>
            En partant de{" "}
            <span className="font-bold text-foreground">
              $0 aujourd&apos;hui
            </span>
            , il reste{" "}
            <span className="font-bold text-foreground">{remainingDays}</span>{" "}
            jours
          </>
        )}
      </p>

      <div className="grid grid-cols-3 gap-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="flex flex-col items-center rounded-lg bg-muted/50 p-4"
          >
            <span className="mb-2 text-2xl">{stat.icon}</span>
            <span className="text-xl font-bold text-foreground">
              {formatCurrency(stat.value)}
            </span>
            <span className="text-xs text-muted-foreground">{stat.label}</span>
          </div>
        ))}
      </div>

      {!isLoggedIn && (
        <p className="mt-6 text-center text-xs text-muted-foreground">
          Connecte-toi pour suivre ta progression personnelle !
        </p>
      )}
    </div>
  );
}
