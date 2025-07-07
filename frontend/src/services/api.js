const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

export const emailService = {
  getAll: async () => {
    const res = await fetch(`${API_URL}/emails`);
    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.error || `Failed to fetch emails: ${res.status}`);
    }
    return res.json();
  },

  search: async (query) => {
    if (!query || query.trim() === '') {
      throw new Error('Search query is required');
    }
    const res = await fetch(`${API_URL}/emails/search?query=${encodeURIComponent(query.trim())}`);
    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.error || `Search failed: ${res.status}`);
    }
    return res.json();
  },

  getById: async (id) => {
    if (!id) {
      throw new Error('Email ID is required');
    }
    const res = await fetch(`${API_URL}/emails/${id}`);
    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.error || `Failed to fetch email: ${res.status}`);
    }
    return res.json();
  },

  create: async (emailData) => {
    if (!emailData) {
      throw new Error('Email data is required');
    }
    const res = await fetch(`${API_URL}/emails`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(emailData),
    });
    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.error || `Failed to create email: ${res.status}`);
    }
    return res.json();
  },

  update: async (id, emailData) => {
    if (!id) {
      throw new Error('Email ID is required');
    }
    if (!emailData) {
      throw new Error('Email data is required');
    }
    const res = await fetch(`${API_URL}/emails/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(emailData),
    });
    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.error || `Failed to update email: ${res.status}`);
    }
    return res.json();
  },

  delete: async (id) => {
    if (!id) {
      throw new Error('Email ID is required');
    }
    const res = await fetch(`${API_URL}/emails/${id}`, {
      method: 'DELETE',
    });
    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.error || `Failed to delete email: ${res.status}`);
    }
    return res.json();
  }
}; 