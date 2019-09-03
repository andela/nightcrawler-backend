export const userCreate = {
  type: 'object',
  properties: {
    username: {
      type: 'string',
    },
    email: {
      type: 'string',
      format: 'email'
    },
    firstName: {
      type: 'string',
    },
    lastName: {
      type: 'string',
    },
    roleId: {
      type: 'number',
    }
  }
};

export const updateRoleReq = {
  type: 'object',
  properties: {
    email: {
      type: 'string',
      format: 'email',
      example: 'johndoe@nomad.com'
    },
  }
};

export const updateRoleRes = {
  type: 'object',
  properties: {
    success: {
      type: 'boolean',
      example: true
    },
    message: {
      type: 'string',
      example: 'resource successfully updated'
    },
    payload: {
      type: 'object',
      properties: {
        id: {
          type: 'integer',
          format: 'int32',
          example: 1
        },
        username: {
          type: 'string',
          example: 'johndoe'
        },
        firstName: {
          type: 'string',
          example: 'John'
        },
        lastName: {
          type: 'string',
          example: 'Doe'
        },
        email: {
          type: 'string',
          format: 'email',
          example: 'johndoe@mail.com'
        },
        isVerified: {
          type: 'boolean',
          example: false
        },
        profileImage: {
          type: 'string'
        },
        roleId: {
          type: 'integer',
          format: 'int32',
          example: 2
        },
        createdAt: {
          type: 'string',
          format: 'date-time'
        },
        updatedAt: {
          type: 'string',
          format: 'date-time'
        }
      }
    }
  }
};
