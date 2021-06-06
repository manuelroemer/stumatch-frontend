import { Button, useDisclosure, Center } from '@chakra-ui/react';
import DefaultPageLayout from '../../components/DefaultPageLayout';
import { AccessDeniedEmptyState } from '../../components/EmptyStates';
import RequireRoles from '../../components/RequireRoles';
import FloatingCard from '../../components/FloatingCard';
import { matchingData } from '../../api/matching';
import { BiPlus } from 'react-icons/bi';
import MatchingSelector from './MatchingSelector';
import MatchingModal from './MatchingModal';
import Pagination from '../../components/Pagination';

export default function MatchingPage() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <RequireRoles roles={['student', 'admin']} fallback={<AccessDeniedEmptyState />}>
      <DefaultPageLayout
        header="Your Matchings"
        subHeader="Match and connect with other students."
        actions={
          <Button onClick={onOpen} colorScheme="primary" leftIcon={<BiPlus />} size="md">
            Create New
          </Button>
        }>
        {matchingData.map((matchRequest, index) => (
          <FloatingCard key={index}>
            <MatchingSelector matchRequest={matchRequest} />
          </FloatingCard>
        ))}
        <Center mt="10">
          <Pagination currentPage={1} pages={1} onPageChanged={() => {}} />
        </Center>
      </DefaultPageLayout>
      <MatchingModal isOpen={isOpen} onClose={onClose} />
    </RequireRoles>
  );
}
