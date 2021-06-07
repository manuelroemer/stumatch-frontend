import { VStack, Flex, Text, Box } from '@chakra-ui/react';
import FloatingCard from '../../components/FloatingCard';
import ChatGroupContainer from './ChatGroupContainer';

export default function AdministrationPage() {
  const data = [
    {
      id: `40000000-0000-1000-8000-000000000000`,
      otherParticipants: [
        {
          displayName: 'Hans',
        },
      ],
      activeParticipantIds: ['00000000-0000-1000-8000-000000000000', '00000000-0000-1000-8000-000000000001'],
    },
    {
      id: `40000000-0000-1000-8000-000000000001`,
      otherParticipants: [
        {
          displayName: 'Döner',
        },
        {
          displayName: 'Dürüm',
        },
      ],
      activeParticipantIds: [
        '00000000-0000-1000-8000-000000000000',
        '00000000-0000-1000-8000-000000000001',
        '00000000-0000-2000-8000-000000000000',
      ],
    },
    {
      id: `40000000-0000-1000-8000-000000000002`,
      otherParticipants: [],
      activeParticipantIds: ['00000000-0000-1000-8000-000000000000'],
    },
  ];

  return (
    <Flex h="100%">
      <Box w="25rem" h="100%">
        <ChatGroupContainer borderRight="1px" borderRightColor="gray.200" />
      </Box>
    </Flex>
  );
}
