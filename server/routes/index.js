import { Router } from 'express';

import UserController from '../controllers/userController';
import BusController from '../controllers/busController';
import UserMiddleware from '../middlewares/userMiddleware';
import BusMiddleware from '../middlewares/busMiddleware';
import Authorization from '../middlewares/authentication';


const { createUser, loginUser } = UserController;
const { createBus } = BusController;
const { userSignupValidate, userLoginValidate } = UserMiddleware;
const { BusCreateValidate } = BusMiddleware;
const { verifyUser, verifyAdmin } = Authorization;


const router = Router();


// User Routes
router.post('/auth/signup', userSignupValidate, createUser);
router.post('/auth/signin/', userLoginValidate, loginUser);
router.post('/buses', verifyAdmin, BusCreateValidate, createBus);

export default router;
