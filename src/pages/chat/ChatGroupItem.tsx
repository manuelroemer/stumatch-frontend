import { Heading, Flex, Tag, Center, Text, Grid, Tooltip } from '@chakra-ui/react';
import { useHistory } from 'react-router';
import ReactTimeago from 'react-timeago';
import { ChatGroup } from '../../api/chatGroups';
import { routes } from '../../constants';
import { useCurrentUser } from '../../stores/userStore';
import ChatGroupAvatarGroup from './ChatGroupAvatarGroup';
import { getChatGroupTitle } from './utils';

export interface ChatGroupItemProps {
  chatGroup: ChatGroup;
  isSelected: boolean;
}

export default function ChatGroupItem({ chatGroup, isSelected }: ChatGroupItemProps) {
  const history = useHistory();
  const title = getChatGroupTitle(chatGroup, useCurrentUser());
  const newMessages = chatGroup.unreadMessages;
  const lastMessage = chatGroup.lastMessage?.textContent;
  const handleClick = () => history.replace(`${routes.chat}/${chatGroup.id}`);

  return (
    <Grid
      templateRows="1fr 1fr"
      templateColumns="auto minmax(0, 1fr) auto"
      w="100%"
      spacing="2"
      p="2"
      cursor="pointer"
      bg={isSelected ? 'gray.300' : undefined}
      _hover={!isSelected ? { bg: 'gray.200' } : undefined}
      onClick={handleClick}>
      <Center gridRow="1 / span 2" gridColumn="1" minH="12" minW="12" mr="2">
        <ChatGroupAvatarGroup chatGroup={chatGroup} />
      </Center>
      <Flex gridRow="1" gridColumn="2" align="center" mr="2">
        <Tooltip label={title} hasArrow>
          <Heading as="h3" fontSize="sm" isTruncated>
            {title}
          </Heading>
        </Tooltip>
      </Flex>
      <Flex gridRow="1" gridColumn="3" align="center">
        <ReactTimeago
          minPeriod={10}
          date={new Date()}
          component={(props) => <Text layerStyle="timeAgoHint" {...props} />}
        />
      </Flex>
      <Flex gridRow="2" gridColumn="2" align="center" mr="2">
        {lastMessage ? (
          <Text fontSize="sm" noOfLines={1} textOverflow="ellipsis">
            {lastMessage}
          </Text>
        ) : (
          <Text layerStyle="hint" noOfLines={1} textOverflow="ellipsis">
            No messages yet.
          </Text>
        )}
      </Flex>
      {!isSelected && newMessages > 0 && (
        <Flex gridRow="2" gridColumn="3" justify="flex-end" align="center">
          <Tag colorScheme="primary" size="sm" rounded="full">
            {newMessages > 99 ? '99+' : newMessages}
          </Tag>
        </Flex>
      )}
    </Grid>
  );
}
