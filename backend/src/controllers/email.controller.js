import { emailService } from '../services/email.service.js';
import { emailSchema, searchQuerySchema, idParamSchema } from '../schemas/email.schema.js';

export const emailController = {
  getAll: async (request, reply) => {
    try {
      const emails = await emailService.getAll();
      return emails;
    } catch (error) {
      reply.code(500).send({ error: 'Internal server error' });
    }
  },

  search: async (request, reply) => {
    try {
      const { query } = searchQuerySchema.parse(request.query);
      const emails = await emailService.search(query);
      return emails;
    } catch (error) {
      if (error.errors) {
        reply.code(400).send({ error: error.errors[0].message });
        return;
      }
      reply.code(500).send({ error: 'Internal server error' });
    }
  },

  getById: async (request, reply) => {
    try {
      const { id } = idParamSchema.parse({ id: parseInt(request.params.id) });
      const email = await emailService.getById(id);
      if (!email) {
        reply.code(404).send({ error: 'Email not found' });
        return;
      }
      return email;
    } catch (error) {
      if (error.errors) {
        reply.code(400).send({ error: error.errors[0].message });
        return;
      }
      reply.code(500).send({ error: 'Internal server error' });
    }
  },

  create: async (request, reply) => {
    try {
      const emailData = emailSchema.parse(request.body);
      const email = await emailService.create(emailData);
      reply.code(201).send(email);
    } catch (error) {
      if (error.errors) {
        reply.code(400).send({ error: error.errors[0].message });
        return;
      }
      reply.code(500).send({ error: 'Internal server error' });
    }
  }
}; 