import crypto from 'node:crypto';

import { Member, Organization } from '#models';
import { logger } from '#utils';
import mongoose from 'mongoose';

export const createOrganization = async (req, res) => {
	try {
		const userID = res.locals._id;
		const joiningCode = crypto.randomBytes(12).toString('hex');

		const session = await mongoose.startSession();
		session.startTransaction();

		const newOrg = new Organization({
			name: req.body.name,
			joiningCode,
			creator: userID,
		});

		const member = new Member({
			user: userID,
			organization: newOrg._id,
			roles: [{ level: 'ADMIN' }],
		});

		await Promise.all[(newOrg.save({ session }), member.save({ session }))];

		session.commitTransaction();
		await session.endSession();
		res.status(200).json({});
	} catch (err) {
		logger.error(err.message);
		res.status(500).json({ message: 'Error' });
	}
};

export const getOrganizationDetails = async (req, res) => {
	try {
		const userID = res.locals._id;

		const organization = await Organization.findById(req.params.id);

		res.status(200).json();
	} catch (err) {
		logger.error(err.message);
		res.status(500).json({ message: 'Error' });
	}
};

export const getStats = async (req, res) => {
	try {
		const userID = res.locals._id;

		res.status(200).json([]);
	} catch (err) {
		logger.error(err.message);
		res.status(500).json({ message: 'Error' });
	}
};

export const deleteOrganization = async (req, res) => {
	try {
		await Organization.findByIdAndDelete(req.params.id);

		res.status(200).json({});
	} catch (err) {
		logger.error(err.message);
		res.status(500).json({ message: 'Error' });
	}
};

export const createTeam = async (req, res) => {
	try {
		await Organization.findByIdAndDelete(req.params.id);

		res.status(200).json({});
	} catch (err) {
		logger.error(err.message);
		res.status(500).json({ message: 'Error' });
	}
};
