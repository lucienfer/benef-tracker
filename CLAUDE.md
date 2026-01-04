# Road to 100k - DeFi Challenge Tracker

## Overview

A Next.js application for tracking progress in a yearly DeFi challenge where participants aim to reach $100,000 in cumulative profit. The app features OAuth authentication via Supabase, real-time progress visualization with interactive charts, a leaderboard podium, and a yearly challenge acceptance system.

**Version**: 0.1.0
**Framework**: Next.js 16.0.7
**Runtime**: Bun
**Last Updated**: 2026-01-04

## Architecture

### Technology Stack

- **Next.js 16.0.7** - App Router architecture with server and client components
- **React 19.2.0** - Latest React with improved performance
- **TypeScript 5.9+** - Strict mode enabled for type safety
- **Tailwind CSS v4.1** - CSS-based configuration using `@theme` blocks
- **Supabase** - PostgreSQL database with Row Level Security and OAuth authentication
- **Recharts** - Interactive line charts for progress visualization
- **Radix UI** - Accessible UI primitives (Dialog, Dropdown, Avatar)
- **Bun** - Fast JavaScript runtime and package manager

### Key Architectural Decisions

1. **App Router**: Uses Next.js App Router for modern routing with server components
2. **Server Actions**: All mutations (add profit, accept challenge) use server actions
3. **Supabase SSR**: Authentication handled via `@supabase/ssr` for secure cookie-based sessions
4. **Row Level Security**: Database policies ensure users can only modify their own data
5. **Yearly Challenge Cycle**: Profits reset annually, tracked from Jan 1 to Dec 31

### Core Features

1. **OAuth Authentication**: GitHub/Google login via Supabase Auth
2. **Challenge Acceptance**: Users must explicitly accept the yearly challenge to participate
3. **Profit Tracking**: Add individual profit entries with date selection (cumulative calculation on read)
4. **Progress Visualization**: Line chart showing monthly cumulative progress for all participants
5. **Leaderboard Podium**: Top 3 participants displayed with medals
6. **Interactive Avatars**: Chart endpoints show participant avatars with hover tooltips

## Database Schema

### Tables

```sql
-- Members: Challenge participants linked to Supabase auth
members (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id),
  name TEXT NOT NULL,
  avatar_url TEXT,
  color TEXT NOT NULL,  -- OKLCH color for chart lines
  created_at TIMESTAMPTZ
)

-- Benefit History: Individual profit entries (not cumulative)
benefit_history (
  id UUID PRIMARY KEY,
  member_id UUID REFERENCES members(id),
  amount DECIMAL(12, 2) NOT NULL,  -- Individual profit amount
  recorded_at TIMESTAMPTZ,          -- Date of the profit
  created_at TIMESTAMPTZ
)

-- Challenge Acceptances: Yearly participation tracking
challenge_acceptances (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id),
  year INTEGER NOT NULL,
  accepted_at TIMESTAMPTZ,
  UNIQUE(user_id, year)
)
```

### Row Level Security

- **Members**: Anyone can view; users can only insert/update their own
- **Benefit History**: Anyone can view; users can only insert/update for their own member
- **Challenge Acceptances**: Anyone can view; users can only insert their own

## Setup & Installation

### Prerequisites

- [Bun](https://bun.sh) installed on your system
- Supabase project with authentication enabled

### Environment Variables

Create a `.env.local` file:

```bash
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### Installation Steps

```bash
# Clone and install
git clone <repository-url>
cd benefice-tracker
bun install

# Run database migrations
# Execute supabase/schema.sql in your Supabase SQL editor

# Start development server
bun dev
```

### Available Scripts

- `bun dev` - Start Next.js development server
- `bun build` - Build optimized production bundle
- `bun start` - Start production server
- `bun lint` - Run ESLint
- `bun lint:fix` - Fix ESLint issues
- `bun format` - Format code with Prettier
- `bun format:check` - Check formatting

## File Structure

```
benefice-tracker/
├── app/
│   ├── actions/
│   │   ├── auth.ts            # Sign out action
│   │   ├── benefit.ts         # Add profit server action
│   │   └── challenge.ts       # Accept challenge, check acceptance
│   ├── auth/
│   │   └── auth-code-error/   # OAuth error handling
│   ├── oauth/
│   │   └── consent/route.ts   # OAuth callback handler
│   ├── globals.css            # Tailwind v4 theme configuration
│   ├── layout.tsx             # Root layout with GeneralSans font
│   └── page.tsx               # Main dashboard page
├── components/
│   ├── ui/                    # Radix-based UI components
│   │   ├── avatar.tsx
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── chart.tsx          # Recharts wrapper
│   │   ├── dialog.tsx
│   │   ├── dropdown-menu.tsx
│   │   └── input.tsx
│   ├── accept-challenge-button.tsx
│   ├── add-benefit-button.tsx
│   ├── challenge-accept-modal.tsx
│   ├── challenge-stats.tsx
│   ├── connect-button.tsx     # OAuth login/logout
│   ├── header.tsx
│   └── progress-chart.tsx     # Main chart with podium
├── lib/
│   ├── supabase/
│   │   ├── client.ts          # Browser Supabase client
│   │   ├── server.ts          # Server Supabase client
│   │   └── middleware.ts      # Auth session refresh
│   ├── data.ts                # Data fetching functions
│   ├── database.types.ts      # Supabase type definitions
│   ├── mock-data.ts           # HistoryPoint type definition
│   └── utils.ts               # cn() utility
├── types/
│   └── member.ts              # Member interface, GOAL_AMOUNT constant
├── supabase/
│   └── schema.sql             # Database schema with RLS policies
├── middleware.ts              # Supabase auth middleware
└── .claude/                   # AI agent configuration
```

## Key Components

### ProgressChart (`components/progress-chart.tsx`)

- Renders cumulative profit line chart for all participants
- Displays top 3 podium with medals
- Shows interactive avatars at line endpoints with tooltips
- Y-axis fixed at $100k goal with reference line

### Data Layer (`lib/data.ts`)

- `getMembersForChart()`: Returns members who accepted current year's challenge
- `getHistoryForChart()`: Returns monthly cumulative profit history
- `getCurrentUserMember()`: Returns current user's member data
- All queries scoped to current challenge year (Jan 1 - Dec 31)

### Server Actions

- `addBenefit(amount, date)`: Add profit entry with date validation
- `acceptChallenge()`: Accept current year's challenge, creates member if needed
- `hasAcceptedChallenge()`: Check if user accepted current year

## Development Guidelines

### Adding Profits

1. Individual profit entries are stored (not cumulative)
2. Date must be within current challenge year
3. Cannot add future-dated profits
4. Cumulative totals calculated on read

### Challenge Year Logic

- Challenge runs from January 1 to December 31
- Users must accept each year's challenge separately
- Chart only shows data up to current month
- All profit queries filtered by challenge year

### Styling with Tailwind v4

```css
/* app/globals.css */
@import "tailwindcss";

@theme inline {
  --color-background: #f8f8f8;
  --color-foreground: #1a1a1a;
  /* ... other theme variables */
}
```

## Recent Updates (Updated: 2026-01-04)

### Latest Changes

**aae0c11** - Yearly Challenge Acceptance System

- Added `challenge_acceptances` table for yearly participation tracking
- Created challenge acceptance modal for new users
- Added `AcceptChallengeButton` component
- Challenge stats component shows current progress
- Only accepted participants appear in chart and podium

**dea4fb2** - Interactive Chart Avatars

- Added avatar endpoints on chart lines with hover tooltips
- Avatars stack when values are close together
- Button hover effects improved

**1cac07a** - Yearly Challenge Rules

- Changed from cumulative to individual profit entries
- Cumulative calculation now happens on read
- All queries scoped to current challenge year

**fd1af2b** - Date Picker for Profits

- Added date selection when adding profits
- Validation ensures dates within challenge year
- Fixed hydration mismatch with consistent number formatting

**7eb1f06** - OAuth Authentication

- Added Supabase OAuth flow (GitHub/Google)
- Created benefit tracking server actions
- Dialog-based profit entry form

**d7e2d9d** - Supabase SSR Setup

- Configured `@supabase/ssr` for server-side auth
- Added middleware for session refresh
- Created server/client Supabase utilities

### Breaking Changes

- Profit entries are now stored individually (not cumulative)
- Users must accept challenge before participating each year

## Important Notes

### For Developers

1. **Bun Required**: Uses Bun as package manager
2. **TypeScript Strict**: All code must pass strict mode checks
3. **Server Components**: Prefer server components; use `"use client"` only when needed
4. **Minimal Changes**: Follow principle of minimal code changes
5. **Format Before Commit**: Run `bun format` before committing

### For AI Agents

- Read **AGENTS.md** for detailed guidelines
- Follow minimal changes principle
- Preserve existing comments
- Use early returns over nested conditions
- Use descriptive variable and function names

## Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [Tailwind CSS v4 Documentation](https://tailwindcss.com/docs)
- [Recharts Documentation](https://recharts.org)
- [Radix UI Documentation](https://radix-ui.com)

---

**Maintained by**: Zetis Labs
**License**: Open source
