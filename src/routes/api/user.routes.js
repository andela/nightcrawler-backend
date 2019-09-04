import { Router } from 'express';
import { checkPermission } from '../../middlewares/checkPermission';
import { editUserRoleValidation } from '../../middlewares/roleValidation';
import {
  authenticateUserToken, validUser, isUserExist, compareResetForgotPassword, compareResetUserPassword
} from '../../middlewares/authentication';
import {
  resetForgotPassword, createNewUser, editUserRole, forgotPassowrd, resetUserPassword
} from '../../controllers/userController';
import {
  validateForgotPasswordForm, validateResetUserPasswordForm,
  validateResetForgotPasswordForm, validateSignUpFormData
} from '../../middlewares/validateAuth';

const router = Router();

router.post('/', authenticateUserToken, checkPermission('REGISTER_USERS'), validateSignUpFormData, createNewUser);

router.post('/forgot-password', validateForgotPasswordForm, validUser, forgotPassowrd);

router.patch('/reset-forgot-password', validateResetForgotPasswordForm, authenticateUserToken, isUserExist, compareResetForgotPassword, resetForgotPassword);

router.patch('/reset-user-password', authenticateUserToken, validateResetUserPasswordForm, isUserExist, compareResetUserPassword, resetUserPassword);

router.patch('/roles/:roleId', authenticateUserToken, checkPermission('EDIT_USER_ROLE'), editUserRoleValidation, editUserRole);

export default router;
