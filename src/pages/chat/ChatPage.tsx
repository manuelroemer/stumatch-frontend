import { Flex } from '@chakra-ui/react';
import { useState } from 'react';
import ChatGroupContainer from './ChatGroupContainer';
import ChatGroupFilter from './ChatGroupFilter';
import ChatGroupHeader from './ChatGroupHeader';

export default function AdministrationPage() {
  const [chatGroupFilter, setChatGroupFilter] = useState('');

  return (
    <Flex h="100%">
      <Flex as="aside" w="25rem" h="100%" borderRight="1px" borderRightColor="gray.200" direction="column">
        <ChatGroupHeader />
        <ChatGroupFilter filter={chatGroupFilter} onFilterChanged={setChatGroupFilter} />
        <ChatGroupContainer chatGroupFilter={chatGroupFilter} />
      </Flex>
    </Flex>
  );
}
