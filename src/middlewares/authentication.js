/* eslint-disable max-len */
import { findSingleUser, getUserProfile } from '../services/userServices';
import { respondWithWarning } from '../helpers/responseHandler';
import statusCode from '../helpers/statusCode';
import resMessage from '../helpers/responseMessages';
import { verifyToken, formatJWTErrorMessage } from '../helpers/jwt';
import { comparePasswords } from '../helpers/hash';

/**
   * Method to generate token
   * @param {object} req
   * @param {object} res
   * @param {Function} next
   * @returns {Function} next middleware
   */
export const authenticateUserToken = (req, res, next) => {
  let token = req.headers.authorization;
  if (token && token.startsWith('Bearer ')) {
    token = token.slice(7, token.length);
  }
  if (!token) {
    return respondWithWarning(res, statusCode.unauthorizedAccess, resMessage.expiredSession);
  }
  try {
    const { key } = verifyToken(token);
    req.auth = key;
    return next();
  } catch (error) {
    return respondWithWarning(res, 401, formatJWTErrorMessage(error.message));
  }
};

/**
 * Function to check if a user email is valid
 * @param {Object} req this is the request object
 * @param {Object} res this is the response object
 * @param {Function} next this is the next function
 * @returns {Function} response
 */
export const validUser = async (req, res, next) => {
  const { email } = req.body;
  const user = await findSingleUser({ email });

  if (!user) {
    return respondWithWarning(res, statusCode.unauthorizedAccess, resMessage.incorrectEmail);
  }
  const { dataValues } = user;
  req.user = dataValues;
  return next();
};

export const verifyUserAccount = async (req, res, next) => {
  const { id } = req.auth;
  const user = await findSingleUser({ id });
  if (!user) {
    return respondWithWarning(res, statusCode.resourceNotFound, resMessage.notAUser);
  }
  const { dataValues } = user;
  req.user = dataValues;
  return next();
};

export const verifyUserProfile = async (req, res, next) => {
  const { id: userId } = req.auth;
  const profile = await getUserProfile({ userId });
  if (!profile) {
    return respondWithWarning(res, statusCode.success, 'Profile not found');
  }
  const { dataValues } = profile;
  req.userProfile = dataValues;
  return next();
};

export const compareResetForgotPassword = (req, res, next) => {
  const { password, confirmPassword } = req.body;
  return (password !== confirmPassword)
    ? respondWithWarning(res, statusCode.unauthorizedAccess, resMessage.passwordComparison)
    : next();
};

export const compareResetUserPassword = async (req, res, next) => {
  const { oldPassword } = req.body;
  const isMatch = await comparePasswords(oldPassword, req.user.password);
  // eslint-disable-next-line max-len
  return (!isMatch) ? respondWithWarning(res, statusCode.unauthorizedAccess, resMessage.incorrectPassword)
    : next();
};
