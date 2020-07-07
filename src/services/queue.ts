import {
  STATUS_CHANGE,
  statusEnum,
  REQUEST_ACTIVE,
  REQUEST_CLOSED,
  REQUEST_CANCELLED,
} from './../api/utils/constants';
import * as kue from 'kue';
import sendEmail from '../email/email';
import { statusChangeTemplate } from '../email/template';

const queue = kue.createQueue();

queue.on('job enqueue', () => {
  console.log('Job Submitted to the queue');
});

queue.process(REQUEST_ACTIVE, ({ data: { user, agent } }, done: any) => {
  const html = statusChangeTemplate(
    user.name,
    'google.com',
    statusEnum.ACTIVE,
    agent,
  );

  sendEmail(user.email, `Your request is now ${statusEnum.ACTIVE}`, html);
  done();
});

queue.process(REQUEST_CLOSED, ({ data: { user } }, done: any) => {
  const html = statusChangeTemplate(user.name, 'google.com', statusEnum.CLOSED);

  sendEmail(user.email, `Your request is now ${statusEnum.CLOSED}`, html);
  done();
});

queue.process(REQUEST_CANCELLED, ({ data: { user } }, done: any) => {
  const html = statusChangeTemplate(
    user.name,
    'google.com',
    statusEnum.CANCELLED,
  );

  sendEmail(user.email, `Your request is now ${statusEnum.CANCELLED}`, html);
  done();
});

export default queue;
