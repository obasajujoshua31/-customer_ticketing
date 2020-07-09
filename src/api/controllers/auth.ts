import User, { IUser } from '../../database/models/user';
import { tryAsync } from '../utils/global';
import { createdResponse, badRequest, successResponse } from '../utils/http';
import { generateToken } from '../utils/jwt';
import { findUserByEmail } from '../utils/query';
import { logger } from '../utils/logger';

export const RegisterUser = () =>
  tryAsync(async (req, res) => {
    const { email, password, name } = req.body;

    const existingUser = await findUserByEmail(email);
    if (existingUser) {
      logger.log({ level: 'error', message: 'Email is not available' });
      return badRequest(res, { message: 'Email is not available' });
    }

    const user = new User({
      email,
      password,
      name,
    });

    const newUser = await user.save();
    const token = generateToken(newUser._id.toString());
    return createdResponse(res, { token });
  });

export const LoginUser = () =>
  tryAsync(async (req, res) => {
    const { email, password } = req.body;

    const user = (await findUserByEmail(email)) as IUser;
    if (!user) {
      logger.log({ level: 'error', message: 'Email is invalid' });
      return badRequest(res, { message: 'Invalid login credentials' });
    }

    if (user.isDeactivated) {
      logger.log({ level: 'error', message: 'Account is deactivated' });
      return badRequest(res, { message: 'user account is deactivated' });
    }

    if (!user.isMatchPassword(password)) {
      logger.log({ level: 'error', message: 'Password does not match' });
      return badRequest(res, { message: 'Invalid login credentials' });
    }

    const token = generateToken(user._id.toString());
    return successResponse(res, { token });
  });
