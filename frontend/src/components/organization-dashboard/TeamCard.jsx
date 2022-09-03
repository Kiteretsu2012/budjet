import {
	Flex,
	Text,
	Divider,
	Heading,
	Icon,
	Accordion,
	AccordionIcon,
	AccordionButton,
	AccordionItem,
	AccordionPanel,
	Box,
} from '@chakra-ui/react';
import { FcOrganization, FcPodiumWithSpeaker } from 'react-icons/fc';

const TeamCard = ({ teamName, organization, members }) => {
	return (
		<Flex
			w="25%"
			h="auto"
			maxH="200px"
			bg="white"
			color="black"
			pt="20px"
			pl="10px"
			minW="350px"
			style={{
				borderRadius: '12px',
				background: '#fff',
				boxShadow: '20px 20px 60px #cdcdcd, -20px -20px 60px #ffffff',
			}}
			direction="column"
		>
			<Heading size="md" w="100%" h="auto" fontSize="1.3rem">
				Linux Mint
			</Heading>
			<Divider orientation="horizontal" w="100%" />
			<Flex gap="40px">
				<Flex direction="column">
					<Text color="gray.400" mt="5%" fontSize="1rem">
						<Icon as={FcOrganization} /> Organization:
					</Text>
					<Text textAlign="center">{organization}</Text>
				</Flex>
				<Flex direction="column">
					<Text color="gray.400" mt="5%" fontSize="1rem">
						<Icon as={FcPodiumWithSpeaker} /> No. Of Members
					</Text>
					<Text textAlign="center">{members.length}</Text>
				</Flex>
			</Flex>
			<Accordion allowToggle>
				<AccordionItem>
					<h2>
						<AccordionButton>
							<Box flex="1" textAlign="left">
								Show all members
							</Box>
							<AccordionIcon />
						</AccordionButton>
					</h2>
					<AccordionPanel pb={4}>{members.map((elem) => elem.name)}</AccordionPanel>
				</AccordionItem>
			</Accordion>{' '}
		</Flex>
	);
};

export default TeamCard;
