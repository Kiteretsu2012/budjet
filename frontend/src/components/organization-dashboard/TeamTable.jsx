import { Flex } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import TeamCard from './TeamCard';
import api from '../../utils/api';

const TeamTable = () => {
	const [teamsData, setTeamsData] = useState([]);
	useEffect(() => {
		const dataFetcher = async () => {
			const orgId = '1234';
			const res = await api.get(`org/${orgId}/teams`);
			if (res) {
				setTeamsData(res);
			}
		};
		dataFetcher();
	}, []);
	return (
		<Flex w="100%" h="100vh" bg="#F1F1F1">
			{teamsData.map(({ name, organization, members }) => (
				<TeamCard teamName={name} organization={organization} members={members} />
			))}
		</Flex>
	);
};

export default TeamTable;
