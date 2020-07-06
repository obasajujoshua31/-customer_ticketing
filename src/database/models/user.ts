import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

const userSchema = new Schema({
  _id: Schema.Types.ObjectId,

  name: {
    type: String,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
  },
  dateCreated: {
    type: Date,
    default: new Date(),
  },
  accountType: {
    type: String,
  },
});

export default mongoose.model('User', userSchema);
