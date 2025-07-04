import { Box } from '@mui/material';

export default function Layout({ children, sidebar }) {
  return (
    <Box sx={{ display: 'flex', height: '100vh' }}>
      <Box sx={{ width: 300, borderRight: '1px solid #e0e0e0', overflow: 'auto' }}>
        {sidebar}
      </Box>
      <Box sx={{ flex: 1, overflow: 'auto', position: 'relative' }}>
        {children}
      </Box>
    </Box>
  );
} 