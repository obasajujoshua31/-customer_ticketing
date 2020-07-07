import { IRequest } from './../../src/database/models/request';
import { IUser } from '../../src/database/models/user';

declare global {
  namespace Express {
    interface Request {
      user: IUser;
      request: IRequest;
      foundUser: IUser;
    }
  }
}
