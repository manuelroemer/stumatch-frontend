import { Box, Flex, IconButton, Menu, MenuButton, MenuItem, MenuList, Text } from '@chakra-ui/react';
import ReactTimeago from 'react-timeago';
import { ChatMessage } from '../../api/chatMessages';
import { useCurrentUser } from '../../stores/userStore';
import { HiChevronDown } from 'react-icons/hi';
import { AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai';

export interface ChatMessageSelectorProps {
  chatMessage: ChatMessage;
}

export default function ChatMessageSelector({ chatMessage }: ChatMessageSelectorProps) {
  const currentUser = useCurrentUser();
  const isWrittenByCurrentUser = chatMessage.userId === currentUser.id;
  const textColor = isWrittenByCurrentUser ? 'white' : undefined;

  return (
    <Flex justify={isWrittenByCurrentUser ? 'flex-end' : 'flex-start'}>
      <Box maxW="60%" my="0.5" p="2" rounded="2xl" bg={isWrittenByCurrentUser ? 'primary.500' : 'gray.200'}>
        <Flex alignItems="flex-start">
          <Text flexGrow={1} minW={0} whiteSpace="pre-line" color={textColor}>
            {chatMessage.textContent}
          </Text>
          <Menu strategy="fixed">
            <MenuButton
              mt="1"
              ml="1"
              minH="6"
              as={IconButton}
              aria-label="Options"
              icon={<HiChevronDown />}
              size="xs"
              variant="link"
              color={textColor}
              opacity={0.6}
              _hover={{ opacity: 0.8 }}
              _active={{ color: textColor, opacity: 1.0 }}
              _focus={{ outline: 'none' }}
            />
            <MenuList>
              <MenuItem icon={<AiOutlineEdit />}>Edit</MenuItem>
              <MenuItem icon={<AiOutlineDelete />}>Delete</MenuItem>
            </MenuList>
          </Menu>
        </Flex>
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
