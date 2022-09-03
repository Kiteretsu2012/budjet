import express from 'express';
import { budgetController } from '#controllers';
import { logger, verifyAdminOrLeader, verifyTeam } from '#utils';
import { Budget } from '#models';

const budgetRouter = express.Router();

const getTeamsHandlingBudget = async (req, res, next) => {
	try {
		const budget = await Budget.findById(req.params.budgetID);

		res.locals.budgetTeams = budget.teams;

		next();
	} catch (error) {
		logger.error(error.message, error);
		return res.status(400).send({ message: error.message || 'Unauthorized Request' });
	}
};

budgetRouter.post('', verifyAdminOrLeader(), budgetController.createBudget);
budgetRouter.get(
	'/:budgetID',
	getTeamsHandlingBudget,
	verifyTeam('TEAM_MEMBER'),
	budgetController.getFullBudget
);

budgetRouter.post(
	'/:id/expense',
	getTeamsHandlingBudget,
	verifyAdminOrLeader(),
	budgetController.createExpense
);
budgetRouter.put(
	'/expense/:id',
	getTeamsHandlingBudget,
	verifyAdminOrLeader(),
	budgetController.updateExpense
);
budgetRouter.delete(
	'/expense/:id',
	getTeamsHandlingBudget,
	verifyAdminOrLeader(),
	budgetController.deleteBudget
); // join

export default budgetRouter;
