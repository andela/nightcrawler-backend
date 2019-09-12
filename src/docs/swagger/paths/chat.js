export const postChatPath = {
  post: {
    tags: [
      'chats'
    ],
    security: [
      {
        BearerToken: []
      }
    ],
    summary: 'Manager, Requester or anyone with the permission should be able to chat on the platform',
    description: 'A manager, requester or any other person with the permission should be able to chat on the platform',
    parameters: [
      {
        name: 'body',
        in: 'body',
        description: 'Chat request object',
        required: true,
        schema: {
          $ref: '#/definitions/createChat'
        }
      }
    ],
    responses: {
      201: {
        description: 'Chat has been created successfully',
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

export const getChatsPath = {
  get: {
    tags: [
      'chats'
    ],
    security: [
      {
        BearerToken: []
      }
    ],
    summary: 'Manager, Requester or anyone with the permission should be able to get private chats on the platform',
    description: 'Manager, Requester or anyone with the permission should be able to get private chats on the platform',
    parameters: [
      {
        in: 'query',
        name: 'sender',
        description: 'Chat sender query string',
        required: true,
        type: 'string',
        example: 'jammjones@nomad.com'
      },
      {
        in: 'query',
        name: 'recipient',
        description: 'Chat recipient query string',
        required: true,
        type: 'string',
        example: 'alexiwobi@nomad.com'
      }
    ],
    responses: {
      200: {
        description: 'Chat was retrieved successfully',
        schema: {
          $ref: '#/definitions/successful'
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
        description: 'Chats not found',
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
