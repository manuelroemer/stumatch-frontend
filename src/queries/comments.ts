import { useMutation, useQuery, useQueryClient } from 'react-query';
import { QueryOptions } from '../api/conventions';
import { getComments, postComment } from '../api/comment';

export const commentsQueryKey = 'comments';

export function usePostCommentMutation(id: string) {
  const client = useQueryClient();
  return useMutation((body: postComment) => postComment(id, body).then((res) => res.data), {
    onSuccess: () => client.invalidateQueries(commentsQueryKey),
  });
}

export function useGetCommentsQuery(id: string, options?: QueryOptions) {
  return useQuery([commentsQueryKey, id, options], () => getComments(id, options).then((res) => res.data));
}
