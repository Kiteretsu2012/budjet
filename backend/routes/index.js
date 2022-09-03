import { Router } from 'express';
import userRouter from './user.js';

const apiRouter = Router();

apiRouter.use('/user', userRouter);

apiRouter.get('/', async (req, res) => {
	res.send('This api was made by the monkeys of narmada');
	return;
});

export default apiRouter;
