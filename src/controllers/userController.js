import _ from 'lodash';
/* eslint-disable max-len */
import {
  updatePassword,
  createUser,
  findSingleRole,
  findSingleUser,
  createUserProfile,
  getUserProfile,
  verifyUserAccount,
  updateUserProfile,
} from '../services/userServices';
import { sendMail } from '../helpers/sendMail';
import { emailBody } from '../helpers/forgotPasswordNotification';
import { respondWithSuccess, respondWithWarning } from '../helpers/responseHandler';
import statusCode from '../helpers/statusCode';
import resMessage from '../helpers/responseMessages';
import { generateToken } from '../helpers/jwt';
import { passwordHash } from '../helpers/hash';
import { EMAIL_SENDER, URL } from '../config/constants';
import { verificationSuccessEmail } from '../helpers/verificationNotifications';

/**
 * Creates a new user
 * @param {Object} req
 * @param {Object} res
 * @returns {Function} CreateUser
 */

export const createNewUser = (req, res) => {
  const data = req.body;
  return createUser(data, res);
};

/** Function for fogot password
 *
 * @param {Object} req the request object
 * @param {Object} res the response object
 * @returns {Object} this returns an object
 */

export const forgotPassowrd = async (req, res) => {
  const token = await generateToken({ id: req.user.id }, { expiresIn: '1h' });
  const mailBody = emailBody(req.user.username, URL, token);
  const data = {
    emailFrom: EMAIL_SENDER,
    emailTo: req.body.email,
    emailSubject: 'Reset Password',
    emailBody: mailBody,
  };

  try {
    sendMail(data);
    return respondWithSuccess(res, statusCode.success, resMessage.forgotPassword);
  } catch (error) {
    return respondWithWarning(res, statusCode.internalServerError, resMessage.serverError);
  }
};

/**
 * Function to reset password with token
 * @param {Object} req the request object
 * @param {Object} res the response object
 * @returns {Object} this returns an object
 */
export const resetForgotPassword = async (req, res) => {
  const { password } = req.body;
  const hashedPassword = await passwordHash(password);
  try {
    const user = await updatePassword(req.user.email, hashedPassword);
    return respondWithSuccess(res, statusCode.success, resMessage.passwordResetResponse, user);
  } catch (error) {
    return respondWithWarning(res, statusCode.internalServerError, resMessage.serverError);
  }
};

/**
 * Function to reset password
 * @param {Object} req the request object
 * @param {Object} res the response object
 * @returns {Object} this returns an object
 */
export const resetUserPassword = async (req, res) => {
  const { newPassword } = req.body;
  const hashedPassword = await passwordHash(newPassword);
  try {
    const user = await updatePassword(req.user.email, hashedPassword);
    return respondWithSuccess(res, statusCode.success, resMessage.passwordResetResponse, user);
  } catch (error) {
    return respondWithWarning(res, statusCode.internalServerError, resMessage.serverError);
  }
};

export const editUserRole = async (req, res) => {
  try {
    const { email } = req.body;
    const { roleId } = req.params;
    const user = await findSingleUser({ email });
    if (!user) {
      return respondWithWarning(res, statusCode.resourceNotFound, `resource with email ${email} not found`);
    }

    if (user.dataValues.roleId === parseInt(roleId, 10)) {
      return respondWithWarning(res, statusCode.conflict, resMessage.userRoleConflict);
    }

    const role = await findSingleRole({ id: roleId });
    const newRole = await user.setRoles(role);
    return respondWithSuccess(res, statusCode.success, 'resource successfully updated', _.omit(newRole.dataValues, 'password'));
  } catch (error) {
    return respondWithWarning(res, statusCode.internalServerError, resMessage.serverError);
  }
};

/**
 * Verifies a user
 * @param {object} req
 * @param {object} res
 * @returns {object} response object
 */
export const verifyUser = async (req, res) => {
  try {
    const { id, email } = req.user;
    const isUserVerified = await findSingleUser({ id, isVerified: true });
    if (isUserVerified) {
      return respondWithWarning(res, statusCode.badRequest, 'User already verified');
    }
    await verifyUserAccount(id);
    const data = {
      emailFrom: EMAIL_SENDER,
      emailTo: email,
      emailSubject: 'Verification Success',
      emailBody: verificationSuccessEmail(),
    };
    sendMail(data);
    return respondWithSuccess(res, statusCode.success, 'Verification successful');
  } catch (error) {
    return respondWithWarning(res, statusCode.internalServerError, error.message);
  }
};

export const createProfile = async (req, res) => {
  // de-structure id out of req.auth
  const { id } = req.auth;
  // Add the de-structure id to req.body with a new key of userId for ease of storage.
  const data = { ...req.body, userId: id };

  try {
    const createdProfile = await createUserProfile(data);
    return respondWithSuccess(res, statusCode.created, resMessage.profileCreated, createdProfile.dataValues);
  } catch (error) {
    if (error.errors[0].type === 'unique violation') {
      return respondWithWarning(res, statusCode.conflict, 'Profile already exist');
    }
    return respondWithWarning(res, statusCode.internalServerError, 'Unable to create profile');
  }
};

export const getProfile = async (req, res) => {
  // de-structure id out of req.auth, then rename id to userId
  const { id: userId } = req.auth;

  try {
    const profile = await getUserProfile({ userId });
    if (!profile) {
      return respondWithSuccess(res, statusCode.success, 'Profile not found');
    }

    return respondWithSuccess(res, statusCode.success, 'Profile found', profile.dataValues);
  } catch (error) {
    return respondWithWarning(res, statusCode.internalServerError, 'Unable to retrieve profile');
  }
};

export const updateProfile = async (req, res) => {
  // de-structure id out of req.auth, then rename id to userId
  const { id: userId } = req.auth;

  try {
    const profile = await getUserProfile({ userId });
    if (!profile) {
      return respondWithSuccess(res, statusCode.success, 'Profile not found');
    }

    const updatedProfile = await updateUserProfile({ userId }, req.body);

    return respondWithSuccess(res, statusCode.success, 'Profile updated', updatedProfile[1][0].dataValues);
  } catch (error) {
    return respondWithWarning(res, statusCode.internalServerError, 'Unable to update profile');
  }
};
