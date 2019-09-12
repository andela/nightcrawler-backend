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

export const createMultiCityTrip = {
  type: 'object',
  properties: {
    type: {
      type: 'string',
      example: 'multi-city'
    },
    origin: {
      type: 'string',
      example: 'Nairobi'
    },
    destinationId: {
      type: 'integer',
      example: 2
    },
    reason: {
      type: 'string',
      example: 'Meet with clients'
    },
    departureDate: {
      type: 'string',
      format: 'date-time'
    },
    returnDate: {
      type: 'string',
      format: 'date-time',
    },
    subRequest: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          subOrigin: {
            type: 'string',
            example: 'Johanesburg'
          },
          subDestinationId: {
            type: 'integer',
            example: 5
          },
          subDepartureDate: {
            type: 'string',
            format: 'date-time'
          },
          subReason: {
            type: 'string',
            example: 'Vacation'
          },
        }
      }
    }
  }
};

export const multiCityTripRes = {
  type: 'object',
  properties: {
    id: {
      type: 'integer',
      example: 3
    },
    userId: {
      type: 'integer',
      example: 2
    },
    type: {
      type: 'string',
      example: 'multi-city'
    },
    origin: {
      type: 'string',
      example: 'Nairobi'
    },
    destinationId: {
      type: 'integer',
      example: 2
    },
    reason: {
      type: 'string',
      example: 'Meet with clients'
    },
    status: {
      type: 'string',
      example: 'pending'
    },
    departureDate: {
      type: 'string',
      format: 'date-time'
    },
    returnDate: {
      type: 'string',
      example: null,
    },
    destination: {
      type: 'string',
      example: 'Kampala',
    },
    createdAt: {
      type: 'string',
      format: 'date-time'
    },
    updatedAt: {
      type: 'string',
      format: 'date-time'
    },
    subRequestedTrips: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          id: {
            type: 'integer',
            example: 6
          },
          subOrigin: {
            type: 'string',
            example: 'Johanesburg'
          },
          subDestinationId: {
            type: 'integer',
            example: 4
          },
          subDepartureDate: {
            type: 'string',
            format: 'date-time'
          },
          subReason: {
            type: 'string',
            example: 'Vacation'
          },
          createdAt: {
            type: 'string',
            format: 'date-time'
          },
          updatedAt: {
            type: 'string',
            format: 'date-time'
          },
        }
      }
    }
  }
};
