export const createAccommodationRes = {
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
        name: {
          type: 'string',
          example: 'Travel Resort'
        },
        description: {
          type: 'string',
          example: 'Beautiful place to spend your vacation'
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
        userId: {
          type: 'string',
          example: 1
        },
        cost: {
          type: 'string',
          example: '500000',
          nullable: true
        },
        type: {
          type: 'array',
          items: {
            type: 'string',
            example: 'Hotel'
          }
        },
        facilities: {
          type: 'array',
          items: {
            type: 'string',
            example: 'WiFi, Pool'
          }
        },
        images: {
          type: 'array',
          items: {
            type: 'string',
            example: 'http://cloudinary/image/link.jpg'
          }
        }
      }
    }
  }
};


export const createRoomReq = {
  type: 'object',
  properties: {
    name: {
      type: 'string',
      example: 'Master Bedroom'
    },
    type: {
      type: 'string',
      example: 'Double'
    },
  }
};

export const createReview = {
  type: 'object',
  properties: {
    review: {
      type: 'string',
      example: 'Quiet environment'
    },
  }
};

export const createRoomRes = {
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
        accommodationId: {
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


export const getAccommodationRes = {
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
        name: {
          type: 'string',
          example: 'Travel Resort'
        },
        description: {
          type: 'string',
          example: 'Beautiful place to spend your vacation'
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
        userId: {
          type: 'string',
          example: 1
        },
        cost: {
          type: 'string',
          example: '500000',
          nullable: true
        },
        type: {
          type: 'array',
          items: {
            type: 'string',
            example: 'Hotel'
          }
        },
        facilities: {
          type: 'array',
          items: {
            type: 'string',
            example: 'WiFi, Pool'
          }
        },
        images: {
          type: 'array',
          items: {
            type: 'string',
            example: 'http://cloudinary/image/link.jpg'
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
};


export const getAllAccommodationsRes = {
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
          name: {
            type: 'string',
            example: 'Travel Resort'
          },
          description: {
            type: 'string',
            example: 'Beautiful place to spend your vacation'
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
          userId: {
            type: 'string',
            example: 1
          },
          cost: {
            type: 'string',
            example: '500000',
            nullable: true
          },
          type: {
            type: 'array',
            items: {
              type: 'string',
              example: 'Hotel'
            }
          },
          facilities: {
            type: 'array',
            items: {
              type: 'string',
              example: 'WiFi, Pool'
            }
          },
          images: {
            type: 'array',
            items: {
              type: 'string',
              example: 'http://cloudinary/image/link.jpg'
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
};

export const likeUnlikeAccommodationRes = {
  type: 'object',
  properties: {
    success: {
      type: 'boolean',
      example: true
    },
    message: {
      type: 'string',
      example: 'request successful'
    },
    payload: {
      type: 'object',
      properties: {
        likes: {
          type: 'integer',
          format: 'int32',
          example: 4
        },
      },
    },
  }
};

export const checkAccommodationLikeRes = {
  type: 'object',
  properties: {
    success: {
      type: 'boolean',
      example: true
    },
    message: {
      type: 'string',
      example: 'unlike request successful'
    },
    payload: {
      type: 'object',
      properties: {
        id: {
          type: 'integer',
          format: 'int32',
          example: 2
        },
        userId: {
          type: 'integer',
          format: 'int32',
          example: 1
        },
        accommodationId: {
          type: 'integer',
          format: 'int32',
          example: 3
        },
        createdAt: {
          type: 'string',
          format: 'date-time'
        },
        updatedAt: {
          type: 'string',
          format: 'date-time'
        },
        likeStatus: {
          type: 'boolean',
          example: true
        }
      },
    },
  }
};
