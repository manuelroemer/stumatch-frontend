import { Button, useDisclosure, Center, VStack } from '@chakra-ui/react';
import DefaultPageLayout from '../../components/DefaultPageLayout';
import { AccessDeniedEmptyState, NoMatchRequestsEmptyState } from '../../components/EmptyStates';
import RequireRoles from '../../components/RequireRoles';
import FloatingCard from '../../components/FloatingCard';
import { BiPlus } from 'react-icons/bi';
import MatchingSelector from './MatchingSelector';
import MatchingModal from './MatchingModal';
import Pagination from '../../components/Pagination';
import { useGetAllUserMatchRequestsQuery } from '../../queries/matchRequests';
import { usePageQueryParameter, usePageSizeQueryParameter } from '../../utils/useQueryParameter';
import ImageTitleDescriptionSkeleton from '../../components/ImageTitleDescriptionSkeleton';
import { me } from '../../api/conventions';
import range from 'lodash-es/range';

export default function MatchingPage() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [page, setPage] = usePageQueryParameter();
  const [pageSize] = usePageSizeQueryParameter();
  const { isLoading, data } = useGetAllUserMatchRequestsQuery(me, { page, pageSize, sort: 'createdOn:desc' });

  return (
    <RequireRoles roles={['student', 'admin']} fallback={<AccessDeniedEmptyState />}>
      <DefaultPageLayout
        header="Your Matchings"
        subHeader="Match and connect with other students."
        actions={
          <Button onClick={onOpen} colorScheme="primary" leftIcon={<BiPlus />} size="md">
            Create New
          </Button>
        }>
        <VStack spacing="5">
          {isLoading ? (
            range(page < (data?.pages ?? -1) ? pageSize : 3).map((i) => (
              <FloatingCard key={i}>
                <ImageTitleDescriptionSkeleton />
              </FloatingCard>
            ))
          ) : (
            <>
              {data?.result.map((matchRequest) => (
                <FloatingCard key={matchRequest.id}>
                  <MatchingSelector matchRequest={matchRequest} />
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
        {data && data.result.length === 0 && <NoMatchRequestsEmptyState />}
      </DefaultPageLayout>
      <MatchingModal isOpen={isOpen} onClose={onClose} />
    </RequireRoles>
  );
}
