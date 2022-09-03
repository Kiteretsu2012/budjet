import jwt from 'jsonwebtoken';
import { OAuth2Client } from 'google-auth-library';

import { User } from '#models';

import { logger } from '#utils';

export const googleAuth = async (req, res) => {
	const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

	try {
		const ticket = await client.verifyIdToken({
			idToken: req.body.credential,
			audience: process.env.GOOGLE_CLIENT_ID,
		});

		const payload = ticket.getPayload();

		const user = await User.findOne({ email: payload.email }).exec();

		if (user) {
			const { name } = user.toObject();
			const token = jwt.sign({ name, email: payload.email }, process.env.AUTH_TOKEN);

			await user.save();

			res.status(200).send({
				name,
				email: payload.email,
				token,
			});
		} else {
			const user = new User({
				name: payload.name,
				email: payload.email,
			});
			const token = jwt.sign(
				{ name: payload.name, email: payload.email },
				process.env.AUTH_TOKEN
			);

			const { name, email } = user.toObject();
			await user.save();

			res.status(200).send({ name, email, token });
		}
	} catch (err) {
		logger.error(err.message);
		res.status(500).json({ message: 'Error' });
	}
};
