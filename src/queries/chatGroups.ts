import { useQuery, useQueryClient, UseQueryOptions } from 'react-query';
import { ApiResult } from '../api/apiResult';
import { ChatGroup, getAllUserChatGroups, getChatGroup } from '../api/chatGroups';
import { useResourceChangedEventEffect } from '../sockets/resourceChangedEvent';

export const chatGroupsQueryKey = 'chatGroups';

export function useGetAllUserChatGroupsQuery(userId: string) {
  return useQuery([chatGroupsQueryKey, 'user', userId], () => getAllUserChatGroups(userId).then((res) => res.data));
}

export function useGetChatGroupQuery(id: string, options?: UseQueryOptions<unknown, unknown, ApiResult<ChatGroup>>) {
  return useQuery([chatGroupsQueryKey, id], () => getChatGroup(id).then((res: any) => res.data), options);
}

export function useUserChatGroupSocketQueryInvalidation() {
  const queryClient = useQueryClient();
  useResourceChangedEventEffect((event) => {
    if (event.resourceType === 'chatGroup') {
      queryClient.invalidateQueries(chatGroupsQueryKey);
    }
  });
}
