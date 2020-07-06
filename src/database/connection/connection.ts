const connectToDatabase = (dbURI: string): void => {
  const mongoose = require('mongoose');
  mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true });

  const db = mongoose.connection;

  db.on('error', console.error.bind(console, 'connection error'));

  db.once('open', () => {
    console.log('Database connected!');
  });
};

export default connectToDatabase;
