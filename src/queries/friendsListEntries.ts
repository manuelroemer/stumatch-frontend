import { useQuery } from 'react-query';
import { getAllUserFriendsListEntries } from '../api/friendsListEntries';

export const friendsListEntriesQueryKey = 'friendsListEntries';

export function useGetAllUserFriendsListEntriesQuery(userId: string) {
  return useQuery([friendsListEntriesQueryKey, userId], () =>
    getAllUserFriendsListEntries(userId).then((res) => res.data),
  );
}
