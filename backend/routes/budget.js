import express from 'express';
import { budgetController } from '#controllers';
import { verifyAuthToken, verifyOrgAdmin } from '#utils';

const budgetRouter = express.Router();

// TODO: add team leader editing functionality

budgetRouter.post('', verifyAuthToken, verifyOrgAdmin, budgetController.createBudget);
budgetRouter.get('/:id', verifyAuthToken, budgetController.getFullBudget);

budgetRouter.post('/:id/expense', verifyAuthToken, verifyOrgAdmin, budgetController.createExpense);
budgetRouter.put('/expense/:id', verifyAuthToken, verifyOrgAdmin, budgetController.updateExpense);
budgetRouter.delete('/expense/:id', verifyAuthToken, verifyOrgAdmin, budgetController.deleteBudget); // join

export default budgetRouter;
