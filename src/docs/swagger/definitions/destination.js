export const getFrequentDestination = {
  type: 'object',
  properties: {
    success: {
      type: 'boolean',
      example: true
    },
    message: {
      type: 'string',
      example: 'resource successfully created'
    },
    payload: {
      type: 'object',
      properties: {
        maxDestination: {
          type: 'string',
          example: 'Singapore'
        }
      }
    }
  }
};
