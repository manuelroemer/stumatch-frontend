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

export default function NavBarNotificationItem() {
  const { data } = useGetAllUserNotificationsQuery(me, { page: 1, pageSize: 20, sort: 'createdOn:desc' });

  return (
    <Popover preventOverflow boundary="scrollParent">
      {({ onClose }) => (
        <>
          <PopoverTrigger>
            <IconButton aria-label="Notifications" variant="ghost" icon={<IoNotificationsOutline />} />
          </PopoverTrigger>
          <PopoverContent maxH="lg" w={['90vw', 'md', 'lg']}>
            <PopoverArrow />
            <PopoverCloseButton />
            <PopoverHeader>Notifications</PopoverHeader>
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
          </PopoverContent>
        </>
      )}
    </Popover>
  );
}
