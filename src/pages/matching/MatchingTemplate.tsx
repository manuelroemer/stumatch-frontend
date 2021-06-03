import { HStack, VStack, Heading, Spacer, Text } from '@chakra-ui/layout';
import { ReactNode } from 'react';

export interface MatchingTemplateProps {
  leftChildren: ReactNode;
  title: string;
  description?: string;
  actions: ReactNode;
}

export default function MatchingTemplate({ leftChildren, title, description, actions }: MatchingTemplateProps) {
  return (
    <HStack p="5" spacing="4">
      {leftChildren}
      <VStack align="flex-start">
        <Heading as="h1" lineHeight="1.4" fontSize="20" isTruncated>
          {title}
        </Heading>
        <Text>{description}</Text>
      </VStack>
      <Spacer />
      {actions}
    </HStack>
  );
}
