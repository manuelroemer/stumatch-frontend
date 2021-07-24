import {
  Center,
  HStack,
  HTMLChakraProps,
  IconButton,
  Select,
  Spacer,
  Text,
  Tooltip,
  useToast,
  VStack,
} from '@chakra-ui/react';
import { range } from 'lodash-es';
import { IoMdCheckmark, IoMdClose } from 'react-icons/io';
import { Advertisement } from '../../api/advertisement';
import { me } from '../../api/conventions';
import { NoAdvertisementsEmptyState } from '../../components/EmptyStates';
import FloatingCard from '../../components/FloatingCard';
import ImageTitleDescriptionSkeleton from '../../components/ImageTitleDescriptionSkeleton';
import Pagination from '../../components/Pagination';
import { useGetAllAdvertisementsQuery, usePutAdvertisementMutation } from '../../queries/advertisements';
import {
  usePageQueryParameter,
  usePageSizeQueryParameter,
  useStringQueryParameter,
} from '../../utils/useQueryParameter';
import AdvertisementContainer from '../advertising/AdvertisementContainer';

export function VerifyAdvertisementsPage() {
  const [page, setPage] = usePageQueryParameter();
  const [pageSize, setPageSize] = usePageSizeQueryParameter();
  const [pageSort, setPageSort] = useStringQueryParameter('sort', 'desc');
  const [pageFilter, setPageFilter] = useStringQueryParameter('filter', 'unverified');
  const { isLoading, data } = useGetAllAdvertisementsQuery(me, {
    page,
    pageSize,
    sort: 'createdOn:' + pageSort,
    filter: pageFilter,
  });
  return (
    <>
      <VStack>
        <HStack width="full" justifyContent="space-between">
          <Spacer></Spacer>
          <Text minWidth="max-content">Sort by:</Text>
          <Select onChange={(e) => setPageSort(e.target.value)} value={pageSort}>
            <option value="desc">Descending</option>
            <option value="asc">Ascending</option>
          </Select>
          <Spacer />
          <Text>Show:</Text>
          <Select onChange={(e) => setPageSize(parseInt(e.target.value))} value={pageSize}>
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="20">20</option>
          </Select>
          <Spacer />
          <Text>Status</Text>
          <Select onChange={(e) => setPageFilter(e.target.value)} value={pageFilter}>
            <option value="">All</option>
            <option value="unverified">unverified</option>
            <option value="pendingVerification">pending verification</option>
            <option value="verified">verified</option>
            <option value="denied">denied</option>
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
              <FloatingCard padding="3" key={advertisement.id}>
                <AdvertisementContainer
                  advertisement={advertisement}
                  showAuthor={false}
                  firstButton={<VerifyButton advertisement={advertisement} />}
                  secondButton={<DenyButton advertisement={advertisement} />}
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
    </>
  );
}

function VerifyButton({ advertisement, ...props }: HTMLChakraProps<'button'> & { advertisement: Advertisement }) {
  const mutation = usePutAdvertisementMutation();
  const toast = useToast();
  return (
    <>
      <HStack>
        <Tooltip label={'Verify'} hasArrow>
          <IconButton
            aria-label="Accept"
            color="green.400"
            fontSize="25"
            icon={<IoMdCheckmark />}
            onClick={() => {
              mutation.mutate({ id: advertisement.id, body: { status: 'verified' } });
              toast({
                description: 'Ad verified!',
              });
            }}
            {...props}
          />
        </Tooltip>

        <Text>Verify</Text>
      </HStack>
    </>
  );
}

function DenyButton({ advertisement, ...props }: HTMLChakraProps<'button'> & { advertisement: Advertisement }) {
  const mutation = usePutAdvertisementMutation();
  const toast = useToast();
  return (
    <>
      <HStack>
        <Tooltip label={'Deny'} hasArrow>
          <IconButton
            aria-label="Deny"
            color="red"
            fontSize="25"
            icon={<IoMdClose />}
            onClick={() => {
              mutation.mutate({ id: advertisement.id, body: { status: 'denied' } });
              toast({
                description: 'Ad denied.',
              });
            }}
            {...props}
          />
        </Tooltip>
        <Text>Deny</Text>
      </HStack>
    </>
  );
}
