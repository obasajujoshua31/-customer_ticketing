import { userType } from './../api/utils/constants';
import { IRequest } from './../database/models/request';
import { IComment } from './../database/models/comment';
import MailGen from 'mailgen';
import { IUser } from 'database/models/user';
import { statusEnum } from 'api/utils/constants';

/**
 * @description responsible for capitalizing the first alphabet
 *
 * @param {string} word
 * @returns {string}
 */
const capitalize = (word: string): string => {
  return word.charAt(0).toUpperCase() + word.slice(1);
};

const mailGenerator = new MailGen({
  theme: 'default',
  product: {
    name: 'Customer Ticketing',
    link: 'https://google.com',
  },
});

/**
 * @description for generating email templates for change of status
 *
 * @param {string} name
 * @param {string} url
 * @param {statusEnum} status
 * @param {IUser} [agent=null]
 * @returns
 */
export const statusChangeTemplate = (
  name: string,
  url: string,
  status: statusEnum,
  agent: IUser = null,
) => {
  let introAdditional = '';
  if (agent) {
    introAdditional = `${capitalize(
      agent.name,
    )} will be your support for your request.
       Please contact his email at ${agent.email} for more information.`;
  }

  const email = {
    body: {
      name: capitalize(name),
      intro:
        `Your request with customer ticketing is now ${status}!` +
        ` <br> ${introAdditional}`,
      action: {
        instructions: 'Click below to view your request at customer ticketing',
        button: {
          text: 'View your request',
          link: url,
          color: 'blue',
        },
      },
    },
    outro:
      'Need help, or have questions? Please contact us at https://google.com',
  };

  return mailGenerator.generate(email);
};
/**
 * @description for generating email templates for new agent comment
 * 
 * @param {IComment} comment
 * @param {IRequest} request
 * @param {IUser} user
 * @param {string} url
 */
export const newAgentCommentTemplate = (
  comment: IComment,
  request: IRequest,
  user: IUser,
  url: string,
) => {
  let intro = '';
  if (user.accountType === userType.agent) {
    intro =
      `You have a new comment on your request with id ${request._id}.` +
      '<br>' +
      `Comment:  ${comment.content} by your agent:  ${request.agent.name}`;
  } else {
    intro =
      `Your comment on your request: ${request.id}` +
      `<br> Comment: ${comment.content}`;
  }

  const email = {
    body: {
      name: capitalize(request.customer.name),
      intro,
      action: {
        instructions: 'Click this view the comment',
        button: {
          text: 'View Comment',
          link: url,
          color: 'blue',
        },
      },
    },
    outro:
      'Need help, or have questions? Please contact us at https://google.com',
  };

  return mailGenerator.generate(email);
};
