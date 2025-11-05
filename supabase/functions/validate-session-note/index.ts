/**
 * Supabase Edge Function: validate-session-note
 *
 * Validates that duration is between 15-120 minutes.
 * Returns { valid: boolean, error?: string }
 */

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

interface ValidationResponse {
  valid: boolean;
  error?: string;
}

function validateSessionNote(note: { duration_minutes: number }): ValidationResponse {
  // Validate that duration is between 15-120 minutes
  if (note.duration_minutes < 15 || note.duration_minutes > 120) {
    return {
      valid: false,
      error: "Duration must be between 15-120 minutes",
    };
  }

  return { valid: true };
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST",
        "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
      },
    });
  }

  try {
    const note = await req.json();
    const result = validateSessionNote(note);

    return new Response(JSON.stringify(result), {
      headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
      status: 200,
    });
  } catch {
    return new Response(
      JSON.stringify({ valid: false, error: "Invalid request" }),
      {
        headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
        status: 400,
      }
    );
  }
});
