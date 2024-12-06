import { Router } from 'express';
import { auth } from '../../shared/middleware';
import { createUserOrLogin, getUserData } from './controller';

const authRouter = Router();

authRouter.post('/signupAndLogin', createUserOrLogin);
authRouter.get('/', auth, getUserData);

export default authRouter;
