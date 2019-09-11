import { getAllNotifications } from '../services/notificationServices';
import { respondWithWarning } from '../helpers/responseHandler';
import statusCode from '../helpers/statusCode';

export const checkNotification = async (req, res, next) => {
    const { id } = req.auth;
    const notifications = await getAllNotifications(id);
    if (!notifications.length) {
      return respondWithWarning(res, statusCode.resourceNotFound, `You don't have any notification`);
    }
    const usersNotification = notifications.map(item => item.get());
    req.notifications = usersNotification;
   return next();
  };