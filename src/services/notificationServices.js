import Model from '../models';


const { Notification } = Model;

export const createNotification = async payload => {
  try {
    const notification = await Notification.create(payload);
    return notification;
  } catch (error) {
    return {
      errors: error
    };
  }
};

export const getAllNotifications = async userId  => await Notification.findAll({ where: { userId }})

export const markNotificationAsRead = status =>  async item => (
  await Notification.update(
    { read: status },
    { where : { userId : item.userId } }
    ));




