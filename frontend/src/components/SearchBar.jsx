import { useState, useEffect } from 'react';
import { TextField, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

export default function SearchBar({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const trimmed = searchTerm.trim();
  
    if (trimmed === '') return;
  
    const debounceTimer = setTimeout(async () => {
      if (!onSearch) return;
  
      setLoading(true);
      try {
        await onSearch(trimmed);
      } finally {
        setLoading(false);
      }
    }, 500);
  
    return () => clearTimeout(debounceTimer);
  }, [searchTerm, onSearch]);
  

  return (
    <div>
      <TextField
        fullWidth
        variant="outlined"
        size="small"
        placeholder="Search emails..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        disabled={loading}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
        sx={{ mb: 2 }}
      />
      {loading && (
        <div style={{ textAlign: 'center', color: '#666', fontSize: '14px', marginBottom: '10px' }}>
          Searching...
        </div>
      )}
    </div>
  );
}
