import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

const requestSchema = new Schema({
  status: {
    type: String,
  },
  description: {
    type: String,
  },
  dateRequested: {
    type: Date,
    default: new Date(),
  },
  dateClosed: {
    type: Date,
  },

  customerId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },

  agentId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
});

export default mongoose.model('Request', requestSchema);
