import { Router } from 'express';
import passport from 'passport';
import { validateSigninFormData } from '../../middlewares/validateAuth';
import { validUser } from '../../middlewares/authentication';
import { signin, google, facebook } from '../../controllers/authController';

const router = Router();

router.post('/signin', validateSigninFormData, validUser, signin);

router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get('/google/redirect', google);

router.get('/facebook', passport.authenticate('facebook', { scope: ['email'] }));
router.get('/facebook/redirect', facebook);

export default router;
