export default {
  addValue: {
    title: 'Add Value',
    $id: 'addValue',
    type: 'object',
    required: ['xAxisValue', 'yAxisValue'],
    properties: {
      xAxisValue: {
        anyOf: [
          {
            type: 'number',
          },
          {
            type: 'string',
            minLength: 1,
          },
        ],
      },
      yAxisValue: {
        anyOf: [
          {
            type: 'number',
          },
          {
            type: 'string',
            minLength: 1,
          },
        ],
      },
    },
    additionalProperties: false,
  },
  updateValue: {
    title: 'Update Value',
    $id: 'updateValue',
    type: 'object',
    required: ['xAxisValue', 'yAxisValue'],
    properties: {
      xAxisValue: {
        anyOf: [
          {
            type: 'number',
          },
          {
            type: 'string',
            minLength: 1,
          },
        ],
      },
      yAxisValue: {
        anyOf: [
          {
            type: 'number',
          },
          {
            type: 'string',
            minLength: 1,
          },
        ],
      },
    },
    additionalProperties: false,
  },
};
