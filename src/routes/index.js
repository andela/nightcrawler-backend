import { Router } from 'express';
import auth from './api/auth.routes';
import user from './api/user.routes';
import trip from './api/trip.routes';
import permissions from './api/permissions.routes';
import roles from './api/roles.routes';
import accommodation from './api/accommodation.routes';
import booking from './api/booking.routes';
import notification from './api/notification.route';
import comments from './api/comment.routes';
import chats from './api/chats.routes';
import flight from './api/flight.routes';

const apiRouter = Router();

apiRouter.use('/api/v1/auth', auth);
apiRouter.use('/api/v1/users', user);
apiRouter.use('/api/v1/trips', trip);
apiRouter.use('/api/v1/notifications', notification);
apiRouter.use('/api/v1/trips', comments);
apiRouter.use('/api/v1/permissions', permissions);
apiRouter.use('/api/v1/roles', roles);
apiRouter.use('/api/v1/accommodations', accommodation);
apiRouter.use('/api/v1/bookings', booking);
apiRouter.use('/api/v1', chats);

apiRouter.use('/api/v1/flights', flight);
export default apiRouter;










