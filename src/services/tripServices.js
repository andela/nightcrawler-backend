import Model from '../models';
import { findSingleUser } from './userServices';


const { TripRequest, User } = Model;

export const postTrip = async body => TripRequest.create(body);

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
}

export const getRequest = async userId => TripRequest.findAll({ where : { userId }})

export const rejectRequest = async (tripId, status) => updateTripStatus(tripId, status);


