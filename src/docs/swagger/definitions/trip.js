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

export const updateTrip = {
  type: 'object',
  properties: {
    status: {
      type: 'string',
      example: 'rejected',
     
    },
  }
};
export const viewAllTripRequestRes = {
  type: 'object',
  properties: {
    success: {
      type: 'boolean',
      example: true
    },
    message: {
      type: 'string',
      example: 'fetch was successful'
    },
    payload: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          id: {
            type: 'integer',
            format: 'int32',
            example: 1
          },
          origin: {
            type: 'string',
            example: 'Lagos'
          },
          destination: {
            type: 'string',
            example: 'Abuja'
          },
          type: {
            type: 'string',
            example: 'one-way'
          },
         
          status: {
            type: 'string',
            example: 'pending'
          },
          userId: {
            type: 'string',
            example: 1
          },
          reason: {
            type: 'string',
            example: 'I want to take a leave',
           },
           departureDate: {
            type: 'string',
            example: '12-12-2018',
           },
           returnDate: {
            type: 'string',
            example: '12-12-2018',
           },
           createdAt: {
            type: 'string',
            example: '2019-09-08T11:05:21.747Z',
           },
        }
      }
    }
  }
};
