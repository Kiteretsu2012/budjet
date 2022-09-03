import mongoose from 'mongoose';

const { Schema, Model } = mongoose;

const Organization = new Schema({
	name: String,
	admin: {},
});
