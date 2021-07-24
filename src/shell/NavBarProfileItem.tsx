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
} from '@chakra-ui/react';
import { useCurrentUser, useUserStore } from '../stores/userStore';
import UserAvatar from '../components/UserAvatar';
import { getFullName } from '../utils/userUtils';
import { useHistory } from 'react-router';
import { routes } from '../constants';
import { Link } from 'react-router-dom';

/**
 * The profile icon button within the navbar.
 * Provides the link to the user's profile and the option to logout.
 */
export default function NavBarProfileItem() {
  const history = useHistory();
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
            <Link to={routes.profile}>
              <Button variant="link" colorScheme="primary">
                Show Profile
              </Button>
            </Link>
          </VStack>
        </PopoverBody>
        <PopoverFooter p="2">
          <Flex justify="flex-end">
            <Button
              onClick={() => {
                logout();
                history.push(routes.root);
              }}>
              Logout
            </Button>
          </Flex>
        </PopoverFooter>
      </PopoverContent>
    </Popover>
  );
}
