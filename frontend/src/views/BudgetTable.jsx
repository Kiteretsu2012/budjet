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
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import api from '../utils/api';

const BudgetTable = () => {
	const toast = useToast();
	const [budgets, setBudgets] = useState([]);
	useEffect(() => {
		const dataFetcher = async () => {
			const orgId = '63138fe776adc9d5ad9aa3bf';
			const expenseId = '1234';
			try {
				const res = await api.get(`budget/${expenseId}`).json();
				setBudgets(res);
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
						<Th>Teams</Th>
					</Tr>
				</Thead>
				<Tbody>
					{budgets.map(({ title, organization, teams }) => (
						<Tr key={title}>
							<Td>{title}</Td>
							<Td>{organization}</Td>
							<Td>{teams.map((elem) => elem)}</Td>
						</Tr>
					))}
				</Tbody>
				<Tfoot>
					<Tr>
						<Th>List</Th>
						<Th>Of All</Th>
						<Th isNumeric>impending budgets</Th>
					</Tr>
				</Tfoot>
			</Table>
		</TableContainer>
	);
};

export default BudgetTable;
