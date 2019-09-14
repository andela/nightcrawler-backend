import { getUserProfile, updateUserProfile } from '../services/userServices';
import statusCode from '../helpers/statusCode';
import { respondWithWarning, respondWithSuccess } from '../helpers/responseHandler';

/**
 * Function gets a profile and makes some checks
 * @param {object} req
 * @param {object} res
 * @param {object} next
 * @returns {object} response object
 */
export const unsetRememberMe = async (req, res, next) => {
  const { id: userId } = req.auth;
  try {
    const profile = await getUserProfile({ userId });
    if (!profile) {
      return respondWithSuccess(res, statusCode.success, 'Profile not found');
    }
    if (profile.rememberMe) {
      const updatedProfile = await updateUserProfile({ userId }, { rememberMe: false });
      return respondWithSuccess(res, statusCode.success, 'Update successful', updatedProfile[1][0].dataValues);
    }
    return next();
  } catch (error) {
    return respondWithWarning(res, statusCode.internalServerError, 'Server error');
  }
};
