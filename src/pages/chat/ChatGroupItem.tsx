import { Avatar, Heading, Flex, Tag, Center, Text, Grid, AvatarGroup, AvatarProps } from '@chakra-ui/react';
import ReactTimeago from 'react-timeago';

export interface ChatGroupItemProps {
  avatars: Array<AvatarProps>;
  title: string;
  lastMessage?: string;
  newMessages: number;
  isSelected: boolean;
  onClick(): void;
}

export default function ChatGroupItem({
  avatars,
  title,
  lastMessage,
  newMessages,
  isSelected,
  onClick,
}: ChatGroupItemProps) {
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
      onClick={onClick}>
      <Center gridRow="1 / span 2" gridColumn="1" minH="12" minW="12" mr="2">
        <AvatarGroup max={2} size={avatars.length > 1 ? 'xs' : 'md'}>
          {avatars.map((avatars, i) => (
            <Avatar key={i} {...avatars} />
          ))}
        </AvatarGroup>
      </Center>
      <Flex gridRow="1" gridColumn="2" align="center" mr="2">
        <Heading as="h3" fontSize="sm" isTruncated>
          {title}
        </Heading>
      </Flex>
      <Flex gridRow="1" gridColumn="3" align="center">
        <ReactTimeago
          minPeriod={60}
          date={new Date()}
          component={(props) => <Text layerStyle="timeAgoHint" {...props} />}
        />
      </Flex>
      <Flex gridRow="2" gridColumn="2" align="center" mr="2">
        <Text fontSize="sm" isTruncated>
          {lastMessage}
        </Text>
      </Flex>
      {newMessages > 0 && (
        <Flex gridRow="2" gridColumn="3" justify="flex-end" align="center">
          <Tag colorScheme="primary" size="sm" rounded="full">
            {newMessages > 99 ? '99+' : newMessages}
          </Tag>
        </Flex>
      )}
    </Grid>
  );
}
