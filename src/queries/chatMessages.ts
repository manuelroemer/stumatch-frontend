import { useEffect } from 'react';
import { InfiniteData, QueryClient, useInfiniteQuery, useMutation, useQueryClient } from 'react-query';
import { CursorPaginationApiResult } from '../api/apiResult';
import {
  ChatMessage,
  ChatMessagePost,
  ChatMessagePut,
  deleteChatMessage,
  getAllChatGroupChatMessages,
  getChatMessage,
  postChatGroupChatMessage,
  postChatMessageRead,
  putChatMessage,
} from '../api/chatMessages';
import { useResourceChangedEventEffect } from '../sockets/resourceChangedEvent';

export const chatMessagesQueryKey = 'chatMessages';

export function useInfiniteGetAllChatGroupChatMessagesQuery(chatGroupId: string) {
  const queryClient = useQueryClient();

  // On cleanup, clear the query because keeping large chat histories can be expensive. Refetching later is better.
  useEffect(() => {
    return () => {
      queryClient.resetQueries([chatMessagesQueryKey, chatGroupId]);
    };
  }, [chatGroupId]);

  return useInfiniteQuery(
    [chatMessagesQueryKey, chatGroupId],
    ({ pageParam }) => getAllChatGroupChatMessages(chatGroupId, { ...pageParam }).then((res) => res.data),
    {
      // react-query expects `undefined` (not `null`) for "no next cursor". -> `?? undefined`
      getPreviousPageParam: (firstPage) => (firstPage?.beforeCursor ? { before: firstPage.beforeCursor } : undefined),
      onSuccess: (data) => {
        if (data?.pages && data.pages.length > 0) {
          const lastPage = data.pages[data.pages.length - 1];

          if (lastPage.result.length > 0) {
            markChatMessageAsRead(lastPage.result[lastPage.result.length - 1].id);
          }
        }
      },
    },
  );
}

export function useChatMessageSocketQueryInvalidation(chatGroupId: string) {
  const queryClient = useQueryClient();

  useResourceChangedEventEffect(
    async (event) => {
      if (event.resourceType === 'chatMessage') {
        try {
          const res = await getChatMessage(event.id);
          const message = res.data.result;
          if (message.chatGroupId !== chatGroupId) {
            console.warn(message.chatGroupId, chatGroupId);
            return;
          }

          markChatMessageAsRead(message.id);
          addOrUpdateChatMessageQueryData(queryClient, message);
        } catch (e) {
          console.warn(`Failed to fetch changed chat message with the ID ${event.id}. Ignoring this failure.`, e);
        }
      }
    },
    [chatGroupId],
  );
}

export function usePostChatGroupChatMessageMutation(chatGroupId: string) {
  const queryClient = useQueryClient();
  return useMutation((body: ChatMessagePost) => postChatGroupChatMessage(chatGroupId, body).then((res) => res.data), {
    onSuccess: ({ result }) => {
      addOrUpdateChatMessageQueryData(queryClient, result);
    },
  });
}

export function usePutChatMessageMutation() {
  const queryClient = useQueryClient();
  return useMutation(
    ({ id, body }: { id: string; body: ChatMessagePut }) => putChatMessage(id, body).then((res) => res.data),
    {
      onSuccess: ({ result }) => {
        addOrUpdateChatMessageQueryData(queryClient, result);
      },
    },
  );
}

export function useDeleteChatMessageMutation(id: string) {
  const queryClient = useQueryClient();
  return useMutation(() => deleteChatMessage(id).then((res) => res.data), {
    onSuccess: ({ result }) => {
      addOrUpdateChatMessageQueryData(queryClient, result);
    },
  });
}

function addOrUpdateChatMessageQueryData(queryClient: QueryClient, message: ChatMessage) {
  queryClient.setQueryData<InfiniteData<CursorPaginationApiResult<ChatMessage>>>(
    [chatMessagesQueryKey, message.chatGroupId],
    (data) => {
      // Using imperative mutation here so that we don't have to (potentially) copy a full set of data.
      // That gets very inefficient for large sets of chat messages and can be avoided.
      const isNew = message.createdOn === message.modifiedOn;

      if (isNew) {
        if (
          data?.pages &&
          !data.pages.some((page) => page.result.some((existingMessage) => existingMessage.id === message.id))
        ) {
          data.pages[data.pages.length - 1].result.push(message);
        }
      } else {
        for (const page of data?.pages ?? []) {
          for (const chatMessage of page.result) {
            if (chatMessage.id === message.id) {
              Object.assign(chatMessage, message);
              break;
            }
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

function markChatMessageAsRead(chatMessageId: string) {
  postChatMessageRead(chatMessageId).catch((e) =>
    console.warn(`Failed to mark chat message ${chatMessageId} as read.`, e),
  );
}
