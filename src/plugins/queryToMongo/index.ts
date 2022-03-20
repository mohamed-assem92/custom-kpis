import fastifyPlugin from 'fastify-plugin';
import { FastifyPluginCallback, FastifyPluginOptions } from 'fastify';
import q2m from 'query-to-mongo';
import _ from 'lodash';
import { queryToMongoFunction } from './types';

const queryToMongoHelper: queryToMongoFunction = async (request) => {
  if (request.method !== 'GET') {
    return;
  }

  const mongoQuery = q2m(request.query, { maxLimit: 100 });
  const { fields: select, skip: offset, limit } = mongoQuery.options;
  const defaultOffset = !offset || offset < 0 ? 0 : offset;
  const defaultLimit = !limit || limit < 0 ? 100 : limit;
  Object.assign(mongoQuery.options, { select, offset: defaultOffset, limit: defaultLimit });
  _.omit(mongoQuery.criteria, ['fields']);
  _.omit(mongoQuery.options, ['skip']);
  request.mongoQuery = mongoQuery;
};

const queryToMongo: FastifyPluginCallback<FastifyPluginOptions> = (
  fastify,
  opts,
  done,
) :void => {
  fastify.decorateRequest('mongoQuery', null);
  fastify.decorate('queryToMongo', queryToMongoHelper);
  fastify.addHook('preHandler', queryToMongoHelper);
  done();
};

const queryToMongoPlugin = fastifyPlugin(queryToMongo, { name: 'query-to-mongo-plugin' });

export default queryToMongoPlugin;
