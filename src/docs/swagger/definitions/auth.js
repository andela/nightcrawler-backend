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
    success: {
      type: 'boolean'
    },
    message: {
      type: 'string'
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
        companyId: {
          type: 'integer',
          format: 'int32',
          example: 4
        },
        email: {
          type: 'string',
          format: 'email',
          example: 'johndoe@mail.com'
        },
        emailVerifiedAt: {
          type: 'string',
          format: 'date-time'
        },
        profileImage: {
          type: 'string'
        },
        roleId: {
          type: 'integer',
          format: 'int32',
          example: 2
        },
        token: {
          type: 'string'
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

export { SigninCreate, Signin };
