export const requestTrip = {
  post: {
    tags: [
      'trip'
    ],
    security: [
      {
        BearerToken: []
      }
    ],
    summary: 'User can make trip request',
    description: 'user can make one-way trip request if return date is not determined',
    parameters: [
      {
        name: 'body',
        in: 'body',
        description: 'User request object',
        required: true,
        schema: {
          $ref: '#/definitions/createTrip'
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
      403: {
        description: 'Access forbidden',
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
