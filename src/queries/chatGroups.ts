import { useQuery } from 'react-query';
import { getAllUserChatGroups } from '../api/chatGroups';

export const chatGroupsQueryKey = 'chatGroups';

export function useGetAllUserChatGroupsQuery(userId: string) {
  return useQuery([chatGroupsQueryKey, userId], () => getAllUserChatGroups(userId).then((res) => res.data));
}
