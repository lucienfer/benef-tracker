"use client";

import { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ReferenceLine,
  Customized,
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

// Consistent number formatting to avoid hydration mismatch
// Uses en-US locale explicitly to ensure server/client consistency
function formatNumber(value: number): string {
  return value.toLocaleString("en-US");
}

// Threshold in pixels for stacking avatars
const STACK_THRESHOLD = 28;
const AVATAR_SIZE = 24;

interface AvatarPosition {
  member: Member;
  x: number;
  y: number;
  value: number;
}

// Single avatar group component with tooltip
function AvatarGroup({
  group,
  groupIndex,
  chartHeight,
}: {
  group: AvatarPosition[];
  groupIndex: number;
  chartHeight: number;
}) {
  const [isHovered, setIsHovered] = useState(false);

  const baseY = group[0].y;
  const baseX = group[0].x;

  const tooltipWidth = 120;
  const tooltipHeight = group.length * 24 + 12;
  const tooltipX = baseX - tooltipWidth - 8;

  // Position tooltip to the left of avatars, vertically centered
  const tooltipY = baseY - tooltipHeight / 2;

  // Clamp Y position to stay within chart bounds
  const clampedTooltipY = Math.max(
    10,
    Math.min(tooltipY, chartHeight - tooltipHeight - 10)
  );

  return (
    <g
      className={`avatar-group ${isHovered ? "avatar-group-hovered" : ""}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={() => setIsHovered(true)}
      onTouchEnd={() => setIsHovered(false)}
      style={{ cursor: "pointer" }}
    >
      {group.map((pos, index) => {
        const offsetX = index * (AVATAR_SIZE * 0.5);
        const x = baseX - AVATAR_SIZE / 2 + offsetX;
        const y = baseY - AVATAR_SIZE / 2;

        return (
          <g key={pos.member.id} transform={`translate(${x}, ${y})`}>
            <g className="avatar-end-point">
              <circle
                cx={AVATAR_SIZE / 2}
                cy={AVATAR_SIZE / 2}
                r={AVATAR_SIZE / 2 + 2}
                fill={pos.member.color}
              />
              <clipPath id={`avatar-clip-${pos.member.id}-${groupIndex}`}>
                <circle
                  cx={AVATAR_SIZE / 2}
                  cy={AVATAR_SIZE / 2}
                  r={AVATAR_SIZE / 2}
                />
              </clipPath>
              <image
                href={pos.member.avatar}
                x={0}
                y={0}
                width={AVATAR_SIZE}
                height={AVATAR_SIZE}
                clipPath={`url(#avatar-clip-${pos.member.id}-${groupIndex})`}
                preserveAspectRatio="xMidYMid slice"
              />
            </g>
          </g>
        );
      })}

      {isHovered && (
        <foreignObject
          x={tooltipX}
          y={clampedTooltipY}
          width={tooltipWidth}
          height={tooltipHeight}
          style={{ overflow: "visible" }}
        >
          <div className="rounded-md border border-border bg-popover px-2 py-1.5 shadow-md">
            {group.map((pos) => (
              <div
                key={pos.member.id}
                className="flex items-center justify-between gap-3 text-xs"
              >
                <span className="font-medium">{pos.member.name}</span>
                <span className="font-bold" style={{ color: pos.member.color }}>
                  ${formatNumber(pos.value)}
                </span>
              </div>
            ))}
          </div>
        </foreignObject>
      )}
    </g>
  );
}

// Custom component to render avatars at the end of each line
function EndAvatars({
  xAxisMap,
  yAxisMap,
  members,
  history,
  height,
}: {
  xAxisMap?: Record<string, { scale: (v: string) => number }>;
  yAxisMap?: Record<string, { scale: (v: number) => number }>;
  members: Member[];
  history: HistoryPoint[];
  height?: number;
}) {
  if (!xAxisMap || !yAxisMap || history.length === 0) return null;

  const xAxis = Object.values(xAxisMap)[0];
  const yAxis = Object.values(yAxisMap)[0];

  if (!xAxis?.scale || !yAxis?.scale) return null;

  // Find the last point that has actual member data (current month)
  // Future months only have the date property
  const lastPointWithData = [...history]
    .reverse()
    .find((point) => Object.keys(point).length > 1);

  if (!lastPointWithData) return null;

  const lastDate = lastPointWithData.date;
  const chartHeight = height || 400;

  // Calculate positions for all members
  const positions: AvatarPosition[] = members
    .map((member) => {
      const value = Number(lastPointWithData[member.name]) || 0;
      return {
        member,
        x: xAxis.scale(lastDate),
        y: yAxis.scale(value),
        value,
      };
    })
    .sort((a, b) => b.value - a.value); // Sort by value descending

  // Group avatars that are close together
  const groups: AvatarPosition[][] = [];
  for (const pos of positions) {
    let addedToGroup = false;
    for (const group of groups) {
      // Check if close to any member in the group
      const isClose = group.some(
        (g) => Math.abs(g.y - pos.y) < STACK_THRESHOLD
      );
      if (isClose) {
        group.push(pos);
        addedToGroup = true;
        break;
      }
    }
    if (!addedToGroup) {
      groups.push([pos]);
    }
  }

  return (
    <g>
      {groups.map((group, groupIndex) => (
        <AvatarGroup
          key={groupIndex}
          group={group}
          groupIndex={groupIndex}
          chartHeight={chartHeight}
        />
      ))}
    </g>
  );
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

  const goalLabel = `${formatCurrency(GOAL_AMOUNT)} Goal`;

  return (
    <div className="w-full">
      <div className="mb-6 flex items-end justify-center gap-4">
        {/* Top 3 podium - displayed in order: 2nd, 1st, 3rd */}
        {sortedMembers.length > 1 && sortedMembers[1] && (
          <div className="flex flex-col items-center">
            <Avatar
              className="size-12 border-3"
              style={{ borderColor: sortedMembers[1].color }}
            >
              <AvatarImage
                src={sortedMembers[1].avatar}
                alt={sortedMembers[1].name}
              />
              <AvatarFallback>{sortedMembers[1].name[0]}</AvatarFallback>
            </Avatar>
            <span className="mt-1 text-sm font-medium">
              {sortedMembers[1].name}
            </span>
            <span
              className="text-sm font-bold"
              style={{ color: sortedMembers[1].color }}
            >
              ${formatNumber(sortedMembers[1].currentBenefit)}
            </span>
            <div className="mt-2 flex h-16 w-20 items-center justify-center rounded-t-lg bg-muted">
              <span className="text-2xl">🥈</span>
            </div>
          </div>
        )}
        {sortedMembers.length > 0 && sortedMembers[0] && (
          <div className="flex flex-col items-center">
            <Avatar
              className="size-16 border-4"
              style={{ borderColor: sortedMembers[0].color }}
            >
              <AvatarImage
                src={sortedMembers[0].avatar}
                alt={sortedMembers[0].name}
              />
              <AvatarFallback>{sortedMembers[0].name[0]}</AvatarFallback>
            </Avatar>
            <span className="mt-1 text-base font-semibold">
              {sortedMembers[0].name}
            </span>
            <span
              className="text-base font-bold"
              style={{ color: sortedMembers[0].color }}
            >
              ${formatNumber(sortedMembers[0].currentBenefit)}
            </span>
            <div className="mt-2 flex h-24 w-24 items-center justify-center rounded-t-lg bg-yellow-500/20">
              <span className="text-3xl">🥇</span>
            </div>
          </div>
        )}
        {sortedMembers.length > 2 && sortedMembers[2] && (
          <div className="flex flex-col items-center">
            <Avatar
              className="size-10 border-2"
              style={{ borderColor: sortedMembers[2].color }}
            >
              <AvatarImage
                src={sortedMembers[2].avatar}
                alt={sortedMembers[2].name}
              />
              <AvatarFallback>{sortedMembers[2].name[0]}</AvatarFallback>
            </Avatar>
            <span className="mt-1 text-xs font-medium">
              {sortedMembers[2].name}
            </span>
            <span
              className="text-xs font-bold"
              style={{ color: sortedMembers[2].color }}
            >
              ${formatNumber(sortedMembers[2].currentBenefit)}
            </span>
            <div className="mt-2 flex h-12 w-16 items-center justify-center rounded-t-lg bg-muted">
              <span className="text-xl">🥉</span>
            </div>
          </div>
        )}
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
              value: goalLabel,
              position: "insideTopLeft",
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
                      ${formatNumber(Number(value))}
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
              dot={false}
              activeDot={{ r: 6, strokeWidth: 2, stroke: "white" }}
            />
          ))}
          <Customized
            component={(props: Record<string, unknown>) => (
              <EndAvatars
                xAxisMap={
                  props.xAxisMap as Record<
                    string,
                    { scale: (v: string) => number }
                  >
                }
                yAxisMap={
                  props.yAxisMap as Record<
                    string,
                    { scale: (v: number) => number }
                  >
                }
                members={members}
                history={history}
                height={props.height as number}
              />
            )}
          />
        </LineChart>
      </ChartContainer>

    </div>
  );
}
