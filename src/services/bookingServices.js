import Model from '../models';

const {
  Booking, Accommodation, Room
} = Model;

/**
 * Create a new item
 * @param {Object} data
 * @param {Object} res
 * @returns {Function} responseHandler
 */
export const create = async (data) => {
  const result = await Booking.create(data);

  return result;
};

/**
 * @returns {object} response object containing the information of all rows
 */
export const findAllBookings = async () => {
  const bookings = await Booking.findAll({
    include: {
      model: Accommodation,
      as: 'accommodation',
      attributes: ['name', 'country', 'city', 'address', 'type'],
      include: {
        model: Room,
        as: 'rooms',
        attributes: ['id', 'name', 'type']
      }
    }
  });
  return bookings;
};

/**
 * @param {Number} userId
 * @returns {object} response object containing the information of all
 * bookings created by a specific user
 */
export const findUserBookings = async (userId) => {
  const bookings = await Booking.findAll({
    where: {
      userId
    },
    include: {
      model: Accommodation,
      as: 'accommodation',
      attributes: ['name', 'country', 'city', 'address', 'type'],
      include: {
        model: Room,
        as: 'rooms',
        attributes: ['id', 'name', 'type']
      }
    }
  });
  return bookings;
};

/**
 * @param {object} bookingId
 * @returns {object} response object containing the information of a single booking
 */
export const findOneBooking = async (bookingId) => {
  const accommodationRoom = await Booking.findOne({
    where: { id: bookingId },
    include: {
      model: Accommodation,
      as: 'accommodation',
      attributes: ['name', 'country', 'city', 'address', 'type'],
      include: {
        model: Room,
        as: 'rooms',
        attributes: ['id', 'name', 'type']
      }
    }
  });
  return accommodationRoom;
};
