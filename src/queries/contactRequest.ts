import { useMutation, useQuery, useQueryClient } from 'react-query';
import {
  ContactRequestPost,
  ContactRequestPut,
  getAllContactRequests,
  postContactRequest,
  putContactRequest,
} from '../api/contactRequest';
import { QueryOptions } from '../api/conventions';
import { PutMutationData } from './types';

export const contactRequestsQueryKey = 'contactRequest';

export function useGetAllContactRequestsQuery(options?: QueryOptions) {
  return useQuery([contactRequestsQueryKey, options], () => getAllContactRequests(options).then((res) => res.data));
}

export function usePostContactRequestMutation() {
  const client = useQueryClient();
  return useMutation((body: ContactRequestPost) => postContactRequest(body).then((res) => res.data), {
    onSuccess: () => client.invalidateQueries(contactRequestsQueryKey),
  });
}

export function usePutContactRequestMutation() {
  const queryClient = useQueryClient();
  return useMutation(
    ({ id, body }: PutMutationData<ContactRequestPut>) => putContactRequest(id, body).then((res) => res.data),
    {
      onSuccess: (data) => {
        queryClient.setQueryData([contactRequestsQueryKey, data.result.id], () => data);
        queryClient.invalidateQueries(contactRequestsQueryKey);
      },
    },
  );
}
