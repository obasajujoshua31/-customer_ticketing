import MailGen from 'mailgen';
import { IUser } from 'database/models/user';
import { statusEnum } from 'api/utils/constants';

const capitalize = (s: string) => {
  return s.charAt(0).toUpperCase() + s.slice(1);
};

const mailGenerator = new MailGen({
  theme: 'default',
  product: {
    name: 'Customer Ticketing',
    link: 'https://google.com',
  },
});

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
        `  ${introAdditional}`,
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
