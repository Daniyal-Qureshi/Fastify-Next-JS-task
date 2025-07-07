import { useState, useEffect } from 'react';
import { List, ListItem, ListItemText, ListItemButton } from '@mui/material';

export default function EmailList({ emails, selectedId, onSelect, loading }) {
  if (loading && (!emails || emails.length === 0)) {
    return <div style={{ padding: '20px', textAlign: 'center' }}>Loading emails...</div>;
  }

  return (
    <div>
      {(!emails || emails.length === 0) && !loading ? (
        <div style={{ padding: '20px', textAlign: 'center', color: '#666' }}>
          No emails found
        </div>
      ) : (
        <List>
          {emails && emails.map((email) => (
            <ListItem key={email.id} disablePadding>
              <ListItemButton 
                selected={selectedId === email.id}
                onClick={() => onSelect && onSelect(email.id)}
                sx={{ 
                  '&.Mui-selected': {
                    backgroundColor: '#f5f5f5'
                  }
                }}
              >
                <ListItemText
                  primary={email.subject}
                  secondary={email.to}
                  primaryTypographyProps={{
                    noWrap: true,
                    style: { fontWeight: 500 }
                  }}
                  secondaryTypographyProps={{
                    noWrap: true
                  }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      )}
    </div>
  );
} 