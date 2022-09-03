import {
	Button,
	FormControl,
	FormLabel,
	Icon,
	Input,
	InputGroup,
	InputLeftElement,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	Textarea,
	useToast,
} from '@chakra-ui/react';
import { useFormik } from 'formik';
import { useState } from 'react';
import { TiBusinessCard } from 'react-icons/ti';
import { useLocation } from 'wouter';
import api from '../../utils/api';

function AddBudgetModal({ orgID, isAddBudgetModalVisible, setIsAddBudgetModalVisible }) {
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [location, setLocation] = useLocation();
	const toast = useToast();

	const formik = useFormik({
		initialValues: {
			name: '',
			description: '',
		},
		onSubmit: async (values) => {
			try {
				setIsSubmitting(true);
				const res = await api.post('/org', values);
				setIsSubmitting(false);
				setLocation(`/org/${orgID}/budget/${res._id}`);
			} catch (err) {
				toast({
					title: 'Error',
					description: err.message,
					status: 'error',
					duration: 9000,
					isClosable: true,
				});
			}
		},
	});
	const onClose = () => {
		setIsAddBudgetModalVisible(false);
	};
	return (
		<Modal isOpen={isAddBudgetModalVisible} onClose={onClose}>
			<ModalOverlay />
			<ModalContent>
				<ModalHeader>Create a Budget</ModalHeader>
				<ModalCloseButton />
				<form onSubmit={formik.handleSubmit}>
					<ModalBody>
						<FormControl mb="1rem">
							<FormLabel>Budget Title</FormLabel>
							<InputGroup>
								<InputLeftElement pointerEvents="none">
									<Icon as={TiBusinessCard} w={7} h={7} />
								</InputLeftElement>
								<Input
									onChange={formik.handleChange}
									name="title"
									placeholder="Enter title of the budget"
								/>
							</InputGroup>
						</FormControl>
						<FormControl>
							<FormLabel>Budget Description</FormLabel>
							<InputGroup>
								<Textarea
									onChange={formik.handleChange}
									name="description"
									placeholder="Enter description of the budget"
								/>
							</InputGroup>
						</FormControl>
					</ModalBody>

					<ModalFooter>
						<Button colorScheme="blue" mr={3} type="submit" isLoading={isSubmitting}>
							Create
						</Button>
						<Button variant="ghost" onClick={onClose}>
							Close
						</Button>
					</ModalFooter>
				</form>
			</ModalContent>
		</Modal>
	);
}

export default AddBudgetModal;
