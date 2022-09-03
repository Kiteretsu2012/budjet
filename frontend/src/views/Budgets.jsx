import { Box, Button, Flex, Heading, HStack, Text, useToast, VStack } from '@chakra-ui/react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useLocation } from 'wouter';
import AddBudgetModal from '../components/organization-dashboard/AddBudgetModal';
import Empty from '../components/user-dashboard/Empty';
import api from '../utils/api';

const Budgets = ({ orgID }) => {
	console.log(orgID);
	const [location, setLocation] = useLocation();
	const [budgets, setBudgets] = useState([
		{ title: 'Hello', description: 'What are you upto' },
		{ title: 'Hello', description: 'What are you upto' },
		{ title: 'Hello', description: 'What are you upto' },
	]);
	const [isAddBudgetModalVisible, setisAddBudgetModalVisible] = useState(false);
	const toast = useToast();
	useEffect(() => {
		const fetchBudgets = async () => {
			try {
				const res = api.get(`org/${orgID}/budgets`);
				// setBudgets(res);
			} catch (err) {
				toast({
					title: 'Error',
					description: err.message,
					status: 'error',
					duration: 9000,
					isClosable: true,
				});
			}
		};
		fetchBudgets();
	}, []);

	const handleClick = (budgetID) => {
		setLocation(`/org/${orgID}/budget/${budgetID}`);
	};

	return (
		<>
			<HStack>
				<Heading marginRight="1rem">Budgets 💸</Heading>
				<AddBudgetModal
					orgID={orgID}
					isAddBudgetModalVisible={isAddBudgetModalVisible}
					setIsAddBudgetModalVisible={setisAddBudgetModalVisible}
				/>
				<Button
					colorScheme="purple"
					color="white"
					onClick={() => setisAddBudgetModalVisible(true)}
				>
					Create Budget
				</Button>
			</HStack>
			{budgets.length > 0 ? (
				<VStack>
					{budgets.map((budget, index) => {
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
											{budget.title}
										</Heading>
										<Text
											mt={2}
											fontSize="sm"
											color="gray.600"
											_dark={{
												color: 'gray.400',
											}}
										>
											{budget.description}
										</Text>
										<Flex
											mt={3}
											alignItems="center"
											// justifyContent="space-between"
											justifyContent="flex-end"
										>
											{/* <Heading color="white" fontWeight="bold" fontSize="lg">
												{levelsMap[budget.level]}
											</Heading> */}
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
												onClick={() => handleClick(budget._id)}
											>
												Take a closer look
											</Button>
										</Flex>
									</Box>
								</Flex>
							</Flex>
						);
					})}
				</VStack>
			) : (
				<Empty emptyType="budget" />
			)}
		</>
	);
};

export default Budgets;
