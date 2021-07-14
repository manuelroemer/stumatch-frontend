import {
  Box,
  Center,
  Divider,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverCloseButton,
  PopoverHeader,
  Text,
  VStack,
  StackDivider,
  Link,
} from '@chakra-ui/react';
import { IoNotificationsOutline } from 'react-icons/io5';
import { me } from '../api/conventions';
import NotificationSelector from '../components/NotificationSelector';
import { useGetAllUserNotificationsQuery, useNotificationsSocketQueryInvalidation } from '../queries/notifications';
import { Link as RouterLink } from 'react-router-dom';
import { routes } from '../constants';
import { NoNotificationsEmptyState } from '../components/EmptyStates';
import range from 'lodash-es/range';
import ImageTitleDescriptionSkeleton from '../components/ImageTitleDescriptionSkeleton';
import NavBarIconButton from './NavBarIconButton';

const pageSize = 20;

export default function NavBarNotificationItem() {
  const { isLoading, data } = useGetAllUserNotificationsQuery(me, { page: 1, pageSize, sort: 'createdOn:desc' });
  const hasUnreadNotifications = data?.result.some((x) => !x.seen) ?? false;
  const hiddenNotifications = data ? data.totalCount - pageSize : -1;
  useNotificationsSocketQueryInvalidation();

  return (
    <Popover isLazy strategy="fixed">
      {({ onClose }) => (
        <>
          <PopoverTrigger>
            <Box>
              <NavBarIconButton
                aria-label="Notifications"
                icon={<IoNotificationsOutline />}
                showIndicator={hasUnreadNotifications}
              />
            </Box>
          </PopoverTrigger>
          <PopoverContent w={['xs', 'lg']} h={['xs', 'lg']}>
            <PopoverArrow />
            <PopoverCloseButton />
            <PopoverHeader>Notifications</PopoverHeader>
            {isLoading && (
              <VStack divider={<StackDivider />} spacing="0">
                {range(3).map((i) => (
                  <ImageTitleDescriptionSkeleton key={i} />
                ))}
              </VStack>
            )}
            {data && data.result.length > 0 && (
              <>
                <VStack divider={<StackDivider />} spacing="0" overflowY="auto">
                  {data.result.map((notification) => (
                    <NotificationSelector key={notification.id} notification={notification} />
                  ))}
                  {hiddenNotifications > 0 && <Text my="2">...and {hiddenNotifications} more.</Text>}
                </VStack>
                <Divider />
                <Center>
                  <Link as={RouterLink} to={routes.notifications} m="1" fontWeight="bold" onClick={onClose}>
                    All Notifications
                  </Link>
                </Center>
              </>
            )}
            {data && data.result.length === 0 && <NoNotificationsEmptyState size={['xs', 'md']} />}
          </PopoverContent>
        </>
      )}
    </Popover>
  );
}
