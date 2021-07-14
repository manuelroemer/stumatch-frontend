import {
  Box,
  Button,
  Editable,
  EditableInput,
  EditablePreview,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Grid,
  GridItem,
  HStack,
  Input,
  NumberInput,
  NumberInputField,
  Select,
  Spacer,
  Text,
  VStack,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { UserPut } from '../../api/users';
import DefaultPageLayout from '../../components/DefaultPageLayout';
import FacultyDropdown from '../../components/FacultyDropdown';
import UserAvatar from '../../components/UserAvatar';
import { useGetAllFacultiesQuery } from '../../queries/faculties';
import { usePutUserMutation } from '../../queries/users';
import { useCurrentUser } from '../../stores/userStore';

export default function ProfilePage() {
  const { isLoading, data } = useGetAllFacultiesQuery();
  const {
    register,
    unregister,
    setValue,
    getValues,
    formState: { errors },
    handleSubmit,
  } = useForm<UserPut>();
  const mutation = usePutUserMutation();

  const user = useCurrentUser();

  const validateImmatriculatedOn = () => {
    const startingYear = getValues('immatriculatedOn.startingYear');
    const startingSemester = getValues('immatriculatedOn.startingSemester');

    return !((!!startingSemester && !startingYear) || (!startingSemester && !!startingYear));
  };

  const onSubmit = handleSubmit(async (userPut) => {
    if (!userPut.immatriculatedOn?.startingSemester || !userPut.immatriculatedOn?.startingYear) {
      userPut.immatriculatedOn = undefined;
    }
    await mutation.mutateAsync(userPut);
  });

  return (
    <DefaultPageLayout header="Your Profile">
      <form onSubmit={onSubmit}>
        <Flex direction="column">
          <Box align="center">
            <UserAvatar key={user.id} userId={user.id} size="xl" />
          </Box>
          <Spacer />
          <FormControl mt={5}>
            <FormLabel>First Name</FormLabel>
            <Input {...register('firstName', { required: true })} type="firstName" defaultValue={user.firstName} />
          </FormControl>
          <Spacer />
          <FormControl mt={5}>
            <FormLabel>Last Name</FormLabel>
            <Input {...register('lastName', { required: true })} type="text" defaultValue={user.lastName} />
          </FormControl>
          <Spacer />
          <FormControl mt={5}>
            <FormLabel>E-Mail</FormLabel>
            <Input
              {...register('email', { required: true, maxLength: 320, pattern: /^\S+@\S+/ })}
              placeholder="Your E-Mail Address"
              type="email"
              defaultValue={user.email}
            />
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

          <HStack mt={10}>
            <Button colorScheme="blue" type="submit">
              Save
            </Button>
            <Button>Cancel</Button>
          </HStack>
        </Flex>
      </form>
    </DefaultPageLayout>
  );
}
