import { Box } from '@chakra-ui/react';
import { useRef } from 'react';
import { useEffect } from 'react';
import { useQuery } from 'react-query';
import { getAllChatGroupChatMessages } from '../../api/chatMessages';
import { scrollToBottom } from '../../utils/scrollUtils';
import ChatMessageSelector from './ChatMessageSelector';
import ScrollToBottomButton from './ScrollToBottomButton';

export interface ChatMessagesContainerProps {
  currentChatGroupId: string;
}

export default function ChatMessagesContainer({ currentChatGroupId }: ChatMessagesContainerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { isLoading, data } = useQuery(['chatMessages', currentChatGroupId], () =>
    getAllChatGroupChatMessages(currentChatGroupId).then((res) => res.data),
  );

  useEffect(() => {
    if (containerRef.current) {
      scrollToBottom(containerRef.current);
    }
  }, [isLoading, data]);

  return (
    <Box ref={containerRef} as="article" flexGrow={1} height="0" overflowY="auto" p={[4, 4, 8]}>
      {data &&
        data.result.length > 0 &&
        data.result.map((chatMessage) => <ChatMessageSelector key={chatMessage.id} chatMessage={chatMessage} />)}
      <ScrollToBottomButton containerRef={containerRef} />
    </Box>
  );
}
