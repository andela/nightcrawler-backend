export const createBookingReq = {
  type: 'object',
  properties: {
    accommodationId: {
      type: 'integer',
      format: 'int32',
      example: 1
    },
    tripId: {
      type: 'integer',
      format: 'int32',
      example: 1
    },
    adults: {
      type: 'integer',
      format: 'int32',
      example: 1
    },
    children: {
      type: 'integer',
      format: 'int32',
      example: 1
    },
    checkIn: {
      type: 'string',
      format: 'date-time'
    },
    checkOut: {
      type: 'string',
      format: 'date-time'
    },
  }
};

export const createBookingRes = {
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
        accommodationId: {
          type: 'integer',
          format: 'int32',
          example: 1
        },
        tripId: {
          type: 'integer',
          format: 'int32',
          example: 1
        },
        adults: {
          type: 'integer',
          format: 'int32',
          example: 1
        },
        children: {
          type: 'integer',
          format: 'int32',
          example: 1
        },
        checkIn: {
          type: 'string',
          format: 'date-time'
        },
        checkOut: {
          type: 'string',
          format: 'date-time'
        },
        userId: {
          type: 'string',
          example: 1
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

export const getBookingRes = {
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
        accommodationId: {
          type: 'integer',
          format: 'int32',
          example: 1
        },
        tripId: {
          type: 'integer',
          format: 'int32',
          example: 1
        },
        adults: {
          type: 'integer',
          format: 'int32',
          example: 1
        },
        children: {
          type: 'integer',
          format: 'int32',
          example: 1
        },
        checkIn: {
          type: 'string',
          format: 'date-time'
        },
        checkOut: {
          type: 'string',
          format: 'date-time'
        },
        userId: {
          type: 'string',
          example: 1
        },
        createdAt: {
          type: 'string',
          format: 'date-time'
        },
        updatedAt: {
          type: 'string',
          format: 'date-time'
        },
        accommodation: {
          type: 'object',
          properties: {
            name: {
              type: 'string',
              example: 'Travel Resort'
            },
            address: {
              type: 'string',
              example: '33 Isaac John Street'
            },
            city: {
              type: 'string',
              example: 'Ikeja'
            },
            country: {
              type: 'string',
              example: 'Nigeria'
            },
            type: {
              type: 'array',
              items: {
                type: 'string',
                example: 'Hotel'
              }
            },
            rooms: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  id: {
                    type: 'integer',
                    format: 'int32',
                    example: 1
                  },
                  name: {
                    type: 'string',
                    example: 'Master Bedrooom'
                  },
                  type: {
                    type: 'string',
                    example: 'Single'
                  },
                  isAvailable: {
                    type: 'boolean',
                    example: true
                  },
                }
              }
            }
          }
        }
      }
    }
  }
};


export const getAllBookingsRes = {
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
      type: 'array',
      items: {
        type: 'object',
        properties: {
          id: {
            type: 'integer',
            format: 'int32',
            example: 1
          },
          accommodationId: {
            type: 'integer',
            format: 'int32',
            example: 1
          },
          tripId: {
            type: 'integer',
            format: 'int32',
            example: 1
          },
          adults: {
            type: 'integer',
            format: 'int32',
            example: 1
          },
          children: {
            type: 'integer',
            format: 'int32',
            example: 1
          },
          checkIn: {
            type: 'string',
            format: 'date-time'
          },
          checkOut: {
            type: 'string',
            format: 'date-time'
          },
          userId: {
            type: 'string',
            example: 1
          },
          createdAt: {
            type: 'string',
            format: 'date-time'
          },
          updatedAt: {
            type: 'string',
            format: 'date-time'
          },
          accommodation: {
            type: 'object',
            properties: {
              name: {
                type: 'string',
                example: 'Travel Resort'
              },
              address: {
                type: 'string',
                example: '33 Isaac John Street'
              },
              city: {
                type: 'string',
                example: 'Ikeja'
              },
              country: {
                type: 'string',
                example: 'Nigeria'
              },
              type: {
                type: 'array',
                items: {
                  type: 'string',
                  example: 'Hotel'
                }
              },
              rooms: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    id: {
                      type: 'integer',
                      format: 'int32',
                      example: 1
                    },
                    name: {
                      type: 'string',
                      example: 'Master Bedrooom'
                    },
                    type: {
                      type: 'string',
                      example: 'Single'
                    },
                    isAvailable: {
                      type: 'boolean',
                      example: true
                    },
                  }
                }
              }
            }
          }
        }
      }
    }
  }
};
