import { mostTraveledDestination } from '../services/destinationServices';
import { respondWithSuccess, respondWithWarning } from '../helpers/responseHandler';
import statusCode from '../helpers/statusCode';


export const destinationController = async (req, res) => {
  try {
    const destination = await mostTraveledDestination();
    return respondWithSuccess(res, statusCode.success, 'resource successfully created', { maxDestination: destination });
  } catch (error) {
    return respondWithWarning(res, statusCode.internalServerError, 'Server Error');
  }
};
