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
import { toast } from 'react-toastify';

export default function EmailCompose({ open, onClose, onSubmit }) {
  const [formData, setFormData] = useState({
    to: '',
    cc: '',
    bcc: '',
    subject: '',
    body: ''
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      setLoading(true);
      
      if (onSubmit) {
        await onSubmit(formData);
      }
  
      setFormData({ to: '', cc: '', bcc: '', subject: '', body: '' });
      toast.success('Email sent successfully!');
      onClose();
    } catch (error) {
      toast.error(error.message || 'Failed to send email');
    } finally {
      setLoading(false);
    }
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
              disabled={loading}
            />
            <TextField
              name="cc"
              label="CC"
              fullWidth
              value={formData.cc}
              onChange={handleChange}
              disabled={loading}
            />
            <TextField
              name="bcc"
              label="BCC"
              fullWidth
              value={formData.bcc}
              onChange={handleChange}
              disabled={loading}
            />
            <TextField
              name="subject"
              label="Subject"
              fullWidth
              value={formData.subject}
              onChange={handleChange}
              required
              disabled={loading}
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
              disabled={loading}
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} disabled={loading}>
            Cancel
          </Button>
          <Button 
            type="submit" 
            variant="contained" 
            disabled={loading}
          >
            {loading ? 'Sending...' : 'Send'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
} 