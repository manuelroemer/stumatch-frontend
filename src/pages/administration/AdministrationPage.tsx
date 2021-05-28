import { Text } from '@chakra-ui/react';
import DefaultPageLayout from '../../components/DefaultPageLayout';
import { AccessDeniedEmptyState } from '../../components/EmptyStates';
import RequireRoles from '../../components/RequireRoles';

export default function AdministrationPage() {
  return (
    <RequireRoles roles="admin" fallback={<AccessDeniedEmptyState />}>
      <DefaultPageLayout header="Administration">
        <Text>Todo.</Text>
      </DefaultPageLayout>
    </RequireRoles>
  );
}
