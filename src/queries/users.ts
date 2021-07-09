import { useMutation, useQuery, useQueryClient } from 'react-query';
import { UserPost, postUser, getUser } from '../api/users';

export const usersQueryKey = 'users';

export function useGetUserQuery(id: string) {
  return useQuery([usersQueryKey, id], () => getUser(id).then((res) => res.data));
}

export function usePostUserMutation() {
  const client = useQueryClient();
  return useMutation((body: UserPost) => postUser(body).then((res) => res.data), {
    onSuccess: () => client.invalidateQueries(usersQueryKey),
  });
}
