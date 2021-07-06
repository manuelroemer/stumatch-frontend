import { useEffect } from 'react';
import { InfiniteData, QueryClient, useInfiniteQuery, useMutation, useQueryClient } from 'react-query';
import { CursorPaginationApiResult } from '../api/apiResult';
import {
  ChatMessage,
  ChatMessagePost,
  ChatMessagePut,
  deleteChatMessage,
  getAllChatGroupChatMessages,
  postChatGroupChatMessage,
  putChatMessage,
} from '../api/chatMessages';
import { useResourceChangedEventEffect } from '../sockets/resourceChangedEvent';

export const chatMessagesQueryKey = 'chatMessages';

export function useInfiniteGetAllChatGroupChatMessagesQuery(chatGroupId: string) {
  const queryClient = useQueryClient();

  // On cleanup, remove the query immediately.
  // Keeping large chat histories is expensive. Refetching later is better.
  useEffect(() => () => queryClient.removeQueries([chatMessagesQueryKey, chatGroupId]), [chatGroupId]);

  return useInfiniteQuery(
    [chatMessagesQueryKey, chatGroupId],
    ({ pageParam }) => getAllChatGroupChatMessages(chatGroupId, { ...pageParam }).then((res) => res.data),
    {
      // react-query expects `undefined` (not `null`) for "no next cursor". -> `?? undefined`
      getPreviousPageParam: (firstPage) => (firstPage.beforeCursor ? { before: firstPage.beforeCursor } : undefined),
      getNextPageParam: (lastPage, allPages) => {
        const validCursors = allPages
          .map((page) => page.afterCursor)
          .filter((cursor) => !!cursor)
          .sort((a, b) => a!.localeCompare(b!));

        return validCursors.length > 0 ? { after: validCursors[validCursors.length - 1] } : undefined;
      },
    },
  );
}

export function usePostChatGroupChatMessageMutation(chatGroupId: string) {
  const queryClient = useQueryClient();
  return useMutation((body: ChatMessagePost) => postChatGroupChatMessage(chatGroupId, body), {
    onSuccess: () => {
      queryClient.invalidateQueries(chatMessagesQueryKey);
    },
  });
}

export function useChatMessageSocketQueryInvalidation(chatGroupId: string) {
  const query = useInfiniteGetAllChatGroupChatMessagesQuery(chatGroupId);
  useResourceChangedEventEffect((event) => {
    if (event.resourceType === 'chatMessage') {
      query.fetchNextPage();
    }
  });
}

export function usePutChatMessageMutation() {
  const queryClient = useQueryClient();
  return useMutation(
    ({ id, body }: { id: string; body: ChatMessagePut }) => putChatMessage(id, body).then((res) => res.data),
    {
      onSuccess: (data) => {
        updateChatMessageQueryData(queryClient, data.result);
      },
    },
  );
}

export function useDeleteChatMessageMutation(id: string) {
  const queryClient = useQueryClient();
  return useMutation(() => deleteChatMessage(id).then((res) => res.data), {
    onSuccess: (data) => {
      updateChatMessageQueryData(queryClient, data.result);
    },
  });
}

function updateChatMessageQueryData(queryClient: QueryClient, chatMessageUpdate: ChatMessage) {
  queryClient.setQueryData<InfiniteData<CursorPaginationApiResult<ChatMessage>>>(
    [chatMessagesQueryKey, chatMessageUpdate.chatGroupId],
    (data) => {
      // Using imperative mutation here so that we don't have to (potentially) copy a full set of data.
      // That gets very inefficient for large sets of chat messages and can be avoided.
      for (const page of data?.pages ?? []) {
        for (const chatMessage of page.result) {
          if (chatMessage.id === chatMessageUpdate.id) {
            Object.assign(chatMessage, chatMessageUpdate);
          }
        }
      }

      return {
        pageParams: data?.pageParams ?? [],
        pages: data?.pages ?? [],
      };
    },
  );
}
