import { Typography, Box, CircularProgress, Alert, Button } from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import { NoteCard } from './NoteCard';
import type { SessionNote } from '../types';

interface NoteListProps {
  notes: SessionNote[];
  loading: boolean;
  error: string | null;
  onDelete: (id: string) => void;
  onCreateNew: () => void;
}

export function NoteList({ notes, loading, error, onDelete, onCreateNew }: NoteListProps) {
  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Alert severity="error" sx={{ mb: 2 }}>
        {error}
      </Alert>
    );
  }

  if (notes.length === 0) {
    return (
      <Box sx={{ textAlign: 'center', p: 4 }}>
        <Typography variant="h6" color="text.secondary" gutterBottom>
          No session notes yet
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          Get started by creating your first session note
        </Typography>
        <Button
          variant="contained"
          size="large"
          startIcon={<AddIcon />}
          onClick={onCreateNew}
        >
          Create First Note
        </Button>
      </Box>
    );
  }

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h5">
          Session Notes ({notes.length})
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={onCreateNew}
        >
          New Note
        </Button>
      </Box>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: '1fr',
          gap: 3,
        }}
      >
        {notes.map((note) => (
          <NoteCard key={note.id} note={note} onDelete={onDelete} />
        ))}
      </Box>
    </Box>
  );
}
