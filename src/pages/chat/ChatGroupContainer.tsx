import { HTMLChakraProps, StackDivider, VStack } from '@chakra-ui/react';
import { useQueries, UseQueryResult } from 'react-query';
import { me } from '../../api/conventions';
import { useGetAllUserChatGroupsQuery } from '../../queries/chatGroups';
import ChatGroupItem from './ChatGroupItem';
import flatten from 'lodash-es/flatten';
import { usersQueryKey } from '../../queries/users';
import { getUser, User } from '../../api/users';
import { ApiResult } from '../../api/apiResult';
import { useHistory, useParams } from 'react-router';
import { routes } from '../../constants';

export interface ChatGroupContainerProps extends HTMLChakraProps<'div'> {}

interface RouteParams {
  groupId?: string;
}

export default function ChatGroupContainer({ ...rest }: ChatGroupContainerProps) {
  const { groupId } = useParams<RouteParams>();
  const history = useHistory();
  const { isLoading: isLoadingChatGroups, data } = useGetAllUserChatGroupsQuery(me);
  const userIds = flatten((data?.result ?? []).map((chatGroup) => chatGroup.activeParticipantIds));
  const usersQueries = useQueries(
    userIds.map((userId) => ({
      queryKey: [usersQueryKey, userId],
      queryFn: () => getUser(userId).then((res) => res.data),
      enabled: !isLoadingChatGroups,
    })),
  ) as Array<UseQueryResult<ApiResult<User>>>;

  const isLoading = isLoadingChatGroups || usersQueries.some((query) => query.isLoading);
  const chatGroupList = isLoading
    ? []
    : data!.result.map((chatGroup) => ({
        ...chatGroup,
        participants: chatGroup.activeParticipantIds.map((userId) =>
          usersQueries.map((query) => query.data!.result).find((user) => user!.id === userId),
        ),
      }));

  return (
    <VStack as="aside" h="100%" divider={<StackDivider />} spacing="0" overflowY="auto" {...rest}>
      {!isLoading &&
        chatGroupList.length > 0 &&
        chatGroupList.map((chatGroupItem) => (
          <ChatGroupItem
            key={chatGroupItem.id}
            avatars={chatGroupItem.participants.map((user) => ({ name: `${user?.firstName} ${user?.lastName}` }))}
            title={chatGroupItem.participants.map((user) => `${user?.firstName} ${user?.lastName}`).join(', ')}
            newMessages={0}
            lastMessage={'Last message'}
            isSelected={groupId === chatGroupItem.id}
            onClick={() => history.replace(`${routes.chat}/${chatGroupItem.id}`)}
          />
        ))}
    </VStack>
  );
}
