import sgMail from '@sendgrid/mail';
import config from '../config/config';
import dotenv from 'dotenv';

dotenv.config();

sgMail.setApiKey(config.sendGridKey);

const sendEmail = async (email: string, subject: string, html: string) => {
  const emailBody = {
    to: email,
    from: config.fromEmail,
    subject,
    html,
  };

  return await sgMail.send(emailBody);
};

export default sendEmail;
