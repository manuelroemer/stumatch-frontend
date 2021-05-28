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

export default function NavBarNotificationItem() {
  const { data } = useGetAllUserNotificationsQuery(me, { page: 1, pageSize: 20, sort: 'createdOn:desc' });

  return (
    <Popover>
      {({ onClose }) => (
        <>
          <PopoverTrigger>
            <IconButton aria-label="Notifications" variant="ghost" icon={<IoNotificationsOutline />} />
          </PopoverTrigger>
          <PopoverContent w={['xs', 'lg']} h={['xs', 'lg']}>
            <PopoverArrow />
            <PopoverCloseButton />
            <PopoverHeader>Notifications</PopoverHeader>
            {data && data.result.length > 0 && (
              <>
                <VStack divider={<StackDivider />} spacing="0" overflowY="auto">
                  {data?.result.map((notification) => (
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
