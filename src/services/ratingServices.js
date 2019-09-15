import Model from '../models';

const { Rating } = Model;

export const postAccommodationRating = async (payload) => {
  try {
    const rating = await Rating.create(payload);
    return rating;
  } catch (error) {
    return {
      errors: error
    };
  }
};

export const getAccommodationRatings = async (accommodationId) => {
  try {
    const tripRatings = await Rating.findAll({
      where: { accommodationId }
    });
    return tripRatings;
  } catch (error) {
    return {
      errors: error
    };
  }
};
