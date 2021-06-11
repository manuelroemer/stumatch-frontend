import { Text } from '@chakra-ui/react';
import DefaultPageLayout from '../../components/DefaultPageLayout';
import { AccessDeniedEmptyState } from '../../components/EmptyStates';
import RequireRoles from '../../components/RequireRoles';

export default function AdvertisingPage() {
  return (
    <RequireRoles roles={['admin', 'advertiser']} fallback={<AccessDeniedEmptyState />}>
      <DefaultPageLayout header="Your Ads">
        <Text>Todo.</Text>
      </DefaultPageLayout>
    </RequireRoles>
  );
}
