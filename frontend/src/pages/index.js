import { useState, useCallback } from 'react';
import { Box, Fab } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import Layout from '../components/Layout';
import EmailList from '../components/EmailList';
import SearchBar from '../components/SearchBar';
import EmailCompose from '../components/EmailCompose';
import EmailContent from '../components/EmailContent';
import { emailService } from '../services/api';

export default function Home() {
  const [emails, setEmails] = useState([]);
  const [selectedEmail, setSelectedEmail] = useState(null);
  const [composeOpen, setComposeOpen] = useState(false);

  const fetchEmails = async () => {
    const data = await emailService.getAll();
    setEmails(data);
  };

  const handleSearch = useCallback(async (query) => {
    const data = await emailService.search(query);
    setEmails(data);
  }, []);

  const handleEmailSelect = async (id) => {
    const email = await emailService.getById(id);
    setSelectedEmail(email);
  };

  const handleEmailSubmit = async (emailData) => {
    await emailService.create(emailData);
    fetchEmails();
  };

  // Fetch emails on mount
  useState(() => {
    fetchEmails();
  }, []);

  const sidebar = (
    <Box sx={{ p: 2 }}>
      <SearchBar onSearch={handleSearch} />
      <EmailList 
        emails={emails}
        selectedId={selectedEmail?.id}
        onSelect={handleEmailSelect}
      />
    </Box>
  );

  return (
    <>
      <Layout sidebar={sidebar}>
        <EmailContent email={selectedEmail} />
        <Fab
          color="primary"
          sx={{ position: 'absolute', bottom: 16, right: 16 }}
          onClick={() => setComposeOpen(true)}
        >
          <AddIcon />
        </Fab>
      </Layout>
      <EmailCompose
        open={composeOpen}
        onClose={() => setComposeOpen(false)}
        onSubmit={handleEmailSubmit}
      />
    </>
  );
}
