import * as mongoose from 'mongoose';

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
  },

  commentBy: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
});

export default mongoose.model('Comment', commentSchema);
