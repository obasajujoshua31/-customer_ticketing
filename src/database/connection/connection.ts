import mongoose from 'mongoose';
import IConfig from '../../config/iConfig';

/**
 * @description This connects the application to database
 *
 * @param {IConfig} appConfig
 * @returns {void}
 */
const connectToDatabase = (appConfig: IConfig): void => {
  mongoose.connect(appConfig.dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: appConfig.dbName,
    useCreateIndex: true,
  });

  // Get the default connection
  const db = mongoose.connection;

  // Bind connection to error event (to get notification of connection errors)
  db.on('error', console.error.bind(console, 'MongoDB connection error:'));

  db.once('open', () => {
    console.log('Database connected!');
  });
};

export default connectToDatabase;
