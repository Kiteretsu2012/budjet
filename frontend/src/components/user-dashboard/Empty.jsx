import { Box, Heading, VStack } from '@chakra-ui/react';
import React from 'react';

function Empty() {
	return (
		<Box>
			<VStack justify={'center'}>
				<Heading>Ooppss... It seems very lonely in here.</Heading>
			</VStack>
		</Box>
	);
}

export default Empty;
