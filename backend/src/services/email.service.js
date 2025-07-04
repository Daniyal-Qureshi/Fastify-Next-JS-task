import { db } from '../db/index.js';

export const emailService = {
  getAll: async () => {
    return db('emails').select('*').orderBy('created_at', 'desc');
  },

  search: async (query) => {
    return db('emails')
      .where('to', 'like', `%${query}%`)
      .orWhere('cc', 'like', `%${query}%`)
      .orWhere('bcc', 'like', `%${query}%`)
      .orWhere('subject', 'like', `%${query}%`)
      .orWhere('body', 'like', `%${query}%`)
      .orderBy('created_at', 'desc');
  },

  getById: async (id) => {
    return db('emails').where({ id }).first();
  },

  create: async (emailData) => {
    const [email] = await db('emails').insert(emailData).returning('*');
    return email;
  }
}; 