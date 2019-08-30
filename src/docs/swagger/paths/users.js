export const userRolePath = {
  patch: {
    tags: [
      'users'
    ],
    security: [
      {
        BearerToken: []
      }
    ],
    summary: 'Edit user role',
    description: 'Allows site administrator to assign a role to a specific user',
    parameters: [
      {
        name: 'roleId',
        in: 'path',
        description: 'path parameter takes the role id',
        required: true,
        type: 'integer',
        format: 'int32'
      },
      {
        name: 'body',
        in: 'body',
        description: 'Role edit request body',
        required: true,
        schema: {
          $ref: '#/definitions/updateRoleReq'
        }
      },
    ],
    responses: {
      200: {
        description: 'User role successfully updated',
        schema: {
          $ref: '#/definitions/updateRoleRes'
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
      409: {
        description: 'Role already assigned',
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
  }
};

export const createUser = {
  post: {
    tags: [
      'user'
    ],
    summary: 'Create a new user(s) record',
    description: 'Allows admin to create new user(s) record',
    parameters: [
      {
        name: 'body',
        in: 'body',
        description: 'User request object',
        required: true,
        schema: {
          $ref: '#/definitions/userCreate'
        }
      }
    ],
    responses: {
      201: {
        description: 'User created successfully',
        schema: {
          $ref: '#/definitions/createSuccess'
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
        description: 'Access forbiden',
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
