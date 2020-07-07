import mongoose, { Document } from 'mongoose';
import { hashPassword, isMatchPassword } from '../../api/utils/password';

export interface IUser extends Document {
  _id: string;
  name: string;
  password: string;
  email: string;
  dateCreated: Date;
  accountType: string;
  isDeactivated: boolean;
  isMatchPassword(password: string): boolean;
  deactivate(): Promise<this>;
  reactivate(): Promise<this>;
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
  isDeactivated: {
    type: Boolean,
    default: false,
  },
  dateDeactivated: {
    type: Date,
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

userSchema.methods.deactivate = async function () {
  this.isDeactivated = true;
  this.dateDeactivated = new Date();
  await this.save();
  return this;
};

userSchema.methods.reactivate = async function () {
  this.isDeactivated = false;
  await this.save();
  return this;
};

export default mongoose.model('User', userSchema);
