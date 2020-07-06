import createDocuments from './helper';
import userSeeds from './data/user.json';

const userCollection = 'Users';

export default () => createDocuments(userCollection, userSeeds);
