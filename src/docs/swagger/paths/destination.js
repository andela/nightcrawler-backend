export const getFrequentDestinationPath = {
  get: {
    tags: ['destination'],
    security: [
      {
        BearerToken: []
      }
    ],
    summary: 'Get most traveled destination',
    description: 'Users can get the most frequent destination',
    responses: {
      200: {
        description: 'Most traveled destination successfully fetched',
        schema: {
          $ref: '#/definitions/getFrequentDestination'
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
