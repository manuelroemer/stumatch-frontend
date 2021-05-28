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
} from '@chakra-ui/react';
import { IoNotificationsOutline } from 'react-icons/io5';
import { me } from '../api/conventions';
import NotificationSelector from '../components/NotificationSelector';
import { useGetAllUserNotificationsQuery } from '../queries/notifications';
import { Link as RouterLink } from 'react-router-dom';
import { routes } from '../constants';
import { NoNotificationsEmptyState } from '../components/EmptyStates';
import range from 'lodash-es/range';
import NotificationTemplateSkeleton from '../components/NotificationTemplateSkeleton';

const pageSize = 20;

export default function NavBarNotificationItem() {
  const { isLoading, data } = useGetAllUserNotificationsQuery(me, { page: 1, pageSize, sort: 'createdOn:desc' });
  const hasUnreadNotifications = data?.result.some((x) => !x.seen) ?? false;
  const hiddenNotifications = data ? data.totalCount - pageSize : -1;

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
