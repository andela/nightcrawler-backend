import express from 'express';
import auth from './auth/auth.routes';
import user from './user/user.routes';
import trip from './Trip/trip.routes';

const router = express.Router();
router.use('/auth', auth);
router.use('/users', user);
router.use('/trip',trip)

export default router;
