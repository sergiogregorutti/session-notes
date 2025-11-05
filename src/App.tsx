import { useState } from "react";
import { Typography, Box, Alert } from "@mui/material";
import { NoteForm } from "./components/NoteForm";
import { NoteList } from "./components/NoteList";
import { DeleteConfirmDialog } from "./components/DeleteConfirmDialog";
import { useSessionNotes } from "./hooks/useSessionNotes";
import type { SessionNote, CreateSessionNoteInput } from "./types";

function App() {
  const { notes, loading, error, createNote, deleteNote } = useSessionNotes();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [noteToDelete, setNoteToDelete] = useState<SessionNote | null>(null);
  const [showForm, setShowForm] = useState(false);

  const handleDeleteClick = (id: string) => {
    const note = notes.find((n) => n.id === id);
    if (note) {
      setNoteToDelete(note);
      setDeleteDialogOpen(true);
    }
  };

  const handleDeleteConfirm = async () => {
    if (noteToDelete) {
      try {
        await deleteNote(noteToDelete.id);
        setDeleteDialogOpen(false);
        setNoteToDelete(null);
      } catch (err) {
        console.error("Failed to delete note:", err);
      }
    }
  };

  const handleDeleteCancel = () => {
    setDeleteDialogOpen(false);
    setNoteToDelete(null);
  };

  const handleCreateNote = async (note: CreateSessionNoteInput) => {
    await createNote(note);
    setShowForm(false);
  };

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: 800,
        margin: "0 auto",
        padding: { xs: 2, sm: 4 },
      }}
    >
      <Box sx={{ mb: 4 }}>
        <Typography variant="h3" component="h1" gutterBottom>
          Session Notes
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          Therapist note-taking application
        </Typography>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      {showForm ? (
        <NoteForm
          onSubmit={handleCreateNote}
          onCancel={() => setShowForm(false)}
        />
      ) : (
        <NoteList
          notes={notes}
          loading={loading}
          error={null}
          onDelete={handleDeleteClick}
          onCreateNew={() => setShowForm(true)}
        />
      )}

      <DeleteConfirmDialog
        open={deleteDialogOpen}
        onConfirm={handleDeleteConfirm}
        onCancel={handleDeleteCancel}
        clientName={noteToDelete?.client_name || ""}
      />
    </Box>
  );
}

export default App;
