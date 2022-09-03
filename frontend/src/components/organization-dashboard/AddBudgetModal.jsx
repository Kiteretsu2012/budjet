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
import { useField, useFormik } from 'formik';
import { useEffect, useState } from 'react';
import { TiBusinessCard } from 'react-icons/ti';
import { useLocation } from 'wouter';
import { MultiSelect } from 'react-multi-select-component';
import api from '../../utils/api';

function AddBudgetModal({ orgID, isAddBudgetModalVisible, setIsAddBudgetModalVisible }) {
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [location, setLocation] = useLocation();
	const [teams, setTeams] = useState([]);
	const [selected, setSelected] = useState([]);
	const toast = useToast();

	const formik = useFormik({
		initialValues: {
			title: '',
			description: '',
			teams: [],
		},
		onSubmit: async (values) => {
			try {
				setIsSubmitting(true);
				const res = await api.post(`org/${orgID}/budget`, { ...values, ...selected });
				setIsSubmitting(false);
				setLocation(`/org/${orgID}/budget/${res._id}`);
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
	});
	const onClose = () => {
		setIsAddBudgetModalVisible(false);
		setIsSubmitting(false);
	};
	useEffect(() => {
		const fetchTeams = async () => {
			try {
				const res = await api.get(`org/${orgID}/teams`);
				const teams =
					res.length > 0
						? res.map((team) => {
								return {
									label: team.name,
									value: team._id,
								};
						  })
						: [];
				setTeams(teams);
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
		};
		fetchTeams();
	}, []);

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
									required
									onChange={formik.handleChange}
									name="title"
									placeholder="Enter title of the budget"
								/>
							</InputGroup>
						</FormControl>
						<FormControl mb="1rem">
							<FormLabel>Budget Description</FormLabel>
							<InputGroup>
								<Textarea
									onChange={formik.handleChange}
									name="description"
									placeholder="Enter description of the budget"
								/>
							</InputGroup>
						</FormControl>
						<FormControl>
							<FormLabel>Teams Involved</FormLabel>
							<MultiSelect
								options={teams}
								name="teams"
								value={selected}
								onChange={setSelected}
								labelledBy="Select"
							/>
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
