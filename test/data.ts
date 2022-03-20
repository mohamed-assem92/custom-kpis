export default {
  errorMapper: {
    validation: {
      data: {
        message: "body should have required property 'ownerId', body should have required property 'title', body should have required property 'xAxisTitle', body should have required property 'yAxisTitle'",
        validation: [
          {
            keyword: 'required',
            dataPath: '',
            schemaPath: 'addKPI#/required',
            params: {
              missingProperty: 'ownerId',
            },
            message: "should have required property 'ownerId'",
          },
        ],
      },
      result: {
        statusCode: 422,
        code: 'VALIDATION_ERROR',
        message: "body should have required property 'ownerId', body should have required property 'title', body should have required property 'xAxisTitle', body should have required property 'yAxisTitle'",
        details: [
          {
            field: 'ownerId',
            message: "should have required property 'ownerId'",
            error: 'required',
            dataPath: '',
            params: {
              missingProperty: 'ownerId',
            },
          },
        ],
      },
    },
  },
  kpiDocument: {
    doc: {
      ownerId: 3,
      title: 'revenue graph 4',
      description: 'this is my revenue graph 4',
      xAxisTitle: 'Revenue',
      yAxisTitle: 'Date',
      values: [{
        xAxisValue: 30,
        yAxisValue: '2018',
      }],
    },
  },
};
