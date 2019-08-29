const socialMediaAuthetication = {
  type: 'object',
  properties: {
    email: {
      type: 'string',
    },
    firstName: {
      type: 'string'
    },
    lastName: {
      type: 'string'
    },
    email_verified: {
      type: 'boolean'
    }
  }
};

export default socialMediaAuthetication;
