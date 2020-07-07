import mongoose, { Document } from 'mongoose';
import { statusEnum } from '../../api/utils/constants';
import { IUser } from './user';

export interface IRequest extends Document {
  status: string;
  description: string;
  dateRequested: Date;
  dateClosed: Date;
  customer: IUser;
  agent: IUser;
  assignAgent(agentId: string): Promise<this>;
  updateStatus(status: string): Promise<this>;
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

  customer: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    index: true,
    required: true,
  },

  agent: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    index: true,
    required: false,
  },
});

requestSchema.methods.assignAgent = async function (agentId: string) {
  this.agent = agentId;
  await this.save();
  return this;
};

requestSchema.methods.updateStatus = async function (status: statusEnum) {
  this.status = status;
  if (status === statusEnum.CLOSED) this.dateClosed = new Date();
  await this.save();
  return this;
};

export default mongoose.model('Request', requestSchema);
