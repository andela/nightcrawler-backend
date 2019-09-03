/* eslint-disable max-len */
import express from 'express';
import authentication from '../../middlewares/authentication';
import checkPermission from '../../middlewares/checkPermission';
import * as rolesController from '../../controllers/roleController';
import { editRolePermissionValidation, getRolePermissionValidation } from '../../middlewares/roleValidation';

const router = express.Router();

router.get('/', authentication, checkPermission('VIEW_ROLES'), rolesController.getRoles);
router.get('/:roleId/permissions', authentication, checkPermission('VIEW_ROLE_PERMISSIONS'), getRolePermissionValidation, rolesController.getRolePermissions);
router.patch('/:roleId/permissions', authentication, checkPermission('EDIT_ROLE_PERMISSIONS'), editRolePermissionValidation, rolesController.updateRolePermissions);

export default router;
