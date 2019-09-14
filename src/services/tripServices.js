import Model from '../models';
import { findSingleUser } from './userServices';

const {
  TripRequest, Destination, SubTripRequest, User
} = Model;

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

export const bulkCreate = async (subRequests) => {
  const trip = await SubTripRequest.bulkCreate(subRequests, { returning: true });
  return trip;
};

/**
 * @returns {object} response object containing the information of all rows
 */
export const getTripRequests = async () => {
  const trips = await TripRequest.findAll({
    include: [
      {
        model: Destination,
        as: 'destination',
        attributes: ['id', 'destination']
      },
      {
        model: SubTripRequest,
        as: 'subTrips',
        include: {
          model: Destination,
          as: 'destination',
          attributes: ['id', 'destination']
        }
      }]
  });
  return trips;
};

/**
 * @param {object} tripId
 * @returns {object} response object containing the information of a single trip
 */
export const findOneTripRequest = async (tripId) => {
  const trip = await TripRequest.findOne({
    where: { id: tripId },
    include: {
      model: SubTripRequest,
      as: 'subTrips',
      include: {
        model: Destination,
        as: 'destination',
        attributes: ['id', 'destination']
      }
    }
  });
  return trip;
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
export const rejectRequest = async (tripId, status) => updateTripStatus(tripId, status);

export const fetchUserTripStats = async (date, userId) => TripRequest.findAndCountAll({
  where: {
    userId,
    departureDate: {
      [Model.Sequelize.Op.between]: [new Date(date), new Date()]
    }
  },
  include: [
    { model: User, as: 'user', attributes: ['id', 'username', 'firstName', 'lastName'] }
  ]
});

export const fetchTripStats = async (date) => TripRequest.findAndCountAll({
  where: {
    departureDate: {
      [Model.Sequelize.Op.between]: [new Date(date), new Date()]
    }
  },
  include: [
    { model: User, as: 'user', attributes: ['id', 'username', 'firstName', 'lastName'] }
  ]
});


export const fetchTripRequests = async userId => TripRequest.findAll({
  where: { userId },
  include: [
    {
      model: Destination,
      as: 'destination',
      attributes: ['id', 'destination']
    },
    {
      model: SubTripRequest,
      as: 'subTrips',
      include: {
        model: Destination,
        as: 'destination',
        attributes: ['id', 'destination']
      }
    }]
});
