import { verifyAuthToken } from '#utils';
import express from 'express';
import { orgController, userController } from '#controllers';

const organizationRouter = express.Router();

organizationRouter.post('', verifyAuthToken, orgController.createOrganization); // create org
organizationRouter.get('/:id', verifyAuthToken, orgController.getOrganizationDetails);
organizationRouter.delete('/:id', verifyAuthToken, orgController.deleteOrganization);

organizationRouter.get('/:id/stats', verifyAuthToken, orgController.getStats);

organizationRouter.post('/team', verifyAuthToken, orgController.createTeam);
organizationRouter.post('/team/:id/user/', verifyAuthToken, userController.googleAuth);
organizationRouter.put('/team/:id/user/:userId/role', verifyAuthToken, userController.googleAuth);
organizationRouter.delete('/team/:id/user/', verifyAuthToken, userController.googleAuth);

export default organizationRouter;
