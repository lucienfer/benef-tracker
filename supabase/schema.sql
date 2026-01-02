-- Members table: stores challenge participants
CREATE TABLE IF NOT EXISTS members (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
  name TEXT NOT NULL,
  avatar_url TEXT,
  color TEXT DEFAULT 'oklch(0.65 0.2 ' || (random() * 360)::int || ')' NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Benefit history table: tracks money progression over time
CREATE TABLE IF NOT EXISTS benefit_history (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  member_id UUID REFERENCES members(id) ON DELETE CASCADE NOT NULL,
  amount DECIMAL(12, 2) NOT NULL DEFAULT 0,
  recorded_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Index for faster queries
CREATE INDEX IF NOT EXISTS idx_benefit_history_member_id ON benefit_history(member_id);
CREATE INDEX IF NOT EXISTS idx_benefit_history_recorded_at ON benefit_history(recorded_at);
CREATE INDEX IF NOT EXISTS idx_members_user_id ON members(user_id);

-- Enable Row Level Security
ALTER TABLE members ENABLE ROW LEVEL SECURITY;
ALTER TABLE benefit_history ENABLE ROW LEVEL SECURITY;

-- Policies for members table
CREATE POLICY "Anyone can view members" ON members
  FOR SELECT USING (true);

CREATE POLICY "Users can insert their own member" ON members
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own member" ON members
  FOR UPDATE USING (auth.uid() = user_id);

-- Policies for benefit_history table
CREATE POLICY "Anyone can view benefit history" ON benefit_history
  FOR SELECT USING (true);

CREATE POLICY "Users can insert their own history" ON benefit_history
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM members WHERE members.id = benefit_history.member_id AND members.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can update their own history" ON benefit_history
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM members WHERE members.id = benefit_history.member_id AND members.user_id = auth.uid()
    )
  );

-- Challenge acceptances table: tracks yearly challenge participation
CREATE TABLE IF NOT EXISTS challenge_acceptances (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  year INTEGER NOT NULL,
  accepted_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  UNIQUE(user_id, year)
);

-- Index for faster queries
CREATE INDEX IF NOT EXISTS idx_challenge_acceptances_user_year ON challenge_acceptances(user_id, year);

-- Enable Row Level Security
ALTER TABLE challenge_acceptances ENABLE ROW LEVEL SECURITY;

-- Policies for challenge_acceptances table
CREATE POLICY "Anyone can view challenge acceptances" ON challenge_acceptances
  FOR SELECT USING (true);

CREATE POLICY "Users can insert their own acceptance" ON challenge_acceptances
  FOR INSERT WITH CHECK (auth.uid() = user_id);
