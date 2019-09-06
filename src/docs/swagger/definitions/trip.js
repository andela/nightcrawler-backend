export const createTrip = {
  type: 'object',
  properties: {
    origin: {
      type: 'string',
    },
    destination: {
      type: 'string',
    },
    reason: {
      type: 'string',
    },
    departureDate: {
      type: 'string',
    },
    accomodationId: {
      type: 'string',
    },
    returnDate: {
      type: 'string',
    },
    type: {
      type: 'string',
    }
  }
};
