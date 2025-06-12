export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          user_id: string
          email: string
          first_name: string | null
          last_name: string | null
          role: "parent" | "business"
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          email: string
          first_name?: string | null
          last_name?: string | null
          role: "parent" | "business"
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          email?: string
          first_name?: string | null
          last_name?: string | null
          role?: "parent" | "business"
          created_at?: string
          updated_at?: string
        }
      }
      programs: {
        Row: {
          id: string
          name: string
          description: string
          category: string
          price: number
          age_group: string
          schedule_type: string
          location: string
          image_url: string | null
          created_at: string
          updated_at: string
          [key: string]: any
        }
        [key: string]: any
      }
      enrollments: {
        Row: {
          id: string
          parent_id: string
          program_id: string
          payment_status: "pending" | "completed" | "failed"
          stripe_session_id: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          parent_id: string
          program_id: string
          payment_status?: "pending" | "completed" | "failed"
          stripe_session_id?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          parent_id?: string
          program_id?: string
          payment_status?: "pending" | "completed" | "failed"
          stripe_session_id?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      reviews: {
        Row: {
          id: string
          parent_id: string
          program_id: string
          rating: number
          comment: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          parent_id: string
          program_id: string
          rating: number
          comment?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          parent_id?: string
          program_id?: string
          rating?: number
          comment?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      [key: string]: any
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      nearby_programs: {
        Args: {
          lat: number
          lng: number
          radius_km?: number
        }
        Returns: {
          id: string
          name: string
          description: string
          category: string
          price: number
          age_group: string
          schedule_type: string
          location: string
          distance_km: number
        }[]
      }
    }
    Enums: {
      [_ in never]: never
    }
    [key: string]: any
  }
  [key: string]: any
}
