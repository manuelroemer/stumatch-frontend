import { Button, Center, HStack, Select, Spacer, Text, useDisclosure, VStack } from '@chakra-ui/react';
import { range } from 'lodash-es';
import { BiPlus } from 'react-icons/bi';
import { me } from '../../api/conventions';
import DefaultPageLayout from '../../components/DefaultPageLayout';
import { AccessDeniedEmptyState, NoAdvertisementsEmptyState, NoPostsEmptyState } from '../../components/EmptyStates';
import FloatingCard from '../../components/FloatingCard';
import ImageTitleDescriptionSkeleton from '../../components/ImageTitleDescriptionSkeleton';
import Pagination from '../../components/Pagination';
import RequireRoles from '../../components/RequireRoles';
import { useGetAdvertisementsByUserQuery, useGetAllAdvertisementsQuery } from '../../queries/advertisements';
import {
  usePageQueryParameter,
  usePageSizeQueryParameter,
  useStringQueryParameter,
} from '../../utils/useQueryParameter';
import PostModal from '../feed/PostModal';
import AdvertisementContainer from './AdvertisementContainer';

export default function AdvertisingPage() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [page, setPage] = usePageQueryParameter();
  const [pageSize, setPageSize] = usePageSizeQueryParameter();
  const [pageSort, setPageSort] = useStringQueryParameter('sort', 'desc');
  //const [pageFilter, setPageFilter] = useStringQueryParameter('filter', '');
  const { isLoading, data } = useGetAdvertisementsByUserQuery(me, {
    page,
    pageSize,
    sort: 'createdOn:' + pageSort,
    //filter: pageFilter,
  });
  return (
    <RequireRoles roles={['admin', 'advertiser']} fallback={<AccessDeniedEmptyState />}>
      <DefaultPageLayout
        header="Your Ads"
        actions={
          <Button onClick={onOpen} colorScheme="primary" leftIcon={<BiPlus />} size="md">
            Create New
          </Button>
        }>
        <VStack>
          <HStack width="full" justifyContent="space-between">
            <Text>Category:</Text>

            <Spacer></Spacer>
            <Text minWidth="max-content">Sort by:</Text>
            <Select onChange={(e) => setPageSort(e.target.value)} value={pageSort}>
              <option value="desc">Descending</option>
              <option value="asc">Ascending</option>
            </Select>
            <Spacer></Spacer>
            <Text>Show:</Text>
            <Select onChange={(e) => setPageSize(parseInt(e.target.value))} value={pageSize}>
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="20">20</option>
            </Select>
          </HStack>
          {isLoading ? (
            range(3).map((i) => (
              <FloatingCard key={i} p="4">
                <ImageTitleDescriptionSkeleton />
              </FloatingCard>
            ))
          ) : (
            <>
              {data?.result.map((advertisement) => (
                <FloatingCard key={advertisement.id}>
                  <AdvertisementContainer advertisement={advertisement} />
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
        {data && data.result.length === 0 && <NoAdvertisementsEmptyState />}
      </DefaultPageLayout>
      <PostModal isOpen={isOpen} onClose={onClose} />
    </RequireRoles>
  );
}
