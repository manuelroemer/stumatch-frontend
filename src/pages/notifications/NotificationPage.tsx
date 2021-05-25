import { Box, Flex, Heading, VStack, Center } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { me } from '../../api/conventions';
import { Notification, getAllUserNotifications } from '../../api/notifications';
import Pagination from '../../components/Pagination';
import NotificationCard from './NotificationCard';

export default function NotificationPage() {
  const [page, setPage] = useState(1);
  const [notifications, setNotifications] = useState<Array<Notification>>([]);

  useEffect(() => {
    const ac = new AbortController();
    getAllUserNotifications(me, { sort: 'createdDate:desc' }, { signal: ac.signal }).then((res) =>
      setNotifications(res.data.result),
    );
    return () => ac.abort();
  }, []);

  return (
    <Flex justify="center" mt="12">
      <Box w="70%">
        <Heading as="h1">Notifications</Heading>
        <VStack spacing="10">
          {notifications.map((notification) => (
            <NotificationCard
              key={notification.id}
              title={notification.title}
              content={notification.content}
              date={notification.createdOn}
              emoji="💬"
              seen={!!notification.seen}
              onClick={() => alert('click')}
              onDelete={() => alert('Delete')}
              onMarkAsRead={() => alert('read')}
              onMarkAsUnread={() => alert('unread')}
            />
          ))}
        </VStack>
        <Center mt="10">
          <Pagination currentPage={page} pages={20} onPageChanged={setPage} />
        </Center>
      </Box>
    </Flex>
  );
}
