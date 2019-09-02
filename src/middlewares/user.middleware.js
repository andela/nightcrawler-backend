/* eslint-disable import/prefer-default-export */
import Joi from '@hapi/joi';
import * as JWT from '../helpers/JWT';
import * as userServices from '../modules/auth/auth.service';
import * as responseHandler from '../helpers/responseHandler';
import joiValidator from '../helpers/joiValidator';

/**
 * validate email and password
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 * @returns {Object} error
 */
export const isSignedIn = async (req, res, next) => {
  const { token } = req.headers;

  if (!token) {
    responseHandler.respondWithWarning(res, 400, ['Please signin to continue'], null);
  } else {
    try {
      const decodedToken = await JWT.verifyToken(token);
      req.token = decodedToken;

      next();
    } catch (error) {
      responseHandler.respondWithWarning(res, 401, ['Error validating token'], null);
    }
  }
};

export const validateProfileDataUpdate = async (req, res, next) => {
  try {
    const { id } = req.token.key;

    const schema = Joi.object().keys({
      saveProfile: Joi.boolean(),
      firstName: Joi.string().min(3).max(15),
      lastName: Joi.string().min(3).max(15),
      gender: Joi.string(),
      managerId: Joi.number().integer(),
      birthDate: Joi.string(),
      preferredLanguage: Joi.string(),
      preferredCurrency: Joi.string(),
      homeAddress: Joi.string().min(3).max(100)
    });

    const errors = joiValidator(req.body, schema);
    if (errors) {
      responseHandler.respondWithWarning(res, 400, errors, null);
    }

    // check that user exist
    const theUser = await userServices.getAUser({ id });
    if (!theUser) {
      /* istanbul ignore next */
      responseHandler.respondWithSuccess(res, 200, 'User not found', null);
    }

    const { managerId } = req.body;
    // check if managerId is provided
    if (managerId) {
      // check that managerId provided exist
      const theManager = await userServices.getAUser({ id: managerId });
      if (!theManager) {
        responseHandler.respondWithWarning(res, 200, 'Manager not found', null);
      }
    }

    next();
  } catch (error) {
    /* istanbul ignore next */
    responseHandler.respondWithWarning(res, 500, ['Error processing provided data'], null);
  }
};

export const validateProfileDataCreate = async (req, res, next) => {
  try {
    const { id } = req.token.key;

    const schema = Joi.object().keys({
      saveProfile: Joi.boolean().required(),
      firstName: Joi.string().min(3).max(15).required(),
      lastName: Joi.string().min(3).max(15).required(),
      gender: Joi.string().required(),
      managerId: Joi.number().integer().required(),
      birthDate: Joi.string().required(),
      preferredLanguage: Joi.string().required(),
      preferredCurrency: Joi.string().required(),
      homeAddress: Joi.string().min(3).max(100).required()
    });

    const errors = joiValidator(req.body, schema);
    if (errors) {
      responseHandler.respondWithWarning(res, 400, errors, null);
    }
    // check that user exist
    const theUser = await userServices.getAUser({ id });
    if (!theUser) {
      /* istanbul ignore next */
      responseHandler.respondWithSuccess(res, 200, 'User not found', null);
    }

    const { managerId } = req.body;

    // check that managerId provided exist
    const theManager = await userServices.getAUser({ id: managerId });
    if (!theManager) {
      responseHandler.respondWithWarning(res, 200, 'Manager not found', null);
    }

    next();
  } catch (error) {
    /* istanbul ignore next */
    responseHandler.respondWithWarning(res, 500, ['Error processing provided data'], null);
  }
};
