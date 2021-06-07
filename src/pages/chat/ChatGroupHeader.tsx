import { HStack } from '@chakra-ui/react';
import UserAvatar from '../../components/UserAvatar';
import ChatHeader from './ChatHeader';

export default function ChatGroupHeader() {
  return (
    <ChatHeader>
      <HStack>
        <UserAvatar />
      </HStack>
    </ChatHeader>
  );
}
