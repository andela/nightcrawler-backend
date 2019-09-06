const SigninCreate = {
  type: 'object',
  properties: {
    email: {
      type: 'string',
      format: 'email',
      example: 'admin@nomad.com'
    },
    password: {
      type: 'string',
      format: 'password',
      minLength: 8,
      example: '123456'
    }
  }
};

const Signin = {
  type: 'object',
  properties: {
    success: {
      type: 'boolean',
      example: true
    },
    message: {
      type: 'string',
      example: 'login successful'
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
        },
        token: {
          type: 'string',
          example: 'very_long_encoded_string'
        }
      }
    }
  }
};

const Logout = {
  type: 'object',
  properties: {
    success: {
      type: 'boolean',
      example: true
    },
    message: {
      type: 'string',
      example: 'logout successful'
    }
  }
};

export { SigninCreate, Signin, Logout };
