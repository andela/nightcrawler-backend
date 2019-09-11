import { postAccommodationRating, getAccommodationRatings } from '../services/ratingServices';
import { respondWithSuccess, respondWithWarning } from '../helpers/responseHandler';
import statusCode from '../helpers/statusCode';

export const createAccommodationRating = async (req, res) => {
  const payload = { accommodationId: req.params.accommodationId, rating: req.body.rating };
  try {
    const rating = await postAccommodationRating(payload);
    return respondWithSuccess(res, statusCode.created, 'Accommodation has been rated successfuly', rating.toJSON());
  } catch (error) {
    return respondWithWarning(res, statusCode.internalServerError, 'Oops, something bad happened');
  }
};

export const getSingleAccommodationRatings = async (req, res) => {
  try {
    const accommodationRatings = await getAccommodationRatings(req.params.accommodationId);
    return !accommodationRatings.length ? respondWithWarning(res, statusCode.resourceNotFound, 'No ratings for this accommodation') : respondWithSuccess(res, statusCode.success, 'Accommodation ratings has been retrieved', accommodationRatings);
  } catch (error) {
    return respondWithWarning(res, statusCode.internalServerError, 'Oops, something bad happened');
  }
};
