import {
  Box,
  Center,
  Divider,
  Popover,
  PopoverTrigger,
  IconButton,
  PopoverContent,
  PopoverArrow,
  PopoverCloseButton,
  PopoverHeader,
  Text,
  VStack,
  StackDivider,
  Button,
  PopoverFooter,
  PopoverBody,
  Flex,
} from '@chakra-ui/react';
import { IoPersonCircleOutline } from 'react-icons/io5';
import { useCurrentUser, useUserStore } from '../stores/userStore';
import UserAvatar from '../components/UserAvatar';
import { getFullName } from '../utils/userUtils';

export default function NavBarProfileItem() {
  const logout = useUserStore((state) => state.logout);
  const user = useCurrentUser();

  return (
    <Popover isLazy strategy="fixed">
      <PopoverTrigger>
        <Box pos="relative">
          <IconButton aria-label="Profile" variant="ghost" icon={<IoPersonCircleOutline />} />
        </Box>
      </PopoverTrigger>
      <PopoverContent>
        <PopoverArrow />
        <PopoverCloseButton />
        <PopoverHeader>Profile</PopoverHeader>
        <PopoverBody>
          <Center p="3">
            <UserAvatar />
          </Center>
          <Divider />
          <VStack p="3">
            <Text>{getFullName(user)}</Text>
            <Text>{user.email}</Text>
            <StackDivider />
            <Button variant="link">Show Profile</Button>
          </VStack>
        </PopoverBody>
        <PopoverFooter p="2">
          <Flex justify="flex-end">
            <Button onClick={logout}>Logout</Button>
          </Flex>
        </PopoverFooter>
      </PopoverContent>
    </Popover>
  );
}
