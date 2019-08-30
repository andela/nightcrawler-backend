const badRequest = {
  type: 'object',
  required: ['status', 'message'],
  properties: {
    success: {
      type: 'boolean',
      example: false
    },
    message: {
      type: 'string',
      example: 'Bad request'
    },
    payload: {
      type: 'object',
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
    success: {
      type: 'boolean',
      example: false
    },
    message: {
      type: 'string',
      example: 'Not Authorized'
    },
    payload: {
      type: 'object',
    }
  }
};
const accessForbidden = {
  type: 'object',
  required: ['status', 'message'],
  properties: {
    success: {
      type: 'boolean',
      example: false
    },
    message: {
      type: 'string',
      example: 'Access Forbidden'
    },
    payload: {
      type: 'object',
    }
  }
};
const notFound = {
  type: 'object',
  required: ['status', 'message'],
  properties: {
    success: {
      type: 'boolean',
      example: false
    },
    message: {
      type: 'string',
      example: 'resource not found'
    },
    payload: {
      type: 'object',
    }
  }
};
const conflict = {
  type: 'object',
  required: ['status', 'message'],
  properties: {
    success: {
      type: 'boolean',
      example: false
    },
    message: {
      type: 'string',
      example: 'Conflict'
    },
    payload: {
      type: 'object',
    }
  }
};
const serverError = {
  type: 'object',
  required: ['status', 'message'],
  properties: {
    success: {
      type: 'boolean',
      example: false
    },
    message: {
      type: 'string',
      example: 'Server Error'
    },
    payload: {
      type: 'object',
    }
  }
};

export {
  badRequest,
  notAuthorized,
  accessForbidden,
  notFound,
  conflict,
  serverError
};
