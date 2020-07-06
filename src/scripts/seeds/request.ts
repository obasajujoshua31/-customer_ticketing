import createDocuments from './helper';
import requestSeeds from './data/request.json';

const requestCollection = 'Requests';

export default () => createDocuments(requestCollection, requestSeeds);
