export const accommodationRatingSchema = {
  type: 'object',
  properties: {
    rating: {
      type: 'integer',
      format: 'int32',
      example: 1,
    }
  }
};
