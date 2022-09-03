import { Button, Heading, VStack } from '@chakra-ui/react';

const Login = () => {
	return (
		<div>
			<VStack as="form" bg="white" border="2px solid black" w="40%" h="100px">
				<Heading>Sign up</Heading>
				<Button>Hello World</Button>
			</VStack>
		</div>
	);
};

export default Login;
