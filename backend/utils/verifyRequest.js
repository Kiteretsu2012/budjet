import jwt from 'jsonwebtoken';
const { verify } = jwt;
import logger from './loggerUtils.js';

/**
 * @type {express.Handler}
 */
export const verifyAuthToken = (req, res, next) => {
	try {
		const payload = verify(req.headers.authorization, process.env.AUTH_TOKEN);

		res.locals = payload;
		return next();
	} catch (error) {
		logger.error(error.message, error);
		return res.status(400).send({ message: error.message || 'Unauthorized Request' });
	}
};
