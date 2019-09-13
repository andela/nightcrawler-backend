import { postFlightDetails } from '../services/flightServices';
import statusCode from '../helpers/statusCode';
import { respondWithSuccess, respondWithWarning } from '../helpers/responseHandler';

export const addFlightDetails = async (req, res) => {
  const {
    departureDate, userId, returnDate, origin, destinationId
  } = req.trip;
  if (!returnDate) {
    if (!req.body.returnDate) { return respondWithWarning(res, statusCode.badRequest, 'return date is required'); }
    const data = {
      ...req.body, departureDate, userId, origin, destinationId
    };

    try {
      const flightDetails = await postFlightDetails(data);
      return respondWithSuccess(res, statusCode.created, 'flight details created successful', flightDetails.dataValues);
    } catch (error) {
      return respondWithWarning(res, statusCode.internalServerError, 'internal server error', error);
    }
  }
};
