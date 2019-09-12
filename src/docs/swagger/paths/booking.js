
export const bookingPath = {
  post: {
    tags: [
      'bookings'
    ],
    security: [
      {
        BearerToken: []
      }
    ],
    summary: 'Create an booking',
    description: 'Allows travel admin and suppliers to create booking',
    responses: {
      201: {
        description: 'Bookings successfully created',
        schema: {
          $ref: '#/definitions/createBookingRes'
        }
      },
      400: {
        description: 'Bad input data',
        schema: {
          $ref: '#/definitions/badRequest'
        }
      },
      401: {
        description: 'Incorrect login details',
        schema: {
          $ref: '#/definitions/notAuthorized'
        }
      },
      403: {
        description: 'Forbidden access',
        schema: {
          $ref: '#/definitions/accessForbidden'
        }
      },
      404: {
        description: 'Resource not found',
        schema: {
          $ref: '#/definitions/notFound'
        }
      },
      409: {
        description: 'Conflict: trip has not been approved',
        schema: {
          $ref: '#/definitions/conflict'
        }
      },
      500: {
        description: 'Server error',
        schema: {
          $ref: '#/definitions/serverError'
        }
      }
    }
  },
  get: {
    tags: [
      'bookings'
    ],
    security: [
      {
        BearerToken: []
      }
    ],
    summary: 'Get all bookings for admin',
    description: 'Users can view all bookings',
    responses: {
      200: {
        description: 'Bookings successfully fetched',
        schema: {
          $ref: '#/definitions/getAllBookingsRes'
        }
      },
      401: {
        description: 'Incorrect login details',
        schema: {
          $ref: '#/definitions/notAuthorized'
        }
      },
      403: {
        description: 'Forbidden access',
        schema: {
          $ref: '#/definitions/accessForbidden'
        }
      },
      500: {
        description: 'Server error',
        schema: {
          $ref: '#/definitions/serverError'
        }
      }
    }
  }
};

export const getSingleBookingPath = {
  get: {
    tags: [
      'bookings'
    ],
    security: [
      {
        BearerToken: []
      }
    ],
    summary: 'Get an booking',
    description: 'Users can view booking',
    parameters: [
      {
        name: 'bookingId',
        in: 'path',
        description: 'path parameter takes the booking id',
        required: true,
        type: 'integer',
        format: 'int32'
      },
    ],
    responses: {
      200: {
        description: 'Booking successfully fetched',
        schema: {
          $ref: '#/definitions/getBookingRes'
        }
      },
      401: {
        description: 'Incorrect login details',
        schema: {
          $ref: '#/definitions/notAuthorized'
        }
      },
      403: {
        description: 'Forbidden access',
        schema: {
          $ref: '#/definitions/accessForbidden'
        }
      },
      404: {
        description: 'Booking not found',
        schema: {
          $ref: '#/definitions/notFound'
        }
      },
      500: {
        description: 'Server error',
        schema: {
          $ref: '#/definitions/serverError'
        }
      }
    }
  }
};
