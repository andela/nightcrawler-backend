import jwt from 'jsonwebtoken';
import { SECRET_KEY } from '../config/constants';
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
    const token = await jwt.sign(
      { key: data }, SECRET_KEY
    );
    return token;
  }

  /**
* Verify a token by using a secret key and a public key.
* @param {Object} token
* @return {Object} return verified token
*/
  static verifyToken(token) {
    return jwt.verify(token, SECRET_KEY);
  }
}
export default Auth;
