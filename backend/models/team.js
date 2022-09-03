import mongoose from 'mongoose';
const { Schema } = mongoose;

const teamSchema = new Schema({
	name: { type: String },
	organization: mongoose.SchemaTypes.ObjectId,
	members: {
		type: [
			{
				id: { type: mongoose.SchemaTypes.ObjectId, ref: 'members' },
				scope: { type: String, enum: ['LEADER', 'MEMBER'] },
			},
		],
	},
});

teamSchema.index({ name: 1, organization: 1 }, { unique: true });

teamSchema.pre('save', function save(next) {
	const profile = this;
	profile.lastUpdated = Date.now();
	next();
});

teamSchema.pre('updateOne', function updateOne(next) {
	const profile = this;
	profile.lastUpdated = Date.now();
	next();
});

export default mongoose.model('teams', teamSchema);
