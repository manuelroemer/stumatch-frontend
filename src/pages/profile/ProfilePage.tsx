import {
  Box,
  Button,
  Editable,
  EditableInput,
  EditablePreview,
  Flex,
  FormControl,
  FormLabel,
  Grid,
  GridItem,
  HStack,
  Input,
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
  const user = useCurrentUser();
  return (
    <DefaultPageLayout header="Your Profile">
      <Flex direction="column">
        <Box align="center">
          <UserAvatar key={user.id} userId={user.id} size="xl" />
        </Box>
        <Spacer />
        <FormControl mt={5}>
          <FormLabel>First Name</FormLabel>
          <Input type="firstName" defaultValue={user.firstName} />
        </FormControl>
        <Spacer />
        <FormControl mt={5}>
          <FormLabel>Last Name</FormLabel>
          <Input type="lastName" defaultValue={user.lastName} />
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

        <HStack mt={10}>
          <Button colorScheme="blue" type="submit">
            Save
          </Button>
          <Button>Cancel</Button>
        </HStack>
      </Flex>
    </DefaultPageLayout>
  );
}
