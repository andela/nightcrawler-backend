const success = {
  type: 'object',
  required: ['success', 'message'],
  properties: {
    status: {
      type: 'boolean',
      example: true
    },
    message: {
      type: 'string',
      example: 'Operation successful'
    },
    payload: {
      type: 'object',
      items: {
        type: 'string',
        example: 'data'
      }
    }
  }
};

const created = {
  type: 'object',
  required: ['success', 'message'],
  properties: {
    status: {
      type: 'boolean',
      example: true
    },
    message: {
      type: 'string',
      example: 'Resource created'
    },
    payload: {
      type: 'object',
      items: {
        type: 'string',
        example: 'data'
      }
    }
  }
};

const noContent = {
  type: 'object',
  required: ['success', 'message'],
  properties: {
    status: {
      type: 'boolean',
      example: true
    }
  }
};

export {
  created,
  noContent,
  success
};
