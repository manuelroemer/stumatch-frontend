import DefaultPageLayout from '../../components/DefaultPageLayout';
import { Center, VStack } from '@chakra-ui/react';
import { AccessDeniedEmptyState, NoPostsEmptyState } from '../../components/EmptyStates';
import RequireRoles from '../../components/RequireRoles';
import FloatingCard from '../../components/FloatingCard';
import Pagination from '../../components/Pagination';
import { useGetAllPostsQuery } from '../../queries/posts';
import { usePageQueryParameter, usePageSizeQueryParameter } from '../../utils/useQueryParameter';
import ImageTitleDescriptionSkeleton from '../../components/ImageTitleDescriptionSkeleton';
import { me } from '../../api/conventions';
import range from 'lodash-es/range';
import PostContainer from './PostContainer';

export default function FeedPage() {
  const [page, setPage] = usePageQueryParameter();
  const [pageSize] = usePageSizeQueryParameter();
  const { isLoading, data } = useGetAllPostsQuery(me, { page, pageSize, sort: 'createdOn:desc' });

  return (
    <RequireRoles roles={['student', 'admin']} fallback={<AccessDeniedEmptyState />}>
      <DefaultPageLayout header="Feed" subHeader="What happened at your university?">
        <VStack spacing="5">
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
                  <PostContainer post={post} />
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
    </RequireRoles>
  );
}
