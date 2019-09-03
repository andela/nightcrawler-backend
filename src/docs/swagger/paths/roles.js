
export const rolesPath = {
  get: {
    tags: [
      'roles'
    ],
    security: [
      {
        BearerToken: []
      }
    ],
    summary: 'Get all roles',
    description: 'Allows administrator to get all roles',
    responses: {
      200: {
        description: 'Permissions successfully fetched',
        schema: {
          $ref: '#/definitions/rolesRes'
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
        description: 'No roles found',
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

export const rolePermissionsPath = {
  get: {
    tags: [
      'roles'
    ],
    security: [
      {
        BearerToken: []
      }
    ],
    summary: 'Get all role permissions',
    description: 'Allows administrator to get all permissions fo a specific role',
    parameters: [
      {
        name: 'roleId',
        in: 'path',
        description: 'path parameter takes the role id',
        required: true,
        type: 'integer',
        format: 'int32'
      },
    ],
    responses: {
      200: {
        description: 'Role permissions successfully fetched',
        schema: {
          $ref: '#/definitions/updateRolePermissionsRes'
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
        description: 'No permissions found for role',
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
      'roles'
    ],
    security: [
      {
        BearerToken: []
      }
    ],
    summary: 'Edit user role permissions',
    description: 'Allows site administrator to edit permissions of a specific role',
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
          $ref: '#/definitions/updateRolePermissionsReq'
        }
      },
    ],
    responses: {
      200: {
        description: 'Role permissions successfully updated',
        schema: {
          $ref: '#/definitions/updateRolePermissionsRes'
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
