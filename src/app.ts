import fastify from 'fastify';
import cors from 'fastify-cors';
import sensible from 'fastify-sensible';
import helmet from 'fastify-helmet';
import config from './config';
import dbConnector from './plugins/db';
import routes from './routes';

const {
  cors: { origins: corsOrigins },
} = config;

const buildFastify = () => {
  const server = fastify({
    ajv: {
      customOptions: {
        allErrors: true,
      },
    },
  });

  server.register(cors, { origin: corsOrigins });
  server.register(helmet, {
    contentSecurityPolicy: false,
  });
  server.register(sensible);
  server.register(dbConnector);
  server.register(routes);
  server.get('/ping', async (request, reply) => 'pong\n');

  server.get('/', async (request, reply) => Date.now());

  return server;
};

export default buildFastify;
