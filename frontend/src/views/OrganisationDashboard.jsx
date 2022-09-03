import {
	Box,
	Button,
	Flex,
	Heading,
	HStack,
	Text,
	useColorModeValue,
	VStack,
} from '@chakra-ui/react';
import React from 'react';
import { useState } from 'react';
import AddBudgetModal from '../components/organization-dashboard/AddBudgetModal';
import DashboardHeaderSidebar from '../components/organization-dashboard/DashboardHeaderSidebar';
import DashboardRecentExpenses from '../components/organization-dashboard/DashboardRecentExpenses';

function OrganisationDashboard() {
	const [userDetails, setUserDetails] = useState(JSON.parse(localStorage.getItem('userDetails')));
	const [isAddBudgetModalVisible, setisAddBudgetModalVisible] = useState(false);
	const orgID = window.location.href.substring(window.location.href.lastIndexOf('/') + 1);
	return (
		<Box minH="100vh" bg={useColorModeValue('gray.100', 'gray.900')}>
			<DashboardHeaderSidebar />
			<AddBudgetModal
				orgID={orgID}
				isAddBudgetModalVisible={isAddBudgetModalVisible}
				setIsAddBudgetModalVisible={setisAddBudgetModalVisible}
			/>
			<Box ml={{ base: 0, md: 60 }} p="4rem">
				<HStack
					bgColor="#EDE3E9"
					borderRadius="1rem"
					p="1rem"
					mb="2rem"
					justify={'space-between'}
				>
					<Flex direction="column" justify="left">
						<Heading justifySelf="left" marginBottom="0.5rem">
							Hello, {userDetails?.name} 👋
						</Heading>
						<Text opacity="80%">This is some placeholder text</Text>
					</Flex>
					<Box>
						<Button
							// bg="#49B6FF"
							// color="white"
							colorScheme="faceb"
							onClick={() => setisAddBudgetModalVisible(true)}
						>
							Create Budget
						</Button>
					</Box>
				</HStack>
				<DashboardRecentExpenses />
			</Box>
		</Box>
	);
}

export default OrganisationDashboard;
