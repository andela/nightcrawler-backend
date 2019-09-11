import { markNotificationAsRead  } from '../services/notificationServices';
import { respondWithSuccess, respondWithWarning } from '../helpers/responseHandler';
import statusCode from '../helpers/statusCode';
import Model from '../models';

const { Notification } = Model;



/**
 * Function gets all permissions available
 * @param {object} req
 * @param {object} res
 * @returns {object} response object
 */

 export const markAllNotifications = async (req, res ) => {
     const notifications = req.notifications;
     
    return Promise
    .all(notifications.map(notification => {
      return Notification
        .update({
          status: true
        }, {
          where: { userId : notification.userId },
          returning: true,
        });
    }))
    .then(() => {
       return respondWithSuccess(res, 200, 'Notifications successfully marked as read');
    })
    .catch(() => {
        return respondWithWarning(res, statusCode.internalServerError, 'Server Error');
    });
}
