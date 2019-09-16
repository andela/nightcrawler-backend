import EventEmitter from 'events';
import { createNotification } from '../services/notificationServices';
import { getAllManager } from '../services/userServices';

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

/**
 * Function to emit comment
 * @param {Object} data
 * @override
 */
export const commentEmitter = (data) => {
  tripEmitter.emit('comment', data);
};

/**
 * Function to listen for the created comment event and send
 * @param {Object} io
 * @param {Object} staffs
 * @override
 */

export const commentNotification = (io, staffs) => {
  tripEmitter.on('comment', async (data) => {
    const payload = {
      type: data.type,
      title: data.title,
      message: data.message,
      tripId: data.tripId,
      commentId: data.id,
      userId: data.userId
    };
    if (data.sender !== null) {
      const notification = await createNotification(payload);
      io.to(staffs[data.requester]).emit('Trip Comment', notification);
    } else {
      const manager = await getAllManager();
      const { 0: { users } } = manager;
      const managersEmail = users.map(items => items.email);
      const notification = await createNotification(payload);
      managersEmail.forEach(email => {
        io.to(staffs[email]).emit('Trip Comment', notification);
      });
    }
  });
};

/**
 * Function to emit chat
 * @param {Object} data
 * @override
 */
export const chatEmitter = (data) => {
  tripEmitter.emit('chat', data);
};

/**
 * Function to listen for the created chat event and send
 * @param {Object} io
 * @param {Object} staffs
 * @override
 */

export const chatBot = (io, staffs) => {
  tripEmitter.on('chat', (payload) => {
    const receivers = [payload.sender, payload.recipient];
    receivers.forEach(receiver => {
      io.to(staffs[receiver]).emit('chat', payload);
    });
  });
};

/**
 * Function to emit chats
 * @param {Object} data
 * @override
 */
export const getChatsEmitter = (data) => {
  tripEmitter.emit('chats', data);
};

/**
 * Function to listen for the created chats event and send
 * @param {Object} io
 * @param {Object} staffs
 * @override
 */

export const getPrivateChats = (io, staffs) => {
  tripEmitter.on('chats', (payload) => {
    const receivers = [payload.sender, payload.recipient];
    receivers.forEach(receiver => {
      io.to(staffs[receiver]).emit('chats', payload);
    });
  });
};

/** 
 *  @param {Object} data
 *  @override
*/

export const editRequestEmitter = data => {
  tripEmitter.emit('editRequest', data)
}

/**
 * Function to listen for the created comment event and send
 * @param {Object} io
 * @param {Object} staffs
 * @override
 */
export const requestUpdateNotification = async  (io, staffs) =>{

  tripEmitter.on('editRequest', async (payload) => {
    const [ Roles ] = await getAllManager();
    const { users } = Roles.toJSON();
    const notification = await createNotification(payload);
    users.forEach(({ email }) => {
      io.to(staffs[email]).emit('editRequest', notification);
    });
  })
 }