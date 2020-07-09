import { IUser } from './user';
import { IRequest } from './request';
import * as mongoose from 'mongoose';

export interface IComment {
  content?: string;
  dateCreated?: Date;
  request?: IRequest;
  commentBy?: IUser;
}

const Schema = mongoose.Schema;

const commentSchema = new Schema({
  content: {
    type: String,
  },

  dateCreated: {
    type: Date,
    default: new Date(),
  },

  request: {
    type: Schema.Types.ObjectId,
    ref: 'Request',
    index: true,
  },

  commentBy: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
});

export default mongoose.model('Comment', commentSchema);
