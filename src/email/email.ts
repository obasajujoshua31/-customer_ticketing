import sgMail from '@sendgrid/mail';
import config from '../config/config';
import dotenv from 'dotenv';

dotenv.config();

sgMail.setApiKey(config.sendGridKey);

/**
 * @description responsible for sending out emails
 *
 * @param {string} email
 * @param {string} subject
 * @param {string} html
 * @returns {Promise<any>}
 */
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
