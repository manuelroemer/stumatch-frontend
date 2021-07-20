import { Flex, useColorModeValue } from '@chakra-ui/react';
import { ReactNode } from 'react';

export interface ChatHeaderProps {
  children?: ReactNode;
}

export default function ChatHeader({ children }: ChatHeaderProps) {
  const colorBg = useColorModeValue('gray.50', 'gray.800');
  const colorBd = useColorModeValue('gray.200', 'gray.600');
  return (
    <Flex w="100%" h="16" p="2" borderBottom="1px" borderBottomColor={colorBd} bg={colorBg} align="center">
      {children}
    </Flex>
  );
}
