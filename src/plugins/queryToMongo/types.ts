import { preHandlerHookHandler } from 'fastify';
import {
  MongooseFilterQuery, PaginateOptions, Model, Document,
} from 'mongoose';

export type queryToMongoFunction = preHandlerHookHandler

declare module 'fastify' {
    interface FastifyInstance {
        queryToMongo: queryToMongoFunction;
    }

  interface FastifyRequest {
    mongoQuery: PaginateOptions & {
      criteria: MongooseFilterQuery<Model<Document>>;
    }
  }
}
