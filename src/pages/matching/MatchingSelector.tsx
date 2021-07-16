import { IconButton, Icon, Center, HTMLChakraProps, Badge, HStack, useDisclosure, Tooltip } from '@chakra-ui/react';
import { IoChatbubblesOutline } from 'react-icons/io5';
import { IoMdCheckmark, IoMdClose } from 'react-icons/io';
import { BiHourglass } from 'react-icons/bi';
import { MdDeleteForever } from 'react-icons/md';
import { FaRegEdit } from 'react-icons/fa';
import { MatchRequest } from '../../api/matching';
import MatchingTemplate, { MatchingTemplateProps } from './MatchingTemplate';
import { useDeleteMatchRequestMutation, usePostAcceptDeclineMatchRequestMutation } from '../../queries/matchRequests';
import { Link } from 'react-router-dom';
import UserAvatar from '../../components/UserAvatar';
import { useDeleteConfirmationModal } from '../../components/DeleteConfirmationModal';
import MatchingModal from './MatchingModal';

const descriptions = {
  acceptedByMe: 'You have accepted your partner.',
  acceptedByPartner: 'Your partner has accepted you. :)',
  matched: 'We have found a match.',
  accepted: 'You are now friends!',
  declinedByMe: 'You have declined your partner.',
  declinedByPartner: 'Your partner has declined you. :(',
  pending: 'We are searching for a match ...',
};

export interface MatchingSelectorProps {
  matchRequest: MatchRequest;
}

export default function MatchingSelector({ matchRequest }: MatchingSelectorProps) {
  const getMatchingTemplateProps = (): MatchingTemplateProps => {
    const partnerName = `${matchRequest.partner?.firstName} ${matchRequest.partner?.lastName}`;
    const partnerAvatar = <UserAvatar userId={matchRequest.partner?.id} />;
    const deleteButton = <DeleteButton matchRequestId={matchRequest.id} />;

    switch (matchRequest.status) {
      case 'matched':
      case 'acceptedByMe':
      case 'acceptedByPartner':
        return {
          leftChildren: partnerAvatar,
          title: partnerName,
          description: descriptions[matchRequest.status],
          actions: (
            <>
              <ChatButton chatGroupId="matchRequest.chatGroupId ?? ''" />
              <CheckButton matchRequestId={matchRequest.id} disabled={matchRequest.status === 'acceptedByMe'} />
              <CloseButton matchRequestId={matchRequest.id} disabled={matchRequest.status === 'acceptedByMe'} />
            </>
          ),
        };
      case 'declinedByMe':
      case 'declinedByPartner':
      case 'accepted':
        return {
          leftChildren: partnerAvatar,
          title: partnerName,
          description: descriptions[matchRequest.status],
          actions: (
            <>
              {matchRequest.status === 'accepted' && <ChatButton chatGroupId={matchRequest.chatGroupId ?? ''} />}
              {deleteButton}
            </>
          ),
        };
      case 'pending':
        return {
          leftChildren: (
            <>
              <Center w="12" h="12" bg="gray.300" borderRadius="full">
                <Icon as={BiHourglass} w="8" h="8" color="white" />
              </Center>
            </>
          ),
          title: 'Pending...',
          description: descriptions[matchRequest.status],
          actions: (
            <>
              <EditButton matchRequest={matchRequest} />
              {deleteButton}{' '}
            </>
          ),
        };
      default:
        throw new Error('Unknown State');
    }
  };

  return (
    <MatchingTemplate filters={<MatchRequestFilters matchRequest={matchRequest} />} {...getMatchingTemplateProps()} />
  );
}

function MatchRequestFilters({ matchRequest }: { matchRequest: MatchRequest }) {
  return (
    <HStack>
      <Badge variant="solid" colorScheme="blue">
        {matchRequest.faculty?.name}
      </Badge>

      <Badge ml="2" variant="solid" colorScheme="blue">
        {matchRequest.studyProgram?.name}
      </Badge>

      {matchRequest.minSemester && (
        <Badge ml="2" variant="solid" colorScheme="cyan">
          Semester: {matchRequest.minSemester} - {matchRequest.maxSemester}
        </Badge>
      )}
    </HStack>
  );
}

function ChatButton({ chatGroupId, ...props }: HTMLChakraProps<'button'> & { chatGroupId: string }) {
  return (
    <Link to={`/chat/${chatGroupId}`}>
      <IconButton aria-label="Chat" fontSize="25" icon={<IoChatbubblesOutline />} {...props} />
    </Link>
  );
}

function CheckButton({ matchRequestId, ...props }: HTMLChakraProps<'button'> & { matchRequestId: string }) {
  const mutation = usePostAcceptDeclineMatchRequestMutation(matchRequestId);
  return (
    <IconButton
      aria-label="Check"
      fontSize="25"
      color="green"
      icon={<IoMdCheckmark />}
      onClick={() => mutation.mutate({ accepted: true })}
      isLoading={mutation.isLoading}
      {...props}
    />
  );
}

function CloseButton({ matchRequestId, ...props }: HTMLChakraProps<'button'> & { matchRequestId: string }) {
  const mutation = usePostAcceptDeclineMatchRequestMutation(matchRequestId);

  return (
    <IconButton
      aria-label="Close"
      fontSize="25"
      color="red"
      icon={<IoMdClose />}
      onClick={() => mutation.mutate({ accepted: false })}
      isLoading={mutation.isLoading}
      {...props}
    />
  );
}

function DeleteButton({ matchRequestId, ...props }: HTMLChakraProps<'button'> & { matchRequestId: string }) {
  const mutation = useDeleteMatchRequestMutation(matchRequestId);
  const deleteModal = useDeleteConfirmationModal();
  return (
    <>
      <IconButton
        aria-label="Delete"
        fontSize="25"
        icon={<MdDeleteForever />}
        onClick={() => {
          deleteModal.show({
            header: 'Remove Match Request ',
            cancelText: 'No, keep it',
            confirmText: 'Yes, delete it',
            onConfirm: () => mutation.mutateAsync(),
          });
        }}
        {...props}
      />
      {deleteModal.modal}
    </>
  );
}

function EditButton({ matchRequest, ...props }: HTMLChakraProps<'button'> & { matchRequest: MatchRequest }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Tooltip label={'Edit Match Request'}>
        <IconButton aria-label="Edit" fontSize="25" icon={<FaRegEdit />} onClick={onOpen} {...props} />
      </Tooltip>

      <MatchingModal isUpdate={true} isOpen={isOpen} onClose={onClose} matchRequest={matchRequest} />
    </>
  );
}
