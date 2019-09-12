import Model from '../models';

const {
  Accommodation, Room, Like, AccommodationReview, User
} = Model;

/**
 * Create a new item
 * @param {Object} model
 * @param {Object} data
 * @param {Object} res
 * @returns {Function} responseHandler
 */
export const create = async (model, data) => {
  const result = await model.create(data);

  return result;
};

/**
 * Create a new item
 * @param {Object} model
 * @param {Object} condition
 * @param {Object} res
 * @returns {Function} responseHandler
 */
export const findOne = async (model, condition) => {
  const result = await model.findOne({ where: condition });
  return result;
};

/**
 * Get all accommodations
 * @param {String} queryOption
 * @param {Number} paginationOptions
 * @returns {object} response object containing the information of all rows
 */
export const findAllAccommodations = async (queryOption, paginationOptions) => {
  const accommodations = await Accommodation.findAll({
    where: {
      ...queryOption
    },
    ...paginationOptions,
    include: {
      model: Room,
      as: 'rooms',
      attributes: ['id', 'name', 'type']
    }
  });
  return accommodations;
};

/**
 * @param {object} accommodationId
 * @returns {object} response object containing the information of a single accommodation
 */
export const findOneAccommodation = async (accommodationId) => {
  const accommodationRoom = await Accommodation.findOne({
    where: { id: accommodationId },
    include: [
      {
        model: Room,
        as: 'rooms',
        attributes: ['id', 'name', 'type']
      },
    ]
  });
  return accommodationRoom;
};

/**
 * checks if an accommodation is already liked by user
 * @param {String} userId
 * @param {String} accommodationId
 * @returns {Object} object
 */
export const checkLikedAccommodation = async (userId, accommodationId) => {
  const liked = await Like.findOne({ where: { userId, accommodationId } });
  return liked;
};

/**
 * like an accommodation
 * @param {String} userId
 * @param {String} accommodationId
 * @returns {Object} object
 */
export const createLike = async (userId, accommodationId) => {
  await Like.create({ userId, accommodationId });
  const totalLikes = await Like.count({ where: { accommodationId } });
  return totalLikes;
};

/**
 * unlike an accommodation
 * @param {String} userId
 * @param {String} accommodationId
 * @returns {object} object
 */
export const unlikeAccommodation = async (userId, accommodationId) => {
  await Like.destroy({ where: { userId, accommodationId }, force: true });
  const totalLikes = await Like.count({ where: { accommodationId } });
  return totalLikes;
};
/**
 * Create an accommodation review
 * @exports
 * @param {Object} payload
 * @returns {Object} review object
 */
export const createReview = async (payload) => {
  try {
    const review = await AccommodationReview.create(payload);
    return review;
  } catch (error) {
    return {
      errors: error
    };
  }
};

/**
 * find an accommodation by id
 * @exports
 * @param {Number} id
 * @returns {Object} Accomodation object
 */
export const findAccomodationById = (id) => Accommodation.findByPk(id);

/**
 * find an accommodation review by id
 * @exports
 * @param {Number} id
 * @returns {Object} Review object
 */
export const findAccomodationReviewById = (id) => AccommodationReview.findByPk(id);


/**
 * fetch reviews for an accommodation
 * @exports
 * @param {Object} accommodation
 * @returns {Object} Accomodation review object
 */
export const fetchAccommodationReviews = (accommodation) => accommodation.getReviews({
  include: [
    { model: User, as: 'user', attributes: ['id', 'username', 'firstName', 'lastName'] }
  ]
});

/**
 * delete a review
 * @exports
 * @param {Number} id
 * @returns {Object} response
 */
export const deleteReview = (id) => AccommodationReview.destroy({
  where: {
    id
  }
});

/**
 * findUserReview
 * @exports
 * @param {Number} id
 * @param {Number} userId
 * @returns {Object}Accomodation review response
 */
export const findUserReview = (id, userId) => AccommodationReview.findOne({
  where: {
    id,
    userId
  }
});

/**
 * update a review
 * @exports
 * @param {Number} id
 * @param {String} review
 * @returns {Object}updated response
 */
export const updateReview = (id, review) => AccommodationReview.update(
  { review }, { where: { id }, returning: true, plain: true }
);
