import * as tripServices from '../services/tripServices';
import { respondWithSuccess, respondWithWarning } from '../helpers/responseHandler';
import statusCode from '../helpers/statusCode';

/**
* make trip request
* @param {object} req
* @param {object} res
* @returns {object} json response
*/
export const oneWayTripRequest = async (req, res) => {
  const { id } = req.auth;
  const payload = { ...req.body, status: 'pending', userId: id };
  try {
    const tripRequest = await tripServices.postTrip(payload);

    return respondWithSuccess(res, statusCode.created, 'request successfully sent', tripRequest.toJSON());
  } catch (error) {
    return respondWithWarning(res, statusCode.internalServerError, 'Internal Server Error');
  }
};
