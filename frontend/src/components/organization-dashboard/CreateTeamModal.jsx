import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  InputGroup,
  InputLeftElement,
  Icon,
  Input,
  HStack,
  VStack,
  Select,
  FormErrorMessage,
  useToast,
  Flex,
  Box,
} from '@chakra-ui/react';
import * as Yup from 'yup';
import { useState } from 'react';
import { TiBusinessCard } from 'react-icons/ti';
import { useFormik } from 'formik';
import api from '../../utils/api';
import { BsTrashFill } from 'react-icons/bs';
const initialValues = {
  teamName: '',
  email: '',
  role: '',
};

const validationSchema = Yup.object({
  teamName: Yup.string().required('Required'),
  email: Yup.string().email('Invalid Email').required('Required'),
  level: Yup.string().required('Required'),
});

const ROLES = ['Admin', 'Team Member', 'Team Leader', 'Viewer'];

const CreateTeamModal = ({ isOpen, onClose }) => {
  const toast = useToast();
  const [teamMembers, setTeamMembers] = useState([{ role: 'Viewer', email: 'goo@goo.com' }]);
  const [teamName, setTeamName] = useState('');
  const [formData, setFormData] = useState({});
  const onSubmit = async (v, actions) => {
    console.log('in');
    const { email, role, teamName } = v;
    try {
      setFormData({ name: teamName, members: [] });
      const res = await api.post('user/check', {
        email,
      });
      if (res) {
        setTeamMembers((prevValue) => [...prevValue, { role, email }]);
        setFormData((prevState) => ({ ...prevState, members: teamMembers }));
        console.log(formData);
        actions.resetForm({
          values: { email },
        });
      }
    } catch (err) {
      const message = JSON.parse(await err.response.text()).message;
      toast({
        title: 'Error',
        description: message || 'Server Error',
        status: 'error',
        duration: 9000,
        isClosable: true,
      });
    }
  };
  const createTeam = async () => {
    if (teamMembers.length) {
      try {
        const res = await api.post('org/team', {
          formData,
        });
      } catch (err) {
        const message = JSON.parse(await err.response.text()).message;
        toast({
          title: 'Error',
          description: message,
          status: 'error',
          duration: 9000,
          isClosable: true,
        });
      }
    } else {
      toast({
        title: 'Error',
        description: 'Please add team members',
        status: 'error',
        duration: 9000,
        isClosable: true,
      });
    }
  };
  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema,
  });

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} size="lg">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create a new team</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form onSubmit={formik.handleSubmit}>
              <FormControl
                isInvalid={formik.errors.teamName && formik.touched.teamName}
              >
                <FormLabel>Team Name</FormLabel>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    children={<Icon as={TiBusinessCard} w={7} h={7} />}
                  />
                  <Input
                    name="teamName"
                    placeholder="Enter name of the team"
                    onChange={formik.handleChange}
                    value={formik.values.teamName}
                    onBlur={formik.handleBlur}
                  />
                </InputGroup>
                <FormErrorMessage>{formik.errors.teamName}</FormErrorMessage>
              </FormControl>
              <VStack>
                {teamMembers.map(({ role, email }, index) => (
                  <Flex key={email} mt="20px">
                    <Flex direction="column">
                      <FormLabel>Email of Team Member {index + 1}</FormLabel>
                      <Input value={email} disabled />
                    </Flex>
                    <Flex direction="column">
                      <FormLabel>Role of Team Member {index + 1}</FormLabel>
                      <Input value={role} disabled />
                    </Flex>
                    <Button
                      bg="#FE5C5C"
                      color="white"
                      mt="7%"
                      onClick={() => {
                        setTeamMembers((prevState) =>
                          prevState.splice(index, 1)
                        );
                      }}
                    >
                      <Icon as={BsTrashFill} />
                    </Button>
                  </Flex>
                ))}
              </VStack>
              <HStack mt="20px">
                <FormControl
                  isInvalid={formik.errors.email && formik.touched.email}
                  mt={formik.errors.email ? '25px' : ''}
                >
                  <FormLabel>Team Member Email</FormLabel>
                  <Input
                    onChange={formik.handleChange}
                    value={formik.values.email}
                    onBlur={formik.handleBlur}
                    placeholder="Team member email"
                    name="email"
                  />
                  <FormErrorMessage>{formik.errors.email}</FormErrorMessage>
                </FormControl>
                <FormControl
                  isInavlid={formik.errors.level && formik.touched.level}
                >
                  <FormLabel>Role</FormLabel>
                  <Select
                    onChange={formik.handleChange}
                    value={formik.values.level}
                    onBlur={formik.handleBlur}
                    name="level"
                    placeholder="Choose Role"
                  >
                    {ROLES.map((elem) => (
                      <option value={elem}>{elem}</option>
                    ))}
                  </Select>
                  <FormErrorMessage>{formik.errors.level}</FormErrorMessage>
                </FormControl>
                <Button
                  type="submit"
                  onClick={formik.handleSubmit}
                  bg="#5E45D6"
                  color="white"
                  style={{ marginTop: '30px' }}
                >
                  +
                </Button>
              </HStack>
            </form>
          </ModalBody>
          <ModalFooter>
            <Button bg="#7B61FF" color="white" onClick={createTeam}>
              Submit
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CreateTeamModal;
