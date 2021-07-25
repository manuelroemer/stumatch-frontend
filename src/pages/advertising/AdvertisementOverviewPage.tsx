import {
  Button,
  Center,
  HStack,
  HTMLChakraProps,
  IconButton,
  Select,
  Spacer,
  Text,
  Tooltip,
  useDisclosure,
  VStack,
} from '@chakra-ui/react';
import { range } from 'lodash-es';
import { FaRegEdit } from 'react-icons/fa';
import { BiPlus } from 'react-icons/bi';
import { Advertisement } from '../../api/advertisement';
import { me } from '../../api/conventions';
import { NoAdvertisementsEmptyState } from '../../components/EmptyStates';
import FloatingCard from '../../components/FloatingCard';
import ImageTitleDescriptionSkeleton from '../../components/ImageTitleDescriptionSkeleton';
import Pagination from '../../components/Pagination';
import { useDeleteAdvertisementMutation, useGetAdvertisementsByUserQuery } from '../../queries/advertisements';
import {
  usePageQueryParameter,
  usePageSizeQueryParameter,
  useStringQueryParameter,
} from '../../utils/useQueryParameter';
import AdvertisementContainer from './AdvertisementContainer';
import AdvertisementModal from './AdvertisementModal';
import { useDeleteConfirmationModal } from '../../components/DeleteConfirmationModal';
import { MdDeleteForever } from 'react-icons/md';

export default function AdvertisementOverviewPage() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [page, setPage] = usePageQueryParameter();
  const [pageSize, setPageSize] = usePageSizeQueryParameter();
  const [pageSort, setPageSort] = useStringQueryParameter('sort', 'desc');
  const { isLoading, data } = useGetAdvertisementsByUserQuery(me, {
    page,
    pageSize,
    sort: 'createdOn:' + pageSort,
  });
  return (
    <>
      <VStack>
        <HStack justify="flex-end" w="100%">
          <Button onClick={onOpen} colorScheme="primary" leftIcon={<BiPlus />} size="md">
            Create New
          </Button>
        </HStack>

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
              <FloatingCard padding={3} key={advertisement.id}>
                <AdvertisementContainer
                  advertisement={advertisement}
                  showAuthor={false}
                  showStatus={true}
                  firstButton={<EditButton advertisement={advertisement} />}
                  secondButton={<DeleteButton advertisement={advertisement} />}
                />
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
      <AdvertisementModal isUpdate={false} isOpen={isOpen} onClose={onClose} />
    </>
  );
}

function EditButton({ advertisement, ...props }: HTMLChakraProps<'button'> & { advertisement: Advertisement }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <HStack>
        <Tooltip label={'Edit Ad'}>
          <IconButton size="sm" aria-label="Edit" fontSize="17" icon={<FaRegEdit />} onClick={onOpen} {...props} />
        </Tooltip>
        <Text>Edit </Text>
      </HStack>
      <AdvertisementModal isUpdate={true} isOpen={isOpen} onClose={onClose} advertisement={advertisement} />
    </>
  );
}

function DeleteButton({ advertisement, ...props }: HTMLChakraProps<'button'> & { advertisement: Advertisement }) {
  const mutation = useDeleteAdvertisementMutation(advertisement.id);
  const deleteModal = useDeleteConfirmationModal();
  return (
    <>
      <HStack>
        <Tooltip label={'Delete'} hasArrow>
          <IconButton
            aria-label="Delete"
            fontSize="25"
            size="sm"
            icon={<MdDeleteForever />}
            onClick={() => {
              deleteModal.show({
                header: 'Remove Advertisement ',
                cancelText: 'No, keep it',
                confirmText: 'Yes, delete it',
                onConfirm: () => mutation.mutateAsync(),
              });
            }}
            {...props}
          />
        </Tooltip>
        <Text>Delete</Text>
      </HStack>

      {deleteModal.modal}
    </>
  );
}
