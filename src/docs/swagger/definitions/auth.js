const SigninCreate = {
  type: 'object',
  properties: {
    email: {
      type: 'string',
      format: 'email'
    },
    password: {
      type: 'string',
      format: 'password',
      minLength: 8
    }
  }
};

const Signin = {
  type: 'object',
  properties: {
    status: {
      type: 'string'
    },
    data: {
      type: 'object',
      properties: {
        userId: {
          type: 'integer',
          format: 'int64'
        },
        firstName: {
          type: 'string',
          example: 'Korede'
        },
        lastName: {
          type: 'string',
          example: 'Shonubi'
        },
        email: {
          type: 'string',
          format: 'email'
        },
        password: {
          type: 'string',
          format: 'password'
        },
        isAdmin: {
          type: 'boolean'
        },
        token: {
          type: 'string'
        },
        registeredOn: {
          type: 'string',
          format: 'date-time'
        }
      }
    }
  }
};

export { SigninCreate, Signin };
