import { Button, Flex, HStack, VStack } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import TeamCard from './TeamCard';
import api from '../../utils/api';

const TeamTable = () => {
	const [teamsData, setTeamsData] = useState([]);
	useEffect(() => {
		const dataFetcher = async () => {
			const orgId = '63138fe776adc9d5ad9aa3bf';
			const res = await api.get(`org/${orgId}/teams`).json();
			setTeamsData(res);
		};
		dataFetcher();
	}, []);
	console.log(teamsData);
	return (
		<VStack>
			<HStack justifyContent="end" w="100%">
				<Button bg="#FE5C5C" color="white">
					Add Team
				</Button>
			</HStack>
			<Flex w="100%" h="100vh" bg="#F1F1F1">
				{teamsData?.map(({ name, organization, members }) => (
					<TeamCard
						teamName={name}
						organization={organization}
						members={members}
						key={name}
					/>
				))}
				<TeamCard teamName="Linux Mint" organization="Nvidia" members={[]} />
			</Flex>
		</VStack>
	);
};

export default TeamTable;
