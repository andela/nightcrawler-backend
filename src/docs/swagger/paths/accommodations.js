export const createAccommodationPath = {
  post: {
    tags: [
      'accommodations'
    ],
    security: [
      {
        BearerToken: []
      }
    ],
    consumes: [
      'multipart/form-data'
    ],
    summary: 'Create an accommodation',
    description: 'Allows travel admin and suppliers to create accommodation',
    parameters: [
      {
        name: 'name',
        in: 'formData',
        required: false,
        type: 'string'
      },
      {
        name: 'description',
        in: 'formData',
        required: false,
        type: 'string'
      },
      {
        name: 'address',
        in: 'formData',
        required: false,
        type: 'string'
      },
      {
        name: 'city',
        in: 'formData',
        required: false,
        type: 'string'
      },
      {
        name: 'country',
        in: 'formData',
        required: false,
        type: 'string'
      },
      {
        name: 'type[]',
        in: 'formData',
        required: false,
        type: 'array',
        items: {
          type: 'string'
        }
      },
      {
        name: 'facilities[]',
        in: 'formData',
        required: false,
        type: 'array',
        items: {
          type: 'string'
        }
      },
      {
        name: 'images',
        in: 'formData',
        description: 'file to upload',
        required: false,
        type: 'file',
      }
    ],
    responses: {
      201: {
        description: 'Accommodations successfully created',
        schema: {
          $ref: '#/definitions/createAccommodationRes'
        }
      },
      400: {
        description: 'Bad input data',
        schema: {
          $ref: '#/definitions/badRequest'
        }
      },
      401: {
        description: 'Incorrect login details',
        schema: {
          $ref: '#/definitions/notAuthorized'
        }
      },
      403: {
        description: 'Forbidden access',
        schema: {
          $ref: '#/definitions/accessForbidden'
        }
      },
      500: {
        description: 'Server error',
        schema: {
          $ref: '#/definitions/serverError'
        }
      }
    }
  },
  get: {
    tags: [
      'accommodations'
    ],
    security: [
      {
        BearerToken: []
      }
    ],
    summary: 'Get all accommodation',
    description: 'Users can view all accommodations',
    parameters: [
      {
        name: 'city',
        description: 'optional location to get accommodations by country/city',
        in: 'query',
        required: false,
        type: 'string'
      },
      {
        name: 'offset',
        description: 'optional offset',
        in: 'query',
        required: false,
        type: 'string'
      },
      {
        name: 'limit',
        description: 'optional limit',
        in: 'query',
        required: false,
        type: 'string'
      }
    ],
    responses: {
      200: {
        description: 'Accommodations successfully fetched',
        schema: {
          $ref: '#/definitions/getAllAccommodationsRes'
        }
      },
      401: {
        description: 'Incorrect login details',
        schema: {
          $ref: '#/definitions/notAuthorized'
        }
      },
      403: {
        description: 'Forbidden access',
        schema: {
          $ref: '#/definitions/accessForbidden'
        }
      },
      500: {
        description: 'Server error',
        schema: {
          $ref: '#/definitions/serverError'
        }
      }
    }
  }
};

export const createRoomPath = {
  post: {
    tags: [
      'accommodations'
    ],
    security: [
      {
        BearerToken: []
      }
    ],
    summary: 'Crete rooms for specific accommodation',
    description: 'Allows travel admin and suppliers to create room for an accommodation',
    parameters: [
      {
        name: 'accommodationId',
        in: 'path',
        description: 'path parameter takes the accommodation id',
        required: true,
        type: 'integer',
        format: 'int32'
      },
      {
        name: 'body',
        in: 'body',
        required: false,
        schema: {
          $ref: '#definitions/createRoomReq'
        }
      }
    ],
    responses: {
      201: {
        description: 'Room successfully created',
        schema: {
          $ref: '#/definitions/createRoomRes'
        }
      },
      400: {
        description: 'Bad input data',
        schema: {
          $ref: '#/definitions/badRequest'
        }
      },
      401: {
        description: 'Incorrect login details',
        schema: {
          $ref: '#/definitions/notAuthorized'
        }
      },
      403: {
        description: 'Forbidden access',
        schema: {
          $ref: '#/definitions/accessForbidden'
        }
      },
      500: {
        description: 'Server error',
        schema: {
          $ref: '#/definitions/serverError'
        }
      }
    }
  }
};


export const getAccommodationPath = {
  get: {
    tags: [
      'accommodations'
    ],
    security: [
      {
        BearerToken: []
      }
    ],
    summary: 'Get an accommodation',
    description: 'Users can view accommodation',
    parameters: [
      {
        name: 'accommodationId',
        in: 'path',
        description: 'path parameter takes the accommodation id',
        required: true,
        type: 'integer',
        format: 'int32'
      },
    ],
    responses: {
      200: {
        description: 'Accommodations successfully fetched',
        schema: {
          $ref: '#/definitions/getAccommodationRes'
        }
      },
      401: {
        description: 'Incorrect login details',
        schema: {
          $ref: '#/definitions/notAuthorized'
        }
      },
      403: {
        description: 'Forbidden access',
        schema: {
          $ref: '#/definitions/accessForbidden'
        }
      },
      500: {
        description: 'Server error',
        schema: {
          $ref: '#/definitions/serverError'
        }
      }
    }
  }
};


export const getTripAccommodationsPath = {
  get: {
    tags: [
      'accommodations'
    ],
    security: [
      {
        BearerToken: []
      }
    ],
    summary: 'Get all accommodation',
    description: 'Users can view all accommodations based on trip destination',
    parameters: [
      {
        name: 'tripId',
        description: 'tripId to get locations for',
        in: 'path',
        required: true,
        type: 'string'
      },
      {
        name: 'offset',
        description: 'optional offset',
        in: 'query',
        required: false,
        type: 'string'
      },
      {
        name: 'limit',
        description: 'optional limit',
        in: 'query',
        required: false,
        type: 'string'
      }
    ],
    responses: {
      200: {
        description: 'Accommodations successfully fetched',
        schema: {
          $ref: '#/definitions/getAllAccommodationsRes'
        }
      },
      401: {
        description: 'Incorrect login details',
        schema: {
          $ref: '#/definitions/notAuthorized'
        }
      },
      403: {
        description: 'Forbidden access',
        schema: {
          $ref: '#/definitions/accessForbidden'
        }
      },
      500: {
        description: 'Server error',
        schema: {
          $ref: '#/definitions/serverError'
        }
      }
    }
  }
};

export const accommodationLike = {
  patch: {
    tags: [
      'accommodations'
    ],
    security: [
      {
        BearerToken: []
      }
    ],
    summary: 'Like/Unlike an accommodation',
    description: 'Users can like or unlike an accommodation through this endpoint',
    parameters: [
      {
        name: 'accommodationId',
        in: 'path',
        description: 'path parameter takes the accommodation id',
        required: true,
        type: 'integer',
        format: 'int32'
      },
    ],
    responses: {
      200: {
        description: 'request successful',
        schema: {
          $ref: '#/definitions/likeUnlikeAccommodationRes'
        }
      },
      401: {
        description: 'Incorrect login details',
        schema: {
          $ref: '#/definitions/notAuthorized'
        }
      },
      403: {
        description: 'Forbidden access',
        schema: {
          $ref: '#/definitions/accessForbidden'
        }
      },
      404: {
        description: 'Accommodation not found',
        schema: {
          $ref: '#/definitions/notFound'
        }
      },
      500: {
        description: 'Server error',
        schema: {
          $ref: '#/definitions/serverError'
        }
      }
    }
  },
  get: {
    tags: [
      'accommodations'
    ],
    security: [
      {
        BearerToken: []
      }
    ],
    summary: 'Check accommodation like/unlike status',
    description: 'Users can check if they already liked an accommodation through this endpoint',
    parameters: [
      {
        name: 'accommodationId',
        in: 'path',
        description: 'path parameter takes the accommodation id',
        required: true,
        type: 'integer',
        format: 'int32'
      },
    ],
    responses: {
      200: {
        description: 'fetch successful',
        schema: {
          $ref: '#/definitions/checkAccommodationLikeRes'
        }
      },
      401: {
        description: 'Incorrect login details',
        schema: {
          $ref: '#/definitions/notAuthorized'
        }
      },
      403: {
        description: 'Forbidden access',
        schema: {
          $ref: '#/definitions/accessForbidden'
        }
      },
      404: {
        description: 'Accommodation not found',
        schema: {
          $ref: '#/definitions/notFound'
        }
      },
      500: {
        description: 'Server error',
        schema: {
          $ref: '#/definitions/serverError'
        }
      }
    }
  }
};
