const badRequest = {
  type: 'object',
  required: ['status', 'message'],
  properties: {
    status: {
      type: 'string',
      example: 'error'
    },
    message: {
      type: 'array',
      items: {
        type: 'string',
        example: 'Bad Bequest'
      }
    }
  }
};
const notAuthorized = {
  type: 'object',
  required: ['status', 'message'],
  properties: {
    status: {
      type: 'string',
      example: 'error'
    },
    message: {
      type: 'string',
      example: 'Not Authorized'
    }
  }
};
const accessForbidden = {
  type: 'object',
  required: ['status', 'message'],
  properties: {
    status: {
      type: 'string',
      example: 'error'
    },
    message: {
      type: 'string',
      example: 'Access Forbidden'
    },
  }
};
const conflict = {
  type: 'object',
  required: ['status', 'message'],
  properties: {
    status: {
      type: 'string',
      example: 'error'
    },
    message: {
      type: 'string',
      example: 'Conflict'
    },
  }
};
const serverError = {
  type: 'object',
  required: ['status', 'message'],
  properties: {
    status: {
      type: 'string',
      example: 'error'
    },
    message: {
      type: 'string',
      example: 'Server Error'
    }
  }
};

export {
  badRequest,
  notAuthorized,
  accessForbidden,
  conflict,
  serverError
};
