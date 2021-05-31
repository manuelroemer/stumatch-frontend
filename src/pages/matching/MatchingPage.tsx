import { Text } from '@chakra-ui/react';
import DefaultPageLayout from '../../components/DefaultPageLayout';
import { AccessDeniedEmptyState } from '../../components/EmptyStates';
import RequireRoles from '../../components/RequireRoles';

export default function MatchingPage() {
  return (
    <RequireRoles roles={['student', 'admin']} fallback={<AccessDeniedEmptyState />}>
      <DefaultPageLayout header="Matching">
        <Text>Todo.</Text>
      </DefaultPageLayout>
    </RequireRoles>
  );
}
