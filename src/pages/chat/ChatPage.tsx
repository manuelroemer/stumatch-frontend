import { Flex } from '@chakra-ui/react';
import { useState } from 'react';
import { useParams } from 'react-router';
import { NoChatGroupSelectedEmptyState } from '../../components/EmptyStates';
import ChatGroupContainer from './ChatGroupContainer';
import ChatGroupFilter from './ChatGroupFilter';
import ChatGroupHeader from './ChatGroupHeader';
import ChatMessageInput from './ChatMessageInput';
import ChatMessagesContainer from './ChatMessagesContainer';
import ChatMessagesHeader from './ChatMessagesHeader';

interface RouteParams {
  groupId?: string;
}

export default function AdministrationPage() {
  const { groupId } = useParams<RouteParams>();
  const [chatGroupFilter, setChatGroupFilter] = useState('');

  return (
    <Flex h="100%">
      <Flex as="aside" w="28rem" h="100%" borderRight="1px" borderRightColor="gray.200" direction="column">
        <ChatGroupHeader />
        <ChatGroupFilter filter={chatGroupFilter} onFilterChanged={setChatGroupFilter} />
        <ChatGroupContainer currentChatGroupId={groupId} chatGroupFilter={chatGroupFilter} />
      </Flex>
      <Flex as="main" w="100%" direction="column">
        {groupId ? (
          <>
            <ChatMessagesHeader />
            <ChatMessagesContainer currentChatGroupId={groupId} />
            <ChatMessageInput />
          </>
        ) : (
          <NoChatGroupSelectedEmptyState />
        )}
      </Flex>
    </Flex>
  );
}
