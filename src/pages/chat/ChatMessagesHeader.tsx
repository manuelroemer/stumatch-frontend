import { IconButton, Heading, Spacer, Tooltip } from '@chakra-ui/react';
import { IoNotificationsOffOutline, IoNotificationsOutline } from 'react-icons/io5';
import { useGetChatGroupQuery, usePutChatGroupMutation } from '../../queries/chatGroups';
import { useCurrentUser } from '../../stores/userStore';
import ChatGroupAvatarGroup from './ChatGroupAvatarGroup';
import ChatHeader from './ChatHeader';
import { getChatGroupTitle } from './utils';

export interface ChatMessagesHeader {
  chatGroupId: string;
}

export default function ChatMessagesHeader({ chatGroupId }: ChatMessagesHeader) {
  const currentUser = useCurrentUser();
  const chatGroupQuery = useGetChatGroupQuery(chatGroupId);
  const putChatGroupMutation = usePutChatGroupMutation();
  const chatGroup = chatGroupQuery.data?.result;

  const handleMuteClicked = () => {
    putChatGroupMutation.mutate({
      id: chatGroupId,
      body: { mutedByMe: !chatGroup!.mutedByMe },
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
