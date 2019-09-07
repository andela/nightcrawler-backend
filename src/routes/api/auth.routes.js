import { Router } from 'express';
import passport from 'passport';
import { validateSigninFormData } from '../../middlewares/validateAuth';
import { validUser, isUserExist } from '../../middlewares/authentication';
import { signin, google, facebook } from '../../controllers/authController';
import logout from '../../controllers/logoutController';


const router = Router();

router.post('/signin', validateSigninFormData, validUser, signin);

router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get('/google/redirect', google);

router.get('/facebook', passport.authenticate('facebook', { scope: ['email'] }));
router.get('/facebook/redirect', facebook);
router.get('/logout', validUser, logout);


export default router;
