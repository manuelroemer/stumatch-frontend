import { Flex, Skeleton } from '@chakra-ui/react';
import range from 'lodash-es/range';

export default function ChatMessagesSkeleton() {
  return (
    <>
      {range(9).map((i) => (
        <Flex key={i} justify={i % 5 < 3 ? 'flex-end' : 'flex-start'}>
          <Skeleton w="40%" h="10" my="0.5" p="2" rounded="2xl" />
        </Flex>
      ))}
    </>
  );
}
