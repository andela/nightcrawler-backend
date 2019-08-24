import jwt from 'jsonwebtoken';
import { SECRET_KEY } from '../config/constants';
import { respondWithWarning } from '../helpers/responseHandler';

/**
 * object handles verification of token and authorization
*/
const errorMessage = 'Not authorize to access the page'
const Auth = {
  /**
* token verification
* @param {object} req
* @param {object} res
* @param {function} next
* @returns {object} json response
*/
  verifyToken: async (req, res, next) => {
    const { token } = req;
    if (!token) {
      return respondWithWarning(res, 403, errorMessage);
    }
    try {
      const decoded = await jwt.verify(token, SECRET_KEY);
      const { id } = decoded.key;
      req.id = id;
      next();
    } catch (error) {
      return respondWithWarning(res, 403, errorMessage);
      }
    },

    /**
* Authorization
* @param {object} req
* @param {object} res
* @param {function} next
* @returns {object} json response
*/
  authorization: (req, res, next) => {
    const bearerHead = req.header('Authorization') || req.body.token;
    if (typeof bearerHead === 'undefined') {
      errorMessage = 'forbidden';
      return respondWithWarning(res, 500, 'Internal Server Error');
    }
    const tokenArray = bearerHead.split(' ');
    const token = tokenArray[1];
    req.token = token;
    next();
  }
};
export default Auth;

