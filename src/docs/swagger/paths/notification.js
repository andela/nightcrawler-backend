export const markAllNotficationPath = {
    patch: {
      tags: [
        'notifications'
      ],
      security: [
        {
          BearerToken: []
        }
      ],
      summary: 'User should be able to mark all his notification as read',
      description: 'User should be able to mark all his notification as read  ',
      parameters: [ ],
      responses: {
        200: {
          description: 'Notifications successfully marked as read',
          schema: {
            $ref: '#/definitions/success'
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
        404: {
          description: 'Trip not found',
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