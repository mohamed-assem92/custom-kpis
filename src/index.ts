import logger from './helpers/logger';
import config from './config';

import buildFastify from './app';

const {
  port,
} = config;

const server = buildFastify();
server.listen(port, '0.0.0.0', (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }

  logger.info(`Server listening at ${address}`);
});

process.on('unhandledRejection', (err) => {
  logger.error(err);
  process.exit(1);
});
