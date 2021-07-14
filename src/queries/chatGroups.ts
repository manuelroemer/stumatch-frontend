import { useMutation, useQuery, useQueryClient, UseQueryOptions } from 'react-query';
import { ApiResult } from '../api/apiResult';
import {
  ChatGroup,
  ChatGroupPost,
  ChatGroupPut,
  getAllUserChatGroups,
  getChatGroup,
  postChatGroup,
  putChatGroup,
} from '../api/chatGroups';
import { useResourceChangedEventEffect } from '../sockets/resourceChangedEvent';
import { PutMutationData } from './types';

export const chatGroupsQueryKey = 'chatGroups';

export function useGetAllUserChatGroupsQuery(userId: string) {
  return useQuery([chatGroupsQueryKey, 'user', userId], () => getAllUserChatGroups(userId).then((res) => res.data));
}

export function useGetChatGroupQuery(id: string) {
  return useQuery([chatGroupsQueryKey, id], () => getChatGroup(id).then((res) => res.data));
}

export function usePostChatGroupMutation() {
  const queryClient = useQueryClient();
  return useMutation((body: ChatGroupPost) => postChatGroup(body).then((res) => res.data), {
    onSuccess: () => {
      queryClient.invalidateQueries(chatGroupsQueryKey);
    },
  });
}

export function usePutChatGroupMutation() {
  const queryClient = useQueryClient();
  return useMutation(({ id, body }: PutMutationData<ChatGroupPut>) => putChatGroup(id, body).then((res) => res.data), {
    onSuccess: (data) => {
      queryClient.setQueryData([chatGroupsQueryKey, data.result.id], () => data);
      queryClient.invalidateQueries(chatGroupsQueryKey);
    },
  });
}

export function useUserChatGroupSocketQueryInvalidation() {
  const queryClient = useQueryClient();
  useResourceChangedEventEffect((event) => {
    if (event.resourceType === 'chatGroup') {
      queryClient.invalidateQueries(chatGroupsQueryKey);
    }
  });
}
