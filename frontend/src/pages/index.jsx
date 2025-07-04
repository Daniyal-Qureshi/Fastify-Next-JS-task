import { useState, useEffect } from 'react';
import { Container, Grid, Paper } from '@mui/material';
import EmailList from '../components/EmailList';
import EmailContent from '../components/EmailContent';
import EmailCompose from '../components/EmailCompose';
import SearchBar from '../components/SearchBar';
import { emailService } from '../services/api';

export default function Home() {
  const [emails, setEmails] = useState([]);
  const [selectedEmail, setSelectedEmail] = useState(null);
  const [showCompose, setShowCompose] = useState(false);

  useEffect(() => {
    loadEmails();
  }, []);

  const loadEmails = async () => {
    const data = await emailService.getAll();
    setEmails(data);
  };

  const handleSearch = async (query) => {
    const results = await emailService.search(query);
    setEmails(results);
  };

  const handleEmailSelect = async (id) => {
    const email = await emailService.getById(id);
    setSelectedEmail(email);
  };

  const handleCompose = () => {
    setShowCompose(true);
  };

  const handleCloseCompose = () => {
    setShowCompose(false);
  };

  const handleSendEmail = async (emailData) => {
    await emailService.create(emailData);
    setShowCompose(false);
    loadEmails();
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
            <SearchBar onSearch={handleSearch} />
            <EmailList
              emails={emails}
              selectedId={selectedEmail?.id}
              onSelect={handleEmailSelect}
            />
          </Paper>
        </Grid>
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
            <EmailContent
              email={selectedEmail}
              onCompose={handleCompose}
            />
          </Paper>
        </Grid>
      </Grid>

      <EmailCompose
        open={showCompose}
        onClose={handleCloseCompose}
        onSend={handleSendEmail}
      />
    </Container>
  );
} 