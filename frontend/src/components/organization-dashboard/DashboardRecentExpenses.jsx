import { Button, Heading, HStack, Text } from '@chakra-ui/react';
import React from 'react';
import { FaPlus } from 'react-icons/fa';

function DashboardRecentExpenses() {
	return (
		<div>
			<HStack justify="space-between">
				<Heading as="h2" size="lg">
					Recent expenses
				</Heading>
				<HStack>
					<Button bgColor={'#49B6FF'} color="white">
						<Text pr="0.5rem">Add Expense</Text> <FaPlus style={{ opacity: '70%' }} />
					</Button>
					<Button bgColor={'#6EEB83'} color="white">
						{' '}
						Sort
					</Button>
					<Button bgColor={'#6EEB83'} color="white">
						Filter
					</Button>
				</HStack>
			</HStack>
		</div>
	);
}

export default DashboardRecentExpenses;
