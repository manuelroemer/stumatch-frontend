import { Box, Button, Text } from '@chakra-ui/react';
import { Fragment, useRef } from 'react';
import { useEffect, UIEvent } from 'react';
import { useInfiniteQuery, useQuery } from 'react-query';
import { getAllChatGroupChatMessages } from '../../api/chatMessages';
import { isScrolledToTop, scrollToBottom } from '../../utils/scrollUtils';
import ChatMessageSelector from './ChatMessageSelector';
import ChatMessagesSkeleton from './ChatMessagesSkeleton';
import ScrollToBottomButton from './ScrollToBottomButton';

export interface ChatMessagesContainerProps {
  currentChatGroupId: string;
}

export default function ChatMessagesContainer({ currentChatGroupId }: ChatMessagesContainerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { isLoading, data, fetchPreviousPage, hasPreviousPage, isFetchingPreviousPage } = useInfiniteQuery(
    ['chatMessages', currentChatGroupId],
    ({ pageParam = '' }) => {
      return getAllChatGroupChatMessages(currentChatGroupId, { before: pageParam }).then((res) => res.data);
    },
    {
      // react-query expects `undefined` (not `null`) for "no next cursor". -> `?? undefined`
      getPreviousPageParam: (lastPage) => lastPage.nextCursor ?? undefined,
    },
  );

  const handleScroll = (e: UIEvent) => {
    if (isScrolledToTop(e.currentTarget) && hasPreviousPage && !isFetchingPreviousPage) {
      fetchPreviousPage();
    }
  };

  useEffect(() => {
    if (containerRef.current && !isFetchingPreviousPage) {
      // scrollToBottom(containerRef.current);
    }
  }, [isLoading, data]);

  return (
    <Box ref={containerRef} as="article" flexGrow={1} height="0" overflowY="auto" p={[4, 4, 8]} onScroll={handleScroll}>
      {isFetchingPreviousPage && <ChatMessagesSkeleton />}
      {data &&
        data.pages.length > 0 &&
        data.pages.map((page, i) => (
          <Fragment key={i}>
            {page.result.map((chatMessage) => (
              <ChatMessageSelector key={chatMessage.id} chatMessage={chatMessage} />
            ))}
          </Fragment>
        ))}
      <ScrollToBottomButton containerRef={containerRef} />
    </Box>
  );
}
