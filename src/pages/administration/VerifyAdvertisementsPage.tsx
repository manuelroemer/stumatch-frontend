import {
  Button,
  Center,
  Flex,
  Grid,
  GridItem,
  Heading,
  HStack,
  Icon,
  IconButton,
  Link,
  Select,
  Spacer,
  Text,
  useDisclosure,
  useToast,
  VStack,
} from '@chakra-ui/react';
import { range } from 'lodash-es';
import { AiOutlineCheck, AiOutlineClockCircle, AiOutlineClose, AiOutlinePicture } from 'react-icons/ai';
import { BiPlus } from 'react-icons/bi';
import { CgProfile } from 'react-icons/cg';
import { MdSubject } from 'react-icons/md';
import { useHistory } from 'react-router';
import ReactTimeago from 'react-timeago';
import { Advertisement } from '../../api/advertisement';
import { me } from '../../api/conventions';
import DefaultPageLayout from '../../components/DefaultPageLayout';
import { AccessDeniedEmptyState, NoAdvertisementsEmptyState, NoPostsEmptyState } from '../../components/EmptyStates';
import FloatingCard from '../../components/FloatingCard';
import ImageTitleDescriptionSkeleton from '../../components/ImageTitleDescriptionSkeleton';
import Pagination from '../../components/Pagination';
import RequireRoles from '../../components/RequireRoles';
import { routes } from '../../constants';
import {
  useGetAdvertisementsByUserQuery,
  useGetAllAdvertisementsQuery,
  usePutAdvertisementMutation,
} from '../../queries/advertisements';
import { getTargetGroup } from '../../utils/advertisementUtils';
import {
  usePageQueryParameter,
  usePageSizeQueryParameter,
  useStringQueryParameter,
} from '../../utils/useQueryParameter';
import AdvertisementContainer from '../advertising/AdvertisementContainer';

export function VerifyAdvertisementsPage() {
  const { isOpen, onOpen, onClose } = useDisclosure();
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
              <FloatingCard key={advertisement.id}>
                <AdContainer advertisement={advertisement} />
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

interface adContainerProps {
  advertisement: Advertisement;
}

export function AdContainer({ advertisement }: adContainerProps) {
  const history = useHistory();
  const handleClick = () => history.push(`${routes.advertising}/${advertisement.id}`);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const mutation = usePutAdvertisementMutation();
  const toast = useToast();

  return (
    <Grid templateRows="repeat(3, 1fr)" templateColumns="repeat(14, 1fr)" gap={2}>
      <GridItem rowSpan={3} colSpan={2}>
        <Center h="100%" align="center">
          <Icon aria-label="Picture" as={AiOutlinePicture} w="80%" h="80%" />
        </Center>
      </GridItem>
      <GridItem rowSpan={1} colSpan={7}>
        <HStack h="100%" align="flex-end">
          <Heading onClick={handleClick} as="h1" lineHeight="1.4" fontSize="20" isTruncated textAlign="left">
            <Link>{advertisement.title}</Link>
          </Heading>
        </HStack>
      </GridItem>
      <GridItem rowSpan={2} colSpan={1} colStart={12}>
        <Center h="100%">
          <IconButton
            aria-label="Accept"
            as={AiOutlineCheck}
            onClick={() => {
              mutation.mutate({ id: advertisement.id, body: { status: 'verified' } });
              toast({
                description: 'Ad verified!',
              });
            }}
          />
        </Center>
      </GridItem>
      <GridItem rowSpan={2} colSpan={1} colStart={13}>
        <Center h="100%">
          <IconButton
            aria-label="Decline"
            as={AiOutlineClose}
            onClick={() => {
              mutation.mutate({ id: advertisement.id, body: { status: 'denied' } });
              toast({
                description: 'Ad verified!',
              });
            }}
          />
        </Center>
      </GridItem>
      <GridItem rowSpan={1} colSpan={7}>
        <Flex h="100%" align="center">
          <Text>{advertisement.shortDescription}</Text>
        </Flex>
      </GridItem>
      <GridItem rowSpan={1} colSpan={11}>
        <HStack h="100%" justifyContent="space-between">
          <HStack>
            <Icon aria-label="Author" as={CgProfile} />
            <Text>
              {advertisement.author.lastName}, {advertisement.author.firstName}
            </Text>
          </HStack>
          <HStack>
            <Icon aria-label="Ago" as={AiOutlineClockCircle} />
            <ReactTimeago date={advertisement.createdOn} component={(props) => <Text {...props} />} />
          </HStack>
          <HStack>
            <Icon aria-label="Category" as={MdSubject} />
            <Text>{getTargetGroup(advertisement)}</Text>
          </HStack>
        </HStack>
      </GridItem>
    </Grid>
  );
}
