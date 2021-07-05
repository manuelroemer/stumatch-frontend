import { useMutation, useQueryClient } from 'react-query';
import { UserPost, postUser } from '../api/users';

export const usersQueryKey = 'users';

export function usePostUserMutation() {
  const client = useQueryClient();
  return useMutation((body: UserPost) => postUser(body).then((res) => res.data), {
    onSuccess: () => client.invalidateQueries(usersQueryKey),
  });
}
