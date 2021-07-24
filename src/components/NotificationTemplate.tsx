import {
  Center,
  Flex,
  Grid,
  Box,
  Heading,
  IconButton,
  Text,
  HStack,
  Tooltip,
  HTMLChakraProps,
  useColorModeValue,
} from '@chakra-ui/react';
import ReactTimeago from 'react-timeago';
import { IoMailOutline, IoMailOpenOutline } from 'react-icons/io5';
import { AiOutlineDelete } from 'react-icons/ai';
import { SyntheticEvent } from 'react';

export interface NotificationTemplateProps extends HTMLChakraProps<'div'> {
  title: string;
  date: Date | string;
  content: string;
  emoji: string;
  seen: boolean;
  isDeleting: boolean;
  isMarking: boolean;
  onMarkAsRead(): void;
  onMarkAsUnread(): void;
  onDelete(): void;
  onClick?(): void;
}

/**
 * The {@link NotificationTemplate} renders the inner layout of a notification.
 * It only focuses on the UI/layout and does not contain any logic for interacting with or
 * displaying the properties of a notification resource coming from the API.
 */
export default function NotificationTemplate({
  title,
  date,
  content,
  emoji,
  seen,
  isDeleting,
  isMarking,
  onMarkAsRead,
  onMarkAsUnread,
  onDelete,
  onClick,
  ...rest
}: NotificationTemplateProps) {
  const isLoading = isDeleting || isMarking;
  const onNotificationClick = () => {
    if (onClick) {
      onMarkAsRead();
      onClick();
    }
  };
  const colorBg = useColorModeValue('gray.200', 'gray.600');

  return (
    <Grid
      w="100%"
      transition="opacity 150ms"
      opacity={seen ? 0.6 : 1}
      _hover={{ opacity: 1 }}
      templateRows="auto auto"
      templateColumns="auto auto minmax(0, 1fr) auto"
      rowGap="1"
      columnGap="4"
      cursor={onClick ? 'pointer' : undefined}
      onClick={onNotificationClick}
      {...rest}>
      <Box
        gridColumn="1"
        gridRow="1 / span 2"
        w="5px"
        bg="primary.500"
        borderLeftRadius={rest.borderRadius ?? rest.borderLeftRadius}
        visibility={seen ? 'hidden' : undefined}
      />

      <Center gridColumn="2" gridRow="1 / span 2" my="4">
        <Center w="14" h="14" bg={colorBg} borderRadius="full">
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

      <Text gridRow="2" gridColumn="3" mb="4" mr="4" fontSize="sm" noOfLines={2}>
        {content}
      </Text>

      <Flex gridRow="1 / span 2" gridColumn="4" h="100%" pr="4" pb="4" align="flex-end">
        <HStack spacing="2">
          {seen && (
            <Tooltip hasArrow label="Mark as unread">
              <IconButton
                size="sm"
                aria-label="Mark as unread"
                icon={<IoMailOutline />}
                onClick={preventPropagation(onMarkAsUnread)}
                isLoading={isMarking}
                disabled={isLoading}
              />
            </Tooltip>
          )}
          {!seen && (
            <Tooltip hasArrow label="Mark as read">
              <IconButton
                size="sm"
                aria-label="Mark as read"
                icon={<IoMailOpenOutline />}
                onClick={preventPropagation(onMarkAsRead)}
                isLoading={isMarking}
                disabled={isLoading}
              />
            </Tooltip>
          )}
          <Tooltip hasArrow label="Delete">
            <IconButton
              size="sm"
              aria-label="Delete"
              icon={<AiOutlineDelete />}
              onClick={preventPropagation(onDelete)}
              isLoading={isDeleting}
              disabled={isLoading}
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
