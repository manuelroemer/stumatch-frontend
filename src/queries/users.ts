import { useMutation, useQuery, useQueryClient } from 'react-query';
import { UserPost, postUser, getUser, getAllUsers, putUserRoles, UserPutRoles } from '../api/users';
import { QueryOptions } from '../api/conventions';
import { PutMutationData } from './types';

export const usersQueryKey = 'users';

export function useGetAllUsersQuery(options?: QueryOptions) {
  return useQuery([usersQueryKey, options], () => getAllUsers(options).then((res) => res.data));
}

export function useGetUserQuery(id: string) {
  return useQuery([usersQueryKey, id], () => getUser(id).then((res) => res.data));
}

export function usePostUserMutation() {
  const client = useQueryClient();
  return useMutation((body: UserPost) => postUser(body).then((res) => res.data), {
    onSuccess: () => client.invalidateQueries(usersQueryKey),
  });
}

export function usePutUserRolesMutation() {
  const queryClient = useQueryClient();
  return useMutation(({ id, body }: PutMutationData<UserPutRoles>) => putUserRoles(id, body).then((res) => res.data), {
    onSuccess: (data) => {
      queryClient.setQueryData([usersQueryKey, data.result.id], () => data);
      queryClient.invalidateQueries(usersQueryKey);
    },
  });
}
