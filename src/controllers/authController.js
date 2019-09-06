import _ from 'lodash';
import passport from 'passport';
import { generateToken } from '../helpers/jwt';
import {
  respondWithWarning,
  respondWithSuccess
} from '../helpers/responseHandler';
import { comparePasswords } from '../helpers/hash';
import statusCode from '../helpers/statusCode';
import resMessage from '../helpers/responseMessages';
import { CLIENT_URL } from '../config/constants';

/**
 * class handles user authentication
 */

/**
 * Login a user
 * @param {object} req
 * @param {object} res
 * @returns {object} json response
 */
export const signin = async (req, res) => {
  const { password } = req.body;
  const comparePassword = await comparePasswords(password, req.user.password);
  if (!comparePassword) {
    return respondWithWarning(
      res,
      statusCode.unauthorizedAccess,
      resMessage.incorrectPassword
    );
  }
  const { id, roleId } = req.user;
  const payload = { id, roleId };
  req.user.token = await generateToken(payload);
  return respondWithSuccess(res, statusCode.success, resMessage.successfulLogin, _.omit(req.user, ['password']));
};

/** /
 * Login a user with social media
 * @param {object} req
 * @param {object} res
 * @param {object} next
 * @returns {object} json response
 */

const metaRedirect = (res, url) => res.status(200).send(
  `<html>
        <head>
          <meta http-equiv="refresh" content="0; url=${url}" />
        </head>
      <body></body>
      </html>`
);
export const google = async (req, res, next) => {
  passport.authenticate('google', async (err, user) => {
    if (!user) {
      return metaRedirect(res, encodeURI(`${CLIENT_URL}/login`));
    }
    const { email, id, roleId } = user.dataValues;
    const token = await generateToken({ email, id, roleId });
    return metaRedirect(res, encodeURI(`${CLIENT_URL}/profile?token=${token}`));
  })(req, res, next);
};


export const facebook = async (req, res, next) => {
  passport.authenticate('facebook', async (err, user) => {
    if (!user) {
      return metaRedirect(res, encodeURI(`${CLIENT_URL}/login`));
    }
    const { email, id, roleId } = user.dataValues;
    const token = await generateToken({ email, id, roleId });
    return metaRedirect(res, encodeURI(`${CLIENT_URL}/profile?token=${token}`));
  })(req, res, next);
};
