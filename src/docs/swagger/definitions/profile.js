const ProfileCreate = {
  type: 'object',
  properties: {
    saveProfile: {
      type: 'boolean',
      example: true
    },
    firstName: {
      type: 'string',
      example: 'John',
      minLength: 3
    },
    lastName: {
      type: 'string',
      example: 'Doe',
      minLength: 3
    },
    gender: {
      type: 'string',
      example: 'male',
    },
    managerId: {
      type: 'string',
      example: 1,
    },
    birthDate: {
      type: 'string',
      example: '12/2/1993',
    },
    preferredLanguage: {
      type: 'string',
      example: 'English',
    },
    preferredCurrency: {
      type: 'string',
      example: 'Naira',
    },
    homeAddress: {
      type: 'string',
      english: '29, sarah munich str, Lagos, Nigeria',
    }
  }
};

const ProfileResponds = {
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
        saveProfile: {
          type: 'boolean',
          example: true
        },
        firstName: {
          type: 'string',
          example: 'John'
        },
        lastName: {
          type: 'string',
          example: 'Doe'
        },
        gender: {
          type: 'string',
          example: 'male'
        },
        managerId: {
          type: 'string',
          example: 2
        },
        birthDate: {
          type: 'string',
          example: '27/7/1992',
        },
        preferredLanguage: {
          type: 'string',
          example: 'English'
        },
        preferredCurrency: {
          type: 'string',
          example: 'Naira'
        },
        homeAddress: {
          type: 'string',
          example: '29, sarah munich str, Lagos, Nigeria.'
        },
        userId: {
          type: 'string',
          example: 2
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

const ProfileHeaders = {
  type: 'object',
  properties: {
    token: {
      type: 'string',
      example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJrZXkiOnsiaWQiOjEsInJvbGVJZCI6MX0sImlhdCI6MTU2NzQ1MTcxMiwiZXhwIjoxNTY3NjI0NTEyfQ.1wYawS26ylh-IbxFFY_SM3vBKfFZTxWZDARXPC77-Iw'
    },
  }
};

const ProfileUpdate = {
  type: 'object',
  properties: {
    saveProfile: {
      type: 'boolean',
      example: true
    },
    firstName: {
      type: 'string',
      example: 'Tom',
      minLength: 3
    },
    lastName: {
      type: 'string',
      example: 'Doe',
      minLength: 3
    },
    gender: {
      type: 'string',
      example: 'male',
    },
    managerId: {
      type: 'string',
      example: 1,
    },
    birthDate: {
      type: 'string',
      example: '12/2/1993',
    },
    preferredLanguage: {
      type: 'string',
      example: 'English',
    },
    preferredCurrency: {
      type: 'string',
      example: 'Naira',
    },
    homeAddress: {
      type: 'string',
      english: '29, sarah munich str, Lagos, Nigeria',
    }
  }
};
const ProfileUpdateResponds = {
  type: 'object',
  properties: {
    success: {
      type: 'boolean'
    },
    message: {
      type: 'string'
    },
    data: {
      type: 'object',
      properties: {
        id: {
          type: 'integer',
          format: 'int32',
          example: 1
        },
        saveProfile: {
          type: 'boolean',
          example: true
        },
        firstName: {
          type: 'string',
          example: 'Tom'
        },
        lastName: {
          type: 'string',
          example: 'Doe'
        },
        gender: {
          type: 'string',
          example: 'male'
        },
        managerId: {
          type: 'string',
          example: 2
        },
        birthDate: {
          type: 'string',
          example: '27/7/1992',
        },
        preferredLanguage: {
          type: 'string',
          example: 'English'
        },
        preferredCurrency: {
          type: 'string',
          example: 'Naira'
        },
        homeAddress: {
          type: 'string',
          example: '29, sarah munich str, Lagos, Nigeria.'
        },
        userId: {
          type: 'string',
          example: 2
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
  ProfileCreate, ProfileResponds, ProfileHeaders, ProfileUpdate, ProfileUpdateResponds
};
