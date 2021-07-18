import { useMutation, useQuery, useQueryClient } from 'react-query';
import { QueryOptions } from '../api/conventions';
import {
  getAllAdvertisements,
  getAdvertisementByID,
  PostAdvertisement,
  getAdvertisementsByUser,
} from '../api/advertisement';

export const advertisementsQueryKey = 'advertisements';

export function useGetAllAdvertisementsQuery(userId: string, options?: QueryOptions) {
  return useQuery([advertisementsQueryKey, userId, options], () =>
    getAllAdvertisements(userId, options).then((res) => res.data),
  );
}
export function useGetAdvertisementsByUserQuery(userId: string, options?: QueryOptions) {
  return useQuery([advertisementsQueryKey, userId, options], () =>
    getAdvertisementsByUser(userId, options).then((res) => res.data),
  );
}

export function useGetAdvertisementByIDQuery(advertisementId: string) {
  return useQuery([advertisementsQueryKey], () => getAdvertisementByID(advertisementId).then((res) => res.data));
}

export function useAdvertisementMutation() {
  const client = useQueryClient();
  return useMutation((body: PostAdvertisement) => PostAdvertisement(body).then((res) => res.data), {
    onSuccess: () => client.invalidateQueries(advertisementsQueryKey),
  });
}
