import { connect as connectToMongo, Db, MongoClient } from 'mongodb';
import IConfig from '../../config/iConfig';

interface IMongoConnection {
  db: Db;
  client: MongoClient;
}

const connectToMongoClient = (config: IConfig): Promise<IMongoConnection> => {
  return new Promise((resolve, reject) => {
    connectToMongo(
      config.dbURI,
      { useUnifiedTopology: true },
      (err, client) => {
        if (err) {
          reject(err);
        }
        const db = client.db(config.dbName);

        const connection: IMongoConnection = {
          db,
          client,
        };
        resolve(connection);
      },
    );
  });
};

export default connectToMongoClient;
