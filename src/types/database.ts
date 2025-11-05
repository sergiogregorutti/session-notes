/**
 * Database types for Supabase
 */

export interface Database {
  public: {
    Tables: {
      session_notes: {
        Row: {
          id: string;
          client_name: string;
          session_date: string;
          quick_notes: string;
          duration_minutes: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          client_name: string;
          session_date: string;
          quick_notes: string;
          duration_minutes: number;
          created_at?: string;
        };
        Update: {
          id?: string;
          client_name?: string;
          session_date?: string;
          quick_notes?: string;
          duration_minutes?: number;
          created_at?: string;
        };
      };
    };
  };
}
