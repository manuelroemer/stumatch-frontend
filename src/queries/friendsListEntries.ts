import { useMutation, useQuery, useQueryClient } from 'react-query';
import { deleteFriendsListEntry, getAllUserFriendsListEntries } from '../api/friendsListEntries';

export const friendsListEntriesQueryKey = 'friendsListEntries';

export function useGetAllUserFriendsListEntriesQuery(userId: string) {
  return useQuery([friendsListEntriesQueryKey, userId], () =>
    getAllUserFriendsListEntries(userId).then((res) => res.data),
  );
}

export function useDeleteFriendsListEntryMutation() {
  const client = useQueryClient();
  return useMutation((id: string) => deleteFriendsListEntry(id).then((res) => res.data), {
    onSuccess: () => client.invalidateQueries(friendsListEntriesQueryKey),
  });
}
