const ProfilePath = {
  post: {
    tags: [
      'profile'
    ],
    summary: 'Create profile of a user',
    description: 'Allows signed-in user to create profile',
    parameters: [
      {
        name: 'authorization',
        in: 'header',
        description: 'User authentication token',
        required: true,
        schema: {
          $ref: '#/definitions/ProfileHeaders'
        }
      },
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
        description: 'Server error',
        schema: {
          $ref: '#/definitions/notFound'
        }
      },
      409: {
        description: 'Server error',
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
      'profile'
    ],
    summary: 'Get profile of a user',
    description: 'Allows signed-in user to get their profile',
    parameters: [
      {
        name: 'authorization',
        in: 'header',
        description: 'User authentication token',
        required: true,
        schema: {
          $ref: '#/definitions/ProfileHeaders'
        }
      }
    ],
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
        description: 'Unauthorized user',
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
      'profile'
    ],
    summary: 'Update profile of a user',
    description: 'Allows signed-in user to update profile',
    parameters: [
      {
        name: 'authorization',
        in: 'header',
        description: 'User authentication token',
        required: true,
        schema: {
          $ref: '#/definitions/ProfileHeaders'
        }
      },
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
