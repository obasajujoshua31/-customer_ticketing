import createDocuments from './helper';
import userSeeds from './data/user.json';

const userCollection = 'users';
const emailIndex = 'email';

export default () => createDocuments(userCollection, userSeeds, emailIndex);
