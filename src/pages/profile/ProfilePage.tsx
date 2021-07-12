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
import DefaultPageLayout from '../../components/DefaultPageLayout';
import UserAvatar from '../../components/UserAvatar';
import { useCurrentUser } from '../../stores/userStore';

export default function ProfilePage() {
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
          <Input type="email" defaultValue={user.email} />
        </FormControl>
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
