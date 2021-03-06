import { Flex, Grid, useColorModeValue } from '@chakra-ui/react';
import { useState } from 'react';
import { useParams } from 'react-router';
import { NoChatGroupSelectedEmptyState } from '../../components/EmptyStates';
import ChatArea from './ChatArea';
import ChatGroupContainer from './ChatGroupContainer';
import ChatGroupFilter from './ChatGroupFilter';
import ChatGroupHeader from './ChatGroupHeader';

interface RouteParams {
  chatGroupId?: string;
}

export default function ChatPage() {
  const { chatGroupId } = useParams<RouteParams>();
  const [chatGroupFilter, setChatGroupFilter] = useState('');
  const colorBg = useColorModeValue('gray.200', 'gray.600');

  return (
    <Grid h="100%" gridTemplateColumns="24rem minmax(0, 1fr)">
      <Flex as="aside" borderRight="1px" borderRightColor={colorBg} direction="column">
        <ChatGroupHeader />
        <ChatGroupFilter onFilterChanged={setChatGroupFilter} />
        <ChatGroupContainer chatGroupId={chatGroupId} chatGroupFilter={chatGroupFilter} />
      </Flex>
      <Flex as="main" direction="column">
        {chatGroupId ? <ChatArea chatGroupId={chatGroupId} /> : <NoChatGroupSelectedEmptyState />}
      </Flex>
    </Grid>
  );
}
