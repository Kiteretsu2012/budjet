import mongoose from 'mongoose';
const { Schema } = mongoose;

const teamSchema = new Schema({
	name: { type: String },
	organization: { type: mongoose.SchemaTypes.ObjectId, ref: 'organizations' },
	members: { type: mongoose.SchemaTypes.ObjectId, ref: 'members' },
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

const Team = mongoose.model('teams', teamSchema);
export default Team;
