const badRequest = {
  type: 'object',
  required: ['status', 'message'],
  properties: {
    status: {
      type: 'integer',
      format: 'int32',
      example: '400'
    },
    message: {
      type: 'string',
      example: 'Bad Bequest'
    },
    errors: {
      type: 'array',
      items: {
        type: 'object'
      }
    }
  }
};
const notAuthorized = {
  type: 'object',
  required: ['status', 'message'],
  properties: {
    status: {
      type: 'integer',
      format: 'int32',
      example: '401'
    },
    message: {
      type: 'string',
      example: 'Not Authorized'
    },
    errors: {
      type: 'array',
      items: {
        type: 'object'
      }
    }
  }
};
const accessForbidden = {
  type: 'object',
  required: ['status', 'message'],
  properties: {
    status: {
      type: 'integer',
      format: 'int32',
      example: '403'
    },
    message: {
      type: 'string',
      example: 'Access Forbidden'
    },
    errors: {
      type: 'array',
      items: {
        type: 'object'
      }
    }
  }
};
const conflict = {
  type: 'object',
  required: ['status', 'message'],
  properties: {
    status: {
      type: 'integer',
      format: 'int32',
      example: '409'
    },
    message: {
      type: 'string',
      example: 'Conflict'
    },
    errors: {
      type: 'array',
      items: {
        type: 'object'
      }
    }
  }
};
const serverError = {
  type: 'object',
  required: ['status', 'message'],
  properties: {
    status: {
      type: 'integer',
      format: 'int32',
      example: '500'
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
