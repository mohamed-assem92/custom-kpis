import {
  FastifyPluginAsync,
  FastifyPluginOptions,
  FastifyReply,
  FastifyRequest,
} from 'fastify';
import {
  getKPIValues,
  addValue,
  deleteKPIValue,
  updateValue,
} from '../../controllers/value';
import { Value } from '../../types';

const kpisSubRoutes: FastifyPluginAsync<FastifyPluginOptions> = async (fastify) => {
  fastify.route({
    method: 'GET',
    url: '/:kpiId/values',
    schema: {
      params: {
        $ref: 'findByKIPIDRouteParam#',
      },
      tags: ['Values'],
      description: 'Get All Values by KPI ID',
    },
    handler: async (request: FastifyRequest, reply: FastifyReply) => {
      const params = request.params as { kpiId: string };
      const kpiValues = await getKPIValues(params.kpiId);
      reply.status(200).send(kpiValues);
    },
  });

  fastify.route({
    method: 'POST',
    url: '/:kpiId/values',
    schema: {
      body: {
        $ref: 'addValue#',
      },
      tags: ['Values'],
      description: 'Add Value to KPI',
    },
    handler: async (request: FastifyRequest, reply: FastifyReply) => {
      const valueData = request.body as Value;
      const params = request.params as { kpiId: string };
      await addValue(params.kpiId, valueData);
      reply.status(201).send();
    },
  });

  fastify.route({
    method: 'DELETE',
    url: '/:kpiId/values',
    schema: {
      querystring: {
        $ref: 'addValue#',
      },
      tags: ['Values'],
      description: 'Delete Value from KPI',
    },
    handler: async (request: FastifyRequest, reply: FastifyReply) => {
      const params = request.params as { kpiId: string };
      const queryString = request.query as Value;
      await deleteKPIValue(params.kpiId, queryString.xAxisValue, queryString.yAxisValue);
      reply.status(201).send();
    },
  });

  fastify.route({
    method: 'PATCH',
    url: '/:kpiId/values',
    schema: {
      querystring: {
        $ref: 'addValue#',
      },
      body: {
        $ref: 'updateValue#',
      },
      tags: ['Values'],
      description: 'Update Value from KPI',
    },
    handler: async (request: FastifyRequest, reply: FastifyReply) => {
      const valueData = request.body as Value;
      const params = request.params as { kpiId: string };
      const queryString = request.query as Value;
      await updateValue(params.kpiId, queryString.xAxisValue, queryString.yAxisValue, valueData);
      reply.status(201).send();
    },
  });
};

export default kpisSubRoutes;
