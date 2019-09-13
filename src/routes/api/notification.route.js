import { Router } from 'express';
import { markAllNotifications } from '../../controllers/notificationController';
import { authenticateUserToken } from '../../middlewares/authentication';
import { checkNotification }  from '../../middlewares/checkNotification';


const notification = Router();
notification.patch('/readAll', authenticateUserToken,checkNotification, markAllNotifications );

export default notification;
