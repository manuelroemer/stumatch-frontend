import { Box, HTMLChakraProps, useColorModeValue } from '@chakra-ui/react';
import { ReactNode } from 'react';

export interface FloatingCardProps extends HTMLChakraProps<'div'> {
  children?: ReactNode;
}

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
