import mongoose from 'mongoose';
import { FastifyPluginAsync, FastifyPluginOptions } from 'fastify';
import fastifyPlugin from 'fastify-plugin';
import config from '../../config';
import logger from '../../helpers/logger';

const { mongoUrl, mongooseDebug } = config;

const dbConnector: FastifyPluginAsync<FastifyPluginOptions> = async (fastify) => {
  try {
    const db = await mongoose.connect(mongoUrl);
    logger.info('Connected to MongoDB successfully');
    mongoose.connection.on('disconnected', () => {
      logger.error('lost connection');
    });
    mongoose.set('debug', mongooseDebug);
    fastify.addHook('onClose', () => db.disconnect());
  } catch (error) {
    logger.error(error);
    process.exit(1);
  }
};

const dbConnectorPlugin = fastifyPlugin(dbConnector, { name: 'db-connector-plugin' });

export default dbConnectorPlugin;
