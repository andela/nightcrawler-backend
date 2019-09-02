/* eslint-disable import/prefer-default-export */
import * as JWT from '../../helpers/JWT';
import * as responseHandler from '../../helpers/responseHandler';
import * as userServices from './auth.service';
import { comparePasswords } from '../../helpers/Hash';

/**
* Login a user
* @param {object} req
* @param {object} res
* @returns {object} json response
*/
export const signin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const findUser = await userServices.getAUser({ email });
    if (!findUser) {
      return responseHandler.respondWithWarning(res, 401, ['User not found'], null);
    }
    const comparePassword = await comparePasswords(password, findUser.dataValues.password);
    if (!comparePassword) {
      return responseHandler.respondWithWarning(res, 400, ['Invalid password'], null);
    }

    const { id, roleId } = findUser.dataValues;
    const payload = { id, roleId };

    findUser.dataValues.token = await JWT.generateToken(payload);

    delete findUser.dataValues.password;
    return responseHandler.respondWithSuccess(res, 200, 'You are now signed in', findUser.dataValues);
  } catch (error) {
    responseHandler.error(res, ['Unable to authenticate user'], 500);
  }
};
