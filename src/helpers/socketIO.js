import socketIO from 'socket.io';
import { approvedTripNotification, commentNotification } from './notificationHandler';

const staffs = {};

/**
 * Function to connect to socket.io
 * @param {Object} server
 * @override
 */
export const socketConnection = server => {
  const io = socketIO(server);
  io.on('connection', (socket) => {
    socket.on('logged in', (data) => {
      const { email } = data;
      staffs[email] = socket.id;
    });
  });
  approvedTripNotification(io, staffs);
  commentNotification(io, staffs);
};
