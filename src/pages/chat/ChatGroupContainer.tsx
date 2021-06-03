import { HTMLChakraProps, StackDivider, VStack } from '@chakra-ui/react';
import ChatGroupItem from './ChatGroupItem';

export interface ChatGroupContainerProps extends HTMLChakraProps<'div'> {}

export default function ChatGroupContainer({ ...rest }: ChatGroupContainerProps) {
  return (
    <VStack as="aside" h="100%" divider={<StackDivider />} spacing="0" overflowY="auto" {...rest}>
      TODO
    </VStack>
  );
}
