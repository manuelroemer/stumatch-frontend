import { Heading } from '@chakra-ui/react';
import { useGetChatGroupQuery } from '../../queries/chatGroups';
import { useCurrentUser } from '../../stores/userStore';
import ChatGroupAvatarGroup from './ChatGroupAvatarGroup';
import ChatHeader from './ChatHeader';
import { getChatGroupTitle } from './utils';

export interface ChatMessagesHeader {
  chatGroupId: string;
}

export default function ChatMessagesHeader({ chatGroupId }: ChatMessagesHeader) {
  const currentUser = useCurrentUser();
  const { data } = useGetChatGroupQuery(chatGroupId);

  return (
    <ChatHeader>
      {data && (
        <>
          <ChatGroupAvatarGroup chatGroup={data.result} />
          <Heading as="h2" size="sm" fontWeight="semibold" isTruncated ml="4">
            {getChatGroupTitle(data.result, currentUser)}
          </Heading>
        </>
      )}
    </ChatHeader>
  );
}
