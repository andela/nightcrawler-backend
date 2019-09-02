import { generateToken } from '../../helpers/JWT';
import { respondWithWarning, respondWithSuccess } from '../../helpers/responseHandler';
import * as userServices from '../user/user.services';
import { comparePasswords } from '../../helpers/hash';


/**
 * class handles user authentication
 */
class AuthController {
/**
* Login a user
* @param {object} req
* @param {object} res
* @returns {object} json response
*/
  static async signin(req, res) {
    const { email, password } = req.body;
    const findUser = await userServices.findSingleUser({ email });
    if (!findUser) {
      return respondWithWarning(res, 401, 'email or password incorrect');
    }
    const comparePassword = await comparePasswords(password, findUser.dataValues.password);
    if (!comparePassword) {
      return respondWithWarning(res, 401, 'email or password incorrect');
    }
    const { id, roleId } = findUser.dataValues;
    const payload = { id, roleId };
    findUser.dataValues.token = await generateToken(payload);
    return respondWithSuccess(res, 200, 'Login successful', findUser.dataValues);
  }
}

export default AuthController;

