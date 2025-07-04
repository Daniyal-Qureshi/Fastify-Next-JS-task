import { List, ListItem, ListItemText, ListItemButton } from '@mui/material';

export default function EmailList({ emails, selectedId, onSelect }) {
  return (
    <List>
      {emails.map((email) => (
        <ListItem key={email.id} disablePadding>
          <ListItemButton 
            selected={selectedId === email.id}
            onClick={() => onSelect(email.id)}
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
  );
} 