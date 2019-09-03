import express from 'express';
import auth from './auth/auth.routes';
import user from './user/user.routes';
import permissions from './permissions/permissions.routes';
import roles from './roles/roles.routes';

const router = express.Router();
router.use('/auth', auth);
router.use('/users', user);
router.use('/permissions', permissions);
router.use('/roles', roles);

export default router;
