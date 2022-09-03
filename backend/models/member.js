import mongoose from 'mongoose';
const { Schema } = mongoose;

const memberSchema = new Schema({
	user: mongoose.SchemaTypes.ObjectId,
	organization: mongoose.SchemaTypes.ObjectId,
	roles: [
		{
			level: { type: String, enum: ['ADMIN', 'TEAM_LEADER', 'TEAM_MEMBER', 'VIEWER'] }, // viewer doesn't require login
			team: { type: mongoose.SchemaTypes.ObjectId, ref: 'teams' }, // value will be null for admins
		},
	],
});

memberSchema.pre('save', function save(next) {
	const profile = this;
	profile.lastUpdated = Date.now();
	next();
});

memberSchema.pre('updateOne', function updateOne(next) {
	const profile = this;
	profile.lastUpdated = Date.now();
	next();
});
const Member = mongoose.model('members', memberSchema);
export default Member;
