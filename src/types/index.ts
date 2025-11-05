/**
 * Core data types for the session notes application
 */

export interface SessionNote {
  id: string;
  client_name: string;
  session_date: string;
  quick_notes: string;
  duration_minutes: number;
  created_at: string;
}

export interface CreateSessionNoteInput {
  client_name: string;
  session_date: string;
  quick_notes: string;
  duration_minutes: number;
}

export interface ValidationResponse {
  valid: boolean;
  error?: string;
}
