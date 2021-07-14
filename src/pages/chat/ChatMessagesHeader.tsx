import { IconButton, Heading, Spacer, Tooltip } from '@chakra-ui/react';
import { IoNotificationsOffOutline, IoNotificationsOutline } from 'react-icons/io5';
import { ChatGroup } from '../../api/chatGroups';
import { usePutChatGroupMutation } from '../../queries/chatGroups';
import { useCurrentUser } from '../../stores/userStore';
import ChatGroupAvatarGroup from './ChatGroupAvatarGroup';
import ChatHeader from './ChatHeader';
import { getChatGroupTitle } from './utils';

export interface ChatMessagesHeader {
  chatGroup: ChatGroup;
}

export default function ChatMessagesHeader({ chatGroup }: ChatMessagesHeader) {
  const currentUser = useCurrentUser();
  const putChatGroupMutation = usePutChatGroupMutation();

  const handleMuteClicked = () => {
    putChatGroupMutation.mutate({
      id: chatGroup.id,
      body: { mutedByMe: !chatGroup.mutedByMe },
    });
  };

  return (
    <ChatHeader>
      {chatGroup && (
        <>
          <ChatGroupAvatarGroup chatGroup={chatGroup} />
          <Heading as="h2" size="sm" fontWeight="semibold" isTruncated ml="4">
            {getChatGroupTitle(chatGroup, currentUser)}
          </Heading>
          <Spacer />
          <Tooltip label={chatGroup.mutedByMe ? 'Unmute this chat' : 'Mute this chat'} hasArrow>
            <IconButton
              aria-label={chatGroup.mutedByMe ? 'Unmute this chat' : 'Mute this chat'}
              variant="ghost"
              rounded="full"
              icon={chatGroup.mutedByMe ? <IoNotificationsOffOutline /> : <IoNotificationsOutline />}
              onClick={handleMuteClicked}
              isLoading={putChatGroupMutation.isLoading}
            />
          </Tooltip>
        </>
      )}
    </ChatHeader>
  );
}
