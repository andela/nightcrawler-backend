import socketIO from 'socket.io';
import { approvedTripNotification, commentNotification, chatBot, getPrivateChats, requestUpdateNotification } from './notificationHandler';

const staffs = {};

/**
 * Function to connect to socket.io
 * @param {Object} server
 * @override
 */
export const socketConnection = server => {
  const io = socketIO(server);

  const onlineStaffs = () => {
    io.emit('users', Object.keys(staffs));
  };

  io.on('connection', (socket) => {
    socket.on('logged in', (data) => {
      const { email } = data;
      staffs[email] = socket.id;
      onlineStaffs();
    });
    socket.on('disconnecting', (data) => {
      if (!data.email) return;
      delete staffs[data.email];
      onlineStaffs();
    });
  });
  approvedTripNotification(io, staffs);
  requestUpdateNotification(io, staffs);
  commentNotification(io, staffs);
  chatBot(io, staffs);
  getPrivateChats(io, staffs);
};
