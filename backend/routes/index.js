import { orgController } from '#controllers';
import { verifyAuthToken, verifyOrgMember } from '#utils';
import { Router } from 'express';
import organizationRouter from './organization.js';
import userRouter from './user.js';

const apiRouter = Router();

apiRouter.use('/user', userRouter);
apiRouter.post('/org', verifyAuthToken, orgController.createOrganization);
apiRouter.use('/org/:orgID', verifyAuthToken, verifyOrgMember, organizationRouter);

apiRouter.get('/', async (req, res) => {
	res.send('This api was made by the monkeys of narmada');
	return;
});

export default apiRouter;
