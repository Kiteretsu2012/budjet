import { Box, Heading, Text, useColorModeValue } from '@chakra-ui/react';
import React from 'react';
import { useState } from 'react';
import DashboardHeaderSidebar from '../components/organization-dashboard/DashboardHeaderSidebar';
import DashboardRecentExpenses from '../components/organization-dashboard/DashboardRecentExpenses';

function OrganisationDashboard() {
	const [userDetails, setUserDetails] = useState(JSON.parse(localStorage.getItem('userDetails')));
	return (
		<Box minH="100vh" bg={useColorModeValue('gray.100', 'gray.900')}>
			<DashboardHeaderSidebar />
			<Box ml={{ base: 0, md: 60 }} p="4rem">
				<Box bgColor="#EDE3E9" borderRadius="1rem" p="1rem" mb="2rem">
					<Heading marginBottom="0.5rem">Hello, {userDetails?.name} 👋</Heading>
					<Text opacity="80%">This is some placeholder text</Text>
				</Box>
				<DashboardRecentExpenses />
			</Box>
		</Box>
	);
}

export default OrganisationDashboard;
