import { Flex } from '@chakra-ui/react';
import { ReactNode } from 'react';

export interface ChatHeaderProps {
  children?: ReactNode;
}

export default function ChatHeader({ children }: ChatHeaderProps) {
  return (
    <Flex w="100%" h="16" p="2" borderBottom="1px" borderBottomColor="gray.200" bg="gray.50" align="center">
      {children}
    </Flex>
  );
}
