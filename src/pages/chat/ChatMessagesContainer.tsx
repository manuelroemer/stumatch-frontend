import { Box } from '@chakra-ui/react';
import { useQuery } from 'react-query';
import { getAllChatGroupChatMessages } from '../../api/chatMessages';
import ChatMessageSelector from './ChatMessageSelector';

export interface ChatMessagesContainerProps {
  currentChatGroupId: string;
}

export default function ChatMessagesContainer({ currentChatGroupId }: ChatMessagesContainerProps) {
  const { data } = useQuery(['chatMessages', currentChatGroupId], () =>
    getAllChatGroupChatMessages(currentChatGroupId).then((res) => res.data),
  );

  return (
    <Box as="article" flexGrow={1} height="0" overflowY="auto" p={[4, 4, 8]}>
      {data &&
        data.result.length > 0 &&
        data.result.map((chatMessage) => <ChatMessageSelector key={chatMessage.id} chatMessage={chatMessage} />)}
    </Box>
  );
}
