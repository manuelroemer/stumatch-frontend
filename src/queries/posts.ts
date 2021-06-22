import { useQuery } from 'react-query';
import { QueryOptions } from '../api/conventions';
import { getAllPosts } from '../api/post';

const key = 'posts';

export function useGetAllPostsQuery(userId: string, options?: QueryOptions) {
  return useQuery([key, userId, options], () => getAllPosts(userId, options).then((res) => res.data));
}
