import { emailController } from '../controllers/email.controller.js';

const routes = async (fastify, options) => {
  // Get all emails
  fastify.get('/api/emails', emailController.getAll);

  // Search emails
  fastify.get('/api/emails/search', emailController.search);

  // Get single email
  fastify.get('/api/emails/:id', emailController.getById);

  // Create new email
  fastify.post('/api/emails', emailController.create);
};

export default routes;
