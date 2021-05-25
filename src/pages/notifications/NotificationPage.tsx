import { Box, Flex, Heading, VStack, Center, Skeleton } from '@chakra-ui/react';
import { PaginationApiResult } from '../../api/apiResult';
import { me } from '../../api/conventions';
import { StumatchFetchResponse } from '../../api/fetch';
import { getAllUserNotifications, Notification } from '../../api/notifications';
import Pagination from '../../components/Pagination';
import { useLoadedData } from '../../utils/useLoadedData';
import { usePageQueryParameter, usePageSizeQueryParameter } from '../../utils/useQueryParameter';
import NotificationCard from './NotificationCard';
import range from 'lodash-es/range';

export default function NotificationPage() {
  const [page, setPage] = usePageQueryParameter();
  const [pageSize] = usePageSizeQueryParameter();

  const { isLoading, data: response } = useLoadedData<StumatchFetchResponse<PaginationApiResult<Notification>>>(
    (signal) => getAllUserNotifications(me, { page, pageSize, sort: 'createdDate:desc' }, { signal }),
    [page, pageSize],
  );

  return (
    <Flex justify="center" mt="12">
      <Box w="70%">
        <Heading as="h1">Notifications</Heading>
        <VStack spacing="5">
          {isLoading ? (
            range(pageSize).map((i) => <Skeleton key={i} height="2rem" />)
          ) : (
            <>
              {response?.data.result.map((notification) => (
                <NotificationCard
                  key={notification.id}
                  title={notification.title ?? ''}
                  content={notification.content ?? ''}
                  date={notification.createdOn}
                  emoji="💬"
                  seen={!!notification.seen}
                  onClick={() => alert('click')}
                  onDelete={() => alert('Delete')}
                  onMarkAsRead={() => alert('read')}
                  onMarkAsUnread={() => alert('unread')}
                />
              ))}
            </>
          )}
        </VStack>
        {response && (
          <Center mt="10">
            <Pagination
              currentPage={response?.data.page ?? 1}
              pages={response?.data.pages ?? 1}
              onPageChanged={setPage}
            />
          </Center>
        )}
      </Box>
    </Flex>
  );
}
