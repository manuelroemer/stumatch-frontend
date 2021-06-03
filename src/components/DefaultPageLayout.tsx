import { Box, Flex, HStack, Heading, Text } from '@chakra-ui/react';
import { ReactNode } from 'react';

export interface DefaultPageLayoutProps {
  children?: ReactNode;
  header: string;
  subHeader?: string;
  actions?: ReactNode;
}

export default function DefaultPageLayout({ children, header, subHeader, actions }: DefaultPageLayoutProps) {
  return (
    <Flex as="main" px="8" py="4" justify="center" my="8">
      <Box w={['95%', '90%', '80%', '75%']}>
        <Flex justify="space-between">
          <Box as="header">
            <Heading as="h1" lineHeight="1.4" mb="0" isTruncated>
              {header}
            </Heading>
            {subHeader && <Text noOfLines={2}>{subHeader}</Text>}
          </Box>
          <HStack spacing="4">{actions}</HStack>
        </Flex>
        <Box as="article" mt={['4', '4', '8']}>
          {children}
        </Box>
      </Box>
    </Flex>
  );
}
