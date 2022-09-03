import mongoose from 'mongoose';

const { Schema, Model } = mongoose;

const User = new Schema({
	name: String,
	role: [
		{
			level: { type: String, enum: ['ADMIN', 'TEAM_LEADER', 'TEAM_MEMBER', 'VIEWER'] }, // viewer doesn't require login
			team: { type: mongoose.SchemaTypes.ObjectId, ref: 'teams' }, // value will be null for admins
		},
	],
});
