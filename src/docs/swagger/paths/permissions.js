/* eslint-disable import/prefer-default-export */

export const permissionsPath = {
  get: {
    tags: [
      'permissions'
    ],
    security: [
      {
        BearerToken: []
      }
    ],
    summary: 'Get all permissions',
    description: 'Allows administrator to get all permisssions',
    responses: {
      200: {
        description: 'Permissions successfully fetched',
        schema: {
          $ref: '#/definitions/permissionsRes'
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
        description: 'No permissions found',
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
