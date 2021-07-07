import { useQuery } from 'react-query';
import { QueryOptions } from '../api/conventions';
import { getAllPosts } from '../api/post';

export const postsQueryKey = 'posts';

export function useGetAllPostsQuery(userId: string, options?: QueryOptions) {
  return useQuery([postsQueryKey, userId, options], () => getAllPosts(userId, options).then((res) => res.data));
}
