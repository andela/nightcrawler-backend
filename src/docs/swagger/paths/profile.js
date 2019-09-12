const ProfilePath = {
  post: {
    tags: [
      'users'
    ],
    security: [
      {
        BearerToken: []
      }
    ],
    summary: 'Create profile of a user',
    description: 'Allows signed-in user to create profile',
    parameters: [
      {
        name: 'body',
        in: 'body',
        description: 'User profile request object',
        required: true,
        schema: {
          $ref: '#/definitions/ProfileCreate'
        }
      }
    ],
    responses: {
      201: {
        description: 'User creates profile successfully',
        schema: {
          $ref: '#/definitions/ProfileResponds'
        }
      },
      400: {
        description: 'Invalid request details',
        schema: {
          $ref: '#/definitions/badRequest'
        }
      },
      401: {
        description: 'Unauthorized user',
        schema: {
          $ref: '#/definitions/notAuthorized'
        }
      },
      404: {
        description: 'Server error',
        schema: {
          $ref: '#/definitions/notFound'
        }
      },
      409: {
        description: 'Conflict',
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
      'users'
    ],
    security: [
      {
        BearerToken: []
      }
    ],
    summary: 'Get profile of a user',
    description: 'Allows signed-in user to get their profile',
    responses: {
      200: {
        description: 'User creates profile successfully',
        schema: {
          $ref: '#/definitions/ProfileResponds'
        }
      },
      400: {
        description: 'Invalid request details',
        schema: {
          $ref: '#/definitions/badRequest'
        }
      },
      401: {
        description: 'Unauthorized user',
        schema: {
          $ref: '#/definitions/notAuthorized'
        }
      },
      404: {
        description: 'User not found',
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
  },
  patch: {
    tags: [
      'users'
    ],
    security: [
      {
        BearerToken: []
      }
    ],
    summary: 'Update profile of a user',
    description: 'Allows signed-in user to update profile',
    parameters: [
      {
        name: 'body',
        in: 'body',
        description: 'User profile request object',
        required: true,
        schema: {
          $ref: '#/definitions/ProfileUpdate'
        }
      }
    ],
    responses: {
      200: {
        description: 'User creates profile successfully',
        schema: {
          $ref: '#/definitions/ProfileUpdateResponds'
        }
      },
      400: {
        description: 'Invalid request details',
        schema: {
          $ref: '#/definitions/badRequest'
        }
      },
      401: {
        description: 'Unauthorized user',
        schema: {
          $ref: '#/definitions/notAuthorized'
        }
      },
      404: {
        description: 'Server error',
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
  },
};

export default ProfilePath;
