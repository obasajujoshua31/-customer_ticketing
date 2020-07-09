import { RegisterUser, LoginUser } from '../controllers/auth';
import { validateRegisterUser, validateLoginUser } from '../utils/validator';
import { Router } from 'express';

const authRouter = Router();

// auth routes
authRouter.post('/register', validateRegisterUser(), RegisterUser());
authRouter.post('/login', validateLoginUser(), LoginUser());

export default authRouter;
