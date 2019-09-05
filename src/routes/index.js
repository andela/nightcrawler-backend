import { Router } from 'express';
import auth from './api/auth.routes';
import user from './api/user.routes';
import trip from './api/trip.routes';
import permissions from './api/permissions.routes';
import roles from './api/roles.routes';
import accommodation from './api/accommodation.routes';

const apiRouter = Router();

apiRouter.use('/api/v1/auth', auth);
apiRouter.use('/api/v1/users', user);
apiRouter.use('/api/v1/trip', trip);
apiRouter.use('/api/v1/permissions', permissions);
apiRouter.use('/api/v1/roles', roles);
apiRouter.use('/api/v1/accommodations', accommodation);

export default apiRouter;
