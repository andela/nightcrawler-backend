/* eslint-disable import/prefer-default-export */
export const permissionsRes = {
  type: 'object',
  properties: {
    success: {
      type: 'boolean',
      example: true
    },
    message: {
      type: 'string',
      example: 'resource successfully fetched'
    },
    payload: {
      type: 'object',
      properties: {
        0: {
          type: 'object',
          properties: {
            id: {
              type: 'integer',
              format: 'int32',
              example: 1
            },
            role: {
              type: 'string',
              example: 'REGISTER_USERS'
            }
          }
        },
        1: {
          type: 'object',
          properties: {
            id: {
              type: 'integer',
              format: 'int32',
              example: 2
            },
            actionName: {
              type: 'string',
              example: 'CREATE_TRIP_REQUEST'
            }
          }
        }
      }
    }
  }
};
