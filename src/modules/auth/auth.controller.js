/* eslint-disable require-jsdoc */
import Joi from 'joi';
import validation from '../../helpers/validation';
import Auth from '../../helpers/auth';
import response from '../../helpers/response';
import model from '../user';

class authController {
  static async signin(req, res) {
    const schema = validation.validateSignin();

    const clean = Joi.validate(req.body, schema);
    if (clean.error) {
      return response.invalidCredential(res);
    }
    const { email, password } = clean.value;

    const findUser = await model.User.getByKey({ email });
    if (!findUser) {
      return response.invalidCredential(res);
    }
    const { password: hashPassword, id } = findUser.dataValues;
    const pass = await validation.passwordCheck(password, hashPassword);

    if (!pass) {
      return response.invalidCredential(res);
    }
    const payload = { id };

    findUser.dataValues.token = await Auth.generateToken(payload, res);
    return response.success(res, findUser.dataValues);
  }
}

export default authController;
