import mongoose, { Document } from 'mongoose';
import { hashPassword, isMatchPassword } from '../../api/utils/password';

export interface IUser extends Document {
  _id: string;
  name: string;
  password: string;
  email: string;
  dateCreated: Date;
  accountType: string;
  isMatchPassword(password: string): boolean
}

const Schema = mongoose.Schema;

const userSchema = new Schema({
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
    default: 'customer',
  },
});

userSchema.pre<IUser>('save', function (next) {
  const user = this;
  if (!user.isModified('password')) return next();
  user.password = hashPassword(user.password);
  next();
});

userSchema.methods.isMatchPassword = function (password: string) {
  return isMatchPassword(password, this.password);
};

export default mongoose.model('User', userSchema);
