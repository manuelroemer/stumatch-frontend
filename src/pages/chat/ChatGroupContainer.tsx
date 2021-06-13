import { HTMLChakraProps, StackDivider, VStack } from '@chakra-ui/react';
import { useQueries, UseQueryResult } from 'react-query';
import { me } from '../../api/conventions';
import { useGetAllUserChatGroupsQuery } from '../../queries/chatGroups';
import ChatGroupItem from './ChatGroupItem';
import flatten from 'lodash-es/flatten';
import { usersQueryKey } from '../../queries/users';
import { getUser, User } from '../../api/users';
import { ApiResult } from '../../api/apiResult';
import { useHistory } from 'react-router';
import { routes } from '../../constants';
import { getFullName } from '../../utils/userUtils';
import { useCurrentUser } from '../../stores/userStore';
import { ChatGroup } from '../../api/chatGroups';
import range from 'lodash-es/range';
import ImageTitleDescriptionSkeleton from '../../components/ImageTitleDescriptionSkeleton';
import { NoChatGroupsEmptyState } from '../../components/EmptyStates';

export interface ChatGroupContainerProps extends HTMLChakraProps<'div'> {
  currentChatGroupId?: string;
  chatGroupFilter: string;
}

interface EnrichedChatGroupData extends ChatGroup {
  participants: Array<User>;
}

export default function ChatGroupContainer({ currentChatGroupId, chatGroupFilter, ...rest }: ChatGroupContainerProps) {
  const history = useHistory();
  const { isLoading, data } = useChatGroupData();
  const filteredData = data.filter((chatGroup) => filterChatGroup(chatGroup, chatGroupFilter));

  return (
    <VStack h="100%" divider={<StackDivider />} spacing="0" overflowY="auto" {...rest}>
      {isLoading &&
        range(5).map((i) => (
          <ImageTitleDescriptionSkeleton key={i} w="100%" p="2" imageSize="12" textSize="4" imageTextSpacing="2" />
        ))}
      {!isLoading &&
        filteredData.length > 0 &&
        filteredData.map((chatGroupItem) => (
          <ChatGroupItem
            key={chatGroupItem.id}
            avatars={chatGroupItem.participants.map((user) => ({ name: getFullName(user!) }))}
            title={chatGroupItem.participants.map((user) => getFullName(user!)).join(', ')}
            newMessages={0}
            lastMessage={undefined}
            isSelected={currentChatGroupId === chatGroupItem.id}
            onClick={() => history.replace(`${routes.chat}/${chatGroupItem.id}`)}
          />
        ))}
      {!isLoading && filteredData.length === 0 && (
        <NoChatGroupsEmptyState size="xs" emptyDueToFiltering={data.length !== 0} />
      )}
    </VStack>
  );
}

function useChatGroupData() {
  const currentUser = useCurrentUser();
  const { isLoading: isLoadingChatGroups, data: chatGroupsData } = useGetAllUserChatGroupsQuery(me);
  const userIds = flatten((chatGroupsData?.result ?? []).map((chatGroup) => chatGroup.activeParticipantIds));
  const usersQueries = useQueries(
    userIds.map((userId) => ({
      queryKey: [usersQueryKey, userId],
      queryFn: () => getUser(userId).then((res) => res.data),
      enabled: !isLoadingChatGroups,
    })),
  ) as Array<UseQueryResult<ApiResult<User>>>;

  const isLoading = isLoadingChatGroups || usersQueries.some((query) => query.isLoading);
  const data: Array<EnrichedChatGroupData> = isLoading
    ? []
    : chatGroupsData!.result.map((chatGroup) => ({
        ...chatGroup,
        participants: chatGroup.activeParticipantIds
          .filter((userId) => userId !== currentUser.id)
          .map((userId) => usersQueries.map((query) => query.data!.result).find((user) => user!.id === userId)!),
      }));

  return { isLoading, data };
}

function filterChatGroup(chatGroup: EnrichedChatGroupData, filter: string) {
  if (!filter) {
    return true;
  }

  return chatGroup.participants.some((user) => getFullName(user).toLowerCase().includes(filter.toLowerCase()));
}