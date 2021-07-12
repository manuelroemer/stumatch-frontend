import { HStack, IconButton, Spacer, Tooltip, useDisclosure } from '@chakra-ui/react';
import FriendsListPickerModal from '../../components/FriendsListPickerModal';
import UserAvatar from '../../components/UserAvatar';
import ChatHeader from './ChatHeader';
import { BiPlus } from 'react-icons/bi';
import { User } from '../../api/users';

export default function ChatGroupHeader() {
  const { isOpen, onClose, onOpen } = useDisclosure();

  const handleChatGroupSubmit = (users: Array<User>) => {
    // TODO: Post ChatGroup in BE.
    console.log(users);
    return new Promise<void>((res) => setTimeout(res, 3000));
  };

  return (
    <ChatHeader>
      <HStack w="100%">
        <UserAvatar />
        <Spacer />
        <Tooltip label="Create New Chat" hasArrow>
          <IconButton aria-label="New Chat" icon={<BiPlus />} variant="ghost" rounded="full" onClick={onOpen} />
        </Tooltip>
      </HStack>
      <FriendsListPickerModal
        title="Who do you want to chat with?"
        acceptText="Create New Chat"
        cancelText="Cancel"
        isOpen={isOpen}
        onClose={onClose}
        onSubmit={handleChatGroupSubmit}
      />
    </ChatHeader>
  );
}
