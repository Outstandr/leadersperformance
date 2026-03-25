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
      articles: {
        Row: {
          author: string | null
          content: string
          created_at: string | null
          excerpt: string
          id: string
          keywords: string[] | null
          meta_description: string
          meta_title: string
          pillar: string
          pillar_color: string | null
          publish_date: string | null
          published: boolean | null
          reading_time: number | null
          slug: string
          title: string
          updated_at: string | null
        }
        Insert: {
          author?: string | null
          content: string
          created_at?: string | null
          excerpt: string
          id?: string
          keywords?: string[] | null
          meta_description: string
          meta_title: string
          pillar: string
          pillar_color?: string | null
          publish_date?: string | null
          published?: boolean | null
          reading_time?: number | null
          slug: string
          title: string
          updated_at?: string | null
        }
        Update: {
          author?: string | null
          content?: string
          created_at?: string | null
          excerpt?: string
          id?: string
          keywords?: string[] | null
          meta_description?: string
          meta_title?: string
          pillar?: string
          pillar_color?: string | null
          publish_date?: string | null
          published?: boolean | null
          reading_time?: number | null
          slug?: string
          title?: string
          updated_at?: string | null
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
      capital_protection_assessments: {
        Row: {
          ai_report: Json | null
          capital_exposure: string
          company: string
          consent_review: boolean
          country: string
          created_at: string
          email: string
          evidence_types: string[]
          full_name: string
          id: string
          jurisdictions: string[]
          legal_status: string
          objective: string
          phone: string
          recovery_potential: string | null
          risk_level: string | null
          role: string
          situation_summary: string
          situation_types: string[]
          timeline: string
        }
        Insert: {
          ai_report?: Json | null
          capital_exposure?: string
          company: string
          consent_review?: boolean
          country: string
          created_at?: string
          email: string
          evidence_types?: string[]
          full_name: string
          id?: string
          jurisdictions?: string[]
          legal_status?: string
          objective?: string
          phone: string
          recovery_potential?: string | null
          risk_level?: string | null
          role: string
          situation_summary?: string
          situation_types?: string[]
          timeline?: string
        }
        Update: {
          ai_report?: Json | null
          capital_exposure?: string
          company?: string
          consent_review?: boolean
          country?: string
          created_at?: string
          email?: string
          evidence_types?: string[]
          full_name?: string
          id?: string
          jurisdictions?: string[]
          legal_status?: string
          objective?: string
          phone?: string
          recovery_potential?: string | null
          risk_level?: string | null
          role?: string
          situation_summary?: string
          situation_types?: string[]
          timeline?: string
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
      founder_burnout_scans: {
        Row: {
          company: string
          created_at: string
          dq1: number | null
          dq10: number | null
          dq11: number | null
          dq12: number | null
          dq13: number | null
          dq14: number | null
          dq15: number | null
          dq16: number | null
          dq17: number | null
          dq18: number | null
          dq19: number | null
          dq2: number | null
          dq20: number | null
          dq21: number | null
          dq22: number | null
          dq23: number | null
          dq24: number | null
          dq25: number | null
          dq26: number | null
          dq27: number | null
          dq28: number | null
          dq29: number | null
          dq3: number | null
          dq30: number | null
          dq31: number | null
          dq32: number | null
          dq4: number | null
          dq5: number | null
          dq6: number | null
          dq7: number | null
          dq8: number | null
          dq9: number | null
          email: string
          fq1: number
          fq10: number
          fq2: number
          fq3: number
          fq4: number
          fq5: number
          fq6: number
          fq7: number
          fq8: number
          fq9: number
          free_decision_pressure: number
          free_fbr_color: string
          free_fbr_score: number
          free_mental_fatigue: number
          free_sleep_quality: number
          free_stress_tolerance: number
          free_workload_intensity: number
          full_burnout_phase: string | null
          full_business_dependency: number | null
          full_fbr_color: string | null
          full_fbr_score: number | null
          full_name: string
          full_nervous_system: number | null
          full_pressure_load: number | null
          full_recovery_capacity: number | null
          full_recovery_estimate: string | null
          id: string
          language: string
          paid: boolean
          phone: string
          stripe_session_id: string | null
        }
        Insert: {
          company: string
          created_at?: string
          dq1?: number | null
          dq10?: number | null
          dq11?: number | null
          dq12?: number | null
          dq13?: number | null
          dq14?: number | null
          dq15?: number | null
          dq16?: number | null
          dq17?: number | null
          dq18?: number | null
          dq19?: number | null
          dq2?: number | null
          dq20?: number | null
          dq21?: number | null
          dq22?: number | null
          dq23?: number | null
          dq24?: number | null
          dq25?: number | null
          dq26?: number | null
          dq27?: number | null
          dq28?: number | null
          dq29?: number | null
          dq3?: number | null
          dq30?: number | null
          dq31?: number | null
          dq32?: number | null
          dq4?: number | null
          dq5?: number | null
          dq6?: number | null
          dq7?: number | null
          dq8?: number | null
          dq9?: number | null
          email: string
          fq1?: number
          fq10?: number
          fq2?: number
          fq3?: number
          fq4?: number
          fq5?: number
          fq6?: number
          fq7?: number
          fq8?: number
          fq9?: number
          free_decision_pressure?: number
          free_fbr_color?: string
          free_fbr_score?: number
          free_mental_fatigue?: number
          free_sleep_quality?: number
          free_stress_tolerance?: number
          free_workload_intensity?: number
          full_burnout_phase?: string | null
          full_business_dependency?: number | null
          full_fbr_color?: string | null
          full_fbr_score?: number | null
          full_name: string
          full_nervous_system?: number | null
          full_pressure_load?: number | null
          full_recovery_capacity?: number | null
          full_recovery_estimate?: string | null
          id?: string
          language?: string
          paid?: boolean
          phone: string
          stripe_session_id?: string | null
        }
        Update: {
          company?: string
          created_at?: string
          dq1?: number | null
          dq10?: number | null
          dq11?: number | null
          dq12?: number | null
          dq13?: number | null
          dq14?: number | null
          dq15?: number | null
          dq16?: number | null
          dq17?: number | null
          dq18?: number | null
          dq19?: number | null
          dq2?: number | null
          dq20?: number | null
          dq21?: number | null
          dq22?: number | null
          dq23?: number | null
          dq24?: number | null
          dq25?: number | null
          dq26?: number | null
          dq27?: number | null
          dq28?: number | null
          dq29?: number | null
          dq3?: number | null
          dq30?: number | null
          dq31?: number | null
          dq32?: number | null
          dq4?: number | null
          dq5?: number | null
          dq6?: number | null
          dq7?: number | null
          dq8?: number | null
          dq9?: number | null
          email?: string
          fq1?: number
          fq10?: number
          fq2?: number
          fq3?: number
          fq4?: number
          fq5?: number
          fq6?: number
          fq7?: number
          fq8?: number
          fq9?: number
          free_decision_pressure?: number
          free_fbr_color?: string
          free_fbr_score?: number
          free_mental_fatigue?: number
          free_sleep_quality?: number
          free_stress_tolerance?: number
          free_workload_intensity?: number
          full_burnout_phase?: string | null
          full_business_dependency?: number | null
          full_fbr_color?: string | null
          full_fbr_score?: number | null
          full_name?: string
          full_nervous_system?: number | null
          full_pressure_load?: number | null
          full_recovery_capacity?: number | null
          full_recovery_estimate?: string | null
          id?: string
          language?: string
          paid?: boolean
          phone?: string
          stripe_session_id?: string | null
        }
        Relationships: []
      }
      founders_pressure_scans: {
        Row: {
          company: string
          created_at: string
          decision_pressure_score: number
          email: string
          execution_momentum_score: number
          founder_dependency_score: number
          full_name: string
          id: string
          language: string
          leadership_alignment_score: number
          overall_color: string
          overall_score: number
          phone: string
          q1: number
          q10: number
          q11: number
          q12: number
          q2: number
          q3: number
          q4: number
          q5: number
          q6: number
          q7: number
          q8: number
          q9: number
        }
        Insert: {
          company: string
          created_at?: string
          decision_pressure_score?: number
          email: string
          execution_momentum_score?: number
          founder_dependency_score?: number
          full_name: string
          id?: string
          language?: string
          leadership_alignment_score?: number
          overall_color?: string
          overall_score?: number
          phone: string
          q1?: number
          q10?: number
          q11?: number
          q12?: number
          q2?: number
          q3?: number
          q4?: number
          q5?: number
          q6?: number
          q7?: number
          q8?: number
          q9?: number
        }
        Update: {
          company?: string
          created_at?: string
          decision_pressure_score?: number
          email?: string
          execution_momentum_score?: number
          founder_dependency_score?: number
          full_name?: string
          id?: string
          language?: string
          leadership_alignment_score?: number
          overall_color?: string
          overall_score?: number
          phone?: string
          q1?: number
          q10?: number
          q11?: number
          q12?: number
          q2?: number
          q3?: number
          q4?: number
          q5?: number
          q6?: number
          q7?: number
          q8?: number
          q9?: number
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
