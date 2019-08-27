import Auth from '../../helpers/Auth';
import responseHandler from '../../helpers/responseHandler';
import users from '../../services/userServices';
import { comparePasswords } from '../../helpers/password';

/**
 * class handles user authentication
 */
class authController {
/**
* Login a user
* @param {object} req
* @param {object} res
* @returns {object} json response
*/
  static async signin(req, res) {
    const { email, password } = req.body;

    const findUser = await users.getByKey({ email });
    if (!findUser) {
      return responseHandler.invalidCredential(res);
    }
    const comparePassword = comparePasswords(password, findUser.dataValues.password);
    if (!comparePassword) {
      return responseHandler.invalidCredential(res);
    }
    const { id, roleId } = findUser.dataValues;
    const payload = { id, roleId };
    findUser.dataValues.token = await Auth.generateToken(payload);
    return responseHandler.success(res, findUser.dataValues);
  }
}

export default authController;
