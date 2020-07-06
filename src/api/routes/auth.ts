import { RegisterUser, LoginUser } from '../controllers/auth';
import { validateRegisterUser, validateLoginUser } from '../utils/validator';
import { Router } from 'express';

const authRouter = Router();

authRouter.post('/register', validateRegisterUser(), RegisterUser());
authRouter.post('/login', validateLoginUser(), LoginUser());

export default authRouter;
