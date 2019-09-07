import { findTripById } from '../services/tripServices';
import { respondWithWarning } from '../helpers/responseHandler';
import statusCode from '../helpers/statusCode';

export const verifyTrip = async (req, res, next) => {
  const trip = await findTripById(req.params.tripId);
  if (!trip) {
    return respondWithWarning(res, statusCode.resourceNotFound, 'Trip not found');
  }
  req.trip = trip.toJSON();
  next();
};

export const checkTripStatus = async (req, res, next) => {
  const { status } = req.trip;
  return (status === 'approved')
    ? respondWithWarning(res, statusCode.unauthorizedAccess, 'You are not authorized to visit this route')
    : next();
};
