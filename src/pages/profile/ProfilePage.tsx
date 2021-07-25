import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
  Input,
  NumberInput,
  NumberInputField,
  Radio,
  RadioGroup,
  Select,
  useToast,
  VStack,
} from '@chakra-ui/react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { UserPut } from '../../api/users';
import DefaultPageLayout from '../../components/DefaultPageLayout';
import FacultyDropdown from '../../components/FacultyDropdown';
import UserAvatar from '../../components/UserAvatar';
import { emailRegex } from '../../constants';
import { useGetAllFacultiesQuery } from '../../queries/faculties';
import { usePutUserMutation } from '../../queries/users';
import { useCurrentUser } from '../../stores/userStore';

export default function ProfilePage() {
  const { data } = useGetAllFacultiesQuery();
  const toast = useToast();
  const {
    register,
    setValue,
    getValues,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<UserPut>();
  const mutation = usePutUserMutation();
  const user = useCurrentUser();
  const initialSearchJobValue = user.searchForJobs ? 'Yes' : user.searchForJobs === false ? 'No' : 'Undefined';
  const [jobValue, setJobValue] = useState(initialSearchJobValue);
  const validateImmatriculatedOn = () => {
    const startingYear = getValues('immatriculatedOn.startingYear');
    const startingSemester = getValues('immatriculatedOn.startingSemester');

    return !((!!startingSemester && !startingYear) || (!startingSemester && !!startingYear));
  };
  const onSubmit = handleSubmit(async (userPut) => {
    if (!userPut.immatriculatedOn?.startingSemester || !userPut.immatriculatedOn?.startingYear) {
      userPut.immatriculatedOn = undefined;
    }
    setValue('searchForJobs', jobValue);
    await mutation.mutateAsync({ id: user.id, body: userPut });
    toast({
      title: 'Changes successfully saved.',
      description: 'Your changes were saved.',
      status: 'success',
      duration: 9000,
      isClosable: true,
    });
  });

  console.info(user);
  return (
    <DefaultPageLayout header="Your Profile">
      <form onSubmit={onSubmit}>
        <VStack spacing="5">
          <Box align="center">
            <UserAvatar key={user.id} userId={user.id} size="2xl" />
          </Box>
          <FormControl isInvalid={!!errors.firstName} isRequired>
            <FormLabel>First Name</FormLabel>
            <Input
              {...register('firstName', { required: true })}
              placeholder="First Name"
              defaultValue={user.firstName}
            />
            <FormErrorMessage>Please enter your first name.</FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={!!errors.lastName} isRequired>
            <FormLabel>Last Name</FormLabel>
            <Input
              {...register('lastName', { required: true })}
              type="text"
              placeholder="Last Name"
              defaultValue={user.lastName}
            />
            <FormErrorMessage>Please enter your last name.</FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={!!errors.email} isRequired>
            <FormLabel>E-Mail</FormLabel>
            <Input
              {...register('email', { required: true, maxLength: 320, pattern: emailRegex })}
              placeholder="Your E-Mail Address"
              type="email"
              defaultValue={user.email}
            />
            <FormErrorMessage>Please enter a valid E-Mail address.</FormErrorMessage>
          </FormControl>

          <FormControl>
            <FormLabel>Are you currently looking for a job?</FormLabel>
            <RadioGroup {...register('searchForJobs')} defaultValue={jobValue} onChange={setJobValue}>
              <HStack>
                <Radio value="Yes">Yes</Radio>
                <Radio value="No">No</Radio>
                <Radio value="Undefined">Undefined</Radio>
              </HStack>
            </RadioGroup>
          </FormControl>

          <FacultyDropdown
            facultyData={data?.result ?? []}
            initialFacultyId={user.facultyId}
            initialStudyProgramId={user.studyProgramId}
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
                placeholder="Starting Semester"
                defaultValue={user.startingSemester}>
                <option value="WS">WS</option>
                <option value="SS">SS</option>
              </Select>
              <NumberInput min={1900} defaultValue={user.startingYear}>
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
        <HStack justify="flex-end" padding="5">
          <Button colorScheme="blue" type="submit">
            Save
          </Button>
          <Button onClick={() => reset()}>Cancel</Button>
        </HStack>
      </form>
    </DefaultPageLayout>
  );
}
