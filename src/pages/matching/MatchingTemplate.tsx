import { HStack, VStack, Heading, Spacer, Text } from '@chakra-ui/layout';
import { ReactNode } from 'react';

export interface MatchingTemplateProps {
  leftChildren: ReactNode;
  title: string;
  description?: string;
  filters?: ReactNode;
  actions: ReactNode;
}

export default function MatchingTemplate({
  leftChildren,
  title,
  description,
  filters,
  actions,
}: MatchingTemplateProps) {
  return (
    <HStack p="4" spacing="4">
      {leftChildren}
      <VStack align="flex-start">
        <Heading as="h1" lineHeight="1.4" fontSize="20" isTruncated>
          {title}
        </Heading>
        <Text>{description}</Text>
        {filters}
      </VStack>
      <Spacer />
      {actions}
    </HStack>
  );
}
