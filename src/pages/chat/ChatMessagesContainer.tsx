import { Flex } from '@chakra-ui/react';
import { useRef } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { NoChatMessagesEmptyState } from '../../components/EmptyStates';
import { useInfiniteGetAllChatGroupChatMessagesQuery } from '../../queries/chatMessages';
import ChatMessageSelector from './ChatMessageSelector';
import ChatMessagesSkeleton from './ChatMessagesSkeleton';
import ScrollToBottomButton from './ScrollToBottomButton';

export interface ChatMessagesContainerProps {
  currentChatGroupId: string;
}

export default function ChatMessagesContainer({ currentChatGroupId }: ChatMessagesContainerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { isLoading, data, fetchPreviousPage, hasPreviousPage } =
    useInfiniteGetAllChatGroupChatMessagesQuery(currentChatGroupId);

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
      overflowY="auto"
      p={[4, 4, 8]}>
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
              <ChatMessageSelector key={chatMessage.id} chatMessage={chatMessage} />
            ))}
          </InfiniteScroll>
          <ScrollToBottomButton containerRef={containerRef} />
        </>
      )}
    </Flex>
  );
}
