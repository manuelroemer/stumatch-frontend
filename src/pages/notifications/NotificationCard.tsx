import {
  Center,
  Flex,
  Grid,
  Box,
  Heading,
  IconButton,
  Text,
  Icon,
  HStack,
  Tooltip,
  HTMLChakraProps,
} from '@chakra-ui/react';
import ReactTimeago from 'react-timeago';
import { IoMailOutline, IoMailOpenOutline } from 'react-icons/io5';
import { AiOutlineDelete } from 'react-icons/ai';
import { SyntheticEvent } from 'react';

export interface NotificationCardProps extends HTMLChakraProps<'div'> {
  title: string;
  date: Date | string;
  content: string;
  emoji: string;
  seen: boolean;
  onMarkAsRead(): void;
  onMarkAsUnread(): void;
  onDelete(): void;
  onClick?(): void;
}

export default function NotificationCard({
  title,
  date,
  content,
  emoji,
  seen,
  onMarkAsRead,
  onMarkAsUnread,
  onDelete,
  onClick,
  ...rest
}: NotificationCardProps) {
  return (
    <Grid
      w="100%"
      borderWidth="1px"
      borderColor="gray.50"
      shadow="lg"
      borderRadius="md"
      transition="opacity 150ms"
      opacity={seen ? 0.7 : 1}
      _hover={{ opacity: 1 }}
      templateRows="auto auto"
      templateColumns="4px auto minmax(0, 1fr) auto"
      rowGap="1"
      columnGap="4"
      cursor={onClick ? 'pointer' : undefined}
      onClick={onClick}
      {...rest}>
      <Box
        gridColumn="1"
        gridRow="1 / span 2"
        w="1"
        bg="primary.500"
        borderLeftRadius="md"
        visibility={seen ? 'hidden' : undefined}
      />

      <Center gridColumn="2" gridRow="1 / span 2" my="4">
        <Center w="14" h="14" bg="gray.200" borderRadius="full">
          <Text fontSize="2xl" unselectable="on" userSelect="none">
            {emoji}
          </Text>
        </Center>
      </Center>

      <Flex
        gridRow="1"
        gridColumn="3 / span 2"
        mt="4"
        mr="4"
        direction="row"
        align="flex-end"
        justifyContent="space-between"
        gridColumnGap="1">
        <Heading as="h3" size="xs" isTruncated>
          {title}
        </Heading>
        <ReactTimeago date={date} component={(props) => <Text layerStyle="timeAgoHint" {...props} />} />
      </Flex>

      <Text gridRow="2" gridColumn="3" mb="4" mr="4" noOfLines={2}>
        {content}
      </Text>

      <Flex gridRow="1 / span 2" gridColumn="4" h="100%" pr="4" pb="4" align="flex-end">
        <HStack spacing="2">
          {seen && (
            <Tooltip hasArrow label="Mark as unread">
              <IconButton
                size="sm"
                aria-label="Mark as unread"
                icon={<Icon as={IoMailOutline} />}
                onClick={preventPropagation(onMarkAsRead)}
              />
            </Tooltip>
          )}
          {!seen && (
            <Tooltip hasArrow label="Mark as read">
              <IconButton
                size="sm"
                aria-label="Mark as read"
                icon={<Icon as={IoMailOpenOutline} />}
                onClick={preventPropagation(onMarkAsUnread)}
              />
            </Tooltip>
          )}
          <Tooltip hasArrow label="Delete">
            <IconButton
              size="sm"
              aria-label="Delete"
              icon={<Icon as={AiOutlineDelete} />}
              onClick={preventPropagation(onDelete)}
            />
          </Tooltip>
        </HStack>
      </Flex>
    </Grid>
  );
}

// Prevents event bubbling.
// Used here for the button click event handlers to prevent clicking the card itself
// when a button was clicked.
function preventPropagation(cb?: () => void) {
  return (e: SyntheticEvent) => {
    e.preventDefault();
    e.stopPropagation();
    cb?.();
  };
}
