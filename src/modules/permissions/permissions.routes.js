import express from 'express';
import authentication from '../../middlewares/authentication';
import checkPermissions from '../../middlewares/checkPermission';
import * as permissionsController from './permissions.controller';

const router = express.Router();

router.get('/', authentication, checkPermissions('VIEW_PERMISSIONS'), permissionsController.getPermissions);

export default router;
