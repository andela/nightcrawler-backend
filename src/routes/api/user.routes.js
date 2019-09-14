/* eslint-disable max-len */
import { Router } from 'express';
import { checkPermission } from '../../middlewares/checkPermission';
import * as profileValidation from '../../middlewares/profileValidation';
import { editUserRoleValidation } from '../../middlewares/roleValidation';
import {
  authenticateUserToken,
  validUser,
  verifyUserAccount,
  compareResetForgotPassword,
  compareResetUserPassword,
} from '../../middlewares/authentication';
import {
  verifyUser,
  resetForgotPassword,
  createNewUser,
  editUserRole,
  forgotPassowrd,
  resetUserPassword,
  createProfile,
  getProfile,
  updateProfile,
} from '../../controllers/userController';
import { retrieveTripRequest } from '../../controllers/tripController';
import {
  validateForgotPasswordForm,
  validateResetUserPasswordForm,
  validateResetForgotPasswordForm,
  validateSignUpFormData
} from '../../middlewares/validateAuth';
import verifyEmailToken from '../../middlewares/verifyEmailToken';

const router = Router();

router.post('/', authenticateUserToken, checkPermission('REGISTER_USERS'), validateSignUpFormData, createNewUser);

router.post('/forgot-password', validateForgotPasswordForm, validUser, forgotPassowrd);

router.patch('/reset-forgot-password', validateResetForgotPasswordForm, authenticateUserToken, verifyUserAccount, compareResetForgotPassword, resetForgotPassword);

router.patch('/reset-user-password', authenticateUserToken, validateResetUserPasswordForm, verifyUserAccount, compareResetUserPassword, resetUserPassword);

router.patch('/roles/:roleId', authenticateUserToken, checkPermission('EDIT_USER_ROLE'), editUserRoleValidation, editUserRole);

router.post('/verify', verifyEmailToken, verifyUserAccount, verifyUser);

router.get('/trips', authenticateUserToken, checkPermission('VIEW_USERS_TRIP_REQUESTS'), retrieveTripRequest);

router.get('/profile', authenticateUserToken, verifyUserAccount, getProfile);

router.post('/profile', authenticateUserToken, verifyUserAccount, profileValidation.validateProfileCreation, createProfile);

router.patch('/profile', authenticateUserToken, verifyUserAccount, profileValidation.validateProfileUpdate, updateProfile);


export default router;
