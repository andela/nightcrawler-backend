export const updateRolePermissionsReq = {
  type: 'object',
  properties: {
    permissions: {
      type: 'array',
      items: {
        type: 'integer',
        format: 'int32'
      }
    }
  }
};

export const rolesRes = {
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
              example: 'Super Admin'
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
        },
        1: {
          type: 'object',
          properties: {
            id: {
              type: 'integer',
              format: 'int32',
              example: 2
            },
            role: {
              type: 'string',
              example: 'Travel Team Member'
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
    }
  }
};

export const updateRolePermissionsRes = {
  type: 'object',
  properties: {
    success: {
      type: 'boolean',
      example: true
    },
    message: {
      type: 'string',
      example: 'action successful'
    },
    payload: {
      type: 'object',
      properties: {
        id: {
          type: 'integer',
          format: 'int32',
          example: 1
        },
        role: {
          type: 'string',
          example: 'Travel Team Member'
        },
        permissions: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              id: {
                type: 'integer',
                format: 'int32',
                example: 1
              },
              actionName: {
                type: 'string',
                example: 'VIEW_SINGLE_TRIP_REQUEST'
              },
              RolePermissions: {
                type: 'object',
                properties: {
                  permissionId: {
                    type: 'integer',
                    format: 'int32',
                    example: 1
                  },
                  roleId: {
                    type: 'integer',
                    format: 'int32',
                    example: 15
                  },
                }
              },
            }
          }
        }
      }
    }
  }
};
