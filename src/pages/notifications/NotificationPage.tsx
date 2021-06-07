import { VStack, Center } from '@chakra-ui/react';
import { me } from '../../api/conventions';
import Pagination from '../../components/Pagination';
import { usePageQueryParameter, usePageSizeQueryParameter } from '../../utils/useQueryParameter';
import range from 'lodash-es/range';
import NotificationSelector from '../../components/NotificationSelector';
import { useGetAllUserNotificationsQuery, useNotificationsSocketQueryInvalidation } from '../../queries/notifications';
import DefaultPageLayout from '../../components/DefaultPageLayout';
import { NoNotificationsEmptyState } from '../../components/EmptyStates';
import ImageTitleDescriptionSkeleton from '../../components/ImageTitleDescriptionSkeleton';
import FloatingCard from '../../components/FloatingCard';

export default function NotificationPage() {
  const [page, setPage] = usePageQueryParameter();
  const [pageSize] = usePageSizeQueryParameter();
  const { isLoading, data } = useGetAllUserNotificationsQuery(me, { page, pageSize, sort: 'createdOn:desc' });
  useNotificationsSocketQueryInvalidation();

  return (
    <DefaultPageLayout header="Notifications" subHeader="Manage all of your notifications.">
      <VStack spacing="5">
        {isLoading ? (
          range(3).map((i) => (
            <FloatingCard key={i} p="4">
              <ImageTitleDescriptionSkeleton />
            </FloatingCard>
          ))
        ) : (
          <>
            {data?.result.map((notification) => (
              <FloatingCard key={notification.id}>
                <NotificationSelector notification={notification} />
              </FloatingCard>
            ))}
          </>
        )}
      </VStack>
      {data && data.result.length > 0 && (
        <Center mt="10">
          <Pagination currentPage={data.page} pages={data.pages} onPageChanged={setPage} />
        </Center>
      )}
      {data && data.result.length === 0 && <NoNotificationsEmptyState />}
    </DefaultPageLayout>
  );
}
