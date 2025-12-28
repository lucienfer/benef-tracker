export interface Database {
  public: {
    Tables: {
      members: {
        Row: {
          id: string;
          user_id: string;
          name: string;
          avatar_url: string | null;
          color: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          name: string;
          avatar_url?: string | null;
          color?: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          name?: string;
          avatar_url?: string | null;
          color?: string;
          created_at?: string;
        };
      };
      benefit_history: {
        Row: {
          id: string;
          member_id: string;
          amount: number;
          recorded_at: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          member_id: string;
          amount: number;
          recorded_at?: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          member_id?: string;
          amount?: number;
          recorded_at?: string;
          created_at?: string;
        };
      };
    };
  };
}

export type Member = Database["public"]["Tables"]["members"]["Row"];
export type BenefitHistory =
  Database["public"]["Tables"]["benefit_history"]["Row"];
