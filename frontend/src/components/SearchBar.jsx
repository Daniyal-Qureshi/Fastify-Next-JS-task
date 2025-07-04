import { useState, useEffect } from 'react';
import { TextField, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

export default function SearchBar({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      if (searchTerm !== '') {
        onSearch(searchTerm);
      }
    }, 500);

    return () => clearTimeout(debounceTimer);
  }, [searchTerm, onSearch]);

  return (
    <TextField
      fullWidth
      variant="outlined"
      size="small"
      placeholder="Search emails..."
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        ),
      }}
      sx={{ mb: 2 }}
    />
  );
} 