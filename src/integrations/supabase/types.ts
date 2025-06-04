export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      activity_logs: {
        Row: {
          activity_description: string
          activity_type: string
          created_at: string | null
          id: string
          ip_address: unknown | null
          metadata: Json | null
          user_agent: string | null
          user_id: string | null
        }
        Insert: {
          activity_description: string
          activity_type: string
          created_at?: string | null
          id?: string
          ip_address?: unknown | null
          metadata?: Json | null
          user_agent?: string | null
          user_id?: string | null
        }
        Update: {
          activity_description?: string
          activity_type?: string
          created_at?: string | null
          id?: string
          ip_address?: unknown | null
          metadata?: Json | null
          user_agent?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      biometric_verifications: {
        Row: {
          biometric_type: Database["public"]["Enums"]["biometric_type"]
          blockchain_hash: string | null
          confidence_score: number | null
          created_at: string | null
          expires_at: string | null
          id: string
          liveness_score: number | null
          status: Database["public"]["Enums"]["verification_status"] | null
          template_hash: string
          user_id: string
          verification_metadata: Json | null
          verified_at: string | null
        }
        Insert: {
          biometric_type: Database["public"]["Enums"]["biometric_type"]
          blockchain_hash?: string | null
          confidence_score?: number | null
          created_at?: string | null
          expires_at?: string | null
          id?: string
          liveness_score?: number | null
          status?: Database["public"]["Enums"]["verification_status"] | null
          template_hash: string
          user_id: string
          verification_metadata?: Json | null
          verified_at?: string | null
        }
        Update: {
          biometric_type?: Database["public"]["Enums"]["biometric_type"]
          blockchain_hash?: string | null
          confidence_score?: number | null
          created_at?: string | null
          expires_at?: string | null
          id?: string
          liveness_score?: number | null
          status?: Database["public"]["Enums"]["verification_status"] | null
          template_hash?: string
          user_id?: string
          verification_metadata?: Json | null
          verified_at?: string | null
        }
        Relationships: []
      }
      business_verifications: {
        Row: {
          business_name: string
          business_type: string | null
          created_at: string | null
          documents: Json | null
          id: string
          registration_number: string
          scheduled_at: string | null
          status: Database["public"]["Enums"]["verification_status"] | null
          user_id: string
          verification_metadata: Json | null
          verified_at: string | null
        }
        Insert: {
          business_name: string
          business_type?: string | null
          created_at?: string | null
          documents?: Json | null
          id?: string
          registration_number: string
          scheduled_at?: string | null
          status?: Database["public"]["Enums"]["verification_status"] | null
          user_id: string
          verification_metadata?: Json | null
          verified_at?: string | null
        }
        Update: {
          business_name?: string
          business_type?: string | null
          created_at?: string | null
          documents?: Json | null
          id?: string
          registration_number?: string
          scheduled_at?: string | null
          status?: Database["public"]["Enums"]["verification_status"] | null
          user_id?: string
          verification_metadata?: Json | null
          verified_at?: string | null
        }
        Relationships: []
      }
      document_verifications: {
        Row: {
          blockchain_hash: string | null
          confidence_score: number | null
          created_at: string | null
          document_type: Database["public"]["Enums"]["document_type"]
          expires_at: string | null
          extracted_data: Json | null
          file_name: string
          file_url: string
          id: string
          status: Database["public"]["Enums"]["verification_status"] | null
          user_id: string
          verification_metadata: Json | null
          verified_at: string | null
        }
        Insert: {
          blockchain_hash?: string | null
          confidence_score?: number | null
          created_at?: string | null
          document_type: Database["public"]["Enums"]["document_type"]
          expires_at?: string | null
          extracted_data?: Json | null
          file_name: string
          file_url: string
          id?: string
          status?: Database["public"]["Enums"]["verification_status"] | null
          user_id: string
          verification_metadata?: Json | null
          verified_at?: string | null
        }
        Update: {
          blockchain_hash?: string | null
          confidence_score?: number | null
          created_at?: string | null
          document_type?: Database["public"]["Enums"]["document_type"]
          expires_at?: string | null
          extracted_data?: Json | null
          file_name?: string
          file_url?: string
          id?: string
          status?: Database["public"]["Enums"]["verification_status"] | null
          user_id?: string
          verification_metadata?: Json | null
          verified_at?: string | null
        }
        Relationships: []
      }
      identity_shares: {
        Row: {
          created_at: string | null
          expires_at: string
          id: string
          is_active: boolean | null
          permissions: Json
          qr_data: string | null
          share_code: string | null
          used_at: string | null
          used_by: string | null
          user_id: string
          verification_method: Database["public"]["Enums"]["verification_method"]
        }
        Insert: {
          created_at?: string | null
          expires_at: string
          id?: string
          is_active?: boolean | null
          permissions: Json
          qr_data?: string | null
          share_code?: string | null
          used_at?: string | null
          used_by?: string | null
          user_id: string
          verification_method: Database["public"]["Enums"]["verification_method"]
        }
        Update: {
          created_at?: string | null
          expires_at?: string
          id?: string
          is_active?: boolean | null
          permissions?: Json
          qr_data?: string | null
          share_code?: string | null
          used_at?: string | null
          used_by?: string | null
          user_id?: string
          verification_method?: Database["public"]["Enums"]["verification_method"]
        }
        Relationships: []
      }
      profiles: {
        Row: {
          address: Json | null
          avatar_url: string | null
          created_at: string | null
          date_of_birth: string | null
          id: string
          name: string
          phone: string | null
          updated_at: string | null
        }
        Insert: {
          address?: Json | null
          avatar_url?: string | null
          created_at?: string | null
          date_of_birth?: string | null
          id: string
          name: string
          phone?: string | null
          updated_at?: string | null
        }
        Update: {
          address?: Json | null
          avatar_url?: string | null
          created_at?: string | null
          date_of_birth?: string | null
          id?: string
          name?: string
          phone?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      security_scores: {
        Row: {
          biometric_score: number
          business_score: number | null
          calculated_at: string | null
          document_score: number
          id: string
          identity_score: number
          overall_score: number
          score_breakdown: Json | null
          user_id: string
        }
        Insert: {
          biometric_score: number
          business_score?: number | null
          calculated_at?: string | null
          document_score: number
          id?: string
          identity_score: number
          overall_score: number
          score_breakdown?: Json | null
          user_id: string
        }
        Update: {
          biometric_score?: number
          business_score?: number | null
          calculated_at?: string | null
          document_score?: number
          id?: string
          identity_score?: number
          overall_score?: number
          score_breakdown?: Json | null
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      calculate_security_score: {
        Args: { user_uuid: string }
        Returns: number
      }
    }
    Enums: {
      biometric_type: "fingerprint" | "face" | "voice" | "iris"
      document_type:
        | "passport"
        | "drivers_license"
        | "national_id"
        | "birth_certificate"
      verification_method: "qr" | "code"
      verification_status:
        | "pending"
        | "processing"
        | "verified"
        | "rejected"
        | "expired"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      biometric_type: ["fingerprint", "face", "voice", "iris"],
      document_type: [
        "passport",
        "drivers_license",
        "national_id",
        "birth_certificate",
      ],
      verification_method: ["qr", "code"],
      verification_status: [
        "pending",
        "processing",
        "verified",
        "rejected",
        "expired",
      ],
    },
  },
} as const
