import { notFound } from 'next/navigation';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

export const emailService = {
  getAll: async () => {
    const res = await fetch(`${API_URL}/emails`);
    return res.json();
  },

  search: async (query) => {
    const res = await fetch(`${API_URL}/emails/search?query=${encodeURIComponent(query)}`);
    return res.json();
  },

  getById: async (id) => {
    const res = await fetch(`${API_URL}/emails/${id}`);
    return res.json();
  },

  create: async (emailData) => {
    const res = await fetch(`${API_URL}/emails`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(emailData),
    });
    return res.json();
  }
}; 