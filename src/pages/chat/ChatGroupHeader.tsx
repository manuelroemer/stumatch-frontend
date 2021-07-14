import { HStack, IconButton, Spacer, Tooltip, useDisclosure } from '@chakra-ui/react';
import FriendsListPickerModal from '../../components/FriendsListPickerModal';
import UserAvatar from '../../components/UserAvatar';
import ChatHeader from './ChatHeader';
import { BiPlus } from 'react-icons/bi';
import { User } from '../../api/users';
import { usePostChatGroupMutation } from '../../queries/chatGroups';
import { useHistory } from 'react-router';
import { routes } from '../../constants';

export default function ChatGroupHeader() {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const createChatGroupMutation = usePostChatGroupMutation();
  const history = useHistory();

  const handleChatGroupSubmit = async (users: Array<User>) => {
    const activeParticipantIds = users.map((user) => user.id!);
    const res = await createChatGroupMutation.mutateAsync({ activeParticipantIds });
    history.push(`${routes.chat}/${res.result.id}`);
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
