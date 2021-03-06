import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  VStack,
  HStack,
  Input,
  FormControl,
  FormLabel,
  Select,
  NumberInput,
  NumberInputField,
  FormErrorMessage,
  Text,
  Flex,
  Avatar,
  FormHelperText,
  Checkbox,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { UserPost } from '../../api/users';
import { useGetAllFacultiesQuery } from '../../queries/faculties';
import FacultyDropdown from '../../components/FacultyDropdown';
import { usePostUserMutation } from '../../queries/users';
import { useUserStore } from '../../stores/userStore';
import { routes } from '../../constants';
import { Link } from 'react-router-dom';
import { useImagePicker } from '../../utils/useImagePicker';
import { useEffect, useState } from 'react';
import { emailRegex } from '../../constants';

export interface CreateAccountModalProps {
  isOpen: boolean;
  onClose(): void;
}

export default function CreateAccountModal({ isOpen, onClose }: CreateAccountModalProps) {
  const { isLoading, data } = useGetAllFacultiesQuery();
  const {
    register,
    setValue,
    getValues,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<UserPost>();
  const mutation = usePostUserMutation();
  const login = useUserStore((state) => state.login);
  const profileImagePicker = useImagePicker();
  const [jobValue, setJobValue] = useState(false);

  const onSubmit = handleSubmit(async (userPost) => {
    if (!userPost.immatriculatedOn?.startingSemester || !userPost.immatriculatedOn?.startingYear) {
      userPost.immatriculatedOn = undefined;
    }
    setValue('searchForJobs', jobValue);
    await mutation.mutateAsync(userPost);
    onClose();
    await login(userPost.email, userPost.password);
  });

  const validateImmatriculatedOn = () => {
    const startingYear = getValues('immatriculatedOn.startingYear');
    const startingSemester = getValues('immatriculatedOn.startingSemester');
    return !((!!startingSemester && !startingYear) || (!startingSemester && !!startingYear));
  };

  const handleClose = () => {
    reset();
    profileImagePicker.clear();
    onClose();
  };

  useEffect(() => {
    return setValue('profileImageBlob', profileImagePicker.base64Data);
  }, [profileImagePicker.base64Data]);

  return (
    <Modal isOpen={isOpen} size="xl" onClose={handleClose}>
      <ModalOverlay />
      <ModalContent>
        {!isLoading && (
          <form onSubmit={onSubmit}>
            <ModalHeader>Registration</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <VStack align="flex-start" spacing="5">
                <FormControl>
                  <FormLabel>Profile Picture</FormLabel>
                  <Avatar
                    size="lg"
                    cursor="pointer"
                    src={profileImagePicker.src}
                    onClick={profileImagePicker.pickImage}
                  />
                  <FormHelperText>Click on the avatar to change the image (max 12 MB).</FormHelperText>
                </FormControl>
                <FormControl isInvalid={!!errors.email} isRequired>
                  <FormLabel>E-Mail</FormLabel>
                  <Input
                    {...register('email', { required: true, maxLength: 320, pattern: emailRegex })}
                    placeholder="Your E-Mail Address"
                    type="email"
                  />
                  <FormErrorMessage>Please enter a valid E-Mail address.</FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={!!errors.password} isRequired>
                  <FormLabel>Password</FormLabel>
                  <Input
                    {...register('password', {
                      required: { value: true, message: 'Please enter your password.' },
                      pattern: {
                        value: /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/,
                        message:
                          'Password must contain at least 8 characters, one number, one uppercase and one lowercase letter.',
                      },
                    })}
                    placeholder="New Password"
                    type="password"
                  />
                  <FormErrorMessage>{errors.password && <p>{errors.password.message}</p>}</FormErrorMessage>
                </FormControl>
                <HStack w="100%">
                  <FormControl isInvalid={!!errors.firstName} isRequired>
                    <FormLabel>First Name</FormLabel>
                    <Input {...register('firstName', { required: true })} placeholder="First Name" />
                    <FormErrorMessage>Please enter your first name.</FormErrorMessage>
                  </FormControl>
                  <FormControl isInvalid={!!errors.lastName} isRequired>
                    <FormLabel>Last Name</FormLabel>
                    <Input {...register('lastName', { required: true })} placeholder="Last Name" />
                    <FormErrorMessage>Please enter your last name.</FormErrorMessage>
                  </FormControl>
                </HStack>
                <FormControl>
                  <FormLabel>Are you currently looking for a job?</FormLabel>
                  <Checkbox onChange={(e) => setJobValue(e.target.checked)}>Yes</Checkbox>
                </FormControl>

                <FacultyDropdown
                  facultyData={data?.result ?? []}
                  facultyDescription="Select your faculty."
                  studyProgramDescription="Select your study program."
                  onFacultyChanged={(faculty) => setValue('facultyId', faculty?.id)}
                  onStudyProgramChanged={(studyProgram) => setValue('studyProgramId', studyProgram?.id)}
                />

                <FormControl isInvalid={!!errors.immatriculatedOn?.startingSemester}>
                  <FormLabel>Starting Semester</FormLabel>
                  <HStack>
                    <Select
                      {...register('immatriculatedOn.startingSemester', { validate: validateImmatriculatedOn })}
                      variant="filled"
                      placeholder="Starting Semester">
                      <option value="WS">WS</option>
                      <option value="SS">SS</option>
                    </Select>
                    <NumberInput min={1900}>
                      <NumberInputField
                        {...register('immatriculatedOn.startingYear', { validate: validateImmatriculatedOn })}
                        placeholder="Starting Year"
                        maxLength={4}
                      />
                    </NumberInput>
                  </HStack>
                  <FormErrorMessage>
                    Please select the starting Semester&nbsp;<b>and</b>&nbsp;the starting year.
                  </FormErrorMessage>
                </FormControl>
              </VStack>
            </ModalBody>

            <ModalFooter>
              <Button colorScheme="primary" mr={3} type="submit" isLoading={mutation.isLoading}>
                Create
              </Button>
              <Button onClick={handleClose} isLoading={mutation.isLoading}>
                Cancel
              </Button>
            </ModalFooter>
            <Flex justify="center" h="16" align="center">
              <Text opacity="0.5">
                By signing up, you agree to our
                <Link to={routes.termsOfUse}>
                  {' '}
                  <Button variant="link" colorScheme="primary">
                    Terms
                  </Button>{' '}
                </Link>
                and
                <Link to={routes.privacyPolicy}>
                  {' '}
                  <Button variant="link" colorScheme="primary">
                    Privacy Policy.
                  </Button>
                </Link>
              </Text>
            </Flex>
          </form>
        )}
      </ModalContent>
    </Modal>
  );
}
