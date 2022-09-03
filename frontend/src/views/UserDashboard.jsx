import { Box, Grid, GridItem, useColorModeValue } from '@chakra-ui/react';
import React from 'react';
import { useState } from 'react';
import Empty from '../components/user-dashboard/Empty';

import Header from '../components/user-dashboard/Header';

function UserDashboard() {
	const [userDetails, setUserDetails] = useState(JSON.parse(localStorage.getItem('userDetails')));
	return (
		<Box minH="100vh" bg={useColorModeValue('gray.100', 'gray.900')}>
			<Header />
			<Grid templateColumns="repeat(6, 1fr)" gap={6}>
				<GridItem colSpan={2} w="100%" h="100vh" bg="blue.500" />
				<GridItem colSpan={1} w="100%" h="100vh" bg="blue.500" />
				<GridItem colSpan={3} w="100%" h="100vh" bg="#EDE3E9">
					<Empty />
				</GridItem>
			</Grid>
		</Box>
	);
}

export default UserDashboard;
