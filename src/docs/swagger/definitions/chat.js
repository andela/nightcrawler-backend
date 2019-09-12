export const createChat = {
  type: 'object',
  properties: {
    sender: {
      type: 'string',
      format: 'email',
      example: 'jammjones@nomad.com',
    },
    recipient: {
      type: 'string',
      format: 'email',
      example: 'alexiwobi@nomad.com',
    },
    message: {
      type: 'string',
      example: 'Hello, i go your comment on my trip request'
    }
  }
};
