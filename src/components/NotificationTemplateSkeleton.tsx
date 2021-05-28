import { HStack, HTMLChakraProps, Skeleton, SkeletonCircle, VStack } from '@chakra-ui/react';

export default function NotificationTemplateSkeleton(props?: HTMLChakraProps<'div'>) {
  return (
    <HStack p="4" spacing="4" {...props}>
      <SkeletonCircle w="14" h="14" />
      <VStack w="100%" spacing="2">
        <Skeleton h="5" w="100%" />
        <Skeleton h="5" w="100%" />
      </VStack>
    </HStack>
  );
}
