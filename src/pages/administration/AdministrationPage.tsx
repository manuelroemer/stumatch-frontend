import { Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';
import DefaultPageLayout from '../../components/DefaultPageLayout';
import { AccessDeniedEmptyState } from '../../components/EmptyStates';
import RequireRoles from '../../components/RequireRoles';
import { RoleManagementPage } from './RoleManagementPage';
import { VerifyAdvertisementsPage } from './VerifyAdvertisementsPage';
import { ViewContactRequestsPage } from './ViewContactRequestsPage';

export default function AdministrationPage() {
  return (
    <RequireRoles roles="admin" fallback={<AccessDeniedEmptyState />}>
      <DefaultPageLayout header="Administration">
        <Tabs variant="soft-rounded" colorScheme="blue">
          <TabList>
            <Tab>Advertisements</Tab>
            <Tab>Contact Requests</Tab>
            <Tab>Role Management</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <VerifyAdvertisementsPage />
            </TabPanel>
            <TabPanel>
              <ViewContactRequestsPage />
            </TabPanel>
            <TabPanel>
              <RoleManagementPage />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </DefaultPageLayout>
    </RequireRoles>
  );
}
