import { Button } from '@chakra-ui/react';
import DefaultPageLayout from '../../components/DefaultPageLayout';
import { AccessDeniedEmptyState } from '../../components/EmptyStates';
import RequireRoles from '../../components/RequireRoles';
import FloatingCard from '../../components/FloatingCard';
import { matchingData } from '../../api/matching';
import { BiPlus } from 'react-icons/bi';
import MatchingSelector from './MatchingSelector';

export default function MatchingPage() {
  return (
    <RequireRoles roles={['student', 'admin']} fallback={<AccessDeniedEmptyState />}>
      <DefaultPageLayout
        header="Your Matchings"
        subHeader="Match and connect with other students."
        actions={
          <Button colorScheme="primary" leftIcon={<BiPlus />} size="md">
            Create New
          </Button>
        }>
        {matchingData.map((matchRequest, index) => (
          <FloatingCard key={index}>
            <MatchingSelector matchRequest={matchRequest} />
          </FloatingCard>
        ))}
      </DefaultPageLayout>
    </RequireRoles>
  );
}
