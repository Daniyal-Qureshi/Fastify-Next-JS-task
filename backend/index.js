// ESM
import 'dotenv/config';
import Fastify from 'fastify';
import cors from '@fastify/cors';
import routes from './src/routes/index.js';

const HOST = process.env.HOST || 'localhost';
const PORT = process.env.PORT || 3001;

/**
 * @type {import('fastify').FastifyInstance} Instance of Fastify
 */
const fastify = Fastify({
  logger: true
});

// Enable CORS
await fastify.register(cors, {
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE']
});

fastify.register(routes);

fastify.listen({ host: HOST, port: PORT }, function (err, address) {
  if (err) {
    fastify.log.error(err)
    process.exit(1)
  }
  fastify.log.info(`Server listening on ${address}`)
});
