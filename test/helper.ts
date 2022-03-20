import Fastify from 'fastify';
import fp from 'fastify-plugin';
import App from '../src/app';

// Automatically build and tear down our instance
function build() {
  const app = Fastify();

  // fastify-plugin ensures that all decorators
  // are exposed for testing purposes, this is
  // different from the production setup

  // eslint-disable-next-line no-undef
  beforeAll(async () => {
    app.register(fp(App));
    await app.ready();
  });

  // eslint-disable-next-line no-undef
  afterAll(() => app.close());

  return app;
}

export {
  build,
};
