import { useMutation, useQueryClient } from 'react-query';
import { deleteLike, postLike } from '../api/like';

export const likesQueryKey = 'likes';

export function usePostLikeMutation() {
  const client = useQueryClient();
  return useMutation((body: postLike) => postLike(body).then((res) => res.data), {
    onSuccess: () => client.invalidateQueries(likesQueryKey),
  });
}

export function useDeleteLikeMutation(id: string) {
  const client = useQueryClient();
  return useMutation(() => deleteLike(id).then((res) => res.data), {
    onSuccess: () => client.invalidateQueries(likesQueryKey),
  });
}
