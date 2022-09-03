import { verifyAuthToken } from '#utils';
import express from 'express';
import { userController } from '#controllers';

const userRouter = express.Router();

userRouter.post('/auth', verifyAuthToken, userController.googleAuth);

export default userRouter;
