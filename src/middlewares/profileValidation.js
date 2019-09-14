/* eslint-disable max-len */
/* eslint-disable import/prefer-default-export */
import Joi from '@hapi/joi';
import * as userServices from '../services/userServices';
import * as responseHandler from '../helpers/responseHandler';
import { joiValidator } from '../helpers/joiValidator';
import validator from '../helpers/validator';
import statusCode from '../helpers/statusCode';

export const validateProfileCreation = async (req, res, next) => {
  try {
    const schema = Joi.object().keys({
      rememberMe: validator.rememberMe,
      gender: validator.gender,
      managerId: validator.managerId,
      birthDate: validator.birthDate,
      preferredLanguage: validator.preferredLanguage,
      preferredCurrency: validator.preferredCurrency,
      homeAddress: validator.homeAddress
    });

    const errors = joiValidator(req.body, schema);
    if (errors) {
      return responseHandler.respondWithWarning(res, statusCode.badRequest, errors);
    }

    const { managerId } = req.body;

    // check that managerId provided exist
    const theManager = await userServices.findSingleUser({ id: managerId });
    if (!theManager) {
      return responseHandler.respondWithWarning(res, statusCode.success, 'Manager not found');
    }

    next();
  } catch (error) {
    return responseHandler.respondWithWarning(res, statusCode.internalServerError, 'Error processing provided data');
  }
};

export const validateProfileUpdate = async (req, res, next) => {
  try {
    const schema = Joi.object().keys({
      rememberMe: validator.optionalrememberMe,
      gender: validator.optionalGender,
      managerId: validator.optionalManagerId,
      birthDate: validator.optionalBirthDate,
      preferredLanguage: validator.optionalPreferredLanguage,
      preferredCurrency: validator.preferredCurrency,
      homeAddress: validator.homeAddress
    });

    const errors = joiValidator(req.body, schema);
    if (errors) {
      return responseHandler.respondWithWarning(res, statusCode.badRequest, errors);
    }

    const { managerId } = req.body;
    // check if managerId is provided
    if (managerId) {
      // check that managerId provided exist
      const manager = await userServices.findSingleUser({ id: managerId });
      if (!manager) {
        return responseHandler.respondWithWarning(res, statusCode.success, 'Manager not found');
      }
    }

    next();
  } catch (error) {
    return responseHandler.respondWithWarning(res, statusCode.internalServerError, 'Error processing provided data');
  }
};
