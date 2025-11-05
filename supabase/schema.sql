-- Create the session_notes table
CREATE TABLE IF NOT EXISTS session_notes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_name TEXT NOT NULL,
  session_date DATE NOT NULL,
  quick_notes TEXT NOT NULL CHECK (char_length(quick_notes) <= 500),
  duration_minutes INTEGER NOT NULL CHECK (duration_minutes > 0),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create an index on session_date for faster queries
CREATE INDEX IF NOT EXISTS idx_session_notes_session_date
ON session_notes(session_date DESC);

-- Enable Row Level Security (RLS)
ALTER TABLE session_notes ENABLE ROW LEVEL SECURITY;

-- Create a policy that allows all operations for now
-- In production, you would want to restrict this based on authenticated users
CREATE POLICY "Allow all operations for demo"
ON session_notes
FOR ALL
USING (true)
WITH CHECK (true);

-- Alternative: If you want to disable RLS for this demo (simpler approach)
-- Just comment out the ENABLE ROW LEVEL SECURITY line above
-- and remove the CREATE POLICY statement

COMMENT ON TABLE session_notes IS 'Stores therapy session notes with client information';
COMMENT ON COLUMN session_notes.id IS 'Unique identifier for each note';
COMMENT ON COLUMN session_notes.client_name IS 'Name of the client';
COMMENT ON COLUMN session_notes.session_date IS 'Date when the session occurred';
COMMENT ON COLUMN session_notes.quick_notes IS 'Session notes (max 500 characters)';
COMMENT ON COLUMN session_notes.duration_minutes IS 'Duration of the session in minutes';
COMMENT ON COLUMN session_notes.created_at IS 'Timestamp when the note was created';
