export const signInPath = {
  post: {
    tags: ['auth'],
    summary: 'Sign a user in',
    description: 'Allows registered user to signin',
    parameters: [
      {
        name: 'body',
        in: 'body',
        description: 'User request object',
        required: true,
        schema: {
          $ref: '#/definitions/SigninCreate'
        }
      }
    ],
    responses: {
      200: {
        description: 'User login successfully',
        schema: {
          $ref: '#/definitions/Signin'
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
      500: {
        description: 'Server error',
        schema: {
          $ref: '#/definitions/serverError'
        }
      }
    }
  }
};
export const logoutPath = {
  post: {
    tags: ['auth'],
    summary: 'Logout a user',
    description: 'Allows logged in user to logout',
    responses: {
      200: {
        description: 'User logout successfully',
        schema: {
          $ref: '#/definitions/Logout'
        }
      }
    }
  }
};
