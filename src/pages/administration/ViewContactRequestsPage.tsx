import { VStack, Center } from '@chakra-ui/react';
import { range } from 'lodash-es';
import FloatingCard from '../../components/FloatingCard';
import ImageTitleDescriptionSkeleton from '../../components/ImageTitleDescriptionSkeleton';
import Pagination from '../../components/Pagination';
import { useGetAllContactRequestsQuery } from '../../queries/contactRequest';
import { usePageQueryParameter, usePageSizeQueryParameter } from '../../utils/useQueryParameter';

export function ViewContactRequestsPage() {
  const [page, setPage] = usePageQueryParameter();
  const [pageSize] = usePageSizeQueryParameter();
  const { isLoading, data } = useGetAllContactRequestsQuery({ page, pageSize, sort: 'createdOn:desc' });
  return (
    <>
      <VStack spacing="5">
        {isLoading ? (
          range(3).map((i) => (
            <FloatingCard key={i} p="4">
              <ImageTitleDescriptionSkeleton />
            </FloatingCard>
          ))
        ) : (
          <>
            {data?.result.map((contactRequest) => (
              <FloatingCard key={contactRequest.id}></FloatingCard>
            ))}
          </>
        )}
      </VStack>
      {data && data.result.length > 0 && (
        <Center mt="10">
          <Pagination currentPage={data.page} pages={data.pages} onPageChanged={setPage} />
        </Center>
      )}
      {/* {data && data.result.length === 0 && <NoContactRequestEmptyState />}) */}
    </>
  );
}
