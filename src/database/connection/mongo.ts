import * as mongoClient from 'mongodb';
import IConfig from '../../config/iConfig';

const connectToMongoClient = (config: IConfig, cb: any) => {
  mongoClient.connect(
    config.dbURI,
    { useUnifiedTopology: true },
    (err, client) => {
      if (err) {
        cb(err, null, null);
      }
      const db = client.db(config.dbName);

      cb(null, client, db);
    },
  );
};

export default connectToMongoClient;
