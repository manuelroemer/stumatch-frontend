import { useMutation, useQuery, useQueryClient } from 'react-query';
import { QueryOptions } from '../api/conventions';
import {
  deleteMatchRequest,
  getAllUserMatchRequests,
  MatchRequestAcceptOrDeclinePost,
  MatchRequestPost,
  MatchRequestPut,
  postMatchRequest,
  postMatchRequestAcceptOrDeclinePost,
  putMatchRequest,
} from '../api/matching';
import { useResourceChangedEventEffect } from '../sockets/resourceChangedEvent';
import { PutMutationData } from './types';

export const matchRequestsQueryKey = 'matchRequests';

export function useGetAllUserMatchRequestsQuery(userId: string, options?: QueryOptions) {
  return useQuery([matchRequestsQueryKey, userId, options], () =>
    getAllUserMatchRequests(userId, options).then((res) => res.data),
  );
}

export function useDeleteMatchRequestMutation(id: string) {
  const client = useQueryClient();
  return useMutation(() => deleteMatchRequest(id).then((res) => res.data), {
    onSuccess: () => client.invalidateQueries(matchRequestsQueryKey),
  });
}

export function usePostMatchRequestMutation() {
  const client = useQueryClient();
  return useMutation((body: MatchRequestPost) => postMatchRequest(body).then((res) => res.data), {
    onSuccess: () => client.invalidateQueries(matchRequestsQueryKey),
  });
}

export function usePutMatchRequestMutation() {
  const client = useQueryClient();
  return useMutation(
    ({ id, body }: PutMutationData<MatchRequestPut>) => putMatchRequest(id, body).then((res) => res.data),
    {
      onSuccess: () => client.invalidateQueries(matchRequestsQueryKey),
    },
  );
}

export function usePostAcceptDeclineMatchRequestMutation(id: string) {
  const client = useQueryClient();
  return useMutation(
    (body: MatchRequestAcceptOrDeclinePost) => postMatchRequestAcceptOrDeclinePost(id, body).then((res) => res.data),
    {
      onSuccess: () => client.invalidateQueries(matchRequestsQueryKey),
    },
  );
}

export function useUserMatchRequestSocketQueryInvalidation() {
  const queryClient = useQueryClient();
  useResourceChangedEventEffect((event) => {
    console.log(event);
    if (event.resourceType === 'matchRequest') {
      queryClient.invalidateQueries(matchRequestsQueryKey);
    }
  });
}
