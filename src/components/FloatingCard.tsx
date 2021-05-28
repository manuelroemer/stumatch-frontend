import { Box, HTMLChakraProps } from '@chakra-ui/react';
import { ReactNode } from 'react';

export interface FloatingCardProps extends HTMLChakraProps<'div'> {
  children?: ReactNode;
}

export default function FloatingCard({ children, ...rest }: FloatingCardProps) {
  return (
    <Box as="section" w="100%" borderWidth="1px" borderColor="gray.50" shadow="lg" borderRadius="md" {...rest}>
      {children}
    </Box>
  );
}
