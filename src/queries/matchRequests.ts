import { useMutation, useQuery, useQueryClient } from 'react-query';
import { QueryOptions } from '../api/conventions';
import { deleteMatchRequest, getAllUserMatchRequests } from '../api/matching';

const key = 'matchRequests';

export function useGetAllUserMatchRequestsQuery(userId: string, options?: QueryOptions) {
  return useQuery([key, userId, options], () => getAllUserMatchRequests(userId, options).then((res) => res.data));
}

export function useDeleteMatchRequestMutation(id: string) {
  const client = useQueryClient();
  return useMutation(() => deleteMatchRequest(id).then((res) => res.data), {
    onSuccess: () => client.invalidateQueries(key),
  });
}
