export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      applications: {
        Row: {
          booking_date: string | null
          booking_time: string | null
          commitment_level: string
          company: string
          cost_of_inaction: string
          country: string
          created_at: string
          email: string
          first_name: string
          id: string
          impossible_target: string
          income_level: string
          investment_ready: string
          lack_of_discipline: string
          last_name: string
          past_attempts: string
          position: string
          professional_arena: string
          status: string
          why_mentor: string
          willing_to_be_wrong: string
        }
        Insert: {
          booking_date?: string | null
          booking_time?: string | null
          commitment_level: string
          company: string
          cost_of_inaction: string
          country: string
          created_at?: string
          email: string
          first_name: string
          id?: string
          impossible_target: string
          income_level: string
          investment_ready: string
          lack_of_discipline: string
          last_name: string
          past_attempts: string
          position: string
          professional_arena: string
          status?: string
          why_mentor: string
          willing_to_be_wrong: string
        }
        Update: {
          booking_date?: string | null
          booking_time?: string | null
          commitment_level?: string
          company?: string
          cost_of_inaction?: string
          country?: string
          created_at?: string
          email?: string
          first_name?: string
          id?: string
          impossible_target?: string
          income_level?: string
          investment_ready?: string
          lack_of_discipline?: string
          last_name?: string
          past_attempts?: string
          position?: string
          professional_arena?: string
          status?: string
          why_mentor?: string
          willing_to_be_wrong?: string
        }
        Relationships: []
      }
      business_consultations: {
        Row: {
          booking_date: string | null
          company: string
          country: string
          created_at: string
          discipline_score: number
          email: string
          first_name: string
          id: string
          last_name: string
          phone: string
          position: string
          q1_morning_standard: number
          q2_silence_test: number
          q3_deadline_protocol: number
          q4_confrontation: number
          q5_meeting_tax: number
          q6_problem_solver: number
          q7_mirror: number
          raw_score: number
          status: string
          tier: string
        }
        Insert: {
          booking_date?: string | null
          company: string
          country: string
          created_at?: string
          discipline_score?: number
          email: string
          first_name: string
          id?: string
          last_name: string
          phone?: string
          position: string
          q1_morning_standard?: number
          q2_silence_test?: number
          q3_deadline_protocol?: number
          q4_confrontation?: number
          q5_meeting_tax?: number
          q6_problem_solver?: number
          q7_mirror?: number
          raw_score?: number
          status?: string
          tier?: string
        }
        Update: {
          booking_date?: string | null
          company?: string
          country?: string
          created_at?: string
          discipline_score?: number
          email?: string
          first_name?: string
          id?: string
          last_name?: string
          phone?: string
          position?: string
          q1_morning_standard?: number
          q2_silence_test?: number
          q3_deadline_protocol?: number
          q4_confrontation?: number
          q5_meeting_tax?: number
          q6_problem_solver?: number
          q7_mirror?: number
          raw_score?: number
          status?: string
          tier?: string
        }
        Relationships: []
      }
      corporate_discipline_audits: {
        Row: {
          ai_insights: Json | null
          created_at: string
          discipline_score: number
          email: string
          first_name: string
          id: string
          last_name: string
          phone: string
          q1_morning_standard: number
          q2_silence_test: number
          q3_deadline_protocol: number
          q4_confrontation: number
          q5_meeting_tax: number
          q6_problem_solver: number
          q7_mirror: number
          raw_score: number
          tier: string
        }
        Insert: {
          ai_insights?: Json | null
          created_at?: string
          discipline_score: number
          email: string
          first_name: string
          id?: string
          last_name: string
          phone: string
          q1_morning_standard: number
          q2_silence_test: number
          q3_deadline_protocol: number
          q4_confrontation: number
          q5_meeting_tax: number
          q6_problem_solver: number
          q7_mirror: number
          raw_score: number
          tier: string
        }
        Update: {
          ai_insights?: Json | null
          created_at?: string
          discipline_score?: number
          email?: string
          first_name?: string
          id?: string
          last_name?: string
          phone?: string
          q1_morning_standard?: number
          q2_silence_test?: number
          q3_deadline_protocol?: number
          q4_confrontation?: number
          q5_meeting_tax?: number
          q6_problem_solver?: number
          q7_mirror?: number
          raw_score?: number
          tier?: string
        }
        Relationships: []
      }
      discipline_assessments: {
        Row: {
          ai_insights: Json | null
          consistency_score: number | null
          country: string
          created_at: string
          discipline_type: string | null
          email: string
          first_name: string
          id: string
          impulse_control_score: number | null
          language: string
          last_name: string
          overall_score: number | null
          q1_follow_through: number
          q10_regret_purchases: number
          q15_daily_routines: number
          q16_productivity_varies: number
          q17_bounce_back: number
          q2_maintain_focus: number
          q3_give_up: number
          q4_resist_pleasure: number
          q8_act_impulse: number
          q9_control_stress: number
          self_discipline_score: number | null
        }
        Insert: {
          ai_insights?: Json | null
          consistency_score?: number | null
          country: string
          created_at?: string
          discipline_type?: string | null
          email: string
          first_name: string
          id?: string
          impulse_control_score?: number | null
          language?: string
          last_name: string
          overall_score?: number | null
          q1_follow_through: number
          q10_regret_purchases: number
          q15_daily_routines: number
          q16_productivity_varies: number
          q17_bounce_back: number
          q2_maintain_focus: number
          q3_give_up: number
          q4_resist_pleasure: number
          q8_act_impulse: number
          q9_control_stress: number
          self_discipline_score?: number | null
        }
        Update: {
          ai_insights?: Json | null
          consistency_score?: number | null
          country?: string
          created_at?: string
          discipline_type?: string | null
          email?: string
          first_name?: string
          id?: string
          impulse_control_score?: number | null
          language?: string
          last_name?: string
          overall_score?: number | null
          q1_follow_through?: number
          q10_regret_purchases?: number
          q15_daily_routines?: number
          q16_productivity_varies?: number
          q17_bounce_back?: number
          q2_maintain_focus?: number
          q3_give_up?: number
          q4_resist_pleasure?: number
          q8_act_impulse?: number
          q9_control_stress?: number
          self_discipline_score?: number | null
        }
        Relationships: []
      }
      voice_leads: {
        Row: {
          conversation_summary: string | null
          created_at: string
          email: string | null
          first_name: string | null
          id: string
          phone: string | null
          recommended_path: string | null
        }
        Insert: {
          conversation_summary?: string | null
          created_at?: string
          email?: string | null
          first_name?: string | null
          id?: string
          phone?: string | null
          recommended_path?: string | null
        }
        Update: {
          conversation_summary?: string | null
          created_at?: string
          email?: string | null
          first_name?: string | null
          id?: string
          phone?: string | null
          recommended_path?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
