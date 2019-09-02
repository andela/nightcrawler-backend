export default {
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
