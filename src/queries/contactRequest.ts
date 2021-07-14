import { useMutation, useQuery, useQueryClient } from 'react-query';
import { ContactRequestPost, getAllContactRequests, postContactRequest } from '../api/contactRequest';
import { QueryOptions } from '../api/conventions';

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
