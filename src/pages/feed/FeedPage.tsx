import DefaultPageLayout from '../../components/DefaultPageLayout';
import {
  Button,
  Center,
  HStack,
  Select,
  useDisclosure,
  VStack,
  Text,
  Spacer,
  Input,
  InputLeftElement,
  InputGroup,
} from '@chakra-ui/react';
import { AccessDeniedEmptyState, NoPostsEmptyState } from '../../components/EmptyStates';
import RequireRoles from '../../components/RequireRoles';
import FloatingCard from '../../components/FloatingCard';
import Pagination from '../../components/Pagination';
import { useGetAllPostsQuery } from '../../queries/posts';
import { FiSearch } from 'react-icons/fi';
import {
  usePageQueryParameter,
  usePageSizeQueryParameter,
  useStringQueryParameter,
} from '../../utils/useQueryParameter';
import ImageTitleDescriptionSkeleton from '../../components/ImageTitleDescriptionSkeleton';
import { me } from '../../api/conventions';
import range from 'lodash-es/range';
import PostContainer from './PostContainer';
import { BiPlus } from 'react-icons/bi';
import PostModal from './PostModal';
import { useGetAllCategoriesQuery } from '../../queries/categories';
import { useCurrentUser } from '../../stores/userStore';

export default function FeedPage() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [page, setPage] = usePageQueryParameter();
  const currentUser = useCurrentUser();
  const [pageSize, setPageSize] = usePageSizeQueryParameter();
  const [pageSort, setPageSort] = useStringQueryParameter('sort', 'desc');
  const [pageFilter, setPageFilter] = useStringQueryParameter('filter', '');
  const [pageSearch, setPageSearch] = useStringQueryParameter('search', '');
  const { isLoading, data } = useGetAllPostsQuery(me, {
    page,
    pageSize,
    sort: 'createdOn:' + pageSort,
    filter: pageFilter,
    search: pageSearch,
  });
  const { data: categoryData } = useGetAllCategoriesQuery();

  return (
    <RequireRoles roles={['student', 'admin']} fallback={<AccessDeniedEmptyState />}>
      <DefaultPageLayout
        header="Feed"
        subHeader="What happened at your university?"
        actions={
          currentUser.roles.includes('admin') || currentUser.roles.includes('globalContentManager') ? (
            <Button onClick={onOpen} colorScheme="primary" leftIcon={<BiPlus />} size="md">
              Create New
            </Button>
          ) : (
            <></>
          )
        }>
        <VStack>
          <HStack w="100%" spacing="5">
            <InputGroup>
              <InputLeftElement pointerEvents="none">
                {' '}
                <FiSearch color="gray.300" />{' '}
              </InputLeftElement>
              <Input
                onChange={(e) => setPageSearch(e.target.value.toLowerCase())}
                placeholder="Search for posts by title..."
              />
            </InputGroup>
          </HStack>
          <HStack width="full" justifyContent="space-between">
            <Text>Category:</Text>
            <Select onChange={(e) => setPageFilter(e.target.value === 'all' ? '' : e.target.value)} value={pageFilter}>
              <option value="all">All</option>
              {categoryData?.result.map((i) => (
                <option key={i} value={i}>
                  {i}
                </option>
              ))}
            </Select>
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
              {data?.result.map((post) => (
                <FloatingCard key={post.id}>
                  <PostContainer setPageFilter={setPageFilter} post={post} />
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
        {data && data.result.length === 0 && <NoPostsEmptyState />}
      </DefaultPageLayout>
      <PostModal isOpen={isOpen} onClose={onClose} />
    </RequireRoles>
  );
}
