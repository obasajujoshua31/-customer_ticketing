import User from '../../database/models/user';
import Request from '../../database/models/request';

export const findUserByEmail = async (email: string) => {
  return await User.findOne({ email });
};

export const findRequestById = async (id: string) => {
  return await Request.findById(id);
};
