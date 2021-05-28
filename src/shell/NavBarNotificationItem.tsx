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
  VStack,
  StackDivider,
  Link,
} from '@chakra-ui/react';
import { IoNotificationsOutline } from 'react-icons/io5';
import { me } from '../api/conventions';
import NotificationSelector from '../components/NotificationSelector';
import { useGetAllUserNotificationsQuery } from '../queries/notifications';
import { Link as RouterLink } from 'react-router-dom';
import { routes } from '../constants';
import { NoNotificationsEmptyState } from '../components/EmptyStates';
import range from 'lodash-es/range';
import take from 'lodash-es/take';
import NotificationTemplateSkeleton from '../components/NotificationTemplateSkeleton';

export default function NavBarNotificationItem() {
  const { isLoading, data } = useGetAllUserNotificationsQuery(me, { page: 1, pageSize: 100, sort: 'createdOn:desc' });
  const hasUnreadNotifications = data?.result.some((x) => !x.seen) ?? false;
  // The above unread notifications boolean reflects only the latest 100 notifications.
  // This is a good enough tradeoff which doesn't require additional endpoints on the
  // backend for querying the number while also providing the user with a mostly accurate
  // value (as the change for having an unread notification in the first 100 results is
  // more than likely).

  return (
    <Popover isLazy>
      {({ onClose }) => (
        <>
          <PopoverTrigger>
            <Box pos="relative">
              <IconButton aria-label="Notifications" variant="ghost" icon={<IoNotificationsOutline />} />
              {hasUnreadNotifications && (
                <Box rounded="full" bg="primary.500" w="2" h="2" position="absolute" top="1.5" right="1.5" />
              )}
            </Box>
          </PopoverTrigger>
          <PopoverContent w={['xs', 'lg']} h={['xs', 'lg']}>
            <PopoverArrow />
            <PopoverCloseButton />
            <PopoverHeader>Notifications</PopoverHeader>
            {isLoading && (
              <VStack divider={<StackDivider />} spacing="0">
                {range(3).map((i) => (
                  <NotificationTemplateSkeleton key={i} />
                ))}
              </VStack>
            )}
            {data && data.result.length > 0 && (
              <>
                <VStack divider={<StackDivider />} spacing="0" overflowY="auto">
                  {take(data.result, 20).map((notification) => (
                    <NotificationSelector key={notification.id} notification={notification} />
                  ))}
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
