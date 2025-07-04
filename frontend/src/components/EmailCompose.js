import { useState } from 'react';
import { 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogActions, 
  TextField, 
  Button,
  Stack
} from '@mui/material';

export default function EmailCompose({ open, onClose, onSubmit }) {
  const [formData, setFormData] = useState({
    to: '',
    cc: '',
    bcc: '',
    subject: '',
    body: ''
  });

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await onSubmit(formData);
    setFormData({ to: '', cc: '', bcc: '', subject: '', body: '' });
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <form onSubmit={handleSubmit}>
        <DialogTitle>New Email</DialogTitle>
        <DialogContent>
          <Stack spacing={2} sx={{ mt: 1 }}>
            <TextField
              name="to"
              label="To"
              fullWidth
              value={formData.to}
              onChange={handleChange}
              required
            />
            <TextField
              name="cc"
              label="CC"
              fullWidth
              value={formData.cc}
              onChange={handleChange}
            />
            <TextField
              name="bcc"
              label="BCC"
              fullWidth
              value={formData.bcc}
              onChange={handleChange}
            />
            <TextField
              name="subject"
              label="Subject"
              fullWidth
              value={formData.subject}
              onChange={handleChange}
              required
            />
            <TextField
              name="body"
              label="Body"
              fullWidth
              multiline
              rows={8}
              value={formData.body}
              onChange={handleChange}
              required
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button type="submit" variant="contained">Send</Button>
        </DialogActions>
      </form>
    </Dialog>
  );
} 