const badRequest = {
  type: 'object',
  required: ['success', 'message', 'payload'],
  properties: {
    success: {
      type: 'boolean',
      example: false
    },
    message: {
      type: 'array',
      items: {
        type: 'string',
        example: 'Bad Bequest'
      }
    },
    payload: {
      type: 'array',
      example: {}
    }
  }
};
const notAuthorized = {
  type: 'object',
  required: ['success', 'message', 'payload'],
  properties: {
    success: {
      type: 'boolean',
      example: false
    },
    message: {
      type: 'array',
      items: {
        type: 'string',
        example: 'Not Authorized'
      }
    },
    payload: {
      type: 'object',
      example: {}
    }
  }
};
const accessForbidden = {
  type: 'object',
  required: ['success', 'message', 'payload'],
  properties: {
    success: {
      type: 'boolean',
      example: false
    },
    message: {
      type: 'array',
      items: {
        type: 'string',
        example: 'Forbidden'
      }
    },
    payload: {
      type: 'object',
      example: {}
    }
  }
};
const conflict = {
  type: 'object',
  required: ['success', 'message', 'payload'],
  properties: {
    success: {
      type: 'boolean',
      example: false
    },
    message: {
      type: 'array',
      items: {
        type: 'string',
        example: 'Resource conflict'
      }
    },
    payload: {
      type: 'object',
      example: {}
    }
  }
};
const serverError = {
  type: 'object',
  required: ['success', 'message', 'payload'],
  properties: {
    success: {
      type: 'boolean',
      example: false
    },
    message: {
      type: 'array',
      items: {
        type: 'string',
        example: 'Server Error'
      }
    },
    payload: {
      type: 'object',
      example: {}
    }
  }
};
const notFound = {
  type: 'object',
  required: ['success', 'message', 'payload'],
  properties: {
    success: {
      type: 'boolean',
      example: false
    },
    message: {
      type: 'array',
      items: {
        type: 'string',
        example: 'Not Found'
      }
    },
    payload: {
      type: 'object',
      example: {}
    }
  }
};

export {
  badRequest,
  notAuthorized,
  accessForbidden,
  conflict,
  serverError,
  notFound
};
