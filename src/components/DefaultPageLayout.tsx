import { Box, Flex, Heading, Text } from '@chakra-ui/react';
import { ReactNode } from 'react';

export interface DefaultPageLayoutProps {
  children?: ReactNode;
  header: string;
  subHeader?: string;
}

export default function DefaultPageLayout({ children, header, subHeader }: DefaultPageLayoutProps) {
  return (
    <Flex justify="center" my="8">
      <Box w={['95%', '90%', '80%', '75%']}>
        <Heading as="h1" mb="0">
          {header}
        </Heading>
        {subHeader && <Text>{subHeader}</Text>}
        <Box as="article" mt={['4', '4', '8']}>
          {children}
        </Box>
      </Box>
    </Flex>
  );
}
