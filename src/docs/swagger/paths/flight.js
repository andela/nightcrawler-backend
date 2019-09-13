export const flightPath = {
  post: {
    tags: [
      'flights'
    ],
    security: [
      {
        BearerToken: []
      }
    ],
    summary: 'User can enter flight details',
    description: 'user can enter flight details after trip request has been approved ',
    parameters: [
      {
        name: 'tripId',
        in: 'path',
        description: 'tripId',
        required: true,
      },
      {
        name: 'body',
        in: 'body',
        description: 'Flight details object',
        required: true,
        schema: {
          $ref: '#/definitions/FlightCreate'
        }
      }
    ],
    responses: {
      201: {
        description: 'request successfully sent',
        schema: {
          $ref: '#/definitions/created'
        }
      },
      400: {
        description: 'Invalid request details',
        schema: {
          $ref: '#/definitions/badRequest'
        }
      },
      401: {
        description: 'Unauthorized',
        schema: {
          $ref: '#/definitions/notAuthorized'
        }
      },
      422: {
        description: 'Unprocessable entity',
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
