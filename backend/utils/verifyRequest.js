import { Member } from '#models';
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

/**
 * @type {express.Handler}
 */
export const verifyOrgAdmin = async (req, res, next) => {
	try {
		const member = await Member.findOne({
			id: res.locals._id,
			organization: req.headers.organizationid,
		});

		res.locals.organizationID = req.headers.organizationid;

		const isOrgAdmin = member.roles.some(({ level }) => level === 'ADMIN');
		if (!isOrgAdmin) {
			return res.status(400).send({ message: 'Not an admin' });
		}
		return next();
	} catch (error) {
		logger.error(error.message, error);
		return res.status(400).send({ message: error.message || 'Unauthorized Request' });
	}
};

/**
 * @type {express.Handler}
 */
export const verifyTeamLeader = async (req, res, next) => {
	try {
		const member = await Member.findOne({
			id: res.locals._id,
			organization: req.headers.organizationid,
		});

		const isTeamLeader = member.roles.some(
			({ level, team }) => level === 'TEAM_LEADER' && team.equals(req.params.teamID)
		);
		if (!isTeamLeader) {
			return res.status(400).send({ message: 'Not a team leader' });
		}
		return next();
	} catch (error) {
		logger.error(error.message, error);
		return res.status(400).send({ message: error.message || 'Unauthorized Request' });
	}
};
