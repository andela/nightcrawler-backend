import { Router } from 'express';
import { authenticateUserToken } from '../../middlewares/authentication';
import { checkPermission } from '../../middlewares/checkPermission';
import { getPermissions } from '../../controllers/permissionController';

const router = Router();

router.get('/', authenticateUserToken, checkPermission('VIEW_PERMISSIONS'), getPermissions);

export default router;
