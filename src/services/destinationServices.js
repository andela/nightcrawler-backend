
import Model from '../models';
import { respondWithWarning, statusCode } from '../helpers/responseHandler';
import { maxDestination } from '../helpers/frequentDestination';


const { Destination } = Model;


export const mostTraveledDestination = async (req, res) => {
  try {
    const rows = await Destination.findAll({
      attributes: ['destination']
    });
    if (rows.length < 1) {
      return respondWithWarning(
        res,
        statusCode.noResourceFound,
        'Destination not found'
      );
    }
    const destinations = rows.map(row => row.destination);
    return maxDestination(destinations);
  } catch (error) {
    return {
      errors: error
    };
  }
};
