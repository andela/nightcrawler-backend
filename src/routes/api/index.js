import express from 'express';
import auth from './auth.routes';
import user from './user.routes';
import permissions from './permissions.routes';
import roles from './roles.routes';

const router = express.Router();
router.use('/v1/auth', auth);
router.use('/v1/users', user);
router.use('/v1/permissions', permissions);
router.use('/v1/roles', roles);

export default router;
