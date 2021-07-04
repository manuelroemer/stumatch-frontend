import { useInfiniteQuery, useMutation, useQueryClient } from 'react-query';
import { ChatMessagePost, getAllChatGroupChatMessages, postChatGroupChatMessage } from '../api/chatMessages';
import { CursorPaginationQueryOptions } from '../api/conventions';

const key = 'chatMessages';

export function useInfiniteGetAllChatGroupChatMessagesQuery(
  chatGroupId: string,
  options?: CursorPaginationQueryOptions,
) {
  return useInfiniteQuery(
    [key, chatGroupId, options],
    ({ pageParam = '' }) =>
      getAllChatGroupChatMessages(chatGroupId, { ...options, before: pageParam }).then((res) => res.data),
    {
      // react-query expects `undefined` (not `null`) for "no next cursor". -> `?? undefined`
      getPreviousPageParam: (lastPage) => lastPage.nextCursor ?? undefined,
    },
  );
}

export function usePostChatGroupChatMessageMutation(chatGroupId: string) {
  const queryClient = useQueryClient();
  return useMutation((body: ChatMessagePost) => postChatGroupChatMessage(chatGroupId, body), {
    onSuccess: () => {
      queryClient.invalidateQueries(key);
    },
  });
}
