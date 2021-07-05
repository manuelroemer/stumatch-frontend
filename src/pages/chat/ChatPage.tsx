import { Flex, Grid } from '@chakra-ui/react';
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
  chatGroupId?: string;
}

export default function AdministrationPage() {
  const { chatGroupId } = useParams<RouteParams>();
  const [chatGroupFilter, setChatGroupFilter] = useState('');

  return (
    <Grid h="100%" gridTemplateColumns="24rem minmax(0, 1fr)">
      <Flex as="aside" borderRight="1px" borderRightColor="gray.200" direction="column">
        <ChatGroupHeader />
        <ChatGroupFilter filter={chatGroupFilter} onFilterChanged={setChatGroupFilter} />
        <ChatGroupContainer chatGroupId={chatGroupId} chatGroupFilter={chatGroupFilter} />
      </Flex>
      <Flex as="main" direction="column">
        {chatGroupId ? (
          <>
            <ChatMessagesHeader chatGroupId={chatGroupId} />
            <ChatMessagesContainer chatGroupId={chatGroupId} />
            <ChatMessageInput chatGroupId={chatGroupId} />
          </>
        ) : (
          <NoChatGroupSelectedEmptyState />
        )}
      </Flex>
    </Grid>
  );
}
