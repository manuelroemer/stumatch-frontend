import { IconButton, Icon, Center, Text, Avatar, HTMLChakraProps } from '@chakra-ui/react';
import { IoChatbubblesOutline } from 'react-icons/io5';
import { IoMdCheckmark, IoMdClose } from 'react-icons/io';
import { BiHourglass } from 'react-icons/bi';
import { MdDeleteForever } from 'react-icons/md';
import { MatchRequest } from '../../api/matching';
import MatchingTemplate, { MatchingTemplateProps } from './MatchingTemplate';

const descriptions = {
  acceptedByMe: 'You have accepted your partner.',
  acceptedByPartner: 'Your partner has accepted you. :)',
  matched: 'We have found a match.',
  accepted: 'You are now friends!',
  declinedByMe: 'You have declined your partner.',
  declinedByPartner: 'Your partner as declined you. :(',
  pending: 'We are searching for a match ...',
};

export interface MatchingSelectorProps {
  matchRequest: MatchRequest;
}

export default function MatchingSelector({ matchRequest }: MatchingSelectorProps) {
  const getMatchingTemplateProps = (): MatchingTemplateProps => {
    switch (matchRequest.status) {
      case 'matched':
      case 'acceptedByMe':
      case 'acceptedByPartner':
        return {
          leftChildren: (
            <Text fontSize="2xl" unselectable="on" userSelect="none">
              <Avatar bg="gray.300" />
            </Text>
          ),

          title: 'test',
          description: descriptions[matchRequest.status],
          actions: (
            <>
              <ChatButton />
              <CheckButton disabled={matchRequest.status === 'acceptedByMe'} />
              <CloseButton disabled={matchRequest.status === 'acceptedByMe'} />
            </>
          ),
        };

      case 'declinedByMe':
      case 'declinedByPartner':
      case 'accepted':
        return {
          leftChildren: (
            <Text fontSize="2xl" unselectable="on" userSelect="none">
              <Avatar bg="gray.300" />
            </Text>
          ),
          title: 'test',
          description: descriptions[matchRequest.status],
          actions: (
            <>
              {matchRequest.status === 'accepted' && <ChatButton />}
              <DeleteButton />
            </>
          ),
        };
      case 'pending':
        return {
          leftChildren: (
            <>
              <Center w="12" h="12" bg="gray.300" borderRadius="full">
                <Icon as={BiHourglass} w="9" h="9" color="white" />
              </Center>
            </>
          ),

          title: 'Pending...',
          description: descriptions[matchRequest.status],
          actions: <IconButton aria-label="Delete" fontSize="25" icon={<MdDeleteForever />} />,
        };
      default:
        throw new Error('Unknown State');
    }
  };

  return <MatchingTemplate {...getMatchingTemplateProps()} />;
}

function ChatButton(props: HTMLChakraProps<'button'>) {
  return <IconButton aria-label="Chat" fontSize="25" icon={<IoChatbubblesOutline />} {...props} />;
}
function CheckButton(props: HTMLChakraProps<'button'>) {
  return <IconButton aria-label="Check" fontSize="25" color="green" icon={<IoMdCheckmark />} {...props} />;
}
function CloseButton(props: HTMLChakraProps<'button'>) {
  return <IconButton aria-label="Close" fontSize="25" color="red" icon={<IoMdClose />} {...props} />;
}
function DeleteButton(props: HTMLChakraProps<'button'>) {
  return <IconButton aria-label="Delete" fontSize="25" icon={<MdDeleteForever />} {...props} />;
}
