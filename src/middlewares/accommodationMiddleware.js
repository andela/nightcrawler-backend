import { checkLikedAccommodation, findOneAccommodation, createLike } from '../services/accommodationServices';
import { respondWithWarning, respondWithSuccess } from '../helpers/responseHandler';
import statusCode from '../helpers/statusCode';

export const likeAccommodation = async (req, res, next) => {
  const { accommodationId } = req.params;
  const { id } = req.auth;
  try {
    const liked = await checkLikedAccommodation(id, Number(accommodationId));

    if (!liked) {
      const likes = await createLike(id, Number(accommodationId));
      return respondWithSuccess(res, statusCode.success, 'request successful', { likes });
    }
    next();
  } catch (error) {
    return respondWithWarning(res, statusCode.internalServerError, 'Server Error');
  }
};

export const verifyAccommodation = async (req, res, next) => {
  const { accommodationId } = req.params;
  const accommodation = await findOneAccommodation(Number(accommodationId));
  if (!accommodation) {
    return respondWithWarning(res, statusCode.resourceNotFound, 'accommodation not found');
  }
  req.accommodation = accommodation.toJSON();
  next();
};
