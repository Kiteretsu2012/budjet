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
export const verifyOrgMember = async (req, res, next) => {
	try {
		const member = await Member.findOne({
			id: res.locals._id,
			organization: req.params.orgID,
		});
		if (!member) {
			return res.status(400).send({ message: 'Not a member' });
		}

		res.locals.orgID = req.params.orgID;
		res.locals.member = member;

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
		const isOrgAdmin = res.locals.member.roles.some(({ level }) => level === 'ADMIN');
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
export const verifyTeam = (requiredLevel) => async (req, res, next) => {
	try {
		const isTeamParticipant = res.locals.member.roles.some(
			({ level, team }) => level === requiredLevel && res.locals.budgetTeams.some(team.equals)
		);
		if (!isTeamParticipant) {
			return res.status(400).send({ message: 'Not in team' });
		}
		return next();
	} catch (error) {
		logger.error(error.message, error);
		return res.status(400).send({ message: error.message || 'Unauthorized Request' });
	}
};

/**
 * @returns {express.Handler}
 */
export const verifyAdminOrLeader =
	(teams = []) =>
	async (req, res, next) => {
		try {
			if (res.locals.budgetTeams) {
				teams = res.locals.budgetTeams;
			}
			const isOrgAdmin = res.locals.member.roles.some(({ level }) => level === 'ADMIN');
			const isTeamLeader = res.locals.member.roles.some(
				({ level, team }) => level === 'TEAM_LEADER' && teams.some(team.equals)
			);

			if (!isTeamLeader && !isOrgAdmin) {
				return res.status(400).send({ message: 'Not allowed' });
			}
			return next();
		} catch (error) {
			logger.error(error.message, error);
			return res.status(400).send({ message: error.message || 'Unauthorized Request' });
		}
	};
