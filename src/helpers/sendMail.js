import sgMail from '@sendgrid/mail';
import { SENDGRID_API_KEY } from '../config/constants';

export const sendMail = async ({
  emailTo, emailFrom, emailSubject, emailBody
}) => {
  sgMail.setApiKey(SENDGRID_API_KEY);
  const message = {
    to: emailTo,
    from: emailFrom,
    subject: emailSubject,
    text: emailBody,
  };
  return sgMail.send(message);
};
