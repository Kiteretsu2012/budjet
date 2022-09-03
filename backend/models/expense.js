import mongoose from 'mongoose';

const { Schema } = mongoose;

const expenseSchema = new Schema({
	title: { type: String },
	description: String,
	budget: { type: mongoose.SchemaTypes.ObjectId, ref: 'budgets' },
	amounts: {
		A: Number,
		B: Number,
		C: Number,
	},
	tags: { type: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'tags' }], default: [] },
});

expenseSchema.pre('save', function save(next) {
	const profile = this;
	profile.lastUpdated = Date.now();
	next();
});

expenseSchema.pre('updateOne', function updateOne(next) {
	const profile = this;
	profile.lastUpdated = Date.now();
	next();
});

const Expense = mongoose.model('expense', expenseSchema);
export default Expense;
