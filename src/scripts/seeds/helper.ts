import { Db, MongoClient } from 'mongodb';
import connectToMongoClient from '../../database/connection/mongo';
import config from '../../config/config';

const createDocuments = async (
  collection: string,
  seeds: any[],
  index = null,
) => {
  let dbClient: MongoClient;
  try {
    const { db, client } = await connectToMongoClient(config);

    dbClient = client;
    const dbCollection = db.collection(collection);

    const counts = await dbCollection.countDocuments({});

    if (counts === 0) {
      await dbCollection.insertMany(seeds);
      if (index) {
        await dbCollection.createIndex(index);
      }
    }
    console.log(`${collection} collection created!`);
  } catch (error) {
    console.error('Seed data failed with ', error.message);
  } finally {
    dbClient.close();
  }
};

export default createDocuments;
