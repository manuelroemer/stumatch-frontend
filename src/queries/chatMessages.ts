import { useInfiniteQuery, useMutation, useQueryClient } from 'react-query';
import { ChatMessagePost, getAllChatGroupChatMessages, postChatGroupChatMessage } from '../api/chatMessages';
import { CursorPaginationQueryOptions } from '../api/conventions';
import { useResourceChangedEventEffect } from '../sockets/resourceChangedEvent';

const key = 'chatMessages';

export function useInfiniteGetAllChatGroupChatMessagesQuery(
  chatGroupId: string,
  options?: CursorPaginationQueryOptions,
) {
  return useInfiniteQuery(
    [key, chatGroupId, options],
    ({ pageParam }) => getAllChatGroupChatMessages(chatGroupId, { ...options, ...pageParam }).then((res) => res.data),
    {
      // react-query expects `undefined` (not `null`) for "no next cursor". -> `?? undefined`
      getPreviousPageParam: (lastPage) => (lastPage.beforeCursor ? { before: lastPage.beforeCursor } : undefined),
      getNextPageParam: (lastPage) => (lastPage.afterCursor ? { after: lastPage.afterCursor } : undefined),
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

export function useChatMessageSocketQueryInvalidation(chatGroupId: string, options?: CursorPaginationQueryOptions) {
  const query = useInfiniteGetAllChatGroupChatMessagesQuery(chatGroupId, options);
  useResourceChangedEventEffect((event) => {
    if (event.resourceType === 'chatMessage') {
      query.fetchNextPage();
    }
  });
}
