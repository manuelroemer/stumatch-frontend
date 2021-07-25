import { useMutation, useQuery, useQueryClient } from 'react-query';
import { QueryOptions } from '../api/conventions';
import {
  getAllAdvertisements,
  getAdvertisementByID,
  PostAdvertisement,
  getAdvertisementsByUser,
  PutAdvertisement,
  getRandomAdvertisement,
} from '../api/advertisement';
import { PutMutationData } from './types';
import range from 'lodash-es/range';

export const advertisementsQueryKey = 'advertisements';

export function useGetAllAdvertisementsQuery(userId: string, options?: QueryOptions) {
  return useQuery([advertisementsQueryKey, userId, options], () =>
    getAllAdvertisements(options).then((res) => res.data),
  );
}
export function useGetAdvertisementsByUserQuery(userId: string, options?: QueryOptions) {
  return useQuery([advertisementsQueryKey, userId, options], () =>
    getAdvertisementsByUser(userId, options).then((res) => res.data),
  );
}

export function useGetAdvertisementByIDQuery(advertisementId: string) {
  return useQuery([advertisementsQueryKey, advertisementId], () =>
    getAdvertisementByID(advertisementId).then((res) => res.data),
  );
}

export function useGetRandomAdvertisementsQuery(count: number) {
  return useQuery([advertisementsQueryKey, 'random', count], async () => {
    try {
      const adPromises = range(count).map(() => getRandomAdvertisement().then((res) => res.data));
      return await Promise.all(adPromises);
    } catch {
      return [];
    }
  });
}

export function usePostAdvertisementMutation() {
  const client = useQueryClient();
  return useMutation((body: PostAdvertisement) => PostAdvertisement(body).then((res) => res.data), {
    onSuccess: () => client.invalidateQueries(advertisementsQueryKey),
  });
}

export function usePutAdvertisementMutation() {
  const client = useQueryClient();
  return useMutation(
    ({ id, body }: PutMutationData<PutAdvertisement>) => PutAdvertisement(id, body).then((res) => res.data),
    {
      onSuccess: () => client.invalidateQueries(advertisementsQueryKey),
    },
  );
}
