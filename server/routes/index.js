import { Router } from 'express';

import UserController from '../controllers/userController';
import Middleware from '../middlewares/userMiddleware';


const { createUser, loginUser } = UserController;
const { userSignupValidate, userLoginValidate } = Middleware;


const router = Router();


// User Routes
router.post('/auth/signup', userSignupValidate, createUser);
router.post('/auth/signin/', userLoginValidate, loginUser);

export default router;
