import { useMutation, useQuery, useQueryClient } from 'react-query';
import { QueryOptions } from '../api/conventions';
import { deleteMatchRequest, getAllUserMatchRequests, MatchRequestPost, postMatchRequest } from '../api/matching';

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

export function usePostMatchRequestMutation() {
  const client = useQueryClient();
  return useMutation((body: MatchRequestPost) => postMatchRequest(body).then((res) => res.data), {
    onSuccess: () => client.invalidateQueries(key),
  });
}
