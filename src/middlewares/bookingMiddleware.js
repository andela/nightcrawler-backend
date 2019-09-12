import { findUserBookings } from '../services/bookingServices';
import statusCode from '../helpers/statusCode';
import { respondWithWarning, respondWithSuccess } from '../helpers/responseHandler';

/**
 * Function gets bookings for a requester
 * @param {object} req
 * @param {object} res
 * @param {object} next
 * @returns {object} response object
 */
export const getUserBookings = async (req, res, next) => {
  const { id, roleId } = req.auth;
  try {
    if (roleId === 6) {
      const bookings = await findUserBookings(id);
      return respondWithSuccess(res, statusCode.success, 'resource successfully fetched', bookings);
    }
    return next();
  } catch (error) {
    return respondWithWarning(res, statusCode.internalServerError, 'Server Error');
  }
};
