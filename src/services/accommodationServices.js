import Model from '../models';

const {
  Accommodation, Room, Like
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
