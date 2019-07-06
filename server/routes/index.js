import { Router } from 'express';

import UserController from '../controllers/userController';
import Middleware from '../middlewares/userMiddleware';


const { createUser } = UserController;
const { userSignupValidate } = Middleware;


const router = Router();


// User Routes
router.post('/auth/signup', userSignupValidate, createUser);

export default router;
