import { VStack, Center, Skeleton } from '@chakra-ui/react';
import { me } from '../../api/conventions';
import Pagination from '../../components/Pagination';
import { usePageQueryParameter, usePageSizeQueryParameter } from '../../utils/useQueryParameter';
import range from 'lodash-es/range';
import NotificationSelector from '../../components/NotificationSelector';
import { useGetAllUserNotificationsQuery } from '../../queries/notifications';
import DefaultPageLayout from '../../components/DefaultPageLayout';

export default function NotificationPage() {
  const [page, setPage] = usePageQueryParameter();
  const [pageSize] = usePageSizeQueryParameter();
  const { isLoading, data } = useGetAllUserNotificationsQuery(me, { page, pageSize, sort: 'createdOn:desc' });

  return (
    <DefaultPageLayout header="Notifications" subHeader="Manage all of your notifications.">
      <VStack spacing="5">
        {isLoading ? (
          range(pageSize).map((i) => <Skeleton key={i} height="2rem" />)
        ) : (
          <>
            {data?.result.map((notification) => (
              <NotificationSelector
                key={notification.id}
                notification={notification}
                w="100%"
                borderWidth="1px"
                borderColor="gray.50"
                shadow="lg"
                borderRadius="md"
              />
            ))}
          </>
        )}
      </VStack>
      {data && (
        <Center mt="10">
          <Pagination currentPage={data.page} pages={data.pages} onPageChanged={setPage} />
        </Center>
      )}
    </DefaultPageLayout>
  );
}
