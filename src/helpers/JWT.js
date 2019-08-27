import jwt from 'jsonwebtoken';
import { SECRET_KEY, EXPIRATION_DURATION } from '../config/constants';
/**
 * Class handles JWT authentication
 */
class JWT {
  /**
   * Method to generate token from userId and role
   * @param {object} data
   * @returns {string} generated token
   */
  static async generateToken(data) {
    const token = await jwt.sign({ key: data }, SECRET_KEY, { expiresIn: EXPIRATION_DURATION });
    return token;
  }
}
export default JWT;
