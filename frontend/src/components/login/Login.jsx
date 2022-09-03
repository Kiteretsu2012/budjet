import { Text, Button, useToast, Heading, VStack, Box } from '@chakra-ui/react';
import GoogleLogin from 'react-google-login';
import GoogleButton from 'react-google-button';
import api from '../../utils/api';
import { useLocation } from 'wouter';

const Login = () => {
	const toast = useToast();
	const [location, setLocation] = useLocation();
	const handleFailure = async (error, details) => {
		console.log(error, details);
	};
	const googleLoginHandler = async (v) => {
		try {
			const res = await api.post('user/auth', {
				credential: v.tokenId,
			});
			if (res?.token) {
				localStorage.setItem('AUTH_TOKEN', res.token);
				localStorage.setItem(
					'userDetails',
					JSON.stringify({ name: res.name, email: res.email })
				);
			}
			setLocation(`/user/dashboard`);
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

	return (
		<Box w="50%">
			<VStack
				as="form"
				bg="white"
				border="2px solid black"
				w="100%"
				h="auto"
				padding="10%"
				style={{
					boxShadow:
						'-6px -6px 12px rgba(255, 255, 255, 0.25), 6px 6px 12px rgba(184, 185, 190, 0.25)',
					borderRadius: '12px',
				}}
			>
				<Heading>Sign up</Heading>
				<Text>
					See what <b>budjet</b> is capable of
				</Text>
				<GoogleLogin
					clientId="795386949338-kfr53chb6l5sdmtinqosukakjmd0gemb.apps.googleusercontent.com"
					render={(renderProps) => (
						<GoogleButton onClick={renderProps.onClick} disabled={renderProps.disabled}>
							Sign in with Google
						</GoogleButton>
					)}
					onSuccess={googleLoginHandler}
					onFailure={handleFailure}
					cookiePolicy={'single_host_origin'}
				/>
			</VStack>
		</Box>
		/* Rectangle 53 */
	);
};

export default Login;
