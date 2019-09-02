import express from 'express';
import createUserValidation from '../../middlewares/createUserValidation';
import authentication from '../../middlewares/authentication';
import userController from './user.controller';
import checkPermissions from '../../middlewares/checkPermissions';

const router = express.Router();

router.post('/', authentication, checkPermissions('REGISTER_USERS'), createUserValidation, userController.createUser);

export default router;
