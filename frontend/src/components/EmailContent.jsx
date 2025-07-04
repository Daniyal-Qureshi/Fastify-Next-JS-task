import { Box, Typography } from '@mui/material';

export default function EmailContent({ email }) {
  if (!email) {
    return (
      <Box sx={{ p: 3, textAlign: 'center', color: 'text.secondary' }}>
        <Typography>Select an email to view</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom>{email.subject}</Typography>
      <Typography variant="subtitle2" gutterBottom>To: {email.to}</Typography>
      {email.cc && (
        <Typography variant="subtitle2" gutterBottom>CC: {email.cc}</Typography>
      )}
      {email.bcc && (
        <Typography variant="subtitle2" gutterBottom>BCC: {email.bcc}</Typography>
      )}
      <Typography sx={{ mt: 2, whiteSpace: 'pre-wrap' }}>{email.body}</Typography>
    </Box>
  );
} 