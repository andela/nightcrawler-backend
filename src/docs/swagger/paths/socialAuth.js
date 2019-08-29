const facebookPath = {
  get: {
    tags: ['auth'],
    summary: 'Facebook login',
    description: 'This endpoint can not be tested from swagger docs,  use the browser',
    parameters: [],
    produces: ['application/json'],
    responses: {
      200: {
        description: 'Login with a facebook account',
        schema: {
          $ref: '#/definitions/socialMedia'

        }
      }
    }
  }
};

const googlePath = {
  get: {
    tags: ['auth'],
    summary: 'Google login',
    description: 'This endpoint can not be tested from swagger docs,  use the browser',
    parameters: [],
    produces: ['application/json'],
    responses: {
      200: {
        description: 'Login with a google account',
        schema: {
          $ref: '#/definitions/socialMedia'

        }
      }
    }
  }
};

export { facebookPath, googlePath };
