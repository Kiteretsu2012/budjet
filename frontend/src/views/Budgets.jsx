import { Box, Button, Flex, Heading, HStack, Text, useToast, VStack } from '@chakra-ui/react';
import { useState } from 'react';
import { useEffect } from 'react';
import { Link } from 'wouter';
import AddBudgetModal from '../components/organization-dashboard/AddBudgetModal';
import Empty from '../components/user-dashboard/Empty';
import api from '../utils/api';

const Budgets = ({ orgID }) => {
	const [budgets, setBudgets] = useState([]);
	const [isAddBudgetModalVisible, setisAddBudgetModalVisible] = useState(false);
	const toast = useToast();
	useEffect(() => {
		const fetchBudgets = async () => {
			try {
				const res = await api.get(`org/${orgID}/budgets`);
				setBudgets(await res.json());
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
							<HStack
								key={index}
								backgroundColor="black"
								p="2rem"
								borderRadius="1rem"
								justify="space-between"
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
								<Button
									as={Link}
									to={`/org/${organisation._id}`}
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
							</HStack>
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
