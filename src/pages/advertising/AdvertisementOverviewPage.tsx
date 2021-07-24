import {
  Button,
  Center,
  HStack,
  IconButton,
  Select,
  Spacer,
  Text,
  Tooltip,
  useDisclosure,
  VStack,
} from '@chakra-ui/react';
import { range } from 'lodash-es';
import { BiPlus } from 'react-icons/bi';
import { FaRegEdit } from 'react-icons/fa';
import { me } from '../../api/conventions';
import DefaultPageLayout from '../../components/DefaultPageLayout';
import { AccessDeniedEmptyState, NoAdvertisementsEmptyState } from '../../components/EmptyStates';
import FloatingCard from '../../components/FloatingCard';
import ImageTitleDescriptionSkeleton from '../../components/ImageTitleDescriptionSkeleton';
import Pagination from '../../components/Pagination';
import RequireRoles from '../../components/RequireRoles';
import { useGetAdvertisementsByUserQuery } from '../../queries/advertisements';
import {
  usePageQueryParameter,
  usePageSizeQueryParameter,
  useStringQueryParameter,
} from '../../utils/useQueryParameter';
import AdvertisementContainer from './AdvertisementContainer';
import AdvertisementModal from './AdvertisementModal';

export default function AdvertisementOverviewPage() {
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
  const editButton = (
    <>
      <HStack>
        <Tooltip label={'Edit Ad'}>
          <IconButton size="sm" aria-label="Edit" fontSize="17" icon={<FaRegEdit />} onClick={onOpen} />
        </Tooltip>
        <Text>Edit </Text>
      </HStack>
    </>
  );
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
                  <AdvertisementContainer advertisement={advertisement} showAuthor={false} secondButton={editButton} />
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
      <AdvertisementModal isUpdate={false} isOpen={isOpen} onClose={onClose} />
    </RequireRoles>
  );
}
