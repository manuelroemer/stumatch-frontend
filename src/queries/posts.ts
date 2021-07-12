import { useMutation, useQuery, useQueryClient } from 'react-query';
import { QueryOptions } from '../api/conventions';
import { getAllPosts, getPostByID, PostPost } from '../api/post';

export const postsQueryKey = 'posts';

export function useGetAllPostsQuery(userId: string, options?: QueryOptions) {
  return useQuery([postsQueryKey, userId, options], () => getAllPosts(userId, options).then((res) => res.data));
}

export function useGetPostByIDQuery(postId: string) {
  return useQuery([postsQueryKey], () => getPostByID(postId).then((res) => res.data));
}

export function usePostMutation() {
  const client = useQueryClient();
  return useMutation((body: PostPost) => PostPost(body).then((res) => res.data), {
    onSuccess: () => client.invalidateQueries(postsQueryKey),
  });
}
