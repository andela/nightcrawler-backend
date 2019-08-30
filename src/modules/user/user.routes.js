import express from 'express';
import createUserValidation from '../../middlewares/createUserValidation';
import authentication from '../../middlewares/authentication';
import * as userController from './user.controller';
import checkPermission from '../../middlewares/checkPermission';
import { editUserRoleValidation } from '../../middlewares/roleValidation';

const router = express.Router();

router.post('/', authentication, checkPermission('REGISTER_USERS'), createUserValidation, userController.createUser);
router.patch('/roles/:roleId', authentication, checkPermission('EDIT_USER_ROLE'), editUserRoleValidation, userController.editUserRole);

export default router;
