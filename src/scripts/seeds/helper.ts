import { Db, MongoClient } from 'mongodb';
import connectToMongoClient from '../../database/connection/mongo';
import config from '../../config/config';

const createDocuments = (collection: string, seeds: any[]) => {
  connectToMongoClient(
    config,
    async (err: Error, client: MongoClient, db: Db) => {
      if (err) throw err;
      const dbCollection = db.collection(collection);

      const counts = await dbCollection.countDocuments({});

      if (counts === 0) {
        dbCollection.insertMany(seeds, (error, result) => {
          if (error) throw error;

          console.log(`${collection} created successfully`);
        });
      }
      client.close();
    },
  );
};

export default createDocuments;
