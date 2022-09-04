import express from 'express';
import { budgetController } from '#controllers';
import { logger, verifyAdminOrLeader } from '#utils';
import { Budget } from '#models';

const budgetRouter = express.Router();

const verifyBudgetAccess = async (req, res, next) => {
	try {
		const budget = await Budget.findById(req.params.budgetID);

		const isTeamParticipant = res.locals.member.roles.some(({ team }) =>
			(budget.teams ?? []).some(team.equals)
		);

		if (!isTeamParticipant) {
			return res.status(400).send({ message: 'Not in team' });
		}
		return next();
	} catch (error) {
		logger.error(error.message, error);
		return res.status(400).send({ message: error.message || 'Unauthorized Request' });
	}
};

budgetRouter.post('', verifyAdminOrLeader, budgetController.createBudget);
budgetRouter.get('/:budgetID', verifyBudgetAccess, budgetController.getFullBudget);

budgetRouter.post('/:id/expense', verifyBudgetAccess, budgetController.createExpense);
budgetRouter.put('/expense/:id', verifyBudgetAccess, budgetController.updateExpense);
budgetRouter.delete('/expense/:id', verifyBudgetAccess, budgetController.deleteBudget); // join

export default budgetRouter;
