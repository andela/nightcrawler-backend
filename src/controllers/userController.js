import {
  updatePassword, createUser, findSingleRole, findSingleUser
} from '../services/userServices';
import { sendMail } from '../helpers/sendMail';
import { emailBody } from '../helpers/forgotPasswordNotification';
import { respondWithSuccess, respondWithWarning } from '../helpers/responseHandler';
import statusCode from '../helpers/statusCode';
import resMessage from '../helpers/responseMessages';
import { generateToken } from '../helpers/jwt';
import { passwordHash } from '../helpers/hash';
import { EMAIL_SENDER, URL } from '../config/constants';

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
      return respondWithWarning(res, 404, `resource with email ${email} not found`);
    }

    if (user.dataValues.roleId === parseInt(roleId, 10)) {
      return respondWithWarning(res, statusCode.conflict, resMessage.userRoleConflict);
    }

    const role = await findSingleRole({ id: roleId });
    const newRole = await user.setRoles(role);
    delete newRole.dataValues.password;

    return respondWithSuccess(res, statusCode.success, 'resource successfully updated', newRole.dataValues);
  } catch (error) {
    return respondWithWarning(res, statusCode.internalServerError, resMessage.serverError);
  }
};
