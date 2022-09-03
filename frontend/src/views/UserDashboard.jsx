import {
	Box,
	Button,
	Divider,
	Flex,
	Heading,
	HStack,
	Text,
	useColorModeValue,
	VStack,
} from '@chakra-ui/react';
import { useState } from 'react';
import { FaKey, FaPlus } from 'react-icons/fa';
import levelsMap from '../../constants/levelsMap';
import CreateOrgModal from '../components/user-dashboard/CreateOrgModal';
import Empty from '../components/user-dashboard/Empty';

import Header from '../components/user-dashboard/Header';
import JoinOrg from '../components/user-dashboard/JoinOrg';

function UserDashboard() {
	const [userDetails, setUserDetails] = useState(JSON.parse(localStorage.getItem('userDetails')));
	// console.log(userDetails);
	// const userDetails = {
	// 	organisations: [
	// 		{ name: 'E-Cell', level: 'ADMIN' },
	// 		{ name: 'E-Cell', level: 'ADMIN' },
	// 		{ name: 'E-Cell', level: 'ADMIN' },
	// 	],
	// };

	const [createOrgModalVisible, setCreateOrgModalVisible] = useState(false);
	return (
		<Box minH="100vh" bg={useColorModeValue('gray.100', 'gray.900')}>
			<CreateOrgModal
				createOrgModalVisible={createOrgModalVisible}
				setCreateOrgModalVisible={setCreateOrgModalVisible}
			/>
			<Header />
			<HStack
				padding="2rem"
				marginX="2rem"
				marginTop="2rem"
				borderRadius="1rem"
				bgColor="#EDE3E9"
				// h="100vh"
				justify="space-around"
			>
				{' '}
				<VStack>
					<Text fontSize={'2.2rem'} fontFamily="fantasy" mb="1rem">
						Get started with <strong>BudJet</strong> to propel your budget management.
					</Text>
					<Text fontSize={'2rem'} fontWeight={'medium'}>
						Create an Organisation
					</Text>
					<Button
						leftIcon={<FaPlus />}
						colorScheme="purple"
						variant="solid"
						onClick={() => setCreateOrgModalVisible(true)}
						disabled={createOrgModalVisible}
					>
						{' '}
						Create Organisation
					</Button>
					<Text fontSize={'1.5rem'}>Or</Text>
					<Text fontSize={'2rem'} fontWeight={'medium'}>
						Join an Organisation
					</Text>
					<JoinOrg />
				</VStack>
				<Box height="40vh">
					<Divider orientation="vertical" borderWidth="0.2rem" borderColor="white" />
				</Box>
				{userDetails?.organisations?.length > 0 ? (
					<VStack>
						{userDetails.organisations.map((organisation, index) => {
							return (
								<Flex
									key={index}
									p={50}
									w="full"
									alignItems="center"
									justifyContent="center"
								>
									<Flex
										maxW="md"
										mx="auto"
										bg="gray.800"
										shadow="lg"
										rounded="lg"
										overflow="hidden"
									>
										<Box
											p={{
												base: 4,
												md: 4,
											}}
										>
											<Heading
												fontSize="2xl"
												fontWeight="bold"
												color="white"
												_dark={{
													color: 'white',
												}}
											>
												{organisation.name}
											</Heading>
											<Text
												mt={2}
												fontSize="sm"
												color="gray.600"
												_dark={{
													color: 'gray.400',
												}}
											>
												Lorem ipsum dolor sit amet consectetur adipisicing
												elit In odit
											</Text>
											<Flex
												mt={3}
												alignItems="center"
												justifyContent="space-between"
											>
												<Heading
													color="white"
													fontWeight="bold"
													fontSize="lg"
												>
													{levelsMap[organisation.level]}
												</Heading>
												<Button
													px={2}
													py={1}
													bg="white"
													fontSize="xs"
													color="gray.900"
													fontWeight="bold"
													rounded="lg"
													textTransform="uppercase"
													_hover={{
														bg: 'gray.200',
													}}
													_focus={{
														bg: 'gray.400',
													}}
												>
													Go to Organisation
												</Button>
											</Flex>
										</Box>
									</Flex>
								</Flex>
							);
						})}
					</VStack>
				) : (
					<Empty setCreateOrgModalVisible={setCreateOrgModalVisible} />
				)}
			</HStack>
		</Box>
	);
}

export default UserDashboard;
