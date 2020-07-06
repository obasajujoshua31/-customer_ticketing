import mongoose, { Document } from 'mongoose';
import { statusEnum } from '../../api/utils/constants';

export interface IRequest extends Document {
  status: string;
  description: string;
  dateRequested: Date;
  dateClosed: Date;
  customerId: string;
  agentId: string;
}

const Schema = mongoose.Schema;

const requestSchema = new Schema({
  status: {
    type: String,
    default: statusEnum.PENDING,
  },

  description: {
    type: String,
    required: true,
    minlength: 5,
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
    indexes: true,
    required: true,
  },

  agentId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    indexes: true,
    required: false,
  },
});

export default mongoose.model('Request', requestSchema);
