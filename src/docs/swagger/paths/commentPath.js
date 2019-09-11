export const createCommentPath = {
  post: {
    tags: [
      'trips'
    ],
    security: [
      {
        BearerToken: []
      }
    ],
    summary: 'Create trip comment',
    description: 'Allows requester or admin to create comments on a particular trip request',
    parameters: [
      {
        in: 'path',
        name: 'tripId',
        required: true,
        type: 'integer',
        format: 'int32',
        description: 'path parameter takes the trip id',
      },
      {
        in: 'body',
        name: 'comment',
        required: true,
        type: 'string',
        description: 'The comment message',
        schema: {
          $ref: '#/definitions/createComment'
        }
      }
    ],
    responses: {
      201: {
        description: 'Comment created successfully',
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

export const deleteCommentPath = {
  delete: {
    tags: [
      'trips'
    ],
    security: [
      {
        BearerToken: []
      }
    ],
    summary: 'Create trip comment',
    description: 'Allows requester or admin to create comments on a particular trip request',
    parameters: [
      {
        in: 'path',
        name: 'tripId',
        required: true,
        type: 'integer',
        format: 'int32',
        description: 'path parameter takes the trip id',
      },
      {
        in: 'path',
        name: 'commentId',
        required: true,
        type: 'integer',
        format: 'int32',
        description: 'path parameter takes the comment id',
      }
    ],
    responses: {
      200: {
        description: 'Comment has been deleted successfully',
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

export const getTripCommentsPath = {
  get: {
    tags: [
      'trips'
    ],
    security: [
      {
        BearerToken: []
      }
    ],
    summary: 'Get trip comments',
    description: 'Displays all the comments for a particular trip',
    parameters: [
      {
        in: 'path',
        name: 'tripId',
        required: true,
        type: 'integer',
        format: 'int32',
        description: 'path parameter takes the trip id',
      }
    ],
    responses: {
      200: {
        description: 'Operation successful',
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
