import express from 'express';
import { userController } from '#controllers';
import { verifyAuthToken } from '#utils';

const userRouter = express.Router();

userRouter.get('/check', verifyAuthToken, userController.checkUser);

userRouter.post('/auth', userController.googleAuth);
userRouter.put('/join/org', verifyAuthToken, userController.joinOrganization); // join
userRouter.get('/orgs', verifyAuthToken, userController.getOrganizations);

export default userRouter;
