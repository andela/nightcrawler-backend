import Model from '../models';

const { Accommodation, Room } = Model;

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
 * @returns {object} response object containing the information of all rows
 */
export const findAllAccommodations = async () => {
  const accommodations = await Accommodation.findAll({
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
    include: {
      model: Room,
      as: 'rooms',
      attributes: ['id', 'name', 'type']
    }
  });
  return accommodationRoom;
};
