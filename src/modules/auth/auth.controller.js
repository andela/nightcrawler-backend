import JWT from '../../helpers/JWT';
import responseHandler from '../../helpers/responseHandler';
import UserServices from '../../services/users';
import { comparePasswords } from '../../helpers/Hash';

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

    const findUser = await UserServices.findOne({ email });
    if (!findUser) {
      return responseHandler.invalidCredential(res);
    }
    const comparePassword = await comparePasswords(password, findUser.dataValues.password);
    if (!comparePassword) {
      return responseHandler.invalidCredential(res);
    }
    const { id, roleId } = findUser.dataValues;
    const payload = { id, roleId };
    findUser.dataValues.token = await JWT.generateToken(payload);
    return responseHandler.success(res, findUser.dataValues);
  }
}

export default AuthController;
