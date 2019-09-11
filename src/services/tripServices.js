import Model from '../models';
import { findSingleUser } from './userServices';

const { TripRequest, Destination } = Model;

export const postTrip = async (payload) => {
  try {
    const trip = await TripRequest.create(payload);
    return trip;
  } catch (error) {
    return {
      errors: error
    };
  }
};

export const findTripById = async (tripId) => {
  try {
    const trip = await TripRequest.findOne({
      where: { id: tripId },
      logging: false
    });

    return trip;
  } catch (error) {
    return {
      errors: error
    };
  }
};

/**
 * Function to update trip status
 * @exports
 * @param {Number} tripId
 * @param {String} tripStatus
 * @returns {Object} trip object
 */
export const updateTripStatus = async (tripId, tripStatus) => {
  try {
    const trip = await TripRequest.update({
      status: tripStatus
    }, {
      where: { id: tripId },
      returning: true,
      plain: true,
      logging: false
    });
    return trip;
  } catch (error) {
    return {
      errors: error
    };
  }
};

export const getRequesterEmail = async (requesterId) => {
  const user = await findSingleUser({ id: requesterId });
  return user.toJSON().email;
};

/**
 * @param {object} destinationId
 * @returns {object} response object with a single destination
 */
export const findOneDestination = async (destinationId) => {
  const destination = await Destination.findOne({
    where: { id: destinationId }
  });
  return destination;
};

export const findUserTrip = async (id, userId) => TripRequest.findOne({
  where: { id, userId }
});
