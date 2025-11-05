import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  Chip,
  Box,
} from '@mui/material';
import { Delete as DeleteIcon, AccessTime as ClockIcon } from '@mui/icons-material';
import type { SessionNote } from '../types';

interface NoteCardProps {
  note: SessionNote;
  onDelete: (id: string) => void;
}

export function NoteCard({ note, onDelete }: NoteCardProps) {
  // Format date for display
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  // Truncate notes to 100 characters
  const truncateNotes = (notes: string): string => {
    if (notes.length <= 100) return notes;
    return notes.substring(0, 100) + '...';
  };

  return (
    <Card elevation={2} sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardContent sx={{ flexGrow: 1 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
          <Typography variant="h6" component="h2" gutterBottom>
            {note.client_name}
          </Typography>
          <Chip
            icon={<ClockIcon />}
            label={`${note.duration_minutes} min`}
            size="small"
            color="primary"
            variant="outlined"
          />
        </Box>

        <Typography variant="body2" color="text.secondary" gutterBottom>
          {formatDate(note.session_date)}
        </Typography>

        <Typography variant="body1" sx={{ mt: 2 }}>
          {truncateNotes(note.quick_notes)}
        </Typography>
      </CardContent>

      <CardActions sx={{ justifyContent: 'flex-end', p: 2, pt: 0 }}>
        <Button
          size="small"
          color="error"
          startIcon={<DeleteIcon />}
          onClick={() => onDelete(note.id)}
        >
          Delete
        </Button>
      </CardActions>
    </Card>
  );
}
