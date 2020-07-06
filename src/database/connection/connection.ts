import mongoose from 'mongoose';
import IConfig from '../../config/iConfig';

const connectToDatabase = (appConfig: IConfig) => {
  mongoose.connect(appConfig.dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: appConfig.dbName,
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
