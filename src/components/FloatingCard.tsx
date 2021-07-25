import { Box, HTMLChakraProps, useColorModeValue } from '@chakra-ui/react';
import { ReactNode } from 'react';

export interface FloatingCardProps extends HTMLChakraProps<'div'> {
  children?: ReactNode;
}

/**
 * The floating card is a simple container for arbitrary, grouped content.
 * It appears as a card with a shadow beneath it.
 *
 * Used accross the board for self-contained elements.
 */
export default function FloatingCard({ children, ...rest }: FloatingCardProps) {
  const colorBg = useColorModeValue('white', 'gray.700');
  const colorBd = useColorModeValue('gray.50', 'gray.600');
  return (
    <Box
      as="section"
      w="100%"
      borderWidth="1px"
      borderColor={colorBd}
      bg={colorBg}
      shadow="lg"
      borderRadius="md"
      {...rest}>
      {children}
    </Box>
  );
}
