import jwt from 'jsonwebtoken';
import constants from '../config/constants';
/**
 * Class handles JWT authentication
 */
class Auth {
  /**
   * Method to generate token from userId and role
   * @param {object} data
   * @returns {string} generated token
   */
  static async generateToken(data) {
    const token = await jwt.sign({ key: data }, constants.SECRET_KEY);
    return token;
  }
}
export default Auth;
