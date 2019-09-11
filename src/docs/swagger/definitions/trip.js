export const createTrip = {
  type: 'object',
  properties: {
    origin: {
      type: 'string',
    },
    destinationId: {
      type: 'intger',
      example: 1
    },
    reason: {
      type: 'string',
    },
    departureDate: {
      type: 'string',
      example: '10-10-2019',
    },
    accomodationId: {
      type: 'integer',
    },
  }
};

export const returnTripSchema = {
  type: 'object',
  properties: {
    origin: {
      type: 'string',
    },
    destinationId: {
      type: 'integer',
      example: 1
    },
    reason: {
      type: 'string',
    },
    departureDate: {
      type: 'string',
      example: '10-10-2019'
    },
    returnDate: {
      type: 'string',
      example: '10-11-2019'
    },
  }
};
