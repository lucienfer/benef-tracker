"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ReferenceLine,
} from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Member, GOAL_AMOUNT } from "@/types/member";
import { HistoryPoint } from "@/lib/mock-data";

interface ProgressChartProps {
  members: Member[];
  history: HistoryPoint[];
}

function formatCurrency(value: number): string {
  if (value >= 1000) {
    return `$${(value / 1000).toFixed(0)}k`;
  }
  return `$${value}`;
}

export function ProgressChart({ members, history }: ProgressChartProps) {
  const sortedMembers = [...members].sort(
    (a, b) => b.currentBenefit - a.currentBenefit
  );

  const chartConfig = members.reduce((acc, member) => {
    acc[member.name] = {
      label: member.name,
      color: member.color,
    };
    return acc;
  }, {} as ChartConfig);

  return (
    <div className="w-full">
      <div className="mb-6 flex flex-wrap items-center justify-center gap-4">
        {sortedMembers.map((member, index) => (
          <div key={member.id} className="flex items-center gap-2">
            <span className="text-sm font-bold text-muted-foreground">
              #{index + 1}
            </span>
            <Avatar
              className="size-8 border-2"
              style={{ borderColor: member.color }}
            >
              <AvatarImage src={member.avatar} alt={member.name} />
              <AvatarFallback>{member.name[0]}</AvatarFallback>
            </Avatar>
            <span className="text-sm font-medium">{member.name}</span>
            <span className="text-sm font-bold" style={{ color: member.color }}>
              ${member.currentBenefit.toLocaleString()}
            </span>
          </div>
        ))}
      </div>

      <ChartContainer config={chartConfig} className="h-[400px] w-full">
        <LineChart
          data={history}
          margin={{ top: 20, right: 30, left: 20, bottom: 10 }}
        >
          <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
          <XAxis
            dataKey="date"
            tickLine={false}
            axisLine={false}
            className="text-xs"
          />
          <YAxis
            tickFormatter={formatCurrency}
            tickLine={false}
            axisLine={false}
            domain={[0, GOAL_AMOUNT]}
            ticks={[0, 25000, 50000, 75000, 100000]}
            className="text-xs"
          />
          <ReferenceLine
            y={GOAL_AMOUNT}
            stroke="var(--color-destructive)"
            strokeDasharray="8 4"
            strokeWidth={2}
            label={{
              value: "🎯 $100k Goal",
              position: "right",
              className: "text-xs font-semibold fill-destructive",
            }}
          />
          <ChartTooltip
            content={
              <ChartTooltipContent
                formatter={(value, name) => (
                  <div className="flex items-center gap-2">
                    <span>{name}</span>
                    <span className="font-bold">
                      ${Number(value).toLocaleString()}
                    </span>
                  </div>
                )}
              />
            }
          />
          {members.map((member) => (
            <Line
              key={member.id}
              type="monotone"
              dataKey={member.name}
              stroke={member.color}
              strokeWidth={3}
              dot={{ fill: member.color, strokeWidth: 0, r: 4 }}
              activeDot={{ r: 6, strokeWidth: 2, stroke: "white" }}
            />
          ))}
        </LineChart>
      </ChartContainer>

      <div className="mt-4 text-center">
        <p className="text-sm text-muted-foreground">
          Goal:{" "}
          <span className="font-bold text-foreground">
            ${GOAL_AMOUNT.toLocaleString()}
          </span>
          {" · "}
          <span className="text-destructive">Dashed line = finish line</span>
        </p>
      </div>
    </div>
  );
}
