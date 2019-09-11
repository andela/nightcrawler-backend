/* eslint-disable arrow-body-style */
import { create } from 'domain';
import { sendMail } from './sendMail';
import { EMAIL_SENDER, URL } from '../config/constants';

/* eslint-disable max-len */
const createManagerMessage = (requester, manager, tripRequest) => {
  const { email } = manager;
  return {
    email,
    message: `Hello ${manager.firstName} ${manager.lastName},\n
    This is to notify you that ${requester.firstName} ${requester.lastName}, as made a ${tripRequest.type} trip request\n
    To accept click the link ${URL}trips/${tripRequest.id}/accept \n
    To decline click the link ${URL}trips/${tripRequest.id}/reject\n

    Thanks,\n
    Barefoot Nomad Team.`
  };
};

const createRequesterMessage = (requester, tripRequest) => {
  return {
    email: requester.email,
    message: `Hello ${requester.firstName} ${requester.lastName},\n
    You are getting this notification because you have made ${tripRequest.type} trip request.\n
    Your request as been sent to all managers for confirmation.\n

    Thanks,\n
    Barefoot Nomad Team.`
  };
};

const createAndSendMail = (message) => {
  const mailData = {
    emailFrom: EMAIL_SENDER,
    emailTo: message.email,
    emailSubject: 'Trip Request Notification',
    emailBody: message.message,
  };
  sendMail(mailData);
};

export const createMessages = (requester, managers, tripRequest) => {
  managers.forEach(manager => {
    const managerMessage = createManagerMessage(requester, manager, tripRequest);
    createAndSendMail(managerMessage);
  });
  const requesterMessage = createRequesterMessage(requester, tripRequest);
  createAndSendMail(requesterMessage);
};

export const createNotificationMessage = (tripRequest, managers) => {
  const managersEmail = managers.map(manager => manager.email);
  return {
    type: 'Trip Request',
    title: tripRequest.reason,
    tripId: tripRequest.id,
    userId: tripRequest.userId,
    managersEmail,
    message: 'Trip request created',
    read: false
  };
};
