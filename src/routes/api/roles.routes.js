/* eslint-disable max-len */
import express from 'express';
import { authenticateUserToken } from '../../middlewares/authentication';
import { checkPermission } from '../../middlewares/checkPermission';
import { getRoles, updateRolesPermissions, getRolePermissions } from '../../controllers/roleController';
import { editRolePermissionValidation, getRolePermissionValidation } from '../../middlewares/roleValidation';

const router = express.Router();

router.get('/', authenticateUserToken, checkPermission('VIEW_ROLES'), getRoles);

router.get('/:roleId/permissions', authenticateUserToken, checkPermission('VIEW_ROLE_PERMISSIONS'), getRolePermissionValidation, getRolePermissions);

router.patch('/:roleId/permissions', authenticateUserToken, checkPermission('EDIT_ROLE_PERMISSIONS'), editRolePermissionValidation, updateRolesPermissions);

export default router;
