import { Box, Flex, Text } from '@chakra-ui/react';
import ReactTimeago from 'react-timeago';
import { ChatMessage } from '../../api/chatMessages';
import { useCurrentUser } from '../../stores/userStore';

export interface ChatMessageSelectorProps {
  chatMessage: ChatMessage;
}

export default function ChatMessageSelector({ chatMessage }: ChatMessageSelectorProps) {
  const currentUser = useCurrentUser();
  const isWrittenByCurrentUser = chatMessage.userId === currentUser.id;

  return (
    <Flex justify={isWrittenByCurrentUser ? 'flex-end' : 'flex-start'}>
      <Box
        maxW="60%"
        my="0.5"
        p="2"
        rounded="2xl"
        bg={isWrittenByCurrentUser ? 'primary.500' : 'gray.200'}
        color={isWrittenByCurrentUser ? 'white' : 'black'}>
        <Text whiteSpace="pre-line">{chatMessage.textContent}</Text>
        <ReactTimeago
          minPeriod={1}
          date={chatMessage.modifiedOn}
          component={(props) => (
            <Text
              mt="1"
              float="right"
              fontSize="0.6rem"
              color={isWrittenByCurrentUser ? 'white' : 'black'}
              opacity={0.6}
              {...props}
            />
          )}
        />
      </Box>
    </Flex>
  );
}
