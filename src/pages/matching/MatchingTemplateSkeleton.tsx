import { HStack, VStack, IconButton, Skeleton, SkeletonCircle, Spacer, Icon, Heading, Text } from '@chakra-ui/react';
import { IoChatbubblesOutline, IoHourglassOutline } from 'react-icons/io5';
import { IoMdCheckmark, IoMdClose } from 'react-icons/io';
import { MdDeleteForever } from 'react-icons/md';
import { MatchRequest } from '../../api/matching';

export interface MatchingTemplateSkeletonProps {
  matchRequest: MatchRequest;
}

export default function MatchingTemplateSkeleton({ matchRequest }: MatchingTemplateSkeletonProps) {
  return (
    <HStack p="5" spacing="4">
      {matchRequest.status === 'matched' && (
        <>
          <SkeletonCircle w="14" h="14" />
          <Skeleton h="5" w="70%" />
          <Spacer />
          <IconButton aria-label="Chat" fontSize="20px" icon={<IoChatbubblesOutline />} />
          <IconButton aria-label="Check" fontSize="20px" color="green" icon={<IoMdCheckmark />} />
          <IconButton aria-label="Close" fontSize="20px" color="red" icon={<IoMdClose />} />
        </>
      )}
      {matchRequest.status === 'pending' && (
        <>
          {' '}
          <Icon as={IoHourglassOutline} w="12" h="12" />
          <VStack align="flex-start">
            <Heading as="h3" size="sm" isTruncated>
              Pending...
            </Heading>
            <Text> Please wait for pojgwüogew</Text>
          </VStack>
          <Spacer />
          <IconButton aria-label="Delete" fontSize="20px" icon={<MdDeleteForever />} />
        </>
      )}
    </HStack>
  );
}
