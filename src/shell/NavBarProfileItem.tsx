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
  Link,
  Button,
  PopoverFooter,
  PopoverBody,
  Avatar,
  HStack,
  Flex,
  Spacer,
} from '@chakra-ui/react';
import { IoPersonCircleOutline } from 'react-icons/io5';
import { me } from '../api/conventions';
import NotificationSelector from '../components/NotificationSelector';
import { useGetAllUserNotificationsQuery, useNotificationsSocketQueryInvalidation } from '../queries/notifications';
import { Link as RouterLink } from 'react-router-dom';
import { routes } from '../constants';
import { NoNotificationsEmptyState } from '../components/EmptyStates';
import range from 'lodash-es/range';
import ImageTitleDescriptionSkeleton from '../components/ImageTitleDescriptionSkeleton';
import { useCurrentUser, useUserStore } from '../stores/userStore';

const pageSize = 20;

export default function NavBarProfileItem() {
  const { isLoading, data } = useGetAllUserNotificationsQuery(me, { page: 1, pageSize, sort: 'createdOn:desc' });
  const hasUnreadNotifications = data?.result.some((x) => !x.seen) ?? false;
  const hiddenNotifications = data ? data.totalCount - pageSize : -1;
  useNotificationsSocketQueryInvalidation();

  const logout = useUserStore((state) => state.logout);
  const user = useCurrentUser();
  const userName = user.firstName + ' ' + user.lastName;

  return (
    <Popover isLazy strategy="fixed">
      {({ onClose }) => (
        <>
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
              <Center>
                <Avatar name={userName} />
              </Center>
              <Divider />
              <Flex>
                <HStack>
                  <VStack align="left">
                    <Text>{userName}</Text>
                    <Text>{user.email}</Text>
                  </VStack>
                  <Spacer />
                  <Button size="xs" variant="link">
                    Edit
                  </Button>
                </HStack>
              </Flex>
            </PopoverBody>
            <PopoverFooter>
              <Button onClick={logout}>Logout</Button>
            </PopoverFooter>
          </PopoverContent>
        </>
      )}
    </Popover>
  );
}
