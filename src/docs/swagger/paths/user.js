
const createUser = {
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

export default createUser;
