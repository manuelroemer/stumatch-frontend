import {
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
  Link,
} from '@chakra-ui/react';
import { useCurrentUser, useUserStore } from '../stores/userStore';
import UserAvatar from '../components/UserAvatar';
import { getFullName } from '../utils/userUtils';
import { routes } from '../constants';
import { Link as RouterLink } from 'react-router-dom';

export default function NavBarProfileItem() {
  const logout = useUserStore((state) => state.logout);
  const user = useCurrentUser();

  return (
    <Popover isLazy strategy="fixed">
      <PopoverTrigger>
        <IconButton
          aria-label="User Avatar"
          icon={<UserAvatar size="sm" cursor="pointer" />}
          rounded="full"
          variant="ghost"
        />
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
          <VStack p="3" spacing="1">
            <Text fontWeight="bold">{getFullName(user)}</Text>
            <Text>{user.email}</Text>
            <StackDivider />
            <Button variant="link" as={RouterLink} to={routes.profile}>
              Show Profile
            </Button>
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
