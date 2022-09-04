import {
	Button,
	FormControl,
	FormErrorMessage,
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
import * as Yup from 'yup';
import api from '../../utils/api';

const validationSchema = Yup.object({
	title: Yup.string().required('Required'),
	description: Yup.string().required('Required'),
	A: Yup.number().required('Required'),
	B: Yup.number().required('Required'),
	C: Yup.number().required('Required'),
});

function AddExpenseModal({
	orgID,
	isAddExpenseModalVisible,
	setIsAddExpenseModalVisible,
	setExpenses,
}) {
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [location, setLocation] = useLocation();
	const toast = useToast();

	const formik = useFormik({
		initialValues: {
			title: '',
			description: '',
			A: '',
			B: '',
			C: '',
			tags: [],
		},
		onSubmit: async (values) => {
			try {
				setIsSubmitting(true);
				const parsedValues = {
					...values,
					amount: { A: values.A, B: values.B, C: values.C },
				};
				delete parsedValues.A;
				delete parsedValues.B;
				delete parsedValues.C;
				const res = await api.post(`org/${orgID}/budget`, parsedValues);
				setIsSubmitting(false);
				setIsAddExpenseModalVisible(false);
				setExpenses((oldValue) => [...oldValue, res]);
			} catch (err) {
				setIsSubmitting(false);
				toast({
					title: 'Error',
					description: err.message,
					status: 'error',
					duration: 9000,
					isClosable: true,
				});
			}
		},
		validationSchema,
	});
	const onClose = () => {
		setIsAddExpenseModalVisible(false);
		setIsSubmitting(false);
	};

	return (
		<Modal isOpen={isAddExpenseModalVisible} onClose={onClose}>
			<ModalOverlay />
			<ModalContent>
				<ModalHeader>Create an Expense</ModalHeader>
				<ModalCloseButton />
				<form onSubmit={formik.handleSubmit}>
					<ModalBody>
						<FormControl mb="1rem">
							<FormLabel>Expense Title</FormLabel>
							<InputGroup>
								<InputLeftElement pointerEvents="none">
									<Icon as={TiBusinessCard} w={7} h={7} />
								</InputLeftElement>
								<Input
									required
									onChange={formik.handleChange}
									value={formik.values.title}
									name="title"
									placeholder="Enter title of the expense"
								/>
							</InputGroup>
							<FormErrorMessage>{formik.errors.title}</FormErrorMessage>
						</FormControl>
						<FormControl mb="1rem">
							<FormLabel>Expense Description</FormLabel>
							<InputGroup>
								<Textarea
									onChange={formik.handleChange}
									value={formik.values.description}
									name="description"
									placeholder="Enter description of the expense"
								/>
							</InputGroup>
							<FormErrorMessage>{formik.errors.description}</FormErrorMessage>
						</FormControl>
						<FormControl mb="1rem">
							<FormLabel>
								Amount, according to plan <strong>A</strong>
							</FormLabel>
							<InputGroup>
								<InputLeftElement pointerEvents="none">
									<Icon as={TiBusinessCard} w={7} h={7} />
								</InputLeftElement>
								<Input
									required
									onChange={formik.handleChange}
									value={formik.values.A}
									name="A"
									placeholder="Enter amount of the expense"
								/>
							</InputGroup>
							<FormErrorMessage>{formik.errors.A}</FormErrorMessage>
						</FormControl>
						<FormControl mb="1rem">
							<FormLabel>
								Amount, according to plan <strong>B</strong>
							</FormLabel>
							<InputGroup>
								<InputLeftElement pointerEvents="none">
									<Icon as={TiBusinessCard} w={7} h={7} />
								</InputLeftElement>
								<Input
									required
									onChange={formik.handleChange}
									value={formik.values.B}
									name="B"
									placeholder="Enter amount of the expense"
								/>
							</InputGroup>
							<FormErrorMessage>{formik.errors.B}</FormErrorMessage>
						</FormControl>
						<FormControl mb="1rem">
							<FormLabel>
								Amount, according to plan <strong>C</strong>
							</FormLabel>
							<InputGroup>
								<InputLeftElement pointerEvents="none">
									<Icon as={TiBusinessCard} w={7} h={7} />
								</InputLeftElement>
								<Input
									required
									onChange={formik.handleChange}
									value={formik.values.C}
									name="C"
									placeholder="Enter amount of the expense"
								/>
							</InputGroup>
							<FormErrorMessage>{formik.errors.C}</FormErrorMessage>
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

export default AddExpenseModal;
