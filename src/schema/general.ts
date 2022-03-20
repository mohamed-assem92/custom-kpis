export default {
  findByID: {
    $id: 'findByIDRouteParam',
    type: 'object',
    required: ['ownerId'],
    properties: {
      ownerId: { type: 'integer' },
    },
    additionalProperties: false,
  },
  findByKIPIDRouteParam: {
    $id: 'findByKIPIDRouteParam',
    type: 'object',
    required: ['kpiId'],
    properties: {
      kpiId: { type: 'string' },
    },
    additionalProperties: false,
  },
  queryStringForPagination: {
    $id: 'queryStringForPagination',
    type: 'object',
    properties: {
      limit: { type: 'integer' },
      offset: { type: 'integer' },
    },
    additionalProperties: false,
  },
};
