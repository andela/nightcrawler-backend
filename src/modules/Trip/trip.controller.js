
import {respondWithSuccess, respondWithWarning} from '../../helpers/responseHandler';
import postTrip from './trip.services';


/**
 * class handles trip related operations
*/
class TripController {
/**
* make trip request
* @param {object} req
* @param {object} res
* @returns {object} json response
*/
  static async tripRequest(req, res) {
    const userId = req.id;
    req.body.userId = userId;
    req.body.status = 'pending';
    try {
      const request = await postTrip(req.body);
       return respondWithSuccess(res, 201, 'request successfully sent', request.dataValues);
    } catch (error) {
      return respondWithWarning(res, 500, 'Internal Server Error');
    }
  }
}
export default TripController;

