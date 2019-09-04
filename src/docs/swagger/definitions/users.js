export const createUser = {
  type: 'object',
  properties: {
    username: {
      type: 'string',
      example: 'jeff'
    },
    email: {
      type: 'string',
      format: 'email',
      example: 'johndoe@nomad.com'
    },
    firstName: {
      type: 'string',
      example: 'Jeffery'
    },
    lastName: {
      type: 'string',
      example: 'Way'
    },
    roleId: {
      type: 'number',
      example: 2
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


export const resetPassword = {
  type: 'object',
  properties: {
    password: {
      type: 'string',
      format: 'password',
      minLength: 8
    },
    confirmPassword: {
      type: 'string',
      format: 'password',
      minLength: 8
    }
  }
};

export const forgotPassword = {
  type: 'object',
  properties: {
    email: {
      type: 'string',
      required: true,
      format: 'email',
      example: 'user@example.com'
    }
  }
};

export const resetUserPassword = {
  type: 'object',
  properties: {
    oldPassword: {
      type: 'string',
      format: 'password',
      minLength: 8
    },
    newPassword: {
      type: 'string',
      format: 'password',
      minLength: 8
    }
  }
};

export const resetPasswordResponse = {
  type: 'object',
  properties: {
    status: {
      type: 'string'
    },
    payload: {
      type: 'string',
    }
  }
};

export const verifyUser = {
  type: 'object',
  properties: {
    token: {
      type: 'string',
    },
  }
};
