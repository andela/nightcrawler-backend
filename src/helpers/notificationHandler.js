import EventEmitter from 'events';
import { createNotification } from '../services/notificationServices';

const tripEmitter = new EventEmitter();

/**
 * @exports approvedEmitter
 * @exports approveTripNotification
 */


/**
 * Function to emit approved trip
 * @param {Object} data
 * @override
 */
export const approvedEmitter = (data) => {
  tripEmitter.emit('approved trip', data);
};

/**
 * Function to listen for the approved trip event and send
 * a notification to the staff that requested for the trip
 * @param {Object} io
 * @param {Object} staffs
 * @override
 */
export const approvedTripNotification = (io, staffs) => {
  tripEmitter.on('approved trip', async (payload) => {
    const notification = await createNotification(payload);
    io.to(staffs[payload.requester]).emit('approved Trip', notification);
  });
};
