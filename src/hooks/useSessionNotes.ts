import { useState, useEffect, useCallback } from "react";
import { supabase } from "../lib/supabase";
import type {
  SessionNote,
  CreateSessionNoteInput,
  ValidationResponse,
} from "../types";

interface UseSessionNotesReturn {
  notes: SessionNote[];
  loading: boolean;
  error: string | null;
  createNote: (note: CreateSessionNoteInput) => Promise<void>;
  deleteNote: (id: string) => Promise<void>;
  refreshNotes: () => Promise<void>;
}

/**
 * Custom hook for managing session notes
 */
export function useSessionNotes(): UseSessionNotesReturn {
  const [notes, setNotes] = useState<SessionNote[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch all notes from Supabase
  const fetchNotes = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const { data, error: fetchError } = await supabase
        .from("session_notes")
        .select("*")
        .order("session_date", { ascending: false });

      if (fetchError) throw fetchError;

      setNotes(data || []);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to fetch notes";
      setError(errorMessage);
      console.error("Error fetching notes:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Validate note using Supabase Edge Function
  const validateNote = async (
    note: CreateSessionNoteInput
  ): Promise<ValidationResponse> => {
    try {
      const { data, error: functionError } =
        await supabase.functions.invoke<ValidationResponse>(
          "validate-session-note",
          {
            body: note,
          }
        );

      if (functionError) {
        // If edge function fails, fall back to client-side validation
        console.warn(
          "Edge function validation failed, using client-side validation:",
          functionError
        );
        return validateNoteClientSide(note);
      }

      return data || { valid: false, error: "Unknown validation error" };
    } catch {
      // Fallback to client-side validation if edge function is not available
      console.warn("Edge function not available, using client-side validation");
      return validateNoteClientSide(note);
    }
  };

  // Client-side validation fallback
  const validateNoteClientSide = (
    note: CreateSessionNoteInput
  ): ValidationResponse => {
    if (note.duration_minutes < 15 || note.duration_minutes > 120) {
      return {
        valid: false,
        error: "Session duration must be between 15 and 120 minutes",
      };
    }
    return { valid: true };
  };

  // Create a new note
  const createNote = async (
    noteInput: CreateSessionNoteInput
  ): Promise<void> => {
    try {
      setError(null);

      // Validate using edge function
      const validation = await validateNote(noteInput);
      if (!validation.valid) {
        throw new Error(validation.error || "Validation failed");
      }

      const { error: insertError } = await supabase
        .from("session_notes")
        .insert([noteInput] as never);

      if (insertError) throw insertError;

      // Refresh notes after creation
      await fetchNotes();
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to create note";
      setError(errorMessage);
      throw err;
    }
  };

  // Delete a note
  const deleteNote = async (id: string): Promise<void> => {
    try {
      setError(null);

      const { error: deleteError } = await supabase
        .from("session_notes")
        .delete()
        .eq("id", id);

      if (deleteError) throw deleteError;

      // Refresh notes after deletion
      await fetchNotes();
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to delete note";
      setError(errorMessage);
      throw err;
    }
  };

  // Fetch notes on mount
  useEffect(() => {
    fetchNotes();
  }, [fetchNotes]);

  return {
    notes,
    loading,
    error,
    createNote,
    deleteNote,
    refreshNotes: fetchNotes,
  };
}
