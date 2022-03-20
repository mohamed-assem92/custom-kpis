export default {
  routePrefix: '/docs',
  swagger: {
    info: {
      title: 'API documentation',
      description: 'APIs docs',
      version: '0.1.0',
    },
    schemes: ['http'],
    consumes: ['application/json'],
    produces: ['application/json'],
  },
  exposeRoute: true,
};
