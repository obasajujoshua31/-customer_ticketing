import { isAdmin } from './../middlewares/auth';
import { getUser } from './../middlewares/user';
import {
  getAllUsers,
  getUserById,
  deactivateCustomerOrAgent,
} from '../controllers/user';
import {} from '../utils/validator';
import { Router } from 'express';

const userRouter = Router();

// users routes only for admin

userRouter.get('/', isAdmin, getAllUsers());
userRouter.get('/:userId', isAdmin, getUser, getUserById());
userRouter.put(
  '/:userId/deactivate',
  isAdmin,
  getUser,
  deactivateCustomerOrAgent()
);

export default userRouter;
