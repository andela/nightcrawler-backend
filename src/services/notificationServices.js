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
