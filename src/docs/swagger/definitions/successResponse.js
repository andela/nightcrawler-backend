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

const NotificationResponds = {
  type: 'object',
  properties: {
    success: {
      type: 'boolean'
    },
    message: {
      type: 'string'
    },
    payload: {
      type: 'object',
      properties: {
        id: {
          type: 'integer',
          format: 'int32',
          example: 1
        },
        type: {
          type: 'string',
          example: 'Approved Trip'
        },
        title: {
          type: 'string',
          example: 'Trade Fair'
        },
        message: {
          type: 'string',
          example: 'Your Trip has been approved'
        },
        tripId: {
          type: 'integer',
          example: 1,
        },
        commentId: {
          type: 'integer',
          example: 2
        },
        userId: {
          type: 'integer',
          example: 4
        },
        createdAt: {
          type: 'string',
          format: 'date-time'
        },
        updatedAt: {
          type: 'string',
          format: 'date-time'
        }
      }
    }
  }
};
export {
  NotificationResponds,
  created,
  noContent,
  success
};
