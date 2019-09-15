export const accommodationRating = {
  post: {
    tags: [
      'accommodations'
    ],
    security: [
      {
        BearerToken: []
      }
    ],
    summary: 'Post ratings for a particular accommodation',
    description: 'Post ratings for a particular accommodation',
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
          $ref: '#definitions/accommodationRatingSchema'
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

export const getAccommodationRatings = {
  get: {
    tags: [
      'accommodations'
    ],
    security: [
      {
        BearerToken: []
      }
    ],
    summary: 'Post ratings for a particular accommodation',
    description: 'Post ratings for a particular accommodation',
    parameters: [
      {
        name: 'accommodationId',
        in: 'path',
        description: 'path parameter takes the accommodation id',
        required: true,
        type: 'integer',
        format: 'int32'
      }
    ],
    responses: {
      200: {
        description: 'Ratings have been retrieved successfully',
        schema: {
          $ref: '#/definitions/success'
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
