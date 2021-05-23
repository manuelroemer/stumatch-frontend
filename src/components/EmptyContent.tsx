import { chakra, Heading, Flex, Center, Box, Text } from '@chakra-ui/react';
import { ReactNode } from 'react';

export interface EmptyContentProps {
  imgSrc?: string;
  imgAlt?: string;
  title?: string;
  subtitle?: string;
  description?: string;
  actions?: ReactNode;
}

export default function EmptyContent({ imgSrc, imgAlt, title, subtitle, description, actions }: EmptyContentProps) {
  return (
    <Center w="100%" h="100%">
      <Flex direction="column" p="8" maxW="md">
        {imgSrc && <chakra.img maxH="2xs" mb="8" src={imgSrc} alt={imgAlt} />}
        {title && (
          <Heading as="h1" size="lg" mb="2">
            {title}
          </Heading>
        )}
        {subtitle && (
          <Heading as="h2" size="md" mb="2">
            {subtitle}
          </Heading>
        )}
        {description && <Text mb="2">{description}</Text>}
        {actions && <Box mt="4">{actions}</Box>}
      </Flex>
    </Center>
  );
}
