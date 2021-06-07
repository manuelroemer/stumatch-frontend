import { Box } from '@chakra-ui/react';
import { ReactNode } from 'react';

export interface ChatHeaderProps {
  children?: ReactNode;
}

export default function ChatHeader({ children }: ChatHeaderProps) {
  return (
    <Box h="16" p="2">
      {children}
    </Box>
  );
}
