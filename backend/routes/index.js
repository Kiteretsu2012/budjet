import { Router } from 'express';
import organizationRouter from './organization.js';
import userRouter from './user.js';

const apiRouter = Router();

apiRouter.use('/user', userRouter);
apiRouter.use('/org', organizationRouter);

apiRouter.get('/', async (req, res) => {
	res.send('This api was made by the monkeys of narmada');
	return;
});

export default apiRouter;
