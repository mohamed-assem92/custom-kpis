import {
  FastifyPluginAsync,
  FastifyPluginOptions,
  FastifyReply,
  FastifyRequest,
} from 'fastify';
import {
  addKPI,
  getKPISByUserId,
  deleteUserKPIS,
  deleteUserKPIbyID,
  updateUserKPIbyID,
  getOneKPI,
} from '../../controllers/kpi';
import { KPIDocument } from '../../models/KPIS';
import { KPIDocumentPartialValues } from '../../types';

const kpisRoutes: FastifyPluginAsync<FastifyPluginOptions> = async (fastify) => {
  // Get All USER KPIS Route
  fastify.route({
    method: 'GET',
    url: '/users/:ownerId',
    schema: {
      querystring: {
        $ref: 'queryStringForPagination#',
      },
      params: {
        $ref: 'findByIDRouteParam#',
      },
      tags: ['KPIS'],
      description: 'Get All KPIS by Owner ID',
    },
    handler: async (request: FastifyRequest, reply: FastifyReply) => {
      const { mongoQuery } = request;
      const params = request.params as { ownerId: number };
      mongoQuery.criteria = { ...mongoQuery.criteria, ownerId: params.ownerId };
      const KPIS = await getKPISByUserId(mongoQuery);
      reply.status(200).send(KPIS);
    },
  });

  // Get One USER KPI Route
  fastify.route({
    method: 'GET',
    url: '/:kpiId',
    schema: {
      params: {
        $ref: 'findByKIPIDRouteParam#',
      },
      tags: ['KPIS'],
      description: 'Get One KPI by Owner ID',
    },
    handler: async (request: FastifyRequest, reply: FastifyReply) => {
      const params = request.params as { kpiId: string };
      const KPI = await getOneKPI(params.kpiId);
      reply.status(200).send(KPI);
    },
  });

  // Create KPI Route
  fastify.route({
    method: 'POST',
    url: '/',
    schema: {
      body: {
        $ref: 'addKPI#',
      },
      tags: ['KPIS'],
      description: 'KPI Creation',
    },
    handler: async (request: FastifyRequest, reply: FastifyReply) => {
      const KPIData = request.body as KPIDocument;
      await addKPI(KPIData);
      reply.status(201).send();
    },
  });

  // Delete All USER KPIS
  fastify.route({
    method: 'DELETE',
    url: '/users/:ownerId',
    schema: {
      params: {
        $ref: 'findByIDRouteParam#',
      },
      tags: ['KPIS'],
      description: 'Delete All KPIS by Owner ID',
    },
    handler: async (request: FastifyRequest, reply: FastifyReply) => {
      const params = request.params as { ownerId: number };
      await deleteUserKPIS(params.ownerId);
      reply.status(201).send();
    },
  });

  // Delete USER KPI by KPI ID
  fastify.route({
    method: 'DELETE',
    url: '/:kpiId',
    schema: {
      params: {
        $ref: 'findByKIPIDRouteParam#',
      },
      tags: ['KPIS'],
      description: 'Delete One KPI by KPI ID',
    },
    handler: async (request: FastifyRequest, reply: FastifyReply) => {
      const params = request.params as { kpiId: string };
      await deleteUserKPIbyID(params.kpiId);
      reply.status(201).send();
    },
  });

  // Update KPI
  fastify.route({
    method: 'PATCH',
    url: '/:kpiId',
    schema: {
      body: {
        $ref: 'updateKPI#',
      },
      params: {
        $ref: 'findByKIPIDRouteParam#',
      },
      tags: ['KPIS'],
      description: 'Update One KPI by KPI ID',
    },
    handler: async (request: FastifyRequest, reply: FastifyReply) => {
      const params = request.params as { kpiId: string };
      const KPIData = request.body as KPIDocumentPartialValues;
      await updateUserKPIbyID(params.kpiId, KPIData);
      reply.status(201).send();
    },
  });
};

export default kpisRoutes;
