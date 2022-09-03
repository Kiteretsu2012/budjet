import { Budget, Expense } from '#models';
import { logger } from '#utils';

export const createBudget = async (req, res) => {
	try {
		const budget = new Budget({
			title: req.body.title,
			teams: req.body.teams,
			organization: res.locals.orgID,
			description: req.body.title,
		});
		await budget.save();
		res.json(budget);
	} catch (err) {
		logger.error(err.message);
		res.status(500).json({ message: 'Error' });
	}
};

export const getFullBudget = async (req, res) => {
	try {
		const budget = await Budget.findById(req.params.id);
		if (!budget) {
			return res.status(404).json({ message: 'Budget not found.' });
		}

		const budgetPojo = budget.toObject();
		const expenses = await Expense.find({ budget: budget._id });

		res.status(200).json({
			...budgetPojo,
			expenses,
		});
	} catch (err) {
		logger.error(err.message);
		res.status(500).json({ message: 'Error' });
	}
};

export const deleteBudget = async (req, res) => {
	try {
		await Budget.findByIdAndDelete(req.params.id);

		res.status(200).json({});
	} catch (err) {
		logger.error(err.message);
		res.status(500).json({ message: 'Error' });
	}
};

export const createExpense = async (req, res) => {
	try {
		const expense = new Expense({
			title: req.body.title,
			description: req.body.title,
			budget: req.params.budgetID,
			amounts: req.body.amounts,
		});
		await expense.save();
		res.status(200).json(expense.toObject());
	} catch (err) {
		logger.error(err.message);
		res.status(500).json({ message: 'Error' });
	}
};

export const updateExpense = async (req, res) => {
	try {
		const updatedExpense = await Expense.findByIdAndUpdate(req.params.id, req.body, {
			new: true,
		});
		res.status(200).json(updatedExpense.toObject());
	} catch (err) {
		logger.error(err.message);
		res.status(500).json({ message: 'Error' });
	}
};

export const deleteExpense = async (req, res) => {
	try {
		await Expense.findByIdAndDelete(req.params.id);
		res.status(200).json({});
	} catch (err) {
		logger.error(err.message);
		res.status(500).json({ message: 'Error' });
	}
};
