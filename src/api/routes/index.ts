import { Router } from 'express';
import authRouter from './auth';
import requestRouter from './request';
import { verifyUser } from '../middlewares/auth';
import userRouter from './user';

const appRouter = Router();

appRouter.use('/auth', authRouter);
appRouter.use('/requests', verifyUser, requestRouter);
appRouter.use('/users', verifyUser, userRouter);

export default appRouter;
