import { useMutation, useQuery, useQueryClient } from 'react-query';
import { QueryOptions } from '../api/conventions';
import { getAllPosts, postPost } from '../api/post';

const key = 'posts';

export function useGetAllPostsQuery(userId: string, options?: QueryOptions) {
  return useQuery([key, userId, options], () => getAllPosts(userId, options).then((res) => res.data));
}

export function usePostMutation() {
  const client = useQueryClient();
  return useMutation((body: postPost) => postPost(body).then((res) => res.data), {
    onSuccess: () => client.invalidateQueries(key),
  });
}
