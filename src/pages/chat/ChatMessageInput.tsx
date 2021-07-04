import { HStack, IconButton, Input, Tooltip } from '@chakra-ui/react';
import { BiSend } from 'react-icons/bi';

export interface ChatMessageInputProps {}

export default function ChatMessageInput({}: ChatMessageInputProps) {
  return (
    <HStack
      spacing="4"
      py="4"
      px="8"
      bg="white"
      overflowY="scroll"
      // Dirty hack: To get the correct padding as the chat messages above we need the system's
      // scrollbar width. Simply achieve that by adding a transparent scrollbar.
      sx={{ 'scrollbar-color': 'transparent transparent', 'scrollbar-width': 'thin' }}>
      <Input rounded="full" autoFocus />
      <Tooltip label="Send" hasArrow>
        <IconButton aria-label="Send" icon={<BiSend />} colorScheme="primary" rounded="full" />
      </Tooltip>
    </HStack>
  );
}
