import { useMutation, useQuery, useQueryClient } from 'react-query';
import { QueryOptions } from '../api/conventions';
import { getComments, postComment, CommentPost, deleteComment, putComment } from '../api/comment';

export const commentsQueryKey = 'comments';

export function usePostCommentMutation(id: string) {
  const client = useQueryClient();
  return useMutation((body: CommentPost) => postComment(id, body).then((res) => res.data), {
    onSuccess: () => client.invalidateQueries(commentsQueryKey),
  });
}

export function useGetCommentsQuery(id: string, options?: QueryOptions) {
  return useQuery([commentsQueryKey, id, options], () => getComments(id, options).then((res) => res.data));
}

export function useDeleteCommentMutation(id: string) {
  const client = useQueryClient();
  return useMutation(() => deleteComment(id).then((res) => res.data), {
    onSuccess: () => client.invalidateQueries(commentsQueryKey),
  });
}

export function usePutCommentMutation(id: string) {
  const client = useQueryClient();
  return useMutation((body: CommentPost) => putComment(id, body).then((res) => res.data), {
    onSuccess: () => client.invalidateQueries(commentsQueryKey),
  });
}
