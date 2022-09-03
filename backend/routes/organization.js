import { verifyAuthToken, verifyOrgAdmin, verifyTeamLeader } from '#utils';
import express from 'express';
import { orgController, userController } from '#controllers';

const organizationRouter = express.Router();

organizationRouter.post('', verifyAuthToken, orgController.createOrganization); // create org
organizationRouter.get('/:id', verifyAuthToken, orgController.getOrganizationDetails);
organizationRouter.delete(
	'/:id',
	verifyAuthToken,
	verifyOrgAdmin,
	orgController.deleteOrganization
);

organizationRouter.get('/:id/stats', verifyAuthToken, orgController.getStats);
organizationRouter.get('/:id/budgets', verifyAuthToken, orgController.getBudgets);
organizationRouter.get('/:id/teams', verifyAuthToken, orgController.getBudgets);

organizationRouter.post('/team', verifyAuthToken, verifyOrgAdmin, orgController.createTeam);
organizationRouter.post(
	'/team/:teamID/user/',
	verifyAuthToken,
	verifyOrgAdmin,
	verifyTeamLeader,
	userController.googleAuth
);
organizationRouter.put(
	'/team/:teamID/user/:userId/role',
	verifyAuthToken,
	verifyOrgAdmin,
	verifyTeamLeader,
	userController.googleAuth
);
organizationRouter.delete(
	'/team/:teamID/user/',
	verifyAuthToken,
	verifyOrgAdmin,
	verifyTeamLeader,
	userController.googleAuth
);

export default organizationRouter;
