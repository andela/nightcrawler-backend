export const requestTrip = {
  post: {
    tags: [
      'trips'
    ],
    security: [
      {
        BearerToken: []
      }
    ],
    summary: 'User can make trip request',
    description: 'user can make one-way trip request if return date is not determined',
    parameters: [
      {
        name: 'body',
        in: 'body',
        description: 'User request object',
        required: true,
        schema: {
          $ref: '#/definitions/createTrip'
        }
      }
    ],
    responses: {
      201: {
        description: 'request successfully sent',
        schema: {
          $ref: '#/definitions/created'
        }
      },
      400: {
        description: 'Invalid request details',
        schema: {
          $ref: '#/definitions/badRequest'
        }
      },
      401: {
        description: 'Unauthorized',
        schema: {
          $ref: '#/definitions/notAuthorized'
        }
      },
      403: {
        description: 'Access forbidden',
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

export const approvedTripPath = {
  patch: {
    tags: [
      'trips'
    ],
    security: [
      {
        BearerToken: []
      }
    ],
    summary: 'Manager should be able to approve trip request',
    description: 'A manager can approve a trip request as long as the status is open',
    parameters: [
      {
        name: 'tripId',
        in: 'path',
        description: 'Path parameter takes in trip id',
        required: true,
        type: 'integer',
        format: 'int32'
      }
    ],
    responses: {
      200: {
        description: 'Trip resquest has been approved',
        schema: {
          $ref: '#/definitions/success'
        }
      },
      400: {
        description: 'Invalid request details',
        schema: {
          $ref: '#/definitions/badRequest'
        }
      },
      401: {
        description: 'Unauthorized',
        schema: {
          $ref: '#/definitions/notAuthorized'
        }
      },
      403: {
        description: 'Access forbidden',
        schema: {
          $ref: '#/definitions/accessForbidden'
        }
      },
      404: {
        description: 'Trip not found',
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

export const getTripPath = {
  get: {
    tags: [
      'trips'
    ],
    security: [
      {
        BearerToken: []
      }
    ],
    summary: 'Manager, Requester or anyone with the permission should be able to see this trip request',
    description: 'A manager, requester or any other person with the permission should be able to view this trip',
    parameters: [
      {
        name: 'tripId',
        in: 'path',
        description: 'Path parameter takes in trip id',
        required: true,
        type: 'integer',
        format: 'int32'
      }
    ],
    responses: {
      200: {
        description: 'Trip resquest has been approved',
        schema: {
          $ref: '#/definitions/success'
        }
      },
      400: {
        description: 'Invalid request details',
        schema: {
          $ref: '#/definitions/badRequest'
        }
      },
      401: {
        description: 'Unauthorized',
        schema: {
          $ref: '#/definitions/notAuthorized'
        }
      },
      403: {
        description: 'Access forbidden',
        schema: {
          $ref: '#/definitions/accessForbidden'
        }
      },
      404: {
        description: 'Trip not found',
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

export const returnTrip = {
  post: {
    tags: [
      'trips'
    ],
    security: [
      {
        BearerToken: []
      }
    ],
    summary: 'A Return trip request',
    description: 'A user can make a return trip request',
    parameters: [
      {
        name: 'body',
        in: 'body',
        description: 'Trip request object',
        required: true,
        schema: {
          $ref: '#/definitions/returnTripSchema'
        }
      }
    ],
    responses: {
      201: {
        description: 'request successfully sent',
        schema: {
          $ref: '#/definitions/created'
        }
      },
      400: {
        description: 'Invalid request details',
        schema: {
          $ref: '#/definitions/badRequest'
        }
      },
      401: {
        description: 'Unauthorized',
        schema: {
          $ref: '#/definitions/notAuthorized'
        }
      },
      403: {
        description: 'Access forbidden',
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
