import { markNotificationAsRead, getAllNotifications  } from '../services/notificationServices';
import { respondWithSuccess, respondWithWarning } from '../helpers/responseHandler';
import statusCode from '../helpers/statusCode';
import Model from '../models';
import responseMessages from '../helpers/responseMessages';

const { Notification } = Model;



/**
 * Function gets all permissions available
 * @param {object} req
 * @param {object} res
 * @returns {object} response object
 */

export const markAllNotifications = async (req, res ) => {
  const { notifications } = req;

  return Promise
    .all(notifications.map(notification => {
      return Notification
        .update({
          status: true
        }, {
          where: { userId: notification.userId },
          returning: true,
        });
    }))
    .then(() => {
      return respondWithSuccess(res, 200, 'Notifications successfully marked as read');
    })
    .catch(() => {
      return respondWithWarning(res, statusCode.internalServerError, 'Server Error');
    });
};

export const getAllUserNotification = async (req, res) => {
  // de-structure id out of req.auth, then rename id to userId
  const { id: userId } = req.auth;

  try {
    const notifications = await getAllNotifications(userId);
    if (!notifications.length) {
      return respondWithSuccess(res, statusCode.success, 'You dont have any notifications for now');
    }

    return respondWithSuccess(res, statusCode.success, responseMessages.success, notifications);
  } catch (error) {
    return respondWithWarning(res, statusCode.internalServerError, 'Unable to retrieve notifications');
  }
};
