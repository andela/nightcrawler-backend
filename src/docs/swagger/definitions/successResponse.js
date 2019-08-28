const createSuccess = {
  type: 'object',
  required: ['status', 'message'],
  properties: {
    status: {
      type: 'string',
      example: 'success'
    },
    message: {
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
  required: ['status', 'message'],
  properties: {
    status: {
      type: 'string',
      example: 'success'
    }
  }
};

export {
  createSuccess,
  noContent,
};
