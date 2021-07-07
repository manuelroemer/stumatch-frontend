import { HTMLChakraProps, StackDivider, VStack } from '@chakra-ui/react';
import { me } from '../../api/conventions';
import { useGetAllUserChatGroupsQuery, useUserChatGroupSocketQueryInvalidation } from '../../queries/chatGroups';
import ChatGroupItem from './ChatGroupItem';
import { getFullName } from '../../utils/userUtils';
import { ChatGroup } from '../../api/chatGroups';
import range from 'lodash-es/range';
import ImageTitleDescriptionSkeleton from '../../components/ImageTitleDescriptionSkeleton';
import { NoChatGroupsEmptyState } from '../../components/EmptyStates';

export interface ChatGroupContainerProps extends HTMLChakraProps<'div'> {
  chatGroupId?: string;
  chatGroupFilter: string;
}

export default function ChatGroupContainer({ chatGroupId, chatGroupFilter, ...rest }: ChatGroupContainerProps) {
  const { isLoading, data } = useGetAllUserChatGroupsQuery(me);
  const chatGroups = data?.result
    .filter((chatGroup) => filterChatGroup(chatGroup, chatGroupFilter))
    .sort((a, b) => {
      const dateA = a.lastMessage?.createdOn ?? a.createdOn;
      const dateB = b.lastMessage?.createdOn ?? b.createdOn;
      return dateB.localeCompare(dateA);
    });
  useUserChatGroupSocketQueryInvalidation();

  return (
    <VStack h="100%" divider={<StackDivider />} spacing="0" overflowY="auto" {...rest}>
      {isLoading &&
        range(5).map((i) => (
          <ImageTitleDescriptionSkeleton key={i} w="100%" p="2" imageSize="12" textSize="4" imageTextSpacing="2" />
        ))}
      {chatGroups &&
        chatGroups.length > 0 &&
        chatGroups.map((chatGroup) => (
          <ChatGroupItem key={chatGroup.id} chatGroup={chatGroup} isSelected={chatGroupId === chatGroup.id} />
        ))}
      {chatGroups && chatGroups.length === 0 && (
        <NoChatGroupsEmptyState size="xs" emptyDueToFiltering={data?.result.length !== 0} />
      )}
    </VStack>
  );
}

function filterChatGroup(chatGroup: ChatGroup, filter: string) {
  if (!filter) {
    return true;
  }

  return chatGroup.activeParticipants.some((user) => getFullName(user).toLowerCase().includes(filter.toLowerCase()));
}
