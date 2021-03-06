import { Flex } from '@chakra-ui/react';
import { useRef } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { ChatGroup } from '../../api/chatGroups';
import { ChatMessage } from '../../api/chatMessages';
import { NoChatMessagesEmptyState } from '../../components/EmptyStates';
import {
  useChatMessageSocketQueryInvalidation,
  useInfiniteGetAllChatGroupChatMessagesQuery,
} from '../../queries/chatMessages';
import ChatMessageSelector from './ChatMessageSelector';
import ChatMessagesSkeleton from './ChatMessagesSkeleton';
import ScrollToBottomButton from './ScrollToBottomButton';

export interface ChatMessagesContainerProps {
  chatGroup: ChatGroup;
  onChatMessageEdit(chatMessage: ChatMessage): void;
}

export default function ChatMessagesContainer({ chatGroup, onChatMessageEdit }: ChatMessagesContainerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { isLoading, data, fetchPreviousPage, hasPreviousPage } = useInfiniteGetAllChatGroupChatMessagesQuery(
    chatGroup.id,
  );
  useChatMessageSocketQueryInvalidation(chatGroup.id);

  // Due to the 'column-reverse' hack we must also reverse the order in which messages are rendered.
  // Otherwise they are displayed bottom-to-top.
  const chatMessages = data?.pages.flatMap((page) => page.result).reverse() ?? [];

  return (
    <Flex
      id="chatMessagesContainer"
      ref={containerRef}
      as="article"
      flexDirection="column-reverse"
      flexGrow={1}
      height="0"
      p={[4, 4, 8]}
      overflowY="scroll">
      {isLoading && chatMessages.length === 0 && <ChatMessagesSkeleton />}
      {!isLoading && chatMessages.length === 0 && <NoChatMessagesEmptyState />}
      {chatMessages.length > 0 && (
        <>
          <InfiniteScroll
            style={{ display: 'flex', flexDirection: 'column-reverse' }}
            scrollableTarget="chatMessagesContainer"
            dataLength={chatMessages.length}
            inverse={true}
            hasMore={hasPreviousPage ?? false}
            next={() => fetchPreviousPage()}
            loader={<ChatMessagesSkeleton />}
            pullDownToRefresh={false}>
            {chatMessages.map((chatMessage) => (
              <ChatMessageSelector
                key={chatMessage.id}
                chatMessage={chatMessage}
                chatGroup={chatGroup}
                onChatMessageEdit={onChatMessageEdit}
              />
            ))}
          </InfiniteScroll>
          <ScrollToBottomButton containerRef={containerRef} />
        </>
      )}
    </Flex>
  );
}
