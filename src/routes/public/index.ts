import { FastifyInstance } from 'fastify';
import kpisRoutes from './kpi';
import kpisSubRoutes from './value';

const routes = async (fastify: FastifyInstance): Promise<void> => {
  fastify.register(kpisRoutes, { prefix: '/kpis' });
  fastify.register(kpisSubRoutes, { prefix: '/kpis' });
};

export default routes;
