/* eslint-disable import/prefer-default-export */
import * as userServices from './user.service';
import * as responseHandler from '../../helpers/responseHandler';

export const createProfile = async (req, res) => {
  const { id } = req.token.key;
  req.body.userId = id;

  try {
    const createdProfile = await userServices.createProfile(req.body);
    responseHandler.respondWithSuccess(res, 200, 'Profile successfully created', createdProfile.dataValues);
  } catch (error) {
    if (error.errors[0].type === 'unique violation') {
      responseHandler.respondWithWarning(res, 409, ['Profile already exist'], null);
    }
    responseHandler.respondWithWarning(res, 500, ['Unable to update profile'], null);
  }
};

export const getAProfile = async (req, res) => {
  const { id: userId } = req.token.key;

  try {
    const theProfile = await userServices.getAProfile({ userId });
    if (!theProfile) {
      /* istanbul ignore next */
      responseHandler.respondWithSuccess(res, 200, 'No profile found', null);
    }
    /* istanbul ignore next */
    responseHandler.respondWithSuccess(res, 200, 'Profile found', theProfile.dataValues);
  } catch (error) {
    responseHandler.error(res, 500, ['Unable to retrieve profile'], null);
  }
};

export const updateProfile = async (req, res) => {
  const { id: userId } = req.token.key;

  try {
    const theProfile = await userServices.getAProfile({ userId });
    if (!theProfile) {
      responseHandler.respondWithSuccess(res, 200, 'No Profile was found', null);
    }

    const updatedProfile = await userServices.updateProfile({ userId }, req.body);

    responseHandler.respondWithSuccess(res, 200, 'Profile updated', updatedProfile[1][0].dataValues);
  } catch (error) {
    responseHandler.respondWithWarning(res, 500, ['Unable to update profile'], null);
  }
};
