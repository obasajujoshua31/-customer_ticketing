import createDocuments from './helper';
import commentSeeds from './data/commentSeeds.json';

const commentCollection = 'Comments';

export default () => createDocuments(commentCollection, commentSeeds);
