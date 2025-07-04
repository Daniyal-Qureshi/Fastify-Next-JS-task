import { useState, useCallback, useEffect } from 'react';
import { Box, Fab } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import Layout from '../components/Layout';
import EmailList from '../components/EmailList';
import SearchBar from '../components/SearchBar';
import EmailCompose from '../components/EmailCompose';
import EmailContent from '../components/EmailContent';
import { emailService } from '../services/api';
import { toast } from 'react-toastify';

export default function Home() {
  const [emails, setEmails] = useState([]);
  const [selectedEmail, setSelectedEmail] = useState(null);
  const [composeOpen, setComposeOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const fetchEmails = async () => {
    try {
      setLoading(true);
      const data = await emailService.getAll();
      setEmails(data);
    } catch (error) {
      toast.error(error.message || 'Failed to fetch emails');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = useCallback(async (query) => {
    try {
      setLoading(true);
      const data = await emailService.search(query);
      setEmails(data);
    } catch (error) {
      toast.error(error.message || 'Search failed');
    } finally {
      setLoading(false);
    }
  }, []);

  const handleEmailSelect = async (id) => {
    try {
      const email = await emailService.getById(id);
      setSelectedEmail(email);
    } catch (error) {
      toast.error(error.message || 'Failed to fetch email');
    }
  };

  const handleEmailSubmit = async (emailData) => {
    try {
      await emailService.create(emailData);
      await fetchEmails(); // Refresh the email list
    } catch (error) {
      toast.error(error.message || 'Failed to send email');
      throw error; // Re-throw so EmailCompose can handle it
    }
  };

  // Fetch emails on mount
  useEffect(() => {
    fetchEmails();
  }, []);

  const sidebar = (
    <Box sx={{ p: 2 }}>
      <SearchBar onSearch={handleSearch} />
      <EmailList 
        emails={emails}
        selectedId={selectedEmail?.id}
        onSelect={handleEmailSelect}
        loading={loading}
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
