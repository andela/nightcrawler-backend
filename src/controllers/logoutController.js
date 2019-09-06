import { respondWithSuccess } from '../helpers/responseHandler';


/**
 * Creates a new user
 * @param {Object} req
 * @param {Object} res
 * @returns {Function} CreateUser
 */

const logout = (req, res) => respondWithSuccess(res, 200, 'Successfully Logged out');

export default logout;
