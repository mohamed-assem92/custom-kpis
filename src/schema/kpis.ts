export default {
  addKPI: {
    title: 'Create KPI',
    $id: 'addKPI',
    type: 'object',
    required: ['ownerId', 'title', 'xAxisTitle', 'yAxisTitle'],
    properties: {
      ownerId: { type: 'integer', minimum: 1 },
      title: { type: 'string' },
      xAxisTitle: { type: 'string' },
      yAxisTitle: { type: 'string' },
      description: { type: 'string' },
      values: {
        minItems: 1,
        required: ['xAxisValue', 'yAxisValue'],
        properties: {
          xAxisValue: {
            anyOf: [
              { type: 'string' },
              { type: 'number' },
            ],
          },
          yAxisValue: {
            anyOf: [
              { type: 'string' },
              { type: 'number' },
            ],
          },
        },
      },
    },
    additionalProperties: false,
  },
  updateKPI: {
    title: 'Update KPI',
    $id: 'updateKPI',
    type: 'object',
    properties: {
      title: { type: 'string' },
      xAxisTitle: { type: 'string' },
      yAxisTitle: { type: 'string' },
      description: { type: 'string' },
    },
    additionalProperties: false,
  },
};
