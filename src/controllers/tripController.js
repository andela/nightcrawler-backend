import {
  postTrip, updateTripStatus, getRequesterEmail, bulkCreate,
  getTripRequests, findOneTripRequest, rejectRequest, searchTripRequest,
  fetchUserTripStats, fetchTripStats, fetchTripRequests, editTripRequest
} from '../services/tripServices';
import { respondWithSuccess, respondWithWarning } from '../helpers/responseHandler';
import statusCode from '../helpers/statusCode';
import { editRequestEmitter, approvedEmitter } from '../helpers/notificationHandler';


/**
 * make trip request
 * @param {object} req
 * @param {object} res
 * @returns {object} json response
 */
export const oneWayTripRequest = async (req, res) => {
  const { id } = req.auth;
  const payload = {
    ...req.body, status: 'pending', type: 'one-way', userId: id
  };
  try {
    const tripRequest = await postTrip(payload);

    return respondWithSuccess(
      res,
      statusCode.created,
      'request successfully sent',
      tripRequest.toJSON()
    );
  } catch (error) {
    return respondWithWarning(res, statusCode.internalServerError, 'Internal Server Error');
  }
};


/**
* make multi-city trip request
* @param {object} req
* @param {object} res
* @returns {object} json response
*/
export const multiCityTripRequest = async (req, res) => {
  let tripRequest;
  const { id } = req.auth;
  const { destination } = req.destination;
  const {
    origin, destinationId, reason, departureDate, type, subRequest
  } = req.body;
  try {
    const payload = {
      origin,
      destinationId,
      reason,
      departureDate,
      type,
      status: 'pending',
      userId: id
    };

    const multiCityTrip = await postTrip(payload);
    const multiCityRequests = subRequest.map(sub => ({
      tripId: multiCityTrip.id,
      ...sub
    }));
    const subRequestedTrips = await bulkCreate(multiCityRequests);
    tripRequest = { ...multiCityTrip.toJSON(), destination, subRequestedTrips };

    return respondWithSuccess(res, statusCode.created, 'request successfully sent', tripRequest);
  } catch (error) {
    return respondWithWarning(res, statusCode.internalServerError, error.stack);
  }
};

export const approveTripRequest = async (req, res) => {
  const status = 'approved';
  try {
    const tripRequest = await updateTripStatus(req.params.tripId, status);
    const {
      1: { dataValues }
    } = tripRequest;
    const requesterEmail = await getRequesterEmail(dataValues.userId);
    const payload = {
      type: 'Approved Trip',
      title: dataValues.reason,
      tripId: dataValues.id,
      userId: dataValues.userId,
      requester: requesterEmail,
      message: 'Your Trip has been approved'
    };
    approvedEmitter(payload);
    return respondWithSuccess(
      res,
      statusCode.success,
      'Trip has been updated successfully',
      dataValues
    );
  } catch (error) {
    return respondWithWarning(res, statusCode.internalServerError, 'Oops something bad happened');
  }
};

/**
 * A function to create a return trip
 * @param {object} req
 * @param {object} res
 * @returns {object} response
 */
export const returnTripRequest = async (req, res) => {
  const { id } = req.auth;
  const { returnDate, departureDate } = req.body;
  const returnDateToISO = new Date(returnDate).toISOString();
  const departureDateToISO = new Date(departureDate).toISOString();

  if (departureDateToISO > returnDateToISO) {
    return respondWithWarning(res, statusCode.badRequest, 'return date cannot be before departure date');
  }
  const data = {
    ...req.body, status: 'pending', type: 'return', userId: id
  };
  try {
    const returnTrip = await postTrip(data);
    return respondWithSuccess(res, statusCode.created, 'Request Successful', returnTrip.dataValues);
  } catch (error) {
    return respondWithWarning(res, statusCode.internalServerError, 'Internal Server Error');
  }
};

/**
 * Function gets all tripRequests
 * @param {object} req
 * @param {object} res
 * @returns {object} response object
 */
export const getAllTripRequests = async (req, res) => {
  try {
    const tripRequests = await getTripRequests();
    if (!tripRequests) {
      return respondWithWarning(res, statusCode.resourceNotFound, 'resource not found');
    }
    return respondWithSuccess(res, statusCode.success, 'resource successfully fetched', tripRequests);
  } catch (error) {
    return respondWithWarning(res, statusCode.internalServerError, 'Server Error');
  }
};

/**
 * Function gets one tripRequest
 * @param {object} req
 * @param {object} res
 * @returns {object} response object
 */
export const getTripRequest = async (req, res) => {
  try {
    const { tripId } = req.params;
    const tripRequests = await findOneTripRequest(Number(tripId));
    return respondWithSuccess(res, statusCode.success, 'resource successfully fetched', tripRequests.toJSON());
  } catch (error) {
    return respondWithWarning(res, statusCode.internalServerError, 'Server Error');
  }
};

export const rejectTripRequest = async (req, res) => {
  const { status } = req.body;
  try {
    const [, tripRequest] = await rejectRequest(req.params.tripId, status);
    return respondWithSuccess(res, statusCode.success, 'Trip request was rejected', tripRequest.toJSON());
  } catch (error) {
    return respondWithWarning(res, statusCode.internalServerError, error.message);
  }
};

export const getUserTripStats = async (req, res, next) => {
  try {
    const { date } = req.body;
    const { id, roleId } = req.auth;
    if (roleId === 6) {
      const stats = await fetchUserTripStats(date, id);
      return respondWithSuccess(res, statusCode.success, 'Resource successfully fetched', stats);
    }
    return next();
  } catch (error) {
    return respondWithWarning(res, statusCode.internalServerError, error.message);
  }
};

export const getTripStats = async (req, res) => {
  try {
    const { date } = req.body;
    const stats = await fetchTripStats(date);
    return respondWithSuccess(res, statusCode.success, 'Resource successfully fetched', stats);
  } catch (error) {
    return respondWithWarning(res, statusCode.internalServerError, error.message);
  }
};

export const retrieveTripRequest = async (req, res) => {
  const { id } = req.auth;
  try {
    const tripRequests = await fetchTripRequests(id);
    if (!tripRequests) {
      return respondWithWarning(res, statusCode.resourceNotFound, 'resource not found');
    }
    return respondWithSuccess(res, statusCode.success, 'resource successfully fetched', tripRequests);
  } catch (error) {
    return respondWithWarning(res, statusCode.internalServerError, error.message);
  }
};

export const searchTripRequests = async (req, res) => {
  try {
    const tripRequests = await searchTripRequest(req.query.key);
    return !tripRequests.length ? respondWithWarning(res, statusCode.resourceNotFound, 'Trip request not found')
      : respondWithSuccess(res, statusCode.success, 'Data has been retrieved successfully', tripRequests);
  } catch (error) {
    return respondWithWarning(res, statusCode.internalServerError, 'Oops something bad happened');
  }
};

export const updateTripRequest = async (req, res) => {
  const { params, auth, body} = req;
  try { 
    const [, tripRequest] = await editTripRequest(body, params.tripId, auth.id);
    const payload = {
    type: 'Trip Request edited',
    title: tripRequest.reason,
    tripId: tripRequest.id,
    userId: auth.id,
    message: 'Your have successfully edited your request'
   };
   editRequestEmitter(payload);
   return respondWithSuccess(
    res,
    statusCode.success,
    'TripUpdated',
    tripRequest.toJSON()
  );
} catch(error) {
  return respondWithWarning(res, statusCode.internalServerError, 'Internal Server Error');
}
}