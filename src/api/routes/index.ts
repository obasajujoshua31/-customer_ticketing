import { Router } from 'express';
import authRouter from './auth';
import requestRouter from './request';
import { verifyUser } from '../middlewares';

const appRouter = Router();

appRouter.use('/auth', authRouter);
appRouter.use('/requests', verifyUser, requestRouter);

export default appRouter;
