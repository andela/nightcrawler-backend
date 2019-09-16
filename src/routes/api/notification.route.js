import { Router } from 'express';
import { markAllNotifications, getAllUserNotification } from '../../controllers/notificationController';
import { authenticateUserToken, verifyUserAccount } from '../../middlewares/authentication';
import { checkNotification }  from '../../middlewares/checkNotification';

const notification = Router();

notification.patch('/readAll', authenticateUserToken, checkNotification, markAllNotifications);

notification.get('/', authenticateUserToken , verifyUserAccount, getAllUserNotification);

export default notification;
