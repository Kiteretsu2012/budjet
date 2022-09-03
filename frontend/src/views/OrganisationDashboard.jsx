import { Box, Button, Flex, Heading, HStack, Text, useColorModeValue } from '@chakra-ui/react';
import { useState } from 'react';
import { Route, Router } from 'wouter';
import AddBudgetModal from '../components/organization-dashboard/AddBudgetModal';
import DashboardHeaderSidebar from '../components/organization-dashboard/DashboardHeaderSidebar';
import DashboardRecentExpenses from '../components/organization-dashboard/DashboardRecentExpenses';
import TeamTable from '../components/organization-dashboard/TeamTable';
import BudgetsTable from './BudgetsTable';

function OrganisationDashboard() {
	const [userDetails] = useState(JSON.parse(localStorage.getItem('userDetails')));
	const [isAddBudgetModalVisible, setisAddBudgetModalVisible] = useState(false);

	const orgID = window.location.pathname.split('/')[2];
	return (
		<Router base={'/org/' + orgID} key={'/org/' + orgID}>
			<Box minH="100vh" bg={useColorModeValue('gray.100', 'gray.900')}>
				<DashboardHeaderSidebar />
				<Box ml={{ base: 0, md: 60 }} p="4rem">
					<Route
						path=""
						component={() => (
							<>
								<AddBudgetModal
									orgID={orgID}
									isAddBudgetModalVisible={isAddBudgetModalVisible}
									setIsAddBudgetModalVisible={setisAddBudgetModalVisible}
								/>

								<HStack
									bgColor="#EDE3E9"
									borderRadius="1rem"
									p="1rem"
									mb="2rem"
									justify={'space-between'}
								>
									<Flex direction="column" justify="left">
										<Heading justifySelf="left" marginBottom="0.5rem">
											Welcome to {userDetails?.name} 👋
										</Heading>
										<Text opacity="80%">This is some placeholder text</Text>
									</Flex>
									<Box>
										<Button
											colorScheme="purple"
											color="white"
											onClick={() => setisAddBudgetModalVisible(true)}
										>
											Create Budget
										</Button>
									</Box>
								</HStack>
								<DashboardRecentExpenses />
							</>
						)}
					/>
					<Route path="/budgets" component={BudgetsTable} />
					<Route path="/teams" component={TeamTable} />
				</Box>
			</Box>
		</Router>
	);
}

export default OrganisationDashboard;
