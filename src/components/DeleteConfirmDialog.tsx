import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from '@mui/material';

interface DeleteConfirmDialogProps {
  open: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  clientName: string;
}

export function DeleteConfirmDialog({
  open,
  onConfirm,
  onCancel,
  clientName,
}: DeleteConfirmDialogProps) {
  return (
    <Dialog
      open={open}
      onClose={onCancel}
      aria-labelledby="delete-dialog-title"
      aria-describedby="delete-dialog-description"
    >
      <DialogTitle id="delete-dialog-title">Delete Session Note?</DialogTitle>
      <DialogContent>
        <DialogContentText id="delete-dialog-description">
          Are you sure you want to delete the session note for{' '}
          <strong>{clientName}</strong>? This action cannot be undone.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onCancel} color="primary">
          Cancel
        </Button>
        <Button onClick={onConfirm} color="error" variant="contained" autoFocus>
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
}
