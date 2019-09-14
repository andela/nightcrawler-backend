import { findTripById, findOneDestination, findOneTripRequest } from '../services/tripServices';
import { respondWithWarning, respondWithSuccess } from '../helpers/responseHandler';
import statusCode from '../helpers/statusCode';
import { getUserProfile } from '../services/userServices';

export const verifyTrip = async (req, res, next) => {
  const trip = await findTripById(req.params.tripId);

  if (!trip) {
    return respondWithWarning(res, statusCode.resourceNotFound, 'Trip not found');
  }
  req.trip = trip.toJSON();
  next();
};

export const verifyTripDestination = async (req, res, next) => {
  const destination = await findOneDestination(req.body.destinationId);
  if (!destination) {
    return respondWithWarning(res, statusCode.resourceNotFound, 'Destination not found');
  }
  req.destination = destination.toJSON();
  next();
};

export const checkTripStatus = async (req, res, next) => {
  const { status } = req.trip;
  return (status === 'approved')
    ? respondWithWarning(res, statusCode.unauthorizedAccess, 'You are not authorized to visit this route')
    : next();
};

export const getTripWithProfile = async (req, res, next) => {
  const { userId, id } = req.trip;
  const user = await getUserProfile({ userId });
  if (user.toJSON().rememberMe) {
    const trip = await findOneTripRequest(Number(id));
    const tripRequest = { ...trip.toJSON(), profile: { ...user.toJSON() } };
    return respondWithSuccess(res, statusCode.success, 'resource successfully fetched', tripRequest);
  }
  return next();
};
