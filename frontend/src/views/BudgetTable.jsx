import {
	Table,
	Thead,
	Tbody,
	Tfoot,
	Tr,
	Th,
	Td,
	TableCaption,
	TableContainer,
	useToast,
	Button,
	Flex,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import AddExpenseModal from '../components/organization-dashboard/AddExpenseModal';
import api from '../utils/api';

const BudgetTable = () => {
	const toast = useToast();
	const [expenses, setExpenses] = useState([]);
	const [isAddExpenseModalVisible, setIsAddExpenseModalVisible] = useState(false);
	const orgID = window.location.pathname.split('/')[2];
	const budgetID = window.location.pathname.split('/')[4];
	useEffect(() => {
		const dataFetcher = async () => {
			try {
				const res = await api.get(`org/${orgID}/budget/${budgetID}`).json();
				setExpenses(res);
			} catch (err) {
				const message = JSON.parse(await err.response.text()).message;
				toast({
					title: 'Error',
					description: message || 'Server Error',
					status: 'error',
					duration: 9000,
					isClosable: true,
				});
			}
		};
		dataFetcher();
	}, []);
	return (
		<>
			<Flex justify="end">
				<Button
					colorScheme="whatsapp"
					mb="20px"
					onClick={() => setIsAddExpenseModalVisible(true)}
				>
					New Expense
				</Button>
			</Flex>
			<AddExpenseModal
				orgID={orgID}
				isAddExpenseModalVisible={isAddExpenseModalVisible}
				setIsAddExpenseModalVisible={setIsAddExpenseModalVisible}
				setExpenses={setExpenses}
			/>
			<TableContainer
				bg="white"
				style={{
					borderRadius: '12px',
					boxShadow: '10px 10px 30px #cdcdcd, -10px -10px 30px #ffffff',
				}}
			>
				<Table variant="simple">
					<TableCaption>List Of All Impending Budgets</TableCaption>
					<Thead>
						<Tr>
							<Th>Title</Th>
							<Th>Description</Th>
							<Th>Plan-A</Th>
							<Th>Plan-B</Th>
							<Th>Plan-C</Th>
						</Tr>
					</Thead>
					<Tbody>
						{expenses.map(({ title, description, amounts: { A, B, C } }) => (
							<Tr key={title}>
								<Td>{title}</Td>
								<Td>{description}</Td>
								<Td>{A}</Td>
								<Td>{B}</Td>
								<Td>{C}</Td>
							</Tr>
						))}
					</Tbody>
				</Table>
			</TableContainer>
		</>
	);
};

export default BudgetTable;
