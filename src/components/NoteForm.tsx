import { useState, type FormEvent } from 'react';
import {
  Box,
  Button,
  TextField,
  Paper,
  Typography,
  Alert,
} from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { type Dayjs } from 'dayjs';
import type { CreateSessionNoteInput } from '../types';

interface NoteFormProps {
  onSubmit: (note: CreateSessionNoteInput) => Promise<void>;
  onCancel?: () => void;
}

export function NoteForm({ onSubmit, onCancel }: NoteFormProps) {
  const [clientName, setClientName] = useState('');
  const [sessionDate, setSessionDate] = useState<Dayjs | null>(null);
  const [quickNotes, setQuickNotes] = useState('');
  const [duration, setDuration] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    // Basic validation
    if (!clientName.trim() || !sessionDate || !quickNotes.trim() || !duration) {
      setError('All fields are required');
      return;
    }

    const durationNum = parseInt(duration, 10);
    if (isNaN(durationNum) || durationNum < 1) {
      setError('Duration must be a valid number');
      return;
    }

    if (quickNotes.length > 500) {
      setError('Notes must be 500 characters or less');
      return;
    }

    try {
      setSubmitting(true);
      await onSubmit({
        client_name: clientName.trim(),
        session_date: sessionDate.format('YYYY-MM-DD'),
        quick_notes: quickNotes.trim(),
        duration_minutes: durationNum,
      });

      // Clear form on success
      setClientName('');
      setSessionDate(null);
      setQuickNotes('');
      setDuration('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create note');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
        <Typography variant="h5" gutterBottom>
          Create New Session Note
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError(null)}>
            {error}
          </Alert>
        )}

        <Box component="form" onSubmit={handleSubmit} noValidate>
          <TextField
            fullWidth
            label="Client Name"
            value={clientName}
            onChange={(e) => setClientName(e.target.value)}
            margin="normal"
            required
            disabled={submitting}
          />

          <DatePicker
            label="Session Date"
            value={sessionDate}
            onChange={(newValue) => setSessionDate(newValue)}
            disabled={submitting}
            maxDate={dayjs()}
            slotProps={{
              textField: {
                fullWidth: true,
                margin: 'normal',
                required: true,
              },
            }}
          />

          <TextField
            fullWidth
            label="Quick Notes"
            multiline
            rows={4}
            value={quickNotes}
            onChange={(e) => setQuickNotes(e.target.value)}
            margin="normal"
            required
            disabled={submitting}
            helperText={`${quickNotes.length}/500 characters`}
            error={quickNotes.length > 500}
          />

          <TextField
            fullWidth
            label="Session Duration (minutes)"
            type="number"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            margin="normal"
            required
            disabled={submitting}
            inputProps={{ min: 1, max: 999 }}
            helperText="Must be between 15-120 minutes"
          />

          <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
            {onCancel && (
              <Button
                variant="outlined"
                size="large"
                onClick={onCancel}
                disabled={submitting}
                fullWidth
              >
                Cancel
              </Button>
            )}
            <Button
              type="submit"
              variant="contained"
              color="primary"
              size="large"
              disabled={submitting}
              fullWidth
            >
              {submitting ? 'Creating...' : 'Create Note'}
            </Button>
          </Box>
        </Box>
      </Paper>
    </LocalizationProvider>
  );
}
