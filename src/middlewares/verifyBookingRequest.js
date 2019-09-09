import { respondWithWarning } from '../helpers/responseHandler';
import statusCode from '../helpers/statusCode';
import Model from '../models';

const {
  Accommodation, TripRequest
} = Model;

/**
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 * @returns {Function} next middleware
 */
export const verifyBookingRequest = async (req, res, next) => {
  const data = {
    ...req.body,
    userId: req.auth.id,
  };
  try {
    const trip = await TripRequest.findByPk(data.tripId);
    if (!trip) {
      return respondWithWarning(res, statusCode.resourceNotFound, 'trip not found');
    }
    if (trip.status !== 'approved') {
      return respondWithWarning(res, statusCode.conflict, 'trip has not been approved');
    }
    const accommodation = await Accommodation.findByPk(data.accommodationId);
    if (!accommodation) {
      return respondWithWarning(res, statusCode.resourceNotFound, 'accommodation not found');
    }
    return next();
  } catch (error) {
    return respondWithWarning(res, statusCode.internalServerError, 'Server Error');
  }
};
